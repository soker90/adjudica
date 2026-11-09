'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Building2, Droplet, HardHat, FileCheck2, FileText,
  ArrowRight, RefreshCw,
} from 'lucide-react';
import { formatDate } from '@/lib/format';
import { SITE_CONFIG } from '@/lib/site-config';

interface HomeHeroProps {
  ultimaActualizacion?: string | null;
  ultimaSincronizacion?: string | null;
  ultimaLicitacion?: string | null;
}

const QUICK_FILTER_ICONS = {
  building: Building2,
  droplet: Droplet,
  'file-check': FileCheck2,
  'hard-hat': HardHat,
  file: FileText,
} as const;

export default function HomeHero({
  ultimaActualizacion,
  ultimaSincronizacion,
  ultimaLicitacion,
}: HomeHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(query.trim() ? `/licitaciones?q=${encodeURIComponent(query.trim())}` : '/licitaciones');
  };

  const geographicLabel = SITE_CONFIG.localityName || SITE_CONFIG.geographicLabel;
  const title = SITE_CONFIG.heroTitle || SITE_CONFIG.siteName;
  const geographicIndex = title.indexOf(geographicLabel);
  const hasGeographicTitle = geographicIndex >= 0;
  const quickFilters = SITE_CONFIG.heroQuickFilters ?? [];

  return (
    <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white pt-14 pb-16 sm:pt-20 sm:pb-22">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[450px] w-[900px] -translate-x-1/2 opacity-80"
        style={{ background: 'radial-gradient(circle at 50% 10%, rgba(0, 212, 164, 0.09) 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-20 h-[400px] w-[400px] opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(13, 147, 115, 0.05) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d1fae5] bg-[#ecfdf5] px-3.5 py-1.5 text-xs text-[#0d9373] shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a4]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">{SITE_CONFIG.heroEyebrow}</span>
        </div>

        {(ultimaSincronizacion || ultimaActualizacion) && (
          <div className="mb-6">
            <span className="inline-flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] font-medium text-slate-500">
              <RefreshCw className="h-3 w-3 shrink-0 text-slate-400" />
              <span>Sincronizado con PLACSP el {formatDate(ultimaSincronizacion || ultimaActualizacion)}</span>
              <span className="hidden text-slate-300 sm:inline">·</span>
              <span>{SITE_CONFIG.homeLatestPublicationLabel ?? 'Última licitación oficial'}: {formatDate(ultimaLicitacion || ultimaActualizacion)}</span>
            </span>
          </div>
        )}

        <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight text-[#1e293b] sm:text-5xl lg:text-6xl">
          {hasGeographicTitle ? (
            <>
              {title.slice(0, geographicIndex)}
              <span className="relative inline-block text-[#0d9373]">{geographicLabel}</span>
              {title.slice(geographicIndex + geographicLabel.length)}
            </>
          ) : title}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm font-normal leading-relaxed text-[#64748b] sm:text-base lg:text-lg">
          {SITE_CONFIG.heroDescription || SITE_CONFIG.siteDescription}
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-2xl sm:mt-10">
          <div className="flex items-center rounded-xl border border-[#e2e8f0] bg-white p-1.5 shadow-sm transition-all hover:border-[#cbd5e1] focus-within:border-[#00d4a4] focus-within:ring-4 focus-within:ring-[#00d4a4]/10">
            <Search className="ml-3.5 h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar por objeto de contrato, expediente, adjudicatario o CIF..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent px-3.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button type="submit" className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0a0a0a] px-5 py-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1e293b] active:scale-95 sm:text-sm">
              <span>Explorar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

        {quickFilters.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="mr-1 hidden text-[11px] font-medium text-slate-400 sm:inline">Acceso directo:</span>
            {quickFilters.map((item) => {
              const Icon = QUICK_FILTER_ICONS[item.icon as keyof typeof QUICK_FILTER_ICONS] ?? Building2;
              return (
                <button
                  key={item.label}
                  onClick={() => router.push(`/licitaciones?q=${encodeURIComponent(item.query)}`)}
                  className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafb] px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-all hover:border-[#d1fae5] hover:bg-[#ecfdf5] hover:text-[#0d9373]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#0d9373]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
