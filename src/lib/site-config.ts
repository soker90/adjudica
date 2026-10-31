import siteConfig from '../../site.config.json';

type SiteConfig = Omit<typeof siteConfig, 'localityAliases' | 'localSupplierNifs' | 'heroQuickFilters' | 'metadataKeywords' | 'fraccionamientoStopWords' | 'flujoStopWords' | 'legacyResponseOmitContractFields' | 'scopePresentation' | 'methodology' | 'homePresentation'> & {
  localityAliases: string[];
  localSupplierNifs: string[];
  metadataKeywords: string[];
  heroQuickFilters: { label: string; query: string; icon: string }[];
  fraccionamientoStopWords: string[];
  flujoStopWords: string[];
  legacyResponseOmitContractFields: string[];
  methodology?: {
    version?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    sections?: Array<{ id?: string; title: string; paragraphs: string[] }>;
  };
  homePresentation?: Record<'primary' | 'associated' | 'all', {
    contractsSubtitle?: string;
    contractsBadge?: string;
    spendSubtitle?: string;
    organismsSubtitle?: string;
    organismsBadge?: string;
  }>;
  scopePresentation?: {
    selectorTitle?: string;
    primary?: { label?: string; shortLabel?: string; description?: string; tooltip?: string };
    associated?: { enabled?: boolean; label?: string; shortLabel?: string; description?: string; tooltip?: string };
    all?: { label?: string; shortLabel?: string; description?: string; tooltip?: string };
    methodologyLinkLabel?: string;
  };
};

export const SITE_CONFIG = siteConfig as SiteConfig;
