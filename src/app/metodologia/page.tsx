import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Metodología y fuentes',
  description: 'Fuentes, criterios de tratamiento y límites de los indicadores publicados.',
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Transparencia metodológica</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Metodología y fuentes</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">Criterios utilizados para procesar la contratación de {SITE_CONFIG.geographicLabel} y presentar los resultados.</p>
      </header>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Fuentes oficiales</h2>
        <p className="text-sm leading-6 text-slate-700">Los expedientes se obtienen de los conjuntos de datos abiertos de la Plataforma de Contratación del Sector Público (PLACSP). Los perfiles incluidos se definen en el catálogo de organismos de cada instancia. Cada expediente conserva su identificador y enlace de origen cuando estos están disponibles.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Cobertura y actualización</h2>
        <p className="text-sm leading-6 text-slate-700">La cobertura depende de la información publicada por cada órgano y del periodo disponible en los conjuntos de datos descargados. La ausencia de un expediente en esta plataforma no demuestra que la contratación no se produjera. Las fechas de sincronización y publicación se muestran junto a los datos cuando están disponibles.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Cálculos e indicadores</h2>
        <p className="text-sm leading-6 text-slate-700">Los importes, plazos, porcentajes de concurrencia y señales estadísticas se calculan a partir de los campos publicados. Los importes unitarios o de semántica desconocida no se tratan como importes totales comparables. Los indicadores sirven para orientar la consulta de expedientes y no determinan por sí solos irregularidades ni responsabilidades.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Organismos independientes</h2>
        <p className="text-sm leading-6 text-slate-700">Cada órgano de contratación se mantiene como una entidad independiente, identificada por su clave interna y su identificador PLACSP cuando exista. El campo de ámbito permite agrupar la presentación; no fusiona ni sustituye la identidad de los organismos.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Privacidad y rectificación</h2>
        <p className="text-sm leading-6 text-slate-700">Los identificadores personales se seudonimizan antes de su almacenamiento mediante una clave secreta estable. La información de origen continúa siendo responsabilidad de la entidad que la publicó. Consulta los canales de privacidad y rectificación para comunicar incidencias sobre la presentación de datos.</p>
      </section>
    </main>
  );
}
