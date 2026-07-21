import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BASE_PATH, INSTAGRAM_URL, servicePages, SITE_URL } from "./seo-data";
import "./globals.css";

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
  other: { "codex-preview": "development" },
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
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "São Paulo" },
    { "@type": "AdministrativeArea", name: "Grande São Paulo" },
    { "@type": "City", name: "Itaquaquecetuba" },
    { "@type": "City", name: "Poá" },
    { "@type": "City", name: "Santana de Parnaíba" },
  ],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
