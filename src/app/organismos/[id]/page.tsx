import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/site-config';
import { getContractingAuthorityDetail } from '@/lib/db';
import { formatCompactCurrency, formatNumber } from '@/lib/format';
import { getOpaqueEmpresaId } from '@/lib/corporate';
import { AnnualEvolutionChart, HorizontalBarList } from '@/components/Charts';
import { ArrowLeft, Briefcase, CalendarClock, ChevronRight, FileText, Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ContractingAuthorityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authority = getContractingAuthorityDetail(decodeURIComponent(id));
  if (!authority) notFound();

  const authorityName = authority.name.toLocaleUpperCase();
  const history = SITE_CONFIG.authorityHistory?.find((item) =>
    authorityName.includes(item.match.toLocaleUpperCase()),
  );
  const scopeNotice = SITE_CONFIG.authorityScopeNotices?.find((item) =>
    authorityName.includes(item.match.toLocaleUpperCase()),
  );
  const isAssociated = authority.scope === 'Indirecta (Mancomunidad)'
    || Boolean(SITE_CONFIG.associatedAuthorityNameMatch
      && authorityName.includes(SITE_CONFIG.associatedAuthorityNameMatch.toLocaleUpperCase()));

  const scopeNoticeText = scopeNotice?.text.replace(
    '{volume}',
    formatCompactCurrency(authority.volumen_total),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-7 bg-white">
      <Link href="/organismos" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0d9373] transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a todos los organismos
      </Link>

      <section className="mint-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs uppercase font-bold tracking-wider px-3 py-0.5 rounded-full border ${
              isAssociated
                ? 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb]'
                : 'bg-[#ecfdf5] border-[#d1fae5] text-[#0d9373]'
            }`}>
              {isAssociated ? 'Entidad supramunicipal (mancomunidad)' : authority.scope || 'Ámbito no indicado'}
            </span>
            {history?.badge && (
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {history.badge}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b] tracking-tight leading-snug">{authority.name}</h1>
          <p className="text-xs sm:text-sm text-[#64748b]">
            Actividad contractual registrada entre {authority.primer_ano || 2018} y {authority.ultimo_ano || new Date().getFullYear()}
          </p>
          {authority.placsp_id && (
            <a
              className="mt-2 inline-block text-xs text-[#0d9373] hover:underline"
              href={`https://contrataciondelestado.es/sindicacion/licitacionesPerfilContratante/${encodeURIComponent(authority.placsp_id)}`}
              target="_blank"
              rel="noreferrer"
            >
              Perfil en PLACSP
            </a>
          )}
        </div>
        <Link
          href={`/licitaciones?organo=${encodeURIComponent(authority.id)}`}
          className="self-start sm:self-auto px-5 py-2.5 rounded-lg bg-[#0a0a0a] hover:bg-[#1e293b] font-semibold text-xs sm:text-sm text-white shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <FileText className="h-4 w-4" />
          <span>Ver {formatNumber(authority.total_contratos)} licitaciones</span>
        </Link>
      </section>

      {history && (
        <section className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0 mt-0.5">
            <CalendarClock className="h-5 w-5 text-[#0d9373]" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            {history.title && <p className="font-bold text-[#1e293b]">{history.title}</p>}
            <p className="leading-relaxed text-slate-600 text-xs">{history.description}</p>
            <Link href="/metodologia#cobertura-temporal" className="inline-flex items-center gap-1 font-semibold text-[#0d9373] hover:underline text-xs">
              <span>Consultar marco temporal y metodología de cobertura</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
      )}

      {scopeNotice && (
        <section className="p-4 sm:p-5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-white border border-[#bfdbfe] text-[#2563eb] shrink-0 mt-0.5">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700">
            <div className="font-bold text-[#1e293b] flex flex-wrap items-center gap-2">
              <span>{scopeNotice.title}</span>
              {scopeNotice.badge && <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">{scopeNotice.badge}</span>}
            </div>
            <p className="leading-relaxed text-slate-600 text-xs">{scopeNoticeText}</p>
            {scopeNotice.linkHref && (
              <Link href={scopeNotice.linkHref} className="inline-flex items-center gap-1 font-semibold text-[#2563eb] hover:underline text-xs">
                <span>{scopeNotice.linkLabel ?? 'Consultar metodología'}</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mint-card p-4">
          <span className="text-xs text-slate-500">Licitaciones</span>
          <strong className="mt-1 block text-xl">{formatNumber(authority.total_contratos)}</strong>
        </div>
        <div className="mint-card p-4">
          <span className="text-xs text-slate-500">Proveedores</span>
          <strong className="mt-1 block text-xl">{formatNumber(authority.total_adjudicatarios)}</strong>
        </div>
        <div className="mint-card p-4 border border-[#d1fae5] bg-[#ecfdf5]">
          <span className="text-xs text-[#0d9373]">Gasto adjudicado</span>
          <strong className="mt-1 block text-xl">{formatCompactCurrency(authority.gasto_adjudicado)}</strong>
          <span className="mt-1 block text-[11px] text-[#0d9373]">
            {authority.ingresos_adjudicados > 0
              ? `+${formatCompactCurrency(authority.ingresos_adjudicados)} en ingresos/cánones`
              : 'Gasto público adjudicado'}
          </span>
        </div>
        <div className="mint-card p-4">
          <span className="text-xs text-slate-500">Importe total</span>
          <strong className="mt-1 block text-xl">{formatCompactCurrency(authority.volumen_total)}</strong>
        </div>
      </section>

      {authority.evolucion?.length > 0 && (
        <section className="space-y-2">
          <div className="mint-card p-6 space-y-5">
            <h2 className="font-bold text-slate-900">Evolución anual</h2>
            <AnnualEvolutionChart data={authority.evolucion} />
          </div>
          {history?.detail && (
            <div className="px-4 py-3 rounded-xl bg-[#f8fafb] border border-[#e2e8f0] text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-[#0d9373] shrink-0 mt-0.5" />
              <p><strong className="font-semibold text-slate-800">Nota sobre la serie histórica: </strong>{history.detail}</p>
            </div>
          )}
        </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HorizontalBarList
          title="Tipos de contrato del organismo"
          filterType="tipo"
          items={authority.porTipo.map((item: any) => ({ label: item.tipo, count: item.contratos, volumen: item.volumen }))}
          total={authority.volumen_total}
        />
        <div className="mint-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <h2 className="font-bold text-[#1e293b] text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-[#0d9373]" />
              <span>Principales proveedores adjudicatarios</span>
            </h2>
          </div>
          {authority.topAdjudicatarios?.length ? (
            <div className="divide-y divide-[#e2e8f0]">
              {authority.topAdjudicatarios.map((supplier: any, index: number) => {
              const supplierId = getOpaqueEmpresaId(supplier.nif, supplier.adjudicatario);
              return (
                <div key={`${supplier.nif}-${index}`} className="py-3 flex items-center justify-between text-xs gap-3">
                  <div className="min-w-0 pr-2">
                    <Link href={`/empresas/${encodeURIComponent(supplierId)}`} className="font-bold text-slate-800 hover:text-[#0d9373] transition-colors block truncate">
                      {supplier.adjudicatario}
                    </Link>
                    <span className="text-[11px] font-mono text-slate-400">{formatNumber(supplier.contratos)} adjudicaciones</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold font-mono text-slate-900 block">{formatCompactCurrency(supplier.volumen)}</span>
                    <Link href={`/empresas/${encodeURIComponent(supplierId)}`} className="text-[10px] text-[#0d9373] hover:underline inline-flex items-center gap-0.5">
                      Ver <ChevronRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                </div>
              );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Todavía no hay adjudicaciones registradas.</p>
          )}
        </div>
      </section>
    </main>
  );
}
