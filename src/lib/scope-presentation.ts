import { SITE_CONFIG } from './site-config';

export interface ScopePresentationItem {
  label: string;
  shortLabel: string;
  description: string;
  tooltip: string;
  noteTitle?: string;
  noteLinkLabel?: string;
  noteLinkHref?: string;
}

const DEFAULT_SCOPE_PRESENTATION = {
  selectorTitle: 'Filtrar por organismo:',
  primary: {
    label: 'Organismos principales',
    shortLabel: 'Principal',
    description: 'Contratación de los organismos principales incluidos en la configuración.',
    tooltip: 'Contratación gestionada por los organismos principales configurados.',
  },
  associated: {
    enabled: true,
    label: 'Organismos asociados',
    shortLabel: 'Asociados',
    description: 'Contratación de los organismos asociados incluidos en la configuración.',
    tooltip: 'Contratación de los organismos asociados incluidos en la configuración.',
  },
  all: {
    label: 'Todos los organismos',
    shortLabel: 'Total',
    description: 'Contratación de todos los organismos incluidos en la configuración.',
    tooltip: 'Suma de la contratación de todos los organismos incluidos en la configuración.',
  },
  methodologyLinkLabel: 'Consultar metodología',
};

export interface ScopePresentationConfig {
  selectorTitle?: string;
  primary?: Partial<ScopePresentationItem>;
  associated?: Partial<ScopePresentationItem> & { enabled?: boolean };
  all?: Partial<ScopePresentationItem>;
  methodologyLinkLabel?: string;
}

export function createScopePresentation(
  configured: ScopePresentationConfig = {},
): typeof DEFAULT_SCOPE_PRESENTATION {
  return {
    selectorTitle: configured.selectorTitle ?? DEFAULT_SCOPE_PRESENTATION.selectorTitle,
    primary: { ...DEFAULT_SCOPE_PRESENTATION.primary, ...(configured.primary ?? {}) },
    associated: { ...DEFAULT_SCOPE_PRESENTATION.associated, ...(configured.associated ?? {}) },
    all: { ...DEFAULT_SCOPE_PRESENTATION.all, ...(configured.all ?? {}) },
    methodologyLinkLabel: configured.methodologyLinkLabel ?? DEFAULT_SCOPE_PRESENTATION.methodologyLinkLabel,
  };
}

export const SCOPE_PRESENTATION = createScopePresentation(SITE_CONFIG.scopePresentation);

export function getScopePresentationKey(scope?: string | null): 'primary' | 'associated' | 'all' {
  const normalized = (scope ?? '').trim().toLowerCase();
  if (!normalized || normalized === 'todos' || normalized === 'all' || normalized === 'total' || normalized === 'consolidado') return 'all';
  if (normalized.includes('indirecta') || normalized.includes('mancomunidad') || normalized === 'associated') return 'associated';
  return 'primary';
}

export function getScopeLabel(scope?: string | null, short = false): string {
  const item = SCOPE_PRESENTATION[getScopePresentationKey(scope)];
  return short ? item.shortLabel : item.label;
}

export function getScopeDescription(scope?: string | null): string {
  return SCOPE_PRESENTATION[getScopePresentationKey(scope)].description;
}

export function getScopeTooltip(scope?: string | null): string {
  return SCOPE_PRESENTATION[getScopePresentationKey(scope)].tooltip;
}
