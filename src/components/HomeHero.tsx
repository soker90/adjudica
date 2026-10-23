'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Building2, RefreshCw } from 'lucide-react';
import { formatDate } from '@/lib/format';
import { SITE_CONFIG } from '@/lib/site-config';

interface HomeHeroProps {
  ultimaActualizacion?: string | null;
  ultimaSincronizacion?: string | null;
  ultimaLicitacion?: string | null;
}

export default function HomeHero({ ultimaActualizacion, ultimaSincronizacion, ultimaLicitacion }: HomeHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(query.trim() ? `/licitaciones?q=${encodeURIComponent(query.trim())}` : '/licitaciones');
  };

  return (
    <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white pt-14 pb-16 sm:pt-20 sm:pb-22">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d1fae5] bg-[#ecfdf5] px-3.5 py-1.5 text-xs text-[#0d9373] mb-3">
          <Building2 className="h-3.5 w-3.5" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">Contratación pública y datos abiertos</span>
        </div>
        {(ultimaSincronizacion || ultimaActualizacion) && (
          <div className="mb-6 text-[11px] font-medium text-slate-500 font-mono">
            <RefreshCw className="inline h-3 w-3 mr-1" />
            Sincronizado con PLACSP el {formatDate(ultimaSincronizacion || ultimaActualizacion)}
            {ultimaLicitacion && <> · Último expediente publicado: {formatDate(ultimaLicitacion)}</>}
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1e293b] max-w-4xl mx-auto leading-[1.15]">
          Contratación pública en <span className="text-[#0d9373]">{SITE_CONFIG.geographicLabel}</span>
        </h1>
        <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#64748b] max-w-2xl mx-auto leading-relaxed">{SITE_CONFIG.siteDescription}</p>
        <form onSubmit={handleSearch} className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          <div className="flex items-center bg-white border border-[#e2e8f0] focus-within:border-[#00d4a4] focus-within:ring-4 focus-within:ring-[#00d4a4]/10 rounded-xl p-1.5 shadow-sm">
            <Search className="h-5 w-5 text-slate-400 ml-3.5 shrink-0" />
            <input type="search" placeholder="Buscar licitaciones, expedientes o empresas..." value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none" />
            <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#0a0a0a] px-5 py-3 text-xs sm:text-sm font-semibold text-white shrink-0"><FileText className="h-4 w-4" />Explorar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
