import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieConsent } from "./cookie-consent";
import { BASE_PATH, INSTAGRAM_URL, POSTAL_CODE, SERVICE_CITIES, servicePages, SITE_URL } from "./seo-data";
import "./globals.css";

const configuredGtmId = (process.env.NEXT_PUBLIC_GTM_ID || "").trim().toUpperCase();
const GTM_ID = /^GTM-[A-Z0-9]+$/.test(configuredGtmId) ? configuredGtmId : "";
const GOOGLE_SITE_VERIFICATION = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "").trim();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manutenção de Bombas e Motores em São Paulo | Nuvem Bombas",
    template: "%s | Nuvem Bombas",
  },
  description: "Manutenção de bombas e motores em São Paulo e Grande SP. Solicite avaliação técnica pelo WhatsApp para bombas centrífugas, submersíveis e motores elétricos.",
  applicationName: "Nuvem Bombas",
  category: "Manutenção de máquinas e equipamentos",
  referrer: "origin-when-cross-origin",
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Manutenção de Bombas e Motores em São Paulo | Nuvem Bombas",
    description: "Solicite avaliação técnica pelo WhatsApp para bombas, motores e equipamentos em São Paulo e Grande São Paulo.",
    url: SITE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: "Nuvem Bombas",
    images: [{
      url: `${SITE_URL}/images/hero-pump.webp`,
      width: 1536,
      height: 960,
      alt: "Bomba centrífuga e motor elétrico em oficina técnica organizada",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvem Bombas | Bombas e Motores em São Paulo",
    description: "Manutenção técnica, rebobinagem e recuperação de equipamentos em São Paulo e Grande São Paulo.",
    images: [`${SITE_URL}/images/hero-pump.webp`],
  },
  icons: { icon: `${BASE_PATH}/favicon.svg` },
  manifest: `${BASE_PATH}/manifest.webmanifest`,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "@id": `${SITE_URL}/#business`,
  name: "Nuvem Bombas",
  alternateName: "Nuvem Bombas — Manutenção de Máquinas e Equipamentos",
  description: "Manutenção, recuperação e rebobinagem de bombas, motores elétricos e equipamentos em São Paulo e Grande São Paulo.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/nuvem-bombas-logo-web.webp`,
  image: [
    `${SITE_URL}/images/hero-pump.webp`,
    `${SITE_URL}/images/workshop.webp`,
    `${SITE_URL}/images/portfolio-bomba-desmontada.webp`,
  ],
  telephone: "+5511960880719",
  foundingDate: "1996",
  sameAs: [INSTAGRAM_URL],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Ascenso Fernandes, 458",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: POSTAL_CODE,
    addressCountry: "BR",
  },
  areaServed: SERVICE_CITIES.map((city) => ({ "@type": "City", name: city })),
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "17:30",
  }],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+5511960880719",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços técnicos",
    itemListElement: servicePages.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.shortTitle,
        url: `${SITE_URL}/servicos/${service.slug}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          id="consent-mode-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});window.gtag('set','ads_data_redaction',true);window.gtag('set','url_passthrough',true);try{var consentChoice=localStorage.getItem('nuvem_cookie_choice');if(consentChoice==='aceitos'){window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'})}}catch(error){}`,
          }}
        />
        {GTM_ID && (
          <script
            id="google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
