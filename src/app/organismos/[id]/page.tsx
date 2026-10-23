import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContractingAuthorityDetail } from '@/lib/db';
import { formatCompactCurrency, formatNumber } from '@/lib/format';
import { getOpaqueEmpresaId } from '@/lib/corporate';
import { AnnualEvolutionChart } from '@/components/Charts';
import { ArrowLeft, Building2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ContractingAuthorityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authority = getContractingAuthorityDetail(decodeURIComponent(id));
  if (!authority) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-7 bg-white">
      <Link href="/organismos" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0d9373]">
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a organismos
      </Link>
      <section className="mint-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="rounded-xl bg-[#ecfdf5] p-3 text-[#0d9373]"><Building2 className="h-6 w-6" /></span>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500">{authority.scope || 'Ámbito no indicado'}</span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">{authority.name}</h1>
            {authority.placsp_id && <a className="mt-2 inline-block text-xs text-[#0d9373] hover:underline" href={`https://contrataciondelestado.es/sindicacion/licitacionesPerfilContratante/${encodeURIComponent(authority.placsp_id)}`} target="_blank" rel="noreferrer">Perfil en PLACSP</a>}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mint-card p-4"><span className="text-xs text-slate-500">Licitaciones</span><strong className="mt-1 block text-xl">{formatNumber(authority.total_contratos)}</strong></div>
        <div className="mint-card p-4"><span className="text-xs text-slate-500">Proveedores</span><strong className="mt-1 block text-xl">{formatNumber(authority.total_adjudicatarios)}</strong></div>
        <div className="mint-card p-4"><span className="text-xs text-slate-500">Gasto adjudicado</span><strong className="mt-1 block text-xl">{formatCompactCurrency(authority.gasto_adjudicado)}</strong></div>
        <div className="mint-card p-4"><span className="text-xs text-slate-500">Importe total</span><strong className="mt-1 block text-xl">{formatCompactCurrency(authority.volumen_total)}</strong></div>
      </section>
      {authority.evolucion?.length > 0 && <section className="mint-card p-6"><h2 className="font-bold text-slate-900 mb-5">Evolución anual</h2><AnnualEvolutionChart data={authority.evolucion} /></section>}
      <section className="mint-card p-6">
        <h2 className="font-bold text-slate-900 mb-4">Principales adjudicatarios</h2>
        {authority.topAdjudicatarios?.length ? authority.topAdjudicatarios.map((supplier: any, index: number) => (
          <div key={`${supplier.nif}-${index}`} className="flex items-center justify-between gap-4 border-t border-slate-100 py-3">
            <div className="min-w-0"><Link href={`/empresas/${encodeURIComponent(getOpaqueEmpresaId(supplier.nif, supplier.adjudicatario))}`} className="font-semibold text-sm hover:text-[#0d9373] truncate">{supplier.adjudicatario}</Link><span className="block text-xs text-slate-500">{formatNumber(supplier.contratos)} contratos</span></div>
            <strong className="text-sm shrink-0">{formatCompactCurrency(supplier.volumen)}</strong>
          </div>
        )) : <p className="text-sm text-slate-500">Todavía no hay adjudicaciones registradas.</p>}
      </section>
    </main>
  );
}
