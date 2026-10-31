import siteConfig from '../../site.config.json';

type ScopePresentationItemConfig = {
  label?: string;
  shortLabel?: string;
  description?: string;
  tooltip?: string;
  noteTitle?: string;
  noteLinkLabel?: string;
  noteLinkHref?: string;
};

type SiteConfig = Omit<typeof siteConfig, 'localityAliases' | 'localSupplierNifs' | 'heroQuickFilters' | 'metadataKeywords' | 'fraccionamientoStopWords' | 'flujoStopWords' | 'legacyResponseOmitContractFields' | 'scopePresentation' | 'methodology' | 'homePresentation' | 'organismsPresentation' | 'footerDisclaimer' | 'footerCopyright' | 'homeLatestPublicationLabel' | 'headerBrandSuffix' | 'associatedAuthorityNameMatch' | 'homeAuditDescription' | 'analysisPresentation' | 'dataPresentation'> & {
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
    indexTitle?: string;
    indexLinks?: Array<{ id: string; title: string }>;
    sections?: Array<{ id?: string; title: string; paragraphs: string[]; showInIndex?: boolean; blocks?: Array<{ id?: string; type: 'heading' | 'paragraph' | 'listItem'; text: string }> }>
  };
  homeAuditDescription?: string;
  analysisPresentation?: { scopeLabels?: Partial<Record<'primary' | 'associated' | 'all', string>>; methodologyLinkLabel?: string };
  dataPresentation?: { scopeLabels?: Partial<Record<'primary' | 'associated' | 'all', string>> };
  homePresentation?: Record<'primary' | 'associated' | 'all', {
    contractsSubtitle?: string;
    contractsBadge?: string;
    spendSubtitle?: string;
    organismsSubtitle?: string;
    organismsBadge?: string;
  }>;
  scopePresentation?: {
    selectorTitle?: string;
    primary?: ScopePresentationItemConfig;
    associated?: ScopePresentationItemConfig & { enabled?: boolean };
    all?: ScopePresentationItemConfig;
    methodologyLinkLabel?: string;
  };
  organismsPresentation?: {
    title?: string;
    description?: string;
    scopeNoteTitle?: string;
    scopeNoteText?: string;
    coverageNoteTitle?: string;
    coverageNoteText?: string;
    coverageNoteLinkLabel?: string;
    coverageNoteLinkHref?: string;
    directScopeLabel?: string;
    associatedScopeLabel?: string;
    summaryDirectLabel?: string;
    summaryAssociatedLabel?: string;
    summaryTotalLabel?: string;
    summaryDirectDescription?: string;
    summaryAssociatedDescription?: string;
    summaryTotalDescription?: string;
    associatedSummaryAuthorityMatch?: string;
    defaultAuthorityBadge?: string;
    authorityBadges?: Array<{ match: string; label: string }>;
  };
  footerDisclaimer?: string;
  footerCopyright?: string;
  homeLatestPublicationLabel?: string;
  headerBrandSuffix?: string;
  associatedAuthorityNameMatch?: string;
};

export const SITE_CONFIG = siteConfig as SiteConfig;
