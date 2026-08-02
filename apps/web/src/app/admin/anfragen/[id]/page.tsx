'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Loader2, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Card,
  Content,
  ErrorState,
  LoadingState,
  PageHeader,
  StatusBadge,
  statusLabels,
} from '@/components/admin/ui';
import { Button } from '@/components/ui/button';
import { Label, Textarea } from '@/components/ui/input';
import { AdminApiError, adminApi } from '@/lib/admin-api';
import { formatDate } from '@/lib/utils';

const statusOptions = ['NEU', 'IN_BEARBEITUNG', 'BEANTWORTET', 'GESCHLOSSEN'];

const sizeLabels: Record<string, string> = {
  '10ft': '10 Fuß',
  '20ft': '20 Fuß',
  '20ft-hc': '20 Fuß High Cube',
  '40ft': '40 Fuß',
  '40ft-hc': '40 Fuß High Cube',
  '45ft': '45 Fuß High Cube',
  unklar: 'noch offen – Beratung gewünscht',
};

const conditionLabels: Record<string, string> = {
  neu: 'Fabrikneu',
  'one-trip': 'One-Trip',
  generalueberholt: 'Generalüberholt',
  gebraucht: 'Gebraucht',
  egal: 'Egal',
};

export default function AdminInquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const queryClient = useQueryClient();

  const [status, setStatus] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inquiry = useQuery({
    queryKey: ['admin', 'inquiry', id],
    queryFn: () => adminApi.inquiries.get(id),
    enabled: Boolean(id),
  });

  // Formular mit den gespeicherten Werten vorbelegen, sobald sie vorliegen.
  useEffect(() => {
    if (inquiry.data) {
      setStatus(inquiry.data.status);
      setInternalNote(inquiry.data.internalNote ?? '');
    }
  }, [inquiry.data]);

  const save = useMutation({
    mutationFn: () => adminApi.inquiries.update(id, { status, internalNote }),
    onSuccess: () => {
      setFeedback('Änderungen gespeichert.');
      void queryClient.invalidateQueries({ queryKey: ['admin', 'inquiry', id] });
      void queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
    },
    onError: (caught) =>
      setError(
        caught instanceof AdminApiError
          ? caught.message
          : 'Die Änderung konnte nicht gespeichert werden.',
      ),
  });

  if (inquiry.isLoading) {
    return (
      <>
        <PageHeader title="Anfrage" />
        <Content>
          <LoadingState />
        </Content>
      </>
    );
  }

  if (inquiry.isError || !inquiry.data) {
    return (
      <>
        <PageHeader title="Anfrage" />
        <Content>
          <ErrorState
            message="Diese Anfrage konnte nicht geladen werden."
            onRetry={() => void inquiry.refetch()}
          />
        </Content>
      </>
    );
  }

  const data = inquiry.data;
  const isQuote = data.type === 'ANGEBOT';

  const replySubject = encodeURIComponent(
    `${isQuote ? 'Ihr Angebot' : 'Ihre Anfrage'} ${data.reference} – EMC Container`,
  );

  return (
    <>
      <PageHeader
        title={`${isQuote ? 'Angebotsanfrage' : 'Kontaktanfrage'} ${data.reference}`}
        description={`Eingegangen am ${formatDate(data.createdAt.slice(0, 10))}`}
        actions={
          <>
            <Button asChild size="sm">
              <a href={`mailto:${data.email}?subject=${replySubject}`}>
                <Mail aria-hidden />
                Antworten
              </a>
            </Button>
            {data.phone && (
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${data.phone.replace(/\s/g, '')}`}>
                  <Phone aria-hidden />
                  Anrufen
                </a>
              </Button>
            )}
          </>
        }
      />

      <Content>
        {feedback && (
          <p className="mb-5 rounded-xl bg-success-50 px-5 py-4 text-sm text-success-700">
            {feedback}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl bg-danger-50 px-5 py-4 text-sm text-danger-700"
          >
            {error}
          </p>
        )}

        <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-5">
            <Card title="Kontaktdaten">
              <dl className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" value={data.name} />
                {data.company && <Field label="Firma" value={data.company} />}
                <Field
                  label="E-Mail"
                  value={
                    <a
                      href={`mailto:${data.email}`}
                      className="text-navy-800 hover:text-accent-700"
                    >
                      {data.email}
                    </a>
                  }
                />
                {data.phone && (
                  <Field
                    label="Telefon"
                    value={
                      <a
                        href={`tel:${data.phone.replace(/\s/g, '')}`}
                        className="text-navy-800 hover:text-accent-700"
                      >
                        {data.phone}
                      </a>
                    }
                  />
                )}
                {data.customerType && (
                  <Field
                    label="Kundentyp"
                    value={data.customerType === 'GEWERBLICH' ? 'Geschäftskunde' : 'Privatkunde'}
                  />
                )}
              </dl>
            </Card>

            {isQuote ? (
              <Card title="Angefragter Bedarf">
                <dl className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Containergröße"
                    value={sizeLabels[data.size ?? ''] ?? data.size ?? '–'}
                  />
                  <Field
                    label="Zustand"
                    value={conditionLabels[data.condition ?? ''] ?? data.condition ?? '–'}
                  />
                  <Field label="Anzahl" value={String(data.quantity ?? 1)} />
                  <Field label="Lieferpostleitzahl" value={data.postalCode ?? '–'} />
                  {data.usage && <Field label="Verwendungszweck" value={data.usage} />}
                  {data.deliveryDate && (
                    <Field
                      label="Wunschtermin"
                      value={formatDate(data.deliveryDate.slice(0, 10))}
                    />
                  )}
                  {data.productSlug && <Field label="Bezug zu Produkt" value={data.productSlug} />}
                </dl>
              </Card>
            ) : (
              data.subject && (
                <Card title="Betreff">
                  <p className="text-sm text-navy-900">{data.subject}</p>
                </Card>
              )
            )}

            {data.message && (
              <Card title="Nachricht">
                <p className="text-sm leading-relaxed whitespace-pre-line text-stone-700">
                  {data.message}
                </p>
              </Card>
            )}
          </div>

          <aside className="space-y-5">
            <Card title="Bearbeitung">
              <div className="mb-4">
                <StatusBadge status={data.status} />
              </div>

              <div className="space-y-4 border-t border-stone-100 pt-4">
                <div>
                  <Label htmlFor="inquiry-status">Status</Label>
                  <select
                    id="inquiry-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {statusLabels[option] ?? option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="internal-note">Interne Notiz</Label>
                  <Textarea
                    id="internal-note"
                    rows={6}
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Nur für das Team sichtbar – z. B. Angebotsnummer, Rückrufzeit, Besonderheiten."
                  />
                </div>

                <Button
                  onClick={() => {
                    setError(null);
                    setFeedback(null);
                    save.mutate();
                  }}
                  disabled={save.isPending}
                  className="w-full"
                >
                  {save.isPending && <Loader2 className="animate-spin" aria-hidden />}
                  Speichern
                </Button>

                <p className="text-2xs leading-relaxed text-stone-500">
                  Interne Notizen sind für Kundinnen und Kunden nicht sichtbar.
                </p>
              </div>
            </Card>
          </aside>
        </div>
      </Content>
    </>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-stone-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-navy-900">{value}</dd>
    </div>
  );
}
