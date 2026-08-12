import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, PHONE_DISPLAY, POSTAL_CODE, SERVICE_CITIES, servicePages, SITE_URL, withBasePath } from "../../seo-data";
import { ServiceView, TrackedWhatsAppLink } from "../../tracked-links";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/servicos/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}${path}`,
      type: "website",
      locale: "pt_BR",
      images: [{ url: `${SITE_URL}${service.image}`, width: service.imageWidth, height: service.imageHeight, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${SITE_URL}${service.image}`],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/servicos/${service.slug}`;
  const message = `Olá! Vim pela página ${service.title} no site da Nuvem Bombas e gostaria de solicitar uma avaliação. Meu equipamento e o problema são:`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      name: service.title,
      description: service.metaDescription,
      url: pageUrl,
      image: `${SITE_URL}${service.image}`,
      areaServed: SERVICE_CITIES.map((city) => ({ "@type": "City", name: city })),
      provider: { "@id": `${SITE_URL}/#business` },
      serviceType: service.shortTitle,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE_URL}/#servicos` },
        { "@type": "ListItem", position: 3, name: service.shortTitle, item: pageUrl },
      ],
    },
  ];

  return (
    <main className="service-page">
      <ServiceView slug={service.slug} title={service.shortTitle} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="service-page-header">
        <div className="service-page-shell service-page-nav">
          <Link href="/" aria-label="Nuvem Bombas — página inicial"><img src={withBasePath("/images/nuvem-bombas-logo-web.webp")} width="1704" height="275" alt="Nuvem Bombas" /></Link>
          <nav aria-label="Navegação da página de serviço">
            <Link href="/#servicos">Todos os serviços</Link>
            <Link href="/#sobre">Sobre</Link>
            <Link href="/#atendimento">Atendimento</Link>
          </nav>
          <TrackedWhatsAppLink className="button button-sm" message={message} position="service_header" service={service.slug} target="_blank" rel="noopener noreferrer">Pedir avaliação</TrackedWhatsAppLink>
        </div>
      </header>

      <section className="service-detail-hero">
        <div className="service-page-shell service-detail-grid">
          <div className="service-detail-copy">
            <nav className="breadcrumbs" aria-label="Caminho de navegação"><Link href="/">Início</Link><span>/</span><Link href="/#servicos">Serviços</Link><span>/</span><strong>{service.shortTitle}</strong></nav>
            <span className="section-kicker">Atendimento em São Paulo e Grande SP</span>
            <h1>{service.title}</h1>
            <p>{service.lead}</p>
            <div className="service-detail-actions">
              <TrackedWhatsAppLink className="button" message={message} position="service_hero" service={service.slug} target="_blank" rel="noopener noreferrer">Solicitar avaliação pelo WhatsApp</TrackedWhatsAppLink>
              <Link className="button button-secondary" href="/#servicos">Ver outros serviços</Link>
            </div>
            <ul className="service-quick-facts" aria-label="Informações de atendimento">
              <li>Experiência técnica desde 1996</li>
              <li>Avaliação antes do reparo</li>
              <li>Atendimento em oficina e sob consulta no local</li>
            </ul>
          </div>
          <figure className="service-detail-media">
            <img src={withBasePath(service.image)} width={service.imageWidth} height={service.imageHeight} alt={service.imageAlt} fetchPriority="high" />
          </figure>
        </div>
      </section>

      <section className="service-page-shell service-content-section service-two-columns" aria-labelledby="symptoms-title">
        <div>
          <span className="section-kicker">Diagnóstico inicial</span>
          <h2 id="symptoms-title">{service.symptomsTitle}</h2>
          <p>Esses sinais ajudam a identificar a necessidade de avaliação, mas o diagnóstico final depende da inspeção do equipamento e das condições da instalação.</p>
        </div>
        <ul className="service-check-list">{service.symptoms.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
      </section>

      <section className="service-applications-section">
        <div className="service-page-shell service-content-section">
          <div className="service-section-heading"><span className="section-kicker">Aplicações atendidas</span><h2>Onde este serviço pode ser necessário</h2></div>
          <div className="service-application-grid">{service.applications.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></article>)}</div>
        </div>
      </section>

      <section className="service-page-shell service-content-section" aria-labelledby="service-process-title">
        <div className="service-section-heading"><span className="section-kicker">Processo técnico</span><h2 id="service-process-title">Como a avaliação e o serviço funcionam</h2><p>O reparo só é iniciado depois da inspeção, apresentação do orçamento e aprovação do cliente.</p></div>
        <ol className="service-detail-steps">{service.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      </section>

      <section className="service-local-section">
        <div className="service-page-shell service-local-grid">
          <div><span className="section-kicker section-kicker-light">Atendimento local</span><h2>Oficina em São Miguel Paulista com atendimento em São Paulo e Grande SP</h2><p>{service.closing}</p></div>
          <aside><small>Contato direto</small><strong>WhatsApp {PHONE_DISPLAY}</strong><p>Rua Ascenso Fernandes, 458<br />Jardim Helena, São Paulo — SP<br />CEP {POSTAL_CODE}</p><TrackedWhatsAppLink className="button" message={message} position="service_local" service={service.slug} target="_blank" rel="noopener noreferrer">Falar sobre este serviço</TrackedWhatsAppLink></aside>
        </div>
      </section>

      <footer className="service-page-footer">
        <div className="service-page-shell"><Link href="/"><img src={withBasePath("/images/nuvem-bombas-logo-web.webp")} width="1704" height="275" alt="Nuvem Bombas" /></Link><p>Manutenção de bombas, motores e equipamentos desde 1996.</p><Link href="/#contato">Contato e localização</Link></div>
      </footer>
    </main>
  );
}
