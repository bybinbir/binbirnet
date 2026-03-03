// Paket tipleri
export type PackageType = "WIRELESS" | "WIRED";

export interface Package {
  id: string;
  name: string;
  type: PackageType;
  downMbps: number;
  upMbps: number;
  priceTry: number;
  oldPriceTry?: number;
  badge?: "POPULAR" | null;
}

// Altyapı sorgu sonucu tipleri
export interface InfraResult {
  bbk: string;
  maxSpeed: number;
  technology: string;
  available: boolean;
}

// Navigasyon tipleri
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

// Form tipleri
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ApplyFormData {
  name: string;
  email: string;
  phone: string;
  tcno: string;
  address: string;
  package: string;
  notes?: string;
}

// Hero Slider
export interface Slide {
  id: string;
  image: string;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonIcon: string;
  order: number;
}

// Kampanyalar
export interface Campaign {
  id: string;
  title: string;
  description: string;
  active: boolean;
  order: number;
}

// Site Ayarlari
export interface SiteSettings {
  company: {
    name: string;
    fullName: string;
    description: string;
    mersis: string;
    copyrightYear: string;
  };
  contact: {
    phones: { label: string; number: string; href: string; primary?: boolean }[];
    emails: { label: string; address: string }[];
    whatsapp: { number: string; message: string };
  };
  address: {
    title: string;
    lines: string[];
    mapsUrl: string;
  };
  social: { label: string; href: string; aria: string }[];
  externalLinks: {
    payment: string;
    accountCenter: string;
  };
}

// SEO Ayarlari
export interface SeoConfig {
  global: {
    titleTemplate: string;
    defaultTitle: string;
    description: string;
    keywords: string;
    ogImage: string;
    ogUrl: string;
    ogSiteName: string;
    twitterCard: string;
    robots: string;
  };
  pages: Record<string, { title?: string; description?: string; keywords?: string }>;
}

// Izleme Kodlari
export interface TrackingScript {
  id: string;
  name: string;
  type: 'ga4' | 'gtm' | 'facebook_pixel' | 'custom';
  trackingId?: string;
  headCode?: string;
  bodyCode?: string;
  enabled: boolean;
}

// Navigasyon
export interface NavigationConfig {
  header: NavigationItem[];
  footerQuickLinks: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external: boolean;
  order: number;
}

// Anasayfa Icerik
export interface HomepageContent {
  features: HomepageFeature[];
  steps: HomepageStep[];
  packagesSection: { title: string; subtitle: string };
  stepsSection: { title: string };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    buttonSubtext: string;
    features: { icon: string; text: string }[];
  };
}

export interface HomepageFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  order: number;
}

export interface HomepageStep {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  rotateDirection: string;
  order: number;
}
