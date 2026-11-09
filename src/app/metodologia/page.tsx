import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

type MethodologyTone = 'amber' | 'emerald' | 'orange' | 'blue' | 'red' | 'purple' | 'slate';

type MethodologyTextBlock =
  | { id?: string; type: 'heading'; text: string; card?: { eyebrow?: string; badge?: string; tone?: MethodologyTone; layout?: 'compact' | 'featured' } }
  | { id?: string; type: 'paragraph' | 'listItem' | 'formula'; text: string }
  | { id?: string; type: 'subcard' | 'miniCard'; title: string; text: string; tone?: MethodologyTone; badge?: string; columns?: 2 | 3 | 4 | 5; span?: 'full' };

const DEFAULT_METHODOLOGY = {
  eyebrow: 'Transparencia metodológica',
  title: 'Metodología y fuentes',
  description: 'Criterios utilizados para procesar la contratación de {geographicLabel} y presentar los resultados.',
  sections: [
    {
      id: 'fuentes-oficiales',
      title: 'Fuentes oficiales',
      paragraphs: ['Los expedientes se obtienen de los conjuntos de datos abiertos de la Plataforma de Contratación del Sector Público (PLACSP). Los perfiles incluidos se definen en el catálogo de organismos de cada instancia. Cada expediente conserva su identificador y enlace de origen cuando estos están disponibles.'],
      showInIndex: true,
      blocks: [],
    },
    {
      id: 'cobertura-actualizacion',
      title: 'Cobertura y actualización',
      paragraphs: ['La cobertura depende de la información publicada por cada órgano y del periodo disponible en los conjuntos de datos descargados. La ausencia de un expediente en esta plataforma no demuestra que la contratación no se produjera. Las fechas de sincronización y publicación se muestran junto a los datos cuando están disponibles.'],
      showInIndex: true,
      blocks: [],
    },
    {
      id: 'calculos-indicadores',
      title: 'Cálculos e indicadores',
      paragraphs: ['Los importes, plazos, porcentajes de concurrencia y señales estadísticas se calculan a partir de los campos publicados. Los importes unitarios o de semántica desconocida no se tratan como importes totales comparables. Los indicadores sirven para orientar la consulta de expedientes y no determinan por sí solos irregularidades ni responsabilidades.'],
      showInIndex: true,
      blocks: [],
    },
    {
      id: 'organismos-independientes',
      title: 'Organismos independientes',
      paragraphs: ['Cada órgano de contratación se mantiene como una entidad independiente, identificada por su clave interna y su identificador PLACSP cuando exista. El campo de ámbito permite agrupar la presentación; no fusiona ni sustituye la identidad de los organismos.'],
      showInIndex: true,
      blocks: [],
    },
    {
      id: 'privacidad-rectificacion',
      title: 'Privacidad y rectificación',
      paragraphs: ['Los identificadores personales se seudonimizan antes de su almacenamiento mediante una clave secreta estable. La información de origen continúa siendo responsabilidad de la entidad que la publicó. Consulta los canales de privacidad y rectificación para comunicar incidencias sobre la presentación de datos.'],
      showInIndex: true,
      blocks: [],
    },
  ],
};

function renderInlineText(text: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|(?<!\*)\*[^*]+\*(?!\*)|`[^`]+`)/g);
  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return <code key={index} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em] text-slate-800">{token.slice(1, -1)}</code>;
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

const methodology = {
  ...DEFAULT_METHODOLOGY,
  ...SITE_CONFIG.methodology,
  sections: SITE_CONFIG.methodology?.sections ?? DEFAULT_METHODOLOGY.sections,
};

const methodologyIndex = SITE_CONFIG.methodology?.indexLinks ?? methodology.sections
  .filter((section) => section.showInIndex !== false)
  .map((section, index) => ({ id: section.id ?? `section-${index + 1}`, title: section.title }));

const methodologyDescription = (methodology.description ?? DEFAULT_METHODOLOGY.description).replace(
  '{geographicLabel}',
  SITE_CONFIG.geographicLabel,
);

export const metadata: Metadata = {
  title: `${methodology.title ?? DEFAULT_METHODOLOGY.title} | ${SITE_CONFIG.siteName}`,
  description: methodologyDescription,
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-white text-slate-800">
      <header className="space-y-4 border-b border-[#e2e8f0] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d1fae5] bg-[#ecfdf5] px-3 py-1 text-xs font-semibold text-[#0d9373]">
            <ShieldCheck className="h-3.5 w-3.5" />
            {methodology.eyebrow ?? DEFAULT_METHODOLOGY.eyebrow}
          </span>
          {methodology.version && (
            <span className="rounded border border-[#e2e8f0] bg-[#f8fafb] px-2.5 py-1 font-mono text-xs text-slate-600">
              {methodology.version}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1e293b] sm:text-4xl">
          {methodology.title ?? DEFAULT_METHODOLOGY.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{methodologyDescription}</p>
        {methodology.sections.length > 0 && (
          <nav aria-label="Índice de secciones" className="pt-3">
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              {methodology.indexTitle ?? 'Índice de secciones'}
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {methodologyIndex.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-lg border border-[#e2e8f0] bg-[#f8fafb] px-3 py-1.5 font-medium transition-colors hover:border-[#d1fae5] hover:bg-[#ecfdf5] hover:text-[#0d9373]"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
      {methodology.sections.map((section, index) => (
        <section key={section.id ?? section.title} id={section.id ?? `section-${index + 1}`} className="scroll-mt-20 space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-[#1e293b] sm:text-2xl">{section.title}</h2>
          {section.blocks?.length ? (
            <div className={section.id === 'banderas-rojas' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'mint-card p-6 space-y-4'}>
              {section.blocks.map((block, blockIndex) => {
                if (block.type === 'table') {
                  return (
                    <div key={blockIndex} className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="min-w-full border-collapse text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700">
                          <tr>
                            {block.headers.map((header, headerIndex) => (
                              <th key={headerIndex} scope="col" className="border-b border-r border-slate-200 p-2.5 font-semibold last:border-r-0">
                                {renderInlineText(header)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-600">
                          {block.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="align-top">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border-r border-slate-100 p-2.5 last:border-r-0">
                                  {renderInlineText(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (block.type === 'heading') {
                  const groupedBlocks: MethodologyTextBlock[] = [];
                  for (let itemIndex = blockIndex + 1; itemIndex < (section.blocks?.length ?? 0); itemIndex += 1) {
                    const item = section.blocks?.[itemIndex];
                    if (!item || item.type === 'heading' || item.type === 'table') break;
                    groupedBlocks.push(item);
                  }

                  const toneClasses = {
                    amber: { border: 'border-l-[#d97706]', eyebrow: 'text-[#b45309]', badge: 'border-[#fef3c7] bg-[#fffbeb] text-[#b45309]' },
                    emerald: { border: 'border-l-[#0d9373]', eyebrow: 'text-[#0d9373]', badge: 'border-[#d1fae5] bg-[#ecfdf5] text-[#0d9373]' },
                    orange: { border: 'border-l-[#ea580c]', eyebrow: 'text-[#ea580c]', badge: 'border-[#ffedd5] bg-[#fff7ed] text-[#c2410c]' },
                    blue: { border: 'border-l-[#2563eb]', eyebrow: 'text-[#2563eb]', badge: 'border-[#dbeafe] bg-[#eff6ff] text-[#2563eb]' },
                    red: { border: 'border-l-[#dc2626]', eyebrow: 'text-[#991b1b]', badge: 'border-[#fecaca] bg-[#fef2f2] text-[#991b1b]' },
                    purple: { border: 'border-l-purple-600', eyebrow: 'text-purple-700', badge: 'border-purple-200 bg-purple-50 text-purple-700' },
                    slate: { border: 'border-l-slate-400', eyebrow: 'text-slate-600', badge: 'border-slate-200 bg-slate-100 text-slate-700' },
                  };
                  const card = block.card ?? {};
                  const tone = toneClasses[card.tone ?? 'emerald'];
                  const featured = card.layout === 'featured';

                  return (
                    <div
                      key={blockIndex}
                      className={`rounded-xl border border-[#e2e8f0] border-l-4 ${tone.border} bg-white ${featured ? 'md:col-span-2 p-6 space-y-4' : 'p-5 space-y-2'}`}
                    >
                      {(card.eyebrow || card.badge) && (
                        <div className="flex items-center justify-between gap-3">
                          {card.eyebrow && <span className={`font-mono text-xs font-bold uppercase tracking-wider ${tone.eyebrow}`}>{card.eyebrow}</span>}
                          {card.badge && <span className={`rounded border px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}>{card.badge}</span>}
                        </div>
                      )}
                      <h3
                        id={block.id ?? (/Descuento Significativo o Baja Acusada/i.test(block.text) ? 'baja-temeraria' : /Concentración de Mercado: Índice Herfindahl-Hirschman/i.test(block.text) ? 'hhi' : undefined)}
                        className={`${featured ? 'text-base' : 'text-sm'} font-bold leading-6 text-slate-900`}
                      >
                        {renderInlineText(block.text)}
                      </h3>
                      {groupedBlocks.map((item, itemIndex) => {
                        if (item.type === 'listItem') {
                          if (itemIndex > 0 && groupedBlocks[itemIndex - 1]?.type === 'listItem') return null;
                          const listItems: MethodologyTextBlock[] = [];
                          for (let listIndex = itemIndex; listIndex < groupedBlocks.length; listIndex += 1) {
                            const listItem = groupedBlocks[listIndex];
                            if (!listItem || listItem.type !== 'listItem') break;
                            listItems.push(listItem);
                          }
                          return (
                            <ul key={itemIndex} className="list-disc space-y-1 pl-6 text-sm leading-6 text-slate-700">
                              {listItems.map((listItem, listIndex) => (
                                <li key={listIndex}>{renderInlineText(listItem.text)}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (item.type === 'formula') {
                          return <div key={itemIndex} className="rounded border border-[#e2e8f0] bg-[#f8fafb] p-2 font-mono text-[11px] leading-5 text-slate-700">{renderInlineText(item.text)}</div>;
                        }
                        if (item.type === 'subcard' || item.type === 'miniCard') {
                          const cardType = item.type;
                          if (itemIndex > 0 && groupedBlocks[itemIndex - 1]?.type === cardType) return null;
                          const cards: Array<Extract<MethodologyTextBlock, { type: 'subcard' | 'miniCard' }>> = [];
                          for (let cardIndex = itemIndex; cardIndex < groupedBlocks.length; cardIndex += 1) {
                            const candidate = groupedBlocks[cardIndex];
                            if (!candidate || candidate.type !== cardType) break;
                            cards.push(candidate);
                          }
                          const columns = item.columns ?? (cardType === 'miniCard' ? 3 : 2);
                          const gridClasses = {
                            2: 'grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs',
                            3: 'grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs',
                            4: 'grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs',
                            5: 'grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 text-xs',
                          };
                          const nestedToneClasses = {
                            amber: 'border-amber-200 bg-amber-50/70',
                            emerald: 'border-emerald-200 bg-emerald-50/70',
                            orange: 'border-orange-200 bg-orange-50/70',
                            blue: 'border-blue-200 bg-blue-50/70',
                            red: 'border-rose-200 bg-rose-50/70',
                            purple: 'border-purple-200 bg-purple-50/70',
                            slate: 'border-slate-200 bg-slate-50',
                          };
                          return (
                            <div key={itemIndex} className={gridClasses[columns]}>
                              {cards.map((card, cardIndex) => {
                                const toneClass = nestedToneClasses[card.tone ?? 'slate'];
                                const spanClass = card.span === 'full' ? (columns === 2 ? 'sm:col-span-2' : columns === 3 ? 'sm:col-span-3' : columns === 4 ? 'sm:col-span-4' : 'sm:col-span-5') : '';
                                return (
                                  <div key={cardIndex} className={`rounded-lg border p-3.5 space-y-1.5 ${toneClass} ${spanClass}`}>
                                    <div className="flex items-center justify-between gap-2">
                                      <strong className="block text-xs font-bold text-slate-800">{card.title}</strong>
                                      {card.badge && <span className="shrink-0 rounded border border-white/70 bg-white/70 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-600">{card.badge}</span>}
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-slate-600">{renderInlineText(card.text)}</p>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                        return <p key={itemIndex} className="text-sm leading-6 text-slate-700">{renderInlineText(item.text)}</p>;
                      })}
                    </div>
                  );
                }
                for (let previousIndex = blockIndex - 1; previousIndex >= 0; previousIndex -= 1) {
                  const previousBlock = section.blocks?.[previousIndex];
                  if (!previousBlock || previousBlock.type === 'table') break;
                  if (previousBlock.type === 'heading') return null;
                }
                if (block.type === 'listItem') {
                  if (blockIndex > 0 && section.blocks?.[blockIndex - 1]?.type === 'listItem') {
                    return null;
                  }

                  const listItems = [];
                  for (let itemIndex = blockIndex; itemIndex < (section.blocks?.length ?? 0); itemIndex += 1) {
                    const item = section.blocks?.[itemIndex];
                    if (!item || item.type !== 'listItem') break;
                    listItems.push(item);
                  }

                  return (
                    <ul key={blockIndex} className="list-disc space-y-1 pl-8 text-sm leading-6 text-slate-700">
                      {listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{renderInlineText(item.text)}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'formula') {
                  return <div key={blockIndex} className="rounded border border-[#e2e8f0] bg-[#f8fafb] p-2 font-mono text-[11px] leading-5 text-slate-700">{renderInlineText(block.text)}</div>;
                }
                if (block.type === 'subcard' || block.type === 'miniCard') {
                  const nestedToneClasses = {
                    amber: 'border-amber-200 bg-amber-50/70',
                    emerald: 'border-emerald-200 bg-emerald-50/70',
                    orange: 'border-orange-200 bg-orange-50/70',
                    blue: 'border-blue-200 bg-blue-50/70',
                    red: 'border-rose-200 bg-rose-50/70',
                    purple: 'border-purple-200 bg-purple-50/70',
                    slate: 'border-slate-200 bg-slate-50',
                  };
                  return (
                    <div key={blockIndex} className={`rounded-lg border p-3.5 space-y-1.5 ${nestedToneClasses[block.tone ?? 'slate']}`}>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="block text-xs font-bold text-slate-800">{block.title}</strong>
                        {block.badge && <span className="shrink-0 rounded border border-white/70 bg-white/70 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-600">{block.badge}</span>}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-600">{renderInlineText(block.text)}</p>
                    </div>
                  );
                }
                return <p key={blockIndex} className={`${section.id === 'banderas-rojas' ? 'md:col-span-2' : ''} text-sm leading-6 text-slate-700`}>{renderInlineText(block.text)}</p>;
              })}
            </div>
          ) : (
            <div className="mint-card p-6 space-y-4">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-sm leading-6 text-slate-700">{paragraph}</p>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
