'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { BadgeEuro, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { formatPrice } from '@emc/catalog';

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
import { Input, Label, Textarea } from '@/components/ui/input';
import { AdminApiError, adminApi, type AdminAddress } from '@/lib/admin-api';
import { formatDate, formatDateShort } from '@/lib/utils';

const nextStatuses = [
  'EINGEGANGEN',
  'ZAHLUNG_AUSSTEHEND',
  'BEZAHLT',
  'IN_BEARBEITUNG',
  'VERSANDBEREIT',
  'IN_ZUSTELLUNG',
  'GELIEFERT',
  'STORNIERT',
];

export default function AdminOrderDetailPage() {
  const params = useParams<{ orderNumber: string }>();
  const orderNumber = params.orderNumber;
  const queryClient = useQueryClient();

  const [status, setStatus] = useState('');
  const [carrier, setCarrier] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const order = useQuery({
    queryKey: ['admin', 'order', orderNumber],
    queryFn: () => adminApi.orders.get(orderNumber),
    enabled: Boolean(orderNumber),
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ['admin', 'order', orderNumber] });
    void queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
  };

  const updateStatus = useMutation({
    mutationFn: () =>
      adminApi.orders.updateStatus(orderNumber, {
        status,
        ...(description ? { description } : {}),
        ...(carrier ? { carrier } : {}),
        ...(estimatedDelivery ? { estimatedDelivery } : {}),
      }),
    onSuccess: () => {
      setFeedback('Status aktualisiert. Die Kundin bzw. der Kunde wurde per E-Mail informiert.');
      setDescription('');
      setStatus('');
      invalidate();
    },
    onError: (caught) =>
      setError(
        caught instanceof AdminApiError
          ? caught.message
          : 'Der Status konnte nicht geändert werden.',
      ),
  });

  const markPaid = useMutation({
    mutationFn: () => adminApi.orders.markPaid(orderNumber, 'Zahlungseingang manuell bestätigt.'),
    onSuccess: () => {
      setFeedback('Zahlung als eingegangen vermerkt.');
      invalidate();
    },
    onError: (caught) =>
      setError(
        caught instanceof AdminApiError
          ? caught.message
          : 'Die Zahlung konnte nicht bestätigt werden.',
      ),
  });

  if (order.isLoading) {
    return (
      <>
        <PageHeader title="Bestellung" />
        <Content>
          <LoadingState />
        </Content>
      </>
    );
  }

  if (order.isError || !order.data) {
    return (
      <>
        <PageHeader title="Bestellung" />
        <Content>
          <ErrorState
            message="Diese Bestellung konnte nicht geladen werden."
            onRetry={() => void order.refetch()}
          />
        </Content>
      </>
    );
  }

  const data = order.data;
  const netTotal = data.subtotalNet - data.discountNet + data.shippingNet;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

  return (
    <>
      <PageHeader
        title={data.orderNumber}
        description={`Bestellt am ${formatDate(data.createdAt.slice(0, 10))} · ${data.email}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <a
                href={`${apiUrl}/api/v1/invoices/download?orderNumber=${encodeURIComponent(data.orderNumber)}&email=${encodeURIComponent(data.email)}`}
                target="_blank"
                rel="noopener"
              >
                <Download aria-hidden />
                Rechnung
              </a>
            </Button>
            {data.status === 'EINGEGANGEN' && (
              <Button size="sm" onClick={() => markPaid.mutate()} disabled={markPaid.isPending}>
                {markPaid.isPending ? (
                  <Loader2 className="animate-spin" aria-hidden />
                ) : (
                  <BadgeEuro aria-hidden />
                )}
                Zahlung bestätigen
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
            <Card title="Positionen">
              <ul className="divide-y divide-stone-100">
                {data.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 py-3 first:pt-0"
                  >
                    <div>
                      <p className="font-medium text-navy-900">{item.name}</p>
                      <p className="mt-0.5 text-xs text-stone-500">
                        Art.-Nr. {item.sku} · {item.quantity} × {formatPrice(item.priceNet)} netto
                      </p>
                    </div>
                    <p className="shrink-0 font-medium text-navy-900">
                      {formatPrice(item.lineNet)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-sm">
                <Row label="Zwischensumme (netto)" value={formatPrice(data.subtotalNet)} />
                {data.discountNet > 0 && (
                  <Row label="Rabatt" value={`− ${formatPrice(data.discountNet)}`} />
                )}
                <Row
                  label="Lieferung"
                  value={data.shippingNet === 0 ? 'kostenlos' : formatPrice(data.shippingNet)}
                />
                <Row label="Nettobetrag" value={formatPrice(netTotal)} />
                <Row label="zzgl. 19 % MwSt." value={formatPrice(data.vatAmount)} />
                <div className="flex items-baseline justify-between gap-3 border-t border-stone-100 pt-2">
                  <dt className="font-display text-base font-bold text-navy-900">Gesamt</dt>
                  <dd className="font-display text-lg font-bold text-navy-950">
                    {formatPrice(data.totalGross)}
                  </dd>
                </div>
              </dl>
            </Card>

            <div className="grid gap-5 sm:grid-cols-2">
              <AddressCard title="Rechnungsadresse" address={data.billingAddress} />
              <AddressCard title="Lieferadresse" address={data.shippingAddress} />
            </div>

            {data.deliveryNotes && (
              <Card title="Hinweise des Kunden zur Anlieferung">
                <p className="text-sm leading-relaxed whitespace-pre-line text-stone-700">
                  {data.deliveryNotes}
                </p>
              </Card>
            )}

            {data.events && data.events.length > 0 && (
              <Card title="Verlauf">
                <ol className="space-y-4 border-l-2 border-stone-200 pl-5">
                  {data.events.map((event, index) => (
                    <li key={`${event.createdAt}-${index}`} className="relative">
                      <span
                        className={`absolute top-1.5 -left-[1.65rem] size-3 rounded-full border-2 border-white ${
                          index === 0 ? 'bg-accent-600' : 'bg-stone-300'
                        }`}
                        aria-hidden
                      />
                      <p className="text-sm font-semibold text-navy-900">{event.label}</p>
                      <p className="mt-0.5 text-sm text-stone-600">{event.description}</p>
                      <p className="mt-0.5 text-xs text-stone-400">
                        {formatDateShort(event.createdAt.slice(0, 10))}
                      </p>
                    </li>
                  ))}
                </ol>
              </Card>
            )}
          </div>

          <aside className="space-y-5">
            <Card title="Status">
              <div className="mb-4">
                <StatusBadge status={data.status} />
              </div>

              <dl className="space-y-2 border-t border-stone-100 pt-4 text-sm">
                <Row
                  label="Kundentyp"
                  value={data.customerType === 'GEWERBLICH' ? 'Geschäftskunde' : 'Privatkunde'}
                />
                {data.vatId && <Row label="USt-IdNr." value={data.vatId} />}
                {data.carrier && <Row label="Transporteur" value={data.carrier} />}
                {data.estimatedDelivery && (
                  <Row
                    label="Voraussichtliche Lieferung"
                    value={formatDateShort(data.estimatedDelivery.slice(0, 10))}
                  />
                )}
                {data.payments?.[0] && (
                  <Row label="Zahlungsart" value={paymentLabel(data.payments[0].method)} />
                )}
              </dl>
            </Card>

            <Card title="Status ändern">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-status">Neuer Status</Label>
                  <select
                    id="new-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-11 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-navy-900 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/15 focus:outline-none"
                  >
                    <option value="">Bitte wählen …</option>
                    {nextStatuses
                      .filter((s) => s !== data.status)
                      .map((s) => (
                        <option key={s} value={s}>
                          {statusLabels[s] ?? s}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="carrier">Transporteur</Label>
                  <Input
                    id="carrier"
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    placeholder="z. B. Spedition Weber"
                  />
                </div>

                <div>
                  <Label htmlFor="estimated">Voraussichtliche Lieferung</Label>
                  <Input
                    id="estimated"
                    type="date"
                    value={estimatedDelivery}
                    onChange={(e) => setEstimatedDelivery(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="status-note">Nachricht an die Kundschaft</Label>
                  <Textarea
                    id="status-note"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional – ohne Eingabe verwenden wir den Standardtext."
                  />
                </div>

                <Button
                  onClick={() => {
                    setError(null);
                    setFeedback(null);
                    updateStatus.mutate();
                  }}
                  disabled={!status || updateStatus.isPending}
                  className="w-full"
                >
                  {updateStatus.isPending && <Loader2 className="animate-spin" aria-hidden />}
                  Status speichern
                </Button>

                <p className="text-2xs leading-relaxed text-stone-500">
                  Beim Speichern wird automatisch eine E-Mail an {data.email} versendet.
                </p>
              </div>
            </Card>
          </aside>
        </div>
      </Content>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-stone-600">{label}</dt>
      <dd className="text-right font-medium text-navy-900">{value}</dd>
    </div>
  );
}

function AddressCard({ title, address }: { title: string; address: AdminAddress | null }) {
  return (
    <Card title={title}>
      {address ? (
        <address className="text-sm leading-relaxed text-stone-700 not-italic">
          {address.company && (
            <>
              <strong className="font-semibold text-navy-900">{address.company}</strong>
              <br />
            </>
          )}
          {address.firstName} {address.lastName}
          <br />
          {address.street} {address.houseNumber}
          <br />
          {address.postalCode} {address.city}
          <br />
          {address.country}
          <br />
          <a
            href={`tel:${address.phone.replace(/\s/g, '')}`}
            className="mt-2 inline-block font-medium text-navy-800 hover:text-accent-700"
          >
            {address.phone}
          </a>
        </address>
      ) : (
        <p className="text-sm text-stone-500">Keine Adresse hinterlegt.</p>
      )}
    </Card>
  );
}

function paymentLabel(method: string): string {
  const labels: Record<string, string> = {
    // Nicht mehr auswählbar; erhalten für bereits erfasste Bestellungen
    STRIPE: 'Kreditkarte (eingestellt)',
    PAYPAL: 'PayPal (eingestellt)',
    SEPA: 'SEPA-Lastschrift',
    BANKTRANSFER: 'Vorkasse / Überweisung',
    INVOICE: 'Kauf auf Rechnung',
  };
  return labels[method] ?? method;
}
