import siteConfig from '../../site.config.json';

type SiteConfig = Omit<typeof siteConfig, 'localityAliases' | 'localSupplierNifs' | 'heroQuickFilters' | 'metadataKeywords'> & {
  localityAliases: string[];
  localSupplierNifs: string[];
  metadataKeywords: string[];
  heroQuickFilters: { label: string; query: string; icon: string }[];
};

export const SITE_CONFIG = siteConfig as SiteConfig;
