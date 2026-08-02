'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';

import {
  Content,
  DataTable,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  StatusBadge,
} from '@/components/admin/ui';
import { Input } from '@/components/ui/input';
import { adminApi } from '@/lib/admin-api';
import { cn, formatDateShort } from '@/lib/utils';

const typeFilters = [
  { value: '', label: 'Alle' },
  { value: 'ANGEBOT', label: 'Angebotsanfragen' },
  { value: 'KONTAKT', label: 'Kontaktanfragen' },
];

const statusFilters = [
  { value: '', label: 'Alle Status' },
  { value: 'NEU', label: 'Neu' },
  { value: 'IN_BEARBEITUNG', label: 'In Bearbeitung' },
  { value: 'BEANTWORTET', label: 'Beantwortet' },
  { value: 'GESCHLOSSEN', label: 'Geschlossen' },
];

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const inquiries = useQuery({
    queryKey: ['admin', 'inquiries', type, status, search],
    queryFn: () =>
      adminApi.inquiries.list({
        type: type || undefined,
        status: status || undefined,
        search: search || undefined,
        limit: 50,
      }),
  });

  return (
    <>
      <PageHeader
        title="Anfragen"
        description="Kontakt- und Angebotsanfragen aus den Formularen der Website."
      />

      <Content>
        <div className="mb-5 space-y-3">
          <div className="relative max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400"
              aria-hidden
            />
            <label htmlFor="inquiry-search" className="sr-only">
              Anfragen durchsuchen
            </label>
            <Input
              id="inquiry-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Referenz, Name, E-Mail oder Firma …"
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex gap-1.5" role="group" aria-label="Nach Art filtern">
              {typeFilters.map((filter) => (
                <FilterButton
                  key={filter.value}
                  active={type === filter.value}
                  onClick={() => setType(filter.value)}
                  label={filter.label}
                />
              ))}
            </div>

            <div className="flex gap-1.5" role="group" aria-label="Nach Status filtern">
              {statusFilters.map((filter) => (
                <FilterButton
                  key={filter.value}
                  active={status === filter.value}
                  onClick={() => setStatus(filter.value)}
                  label={filter.label}
                />
              ))}
            </div>
          </div>
        </div>

        {inquiries.isLoading ? (
          <LoadingState label="Anfragen werden geladen …" />
        ) : inquiries.isError ? (
          <ErrorState
            message="Die Anfragen konnten nicht geladen werden."
            onRetry={() => void inquiries.refetch()}
          />
        ) : inquiries.data && inquiries.data.items.length > 0 ? (
          <>
            <p className="mb-3 text-sm text-stone-500">
              {inquiries.data.meta.total} {inquiries.data.meta.total === 1 ? 'Anfrage' : 'Anfragen'}
            </p>

            <DataTable
              caption="Anfragenliste"
              head={['Referenz', 'Art', 'Datum', 'Name', 'Kontakt', 'Betreff / Bedarf', 'Status']}
            >
              {inquiries.data.items.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`/admin/anfragen/${inquiry.id}`}
                      className="font-semibold text-navy-900 hover:text-accent-700"
                    >
                      {inquiry.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-2xs font-bold',
                        inquiry.type === 'ANGEBOT'
                          ? 'bg-accent-100 text-accent-800'
                          : 'bg-navy-100 text-navy-800',
                      )}
                    >
                      {inquiry.type === 'ANGEBOT' ? 'Angebot' : 'Kontakt'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                    {formatDateShort(inquiry.createdAt.slice(0, 10))}
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-navy-900">{inquiry.name}</span>
                    {inquiry.company && (
                      <span className="block text-xs text-stone-500">{inquiry.company}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-stone-600">{inquiry.email}</span>
                    {inquiry.phone && (
                      <span className="block text-xs text-stone-500">{inquiry.phone}</span>
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-stone-600">
                    <span className="line-clamp-1">
                      {inquiry.type === 'ANGEBOT'
                        ? `${inquiry.quantity ?? 1} × ${inquiry.size ?? '–'} ${inquiry.condition ?? ''} · PLZ ${inquiry.postalCode ?? '–'}`
                        : (inquiry.subject ?? '–')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inquiry.status} />
                  </td>
                </tr>
              ))}
            </DataTable>
          </>
        ) : (
          <EmptyState
            title={search || type || status ? 'Keine Treffer' : 'Noch keine Anfragen'}
            description={
              search || type || status
                ? 'Passen Sie Suche oder Filter an.'
                : 'Anfragen aus dem Kontakt- und Angebotsformular erscheinen hier.'
            }
          />
        )}
      </Content>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-navy-900 text-white'
          : 'border border-stone-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-stone-50',
      )}
    >
      {label}
    </button>
  );
}
