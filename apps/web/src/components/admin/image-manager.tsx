'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { AlertCircle, ArrowLeft, ArrowRight, ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

import { Card } from '@/components/admin/ui';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';
import { AdminApiError, adminApi, type AdminProductImage } from '@/lib/admin-api';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED = 'image/jpeg,image/png,image/webp,image/avif';

/**
 * Bildverwaltung eines Produkts.
 *
 * Der Upload läuft über die API nach Cloudinary – das API-Secret bleibt auf
 * dem Server. Die Reihenfolge bestimmt, welches Bild als Titelbild erscheint.
 */
export function ImageManager({
  productId,
  productName,
  images,
}: {
  productId: string;
  productName: string;
  images: AdminProductImage[];
}) {
  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['admin', 'product', productId] });

  const upload = useMutation({
    mutationFn: (file: File) => adminApi.products.uploadImage(productId, file, alt),
    onSuccess: () => {
      setAlt('');
      if (fileInput.current) fileInput.current.value = '';
      void invalidate();
    },
    onError: (caught) =>
      setError(
        caught instanceof AdminApiError
          ? caught.message
          : 'Das Bild konnte nicht hochgeladen werden.',
      ),
  });

  const remove = useMutation({
    mutationFn: (imageId: string) => adminApi.products.deleteImage(imageId),
    onSuccess: invalidate,
  });

  const reorder = useMutation({
    mutationFn: (imageIds: string[]) => adminApi.products.reorderImages(productId, imageIds),
    onSuccess: invalidate,
  });

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    // Vorabprüfung im Browser; die verbindliche Prüfung macht die API.
    if (file.size > MAX_FILE_SIZE) {
      setError('Die Datei ist größer als 10 MB.');
      event.target.value = '';
      return;
    }

    upload.mutate(file);
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;

    const next = [...images];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved!);
    reorder.mutate(next.map((image) => image.id));
  };

  return (
    <Card title="Produktbilder">
      {images.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <li
              key={image.id}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white"
            >
              <div className="relative aspect-[4/3] bg-stone-100">
                {image.url ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, 30vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-full items-center justify-center px-3 text-center text-xs text-stone-400">
                    Ohne Cloudinary-Konfiguration ist keine Vorschau verfügbar
                  </span>
                )}

                {index === 0 && (
                  <span className="absolute top-2 left-2 rounded-full bg-navy-900 px-2.5 py-1 text-2xs font-bold text-white">
                    Titelbild
                  </span>
                )}
              </div>

              <div className="p-3">
                <p className="line-clamp-2 text-xs text-stone-600" title={image.alt}>
                  {image.alt}
                </p>

                <div className="mt-2.5 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0 || reorder.isPending}
                    aria-label="Nach vorne verschieben"
                    className="cursor-pointer rounded-md p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-navy-800 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft className="size-3.5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === images.length - 1 || reorder.isPending}
                    aria-label="Nach hinten verschieben"
                    className="cursor-pointer rounded-md p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-navy-800 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowRight className="size-3.5" aria-hidden />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Bild „${image.alt}" wirklich löschen?`)) remove.mutate(image.id);
                    }}
                    disabled={remove.isPending}
                    aria-label="Bild löschen"
                    className="ml-auto cursor-pointer rounded-md p-1.5 text-stone-400 transition-colors hover:bg-danger-50 hover:text-danger-600 disabled:opacity-30"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-stone-300 px-5 py-10 text-center text-sm text-stone-500">
          Noch keine Bilder. Das erste hochgeladene Bild wird automatisch zum Titelbild.
        </p>
      )}

      {/* Upload */}
      <div className="mt-5 border-t border-stone-100 pt-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <Label htmlFor="image-alt">Alt-Text für das nächste Bild</Label>
            <Input
              id="image-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder={`${productName} – Frontansicht mit geschlossenen Türen`}
            />
            <p className="mt-1.5 text-2xs text-stone-500">
              Beschreibt das Bild für Screenreader und die Bildersuche. Ohne Eingabe verwenden wir
              den Produktnamen.
            </p>
          </div>

          <div>
            <input
              ref={fileInput}
              type="file"
              accept={ACCEPTED}
              onChange={onFileSelected}
              className="sr-only"
              id="image-upload"
            />
            <Button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={upload.isPending}
              className="w-full sm:w-auto"
            >
              {upload.isPending ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <ImagePlus aria-hidden />
              )}
              <span>{upload.isPending ? 'Wird hochgeladen …' : 'Bild hochladen'}</span>
            </Button>
          </div>
        </div>

        <p className="mt-3 text-2xs text-stone-500">
          JPEG, PNG, WebP oder AVIF · maximal 10 MB · Empfehlung: mindestens 1.200 × 900 Pixel
        </p>

        {error && (
          <p
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-lg bg-danger-50 p-3 text-sm text-danger-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {error}
          </p>
        )}
      </div>
    </Card>
  );
}
