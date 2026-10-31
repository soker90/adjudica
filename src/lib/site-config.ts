import siteConfig from '../../site.config.json';

type SiteConfig = Omit<typeof siteConfig, 'localityAliases' | 'localSupplierNifs'> & {
  localityAliases: string[];
  localSupplierNifs: string[];
};

export const SITE_CONFIG = siteConfig as SiteConfig;
