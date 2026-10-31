import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

const DEFAULT_METHODOLOGY = {
  eyebrow: 'Transparencia metodológica',
  title: 'Metodología y fuentes',
  description: 'Criterios utilizados para procesar la contratación de {geographicLabel} y presentar los resultados.',
  sections: [
    {
      id: 'fuentes-oficiales',
      title: 'Fuentes oficiales',
      paragraphs: ['Los expedientes se obtienen de los conjuntos de datos abiertos de la Plataforma de Contratación del Sector Público (PLACSP). Los perfiles incluidos se definen en el catálogo de organismos de cada instancia. Cada expediente conserva su identificador y enlace de origen cuando estos están disponibles.'],
    },
    {
      id: 'cobertura-actualizacion',
      title: 'Cobertura y actualización',
      paragraphs: ['La cobertura depende de la información publicada por cada órgano y del periodo disponible en los conjuntos de datos descargados. La ausencia de un expediente en esta plataforma no demuestra que la contratación no se produjera. Las fechas de sincronización y publicación se muestran junto a los datos cuando están disponibles.'],
    },
    {
      id: 'calculos-indicadores',
      title: 'Cálculos e indicadores',
      paragraphs: ['Los importes, plazos, porcentajes de concurrencia y señales estadísticas se calculan a partir de los campos publicados. Los importes unitarios o de semántica desconocida no se tratan como importes totales comparables. Los indicadores sirven para orientar la consulta de expedientes y no determinan por sí solos irregularidades ni responsabilidades.'],
    },
    {
      id: 'organismos-independientes',
      title: 'Organismos independientes',
      paragraphs: ['Cada órgano de contratación se mantiene como una entidad independiente, identificada por su clave interna y su identificador PLACSP cuando exista. El campo de ámbito permite agrupar la presentación; no fusiona ni sustituye la identidad de los organismos.'],
    },
    {
      id: 'privacidad-rectificacion',
      title: 'Privacidad y rectificación',
      paragraphs: ['Los identificadores personales se seudonimizan antes de su almacenamiento mediante una clave secreta estable. La información de origen continúa siendo responsabilidad de la entidad que la publicó. Consulta los canales de privacidad y rectificación para comunicar incidencias sobre la presentación de datos.'],
    },
  ],
};

const methodology = {
  ...DEFAULT_METHODOLOGY,
  ...SITE_CONFIG.methodology,
  sections: SITE_CONFIG.methodology?.sections ?? DEFAULT_METHODOLOGY.sections,
};

const methodologyDescription = (methodology.description ?? DEFAULT_METHODOLOGY.description).replace(
  '{geographicLabel}',
  SITE_CONFIG.geographicLabel,
);

export const metadata: Metadata = {
  title: methodology.title ?? DEFAULT_METHODOLOGY.title,
  description: methodologyDescription,
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">{methodology.eyebrow ?? DEFAULT_METHODOLOGY.eyebrow}</p>
          {methodology.version && <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-600">{methodology.version}</span>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{methodology.title ?? DEFAULT_METHODOLOGY.title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">{methodologyDescription}</p>
      </header>
      {methodology.sections.length > 0 && (
        <nav aria-label="Índice de secciones" className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            {methodology.indexTitle ?? 'Índice de secciones'}
          </span>
          <div className="flex flex-wrap gap-2">
            {methodology.sections.map((section, index) => (
              <a
                key={section.id ?? section.title}
                href={`#${section.id ?? `section-${index + 1}`}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>
      )}
      {methodology.sections.map((section, index) => (
        <section key={section.id ?? section.title} id={section.id ?? `section-${index + 1}`} className="space-y-3 scroll-mt-20">
          <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
          {section.blocks?.length ? (
            <div className="space-y-3">
              {section.blocks.map((block, blockIndex) => {
                if (block.type === 'heading') {
                  return <h3 key={blockIndex} className="pt-2 text-base font-semibold text-slate-800">{block.text}</h3>;
                }
                if (block.type === 'listItem') {
                  return <div key={blockIndex} className="flex gap-2 pl-3 text-sm leading-6 text-slate-700"><span aria-hidden="true">•</span><p>{block.text}</p></div>;
                }
                return <p key={blockIndex} className="text-sm leading-6 text-slate-700">{block.text}</p>;
              })}
            </div>
          ) : section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="text-sm leading-6 text-slate-700">{paragraph}</p>
          ))}
        </section>
      ))}
    </main>
  );
}
