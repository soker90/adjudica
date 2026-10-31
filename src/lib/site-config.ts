import siteConfig from '../../site.config.json';

type SiteConfig = Omit<typeof siteConfig, 'localityAliases' | 'localSupplierNifs' | 'heroQuickFilters' | 'metadataKeywords' | 'fraccionamientoStopWords' | 'flujoStopWords' | 'legacyResponseOmitContractFields' | 'scopePresentation'> & {
  localityAliases: string[];
  localSupplierNifs: string[];
  metadataKeywords: string[];
  heroQuickFilters: { label: string; query: string; icon: string }[];
  fraccionamientoStopWords: string[];
  flujoStopWords: string[];
  legacyResponseOmitContractFields: string[];
  scopePresentation?: {
    selectorTitle?: string;
    primary?: { label?: string; shortLabel?: string; description?: string; tooltip?: string };
    associated?: { label?: string; shortLabel?: string; description?: string; tooltip?: string };
    all?: { label?: string; shortLabel?: string; description?: string; tooltip?: string };
    methodologyLinkLabel?: string;
  };
};

export const SITE_CONFIG = siteConfig as SiteConfig;
