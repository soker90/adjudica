import Link from 'next/link';
import { getContractingAuthorities } from '@/lib/db';
import { formatCompactCurrency, formatNumber } from '@/lib/format';
import { SITE_CONFIG } from '@/lib/site-config';
import CsvExportButton from '@/components/CsvExportButton';
import { ArrowRight, Info, Landmark } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Authority = {
  id: string;
  placsp_id?: string | null;
  name: string;
  scope?: string | null;
  total_contratos?: number;
  total_adjudicatarios?: number;
  gasto_adjudicado?: number;
  ingresos_adjudicados?: number;
  volumen_total?: number;
  ultimo_contrato?: string | null;
};

export default function OrganismosPage() {
  const contractingAuthorities = getContractingAuthorities() as Authority[];
  const presentation = SITE_CONFIG.organismsPresentation;
  const directAuthorities = contractingAuthorities.filter((authority) => authority.scope === 'Directa Municipal');
  const associatedAuthorities = contractingAuthorities.filter((authority) => authority.scope === 'Indirecta (Mancomunidad)');

  const directContracts = directAuthorities.reduce((sum, authority) => sum + (authority.total_contratos || 0), 0);
  const directAwarded = directAuthorities.reduce((sum, authority) => sum + (authority.gasto_adjudicado || 0), 0);
  const directIncome = directAuthorities.reduce((sum, authority) => sum + (authority.ingresos_adjudicados || 0), 0);

  const associatedMatch = (SITE_CONFIG.associatedAuthorityNameMatch ?? presentation?.associatedSummaryAuthorityMatch ?? '').toLocaleUpperCase();
  const associatedSummaryAuthority = associatedAuthorities.find((authority) =>
    associatedMatch ? authority.name.toLocaleUpperCase().includes(associatedMatch) : true,
  );
  const associatedContracts = associatedSummaryAuthority?.total_contratos ?? associatedAuthorities.reduce((sum, authority) => sum + (authority.total_contratos || 0), 0);
  const associatedAwarded = associatedSummaryAuthority?.gasto_adjudicado ?? associatedAuthorities.reduce((sum, authority) => sum + (authority.gasto_adjudicado || 0), 0);
  const associatedIncome = associatedSummaryAuthority?.ingresos_adjudicados ?? associatedAuthorities.reduce((sum, authority) => sum + (authority.ingresos_adjudicados || 0), 0);

  const totalContracts = presentation ? directContracts + associatedContracts : contractingAuthorities.reduce((sum, authority) => sum + (authority.total_contratos || 0), 0);
  const totalAwarded = presentation ? directAwarded + associatedAwarded : contractingAuthorities.reduce((sum, authority) => sum + (authority.gasto_adjudicado || 0), 0);

  const badgeForAuthority = (name: string) =>
    presentation?.authorityBadges?.find((badge) => name.toLocaleUpperCase().includes(badge.match.toLocaleUpperCase()))?.label
    ?? presentation?.defaultAuthorityBadge
    ?? 'Organismo configurado';

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white">
      <header className="border-b border-[#e2e8f0] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Landmark className="h-5 w-5 text-[#0d9373]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
              {presentation?.title ?? 'Organismos contratantes'}
            </h1>
          </div>
          <p className="text-sm text-[#64748b]">
            {presentation?.description ?? 'Entidades configuradas para este portal y sus indicadores de contratación.'}
          </p>
        </div>
        <CsvExportButton
          filename={`organismos_${new Date().toISOString().slice(0, 10)}.csv`}
          headers={['Organismo', 'Ámbito', 'Licitaciones', 'Proveedores', 'Gasto adjudicado (€)', 'Ingresos (€)', 'Volumen total (€)', 'Último contrato']}
          rows={contractingAuthorities.map((authority) => [
            authority.name, authority.scope, authority.total_contratos, authority.total_adjudicatarios,
            authority.gasto_adjudicado, authority.ingresos_adjudicados, authority.volumen_total, authority.ultimo_contrato,
          ])}
        />
      </header>

      {presentation?.scopeNoteTitle && presentation.scopeNoteText && (
        <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs leading-relaxed text-slate-700">
            <p>
              <strong className="text-slate-900">{presentation.scopeNoteTitle}</strong>{' '}
              {presentation.scopeNoteText}
            </p>
            {presentation.coverageNoteTitle && presentation.coverageNoteText && (
              <p className="text-slate-600">
                <strong className="text-slate-800">{presentation.coverageNoteTitle}</strong>{' '}
                {presentation.coverageNoteText}{' '}
                {presentation.coverageNoteLinkHref && (
                  <Link href={presentation.coverageNoteLinkHref} className="font-semibold text-blue-700 underline hover:text-blue-900">
                    {presentation.coverageNoteLinkLabel ?? 'Ver detalle en metodología'}
                  </Link>
                )}
              </p>
            )}
          </div>
        </section>
      )}

      {presentation ? (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="mint-card p-4 border-l-4 border-l-[#0d9373] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
              {presentation.summaryDirectLabel ?? 'Ámbito principal'} ({directAuthorities.length} entidades)
            </span>
            <div className="text-xl font-extrabold font-mono text-slate-900">
              {formatNumber(directContracts)} licitaciones · {formatCompactCurrency(directAwarded)}
            </div>
            <p className="text-[11px] text-slate-500">
              {presentation.summaryDirectDescription ?? 'Gasto adjudicado del ámbito principal'}
              {directIncome > 0 ? ` (+${formatCompactCurrency(directIncome)} ingresos)` : ''}
            </p>
          </div>

          <div className="mint-card p-4 border-l-4 border-l-[#2563eb] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
              {presentation.summaryAssociatedLabel ?? 'Ámbito asociado'}
            </span>
            <div className="text-xl font-extrabold font-mono text-slate-900">
              {formatNumber(associatedContracts)} licitaciones · {formatCompactCurrency(associatedAwarded)}
            </div>
            <p className="text-[11px] text-slate-500">
              {presentation.summaryAssociatedDescription ?? 'Gasto adjudicado del ámbito asociado'}
              {associatedIncome > 0 ? ` (+${formatCompactCurrency(associatedIncome)} ingresos)` : ''}
            </p>
          </div>

          <div className="mint-card p-4 border-l-4 border-l-slate-700 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
              {presentation.summaryTotalLabel ?? 'Total consolidado'}
            </span>
            <div className="text-xl font-extrabold font-mono text-slate-900">
              {formatNumber(totalContracts)} expedientes · {formatCompactCurrency(totalAwarded)}
            </div>
            <p className="text-[11px] text-slate-500">
              {presentation.summaryTotalDescription ?? 'Total adjudicado de los ámbitos incluidos'}
            </p>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="mint-card p-4 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-500">Organismos configurados</span>
            <div className="text-xl font-bold">{formatNumber(contractingAuthorities.length)}</div>
          </div>
          <div className="mint-card p-4 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-500">Licitaciones registradas</span>
            <div className="text-xl font-bold">{formatNumber(totalContracts)}</div>
          </div>
          <div className="mint-card p-4 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-500">Importe adjudicado</span>
            <div className="text-xl font-bold">{formatCompactCurrency(totalAwarded)}</div>
          </div>
        </section>
      )}

      {contractingAuthorities.length === 0 ? (
        <div className="mint-card p-8 text-center text-sm text-slate-600">
          Todavía no hay organismos configurados. Añádelos a <code>data/contracting-authorities.json</code> y ejecuta <code>pnpm run init-db</code>.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contractingAuthorities.map((authority) => {
            const isDirect = authority.scope === 'Directa Municipal';
            const scopeLabel = isDirect
              ? presentation?.directScopeLabel ?? authority.scope ?? 'Ámbito principal'
              : presentation?.associatedScopeLabel ?? authority.scope ?? 'Ámbito asociado';

            return (
              <Link
                key={authority.id}
                href={`/organismos/${encodeURIComponent(authority.placsp_id || authority.id)}`}
                className="group mint-card p-6 hover:border-[#cbd5e1] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isDirect
                        ? 'bg-[#ecfdf5] text-[#0d9373] border-[#d1fae5]'
                        : 'bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]'
                    }`}>
                      {scopeLabel}
                    </span>
                    {presentation && (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        {badgeForAuthority(authority.name)}
                      </span>
                    )}
                  </div>

                  <h2 className="font-bold text-[#1e293b] text-base group-hover:text-[#0d9373] transition-colors line-clamp-2 leading-snug">
                    {authority.name}
                  </h2>

                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-lg bg-[#f8fafb] border border-[#e2e8f0]">
                      <span className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider block">Licitaciones</span>
                      <span className="font-extrabold font-mono text-slate-800 text-sm mt-0.5 block">{formatNumber(authority.total_contratos)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fafb] border border-[#e2e8f0]">
                      <span className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider block">Proveedores</span>
                      <span className="font-extrabold font-mono text-slate-800 text-sm mt-0.5 block">{formatNumber(authority.total_adjudicatarios)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Gasto Adjudicado</span>
                    <span className="font-bold font-mono text-[#0a0a0a] text-base sm:text-lg">
                      {formatCompactCurrency(authority.gasto_adjudicado ?? 0)}
                    </span>
                    {(authority.ingresos_adjudicados ?? 0) > 0 && (
                      <span className="block text-[10px] font-mono text-emerald-700 mt-1">
                        Ingresos: +{formatCompactCurrency(authority.ingresos_adjudicados ?? 0)}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0d9373] transition-colors" />
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
