import Link from 'next/link';
import { getContractingAuthorities } from '@/lib/db';
import { formatCompactCurrency, formatNumber } from '@/lib/format';
import CsvExportButton from '@/components/CsvExportButton';
import { ArrowRight, Landmark } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function OrganismosPage() {
  const contractingAuthorities = getContractingAuthorities();
  const totalContracts = contractingAuthorities.reduce((sum: number, authority: any) => sum + (authority.total_contratos || 0), 0);
  const totalAwarded = contractingAuthorities.reduce((sum: number, authority: any) => sum + (authority.gasto_adjudicado || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white">
      <header className="border-b border-[#e2e8f0] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Landmark className="h-5 w-5 text-[#0d9373]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">Organismos contratantes</h1>
          </div>
          <p className="text-sm text-[#64748b]">Entidades configuradas para este portal y sus indicadores de contratación.</p>
        </div>
        <CsvExportButton
          filename={`organismos_${new Date().toISOString().slice(0, 10)}.csv`}
          headers={['Organismo', 'Ámbito', 'Licitaciones', 'Proveedores', 'Gasto adjudicado (€)', 'Ingresos (€)', 'Volumen total (€)', 'Último contrato']}
          rows={contractingAuthorities.map((authority: any) => [
            authority.name, authority.scope, authority.total_contratos, authority.total_adjudicatarios,
            authority.gasto_adjudicado, authority.ingresos_adjudicados, authority.volumen_total, authority.ultimo_contrato,
          ])}
        />
      </header>

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

      {contractingAuthorities.length === 0 ? (
        <div className="mint-card p-8 text-center text-sm text-slate-600">
          Todavía no hay organismos configurados. Añádelos a <code>data/contracting-authorities.json</code> y ejecuta <code>pnpm run init-db</code>.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contractingAuthorities.map((authority: any) => (
            <Link key={authority.id} href={`/organismos/${encodeURIComponent(authority.placsp_id || authority.id)}`} className="group mint-card p-6 hover:border-[#cbd5e1] transition-all">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">{authority.scope || 'Ámbito no indicado'}</span>
                  <h2 className="font-bold text-[#1e293b] mt-2 group-hover:text-[#0d9373]">{authority.name}</h2>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#0d9373]" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100 text-xs">
                <div><span className="text-slate-500 block">Licitaciones</span><strong>{formatNumber(authority.total_contratos)}</strong></div>
                <div><span className="text-slate-500 block">Proveedores</span><strong>{formatNumber(authority.total_adjudicatarios)}</strong></div>
                <div className="col-span-2"><span className="text-slate-500 block">Importe adjudicado</span><strong>{formatCompactCurrency(authority.gasto_adjudicado)}</strong></div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
