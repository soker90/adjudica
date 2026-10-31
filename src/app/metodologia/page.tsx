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
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">{methodology.eyebrow ?? DEFAULT_METHODOLOGY.eyebrow}</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{methodology.title ?? DEFAULT_METHODOLOGY.title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">{methodologyDescription}</p>
      </header>
      {methodology.sections.map((section) => (
        <section key={section.id ?? section.title} id={section.id} className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm leading-6 text-slate-700">{paragraph}</p>
          ))}
        </section>
      ))}
    </main>
  );
}
