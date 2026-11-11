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

type SiteConfig = Omit<typeof siteConfig, 'localityAliases' | 'localSupplierNifs' | 'heroQuickFilters' | 'metadataKeywords' | 'fraccionamientoStopWords' | 'flujoStopWords' | 'legacyResponseOmitContractFields' | 'scopePresentation' | 'methodology' | 'homePresentation' | 'organismsPresentation' | 'footerDisclaimer' | 'footerCopyright' | 'homeLatestPublicationLabel' | 'headerBrandSuffix' | 'associatedAuthorityNameMatch' | 'homeAuditDescription' | 'analysisPresentation' | 'dataPresentation' | 'homeAnnualEvolutionDescription' | 'homeTopCompaniesDescription' | 'authorityHistory' | 'authorityScopeNotices'> & {
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
    sections?: Array<{
      id?: string;
      title: string;
      paragraphs: string[];
      showInIndex?: boolean;
      blocks?: Array<
        | { id?: string; type: 'heading'; text: string; card?: { eyebrow?: string; badge?: string; tone?: 'amber' | 'emerald' | 'orange' | 'blue' | 'red' | 'purple' | 'slate'; layout?: 'compact' | 'featured' } }
        | { id?: string; type: 'paragraph' | 'listItem' | 'formula'; text: string }
        | { id?: string; type: 'subcard' | 'miniCard'; title: string; text: string; tone?: 'amber' | 'emerald' | 'orange' | 'blue' | 'red' | 'purple' | 'slate'; badge?: string; columns?: 2 | 3 | 4 | 5; span?: 'full' }
        | { id?: string; type: 'table'; headers: string[]; rows: string[][] }
      >
    }>
  };
  homeAuditDescription?: string;
  homeAnnualEvolutionDescription?: string;
  homeTopCompaniesDescription?: string;
  homeTopCompaniesTitle?: string;
  homeAuthoritiesDescription?: string;
  homeRecentContractsDescription?: string;
  analysisPresentation?: { scopeLabels?: Partial<Record<'primary' | 'associated' | 'all', string>>; methodologyLinkLabel?: string; methodologyLinkHref?: string };
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
    associatedIncomeLabel?: string;
    profileLinkLabel?: string;
    summaryTotalDescription?: string;
    associatedSummaryAuthorityMatch?: string;
    defaultAuthorityBadge?: string;
    authorityBadges?: Array<{ match: string; label: string }>;
    csvFilenamePrefix?: string;
    providersLabel?: string;
  };
  authorityHistory?: Array<{ match: string; badge?: string; title?: string; description?: string; detail?: string }>;
  authorityScopeNotices?: Array<{ match: string; title: string; badge?: string; text: string; linkLabel?: string; linkHref?: string }>;
  footerDisclaimer?: string;
  footerCopyright?: string;
  homeLatestPublicationLabel?: string;
  headerBrandSuffix?: string;
  associatedAuthorityNameMatch?: string;
  brandPrefix?: string;
  brandAccent?: string;
};

export const SITE_CONFIG = siteConfig as SiteConfig;
