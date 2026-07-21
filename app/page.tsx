"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "./seo-data";

const WHATSAPP_NUMBER = "5511960880719";
const WHATSAPP_DISPLAY = "(11) 96088-0719";
const INSTAGRAM_URL = "https://www.instagram.com/nuvempiscinas/";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Rua+Ascenso+Fernandes+458+S%C3%A3o+Miguel+Paulista+S%C3%A3o+Paulo+SP";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const whatsappMessages = {
  quote: "Olá! Vim pelo site da Nuvem Bombas e gostaria de solicitar uma avaliação técnica. Meu equipamento é:",
  urgent: "Olá! Vim pelo site da Nuvem Bombas. Meu equipamento parou e preciso de orientação técnica. O problema apresentado é:",
  schedule: "Olá! Vim pelo site da Nuvem Bombas e gostaria de agendar uma avaliação. Minha cidade/bairro e melhor período são:",
  question: "Olá! Vim pelo site da Nuvem Bombas e tenho uma dúvida sobre manutenção de bombas, motores ou equipamentos:",
};

type CampaignAttribution = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  landingPage: string;
};

const emptyAttribution: CampaignAttribution = {
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
  gclid: "",
  landingPage: "",
};

const leadIntents = [
  {
    icon: "tool" as const,
    title: "Meu equipamento parou",
    text: "Não liga, desarma, trava ou perdeu desempenho.",
    message: whatsappMessages.urgent,
    event: "equipamento_parado",
  },
  {
    icon: "pump" as const,
    title: "Minha bomba apresenta falha",
    text: "Vazamento, ruído, perda de pressão ou pouca vazão.",
    message: "Olá! Vim pelo site da Nuvem Bombas. Minha bomba apresenta uma falha e gostaria de solicitar uma avaliação técnica. O problema é:",
    event: "falha_bomba",
  },
  {
    icon: "motor" as const,
    title: "Preciso avaliar um motor",
    text: "Aquecimento, cheiro, perda de força ou rebobinagem.",
    message: "Olá! Vim pelo site da Nuvem Bombas e gostaria de avaliar um motor elétrico. Potência, aplicação e problema apresentado:",
    event: "avaliacao_motor",
  },
];

type IconName = "droplet" | "motor" | "tool" | "shop" | "pool" | "pump" | "arrow" | "check" | "menu" | "close" | "chat" | "calendar";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    droplet: <path d="M12 2.8S5.5 10 5.5 15a6.5 6.5 0 0 0 13 0C18.5 10 12 2.8 12 2.8Z" />,
    motor: <><path d="M5 9h12v9H5z" /><path d="M2 12h3m12 0h3v4h-3M8 9V6h6v3M8 18v2m6-2v2" /></>,
    tool: <><path d="m14.7 6.3 3-3a5 5 0 0 1-6.4 6.4l-7 7a2.1 2.1 0 0 0 3 3l7-7a5 5 0 0 1 6.4-6.4l-3 3-3-3Z" /></>,
    shop: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6" /><path d="M8 20v-6h8v6M3 10c0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0" /></>,
    pool: <><path d="M3 17c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 21c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M7 14V5a3 3 0 0 1 6 0M7 9h7" /></>,
    pump: <><circle cx="10" cy="12" r="6" /><path d="M10 6v12m-6-6h12m0-3h5v6h-5M7 18v3m6-3v3" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
    calendar: <><path d="M4 6h16v14H4zM8 3v6M16 3v6M4 10h16" /><path d="M8 14h2M14 14h2M8 17h2" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const services = [
  { icon: "droplet" as const, slug: "manutencao-bombas-submersiveis", title: "Manutenção de bombas submersíveis", text: "Diagnóstico e recuperação para poços, drenagem, obras, condomínios e indústrias.", code: "01" },
  { icon: "pump" as const, slug: "manutencao-bombas-centrifugas", title: "Manutenção de bombas centrífugas", text: "Correção de vazamentos, ruídos, travamentos, pressão e vazão.", code: "02" },
  { icon: "motor" as const, slug: "rebobinagem-motores-eletricos", title: "Rebobinagem de motores elétricos", text: "Recuperação de motores de diferentes portes, inclusive equipamentos de até 500 CV.", code: "03" },
  { icon: "tool" as const, slug: "manutencao-ferramentas-eletricas", title: "Manutenção de ferramentas elétricas", text: "Reparo de furadeiras, lixadeiras, marteletes e ferramentas profissionais.", code: "04" },
  { icon: "shop" as const, slug: "venda-bombas-equipamentos", title: "Venda de bombas e equipamentos", text: "Orientação para escolher a bomba ou o equipamento correto.", code: "05" },
  { icon: "pool" as const, slug: "manutencao-bombas-piscina", title: "Soluções para piscinas", text: "Manutenção de bombas, filtros e sistemas de circulação para piscinas.", code: "06" },
];

const differentiators = [
  ["Especialização técnica", "Experiência em bombas nacionais e importadas, motores elétricos e sistemas de bombeamento."],
  ["Motores de diferentes portes", "Estrutura e conhecimento para trabalhar com motores pequenos e equipamentos de até 500 CV."],
  ["Inspeção qualificada", "Os equipamentos passam por avaliação técnica antes da definição do serviço necessário."],
  ["Experiência desde 1996", "Uma trajetória construída com conhecimento técnico, confiança e compromisso com o resultado."],
  ["Garantia", "90 dias para manutenção e 1 ano para produtos vendidos, conforme as condições aplicáveis."],
  ["Atendimento completo", "Atendimento no cliente, retirada, entrega, suporte remoto e reparo realizado na oficina."],
];

const steps = [
  ["Contato inicial", "Informe o tipo de equipamento, o problema apresentado e sua localização."],
  ["Recebimento ou retirada", "Leve o equipamento à oficina ou consulte a retirada no endereço."],
  ["Inspeção técnica", "A equipe avalia peças, reparos e procedimentos necessários."],
  ["Aprovação do orçamento", "O serviço começa após a apresentação e aprovação do orçamento."],
  ["Manutenção e testes", "O equipamento é recuperado, testado e preparado para entrega."],
];

const audiences = ["Indústrias", "Engenheiros e técnicos", "Obras e construtoras", "Condomínios", "Empresas de manutenção", "Residências", "Piscinas e circulação de água"];
const modalities = ["Atendimento no endereço", "Retirada do equipamento", "Entrega após a conclusão", "Recebimento na oficina", "Manutenção em oficina", "Orientação e suporte remoto", "Emergencial sob consulta"];

const portfolioItems = [
  { image: "/images/portfolio-rebobinagem.webp", width: 1003, height: 1568, category: "Motores elétricos", title: "Rebobinagem com precisão técnica", description: "Recuperação de bobinas e componentes para restabelecer desempenho e confiabilidade." },
  { image: "/images/portfolio-bomba-desmontada.webp", width: 1448, height: 1086, category: "Bombas centrífugas", title: "Desmontagem e diagnóstico", description: "Inspeção detalhada de carcaça, rotor, eixo, rolamentos e vedações." },
  { image: "/images/portfolio-painel-eletrico.webp", width: 1448, height: 1086, category: "Sistemas elétricos", title: "Inspeção de painéis", description: "Medições e análise dos comandos que controlam o sistema de bombeamento." },
  { image: "/images/portfolio-submersivel.webp", width: 1448, height: 1086, category: "Bombas submersíveis", title: "Recuperação de equipamentos", description: "Revisão técnica para aplicações em drenagem, poços, obras e condomínios." },
  { image: "/images/portfolio-piscina.webp", width: 1448, height: 1086, category: "Piscinas", title: "Circulação e filtragem", description: "Manutenção de bombas e avaliação do conjunto hidráulico para circulação eficiente." },
  { image: "/images/portfolio-testes.webp", width: 1003, height: 1568, category: "Controle de qualidade", title: "Testes finais antes da entrega", description: "Verificação de funcionamento, desempenho e segurança após a manutenção." },
];

const faqs = [
  ["Quais equipamentos a Nuvem Bombas atende?", "A empresa trabalha com bombas submersíveis, bombas centrífugas, motores elétricos, ferramentas elétricas e equipamentos relacionados a sistemas de bombeamento e piscinas."],
  ["Vocês fazem rebobinagem de motores?", "Sim. A Nuvem Bombas realiza rebobinagem de motores elétricos pequenos e grandes, incluindo equipamentos de até 500 CV, após avaliação técnica."],
  ["É possível retirar o equipamento no local?", "Sim, dependendo da região e das características do equipamento. A disponibilidade e eventual custo de retirada são informados durante o atendimento."],
  ["Posso levar o equipamento diretamente à oficina?", "Sim. O recebimento deve ser combinado previamente para garantir o atendimento adequado."],
  ["Os serviços possuem garantia?", "Os serviços de manutenção possuem garantia de 90 dias, conforme as condições do reparo. Os produtos vendidos possuem garantia de 1 ano, conforme as regras aplicáveis."],
  ["Quanto tempo demora a manutenção?", "O prazo depende do tipo de equipamento, do problema encontrado e da disponibilidade de peças. A previsão é apresentada após a inspeção."],
  ["Vocês trabalham com bombas importadas?", "Sim. A empresa possui experiência com bombas nacionais e importadas, sempre sujeitas à avaliação técnica e à disponibilidade de componentes."],
  ["Vocês atendem condomínios e empresas?", "Sim. A Nuvem Bombas atende condomínios, empresas, indústrias, obras, engenheiros e clientes particulares."],
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#inicio" aria-label="Nuvem Bombas — início">
      <img src={withBasePath("/images/nuvem-bombas-logo-web.webp")} width="1704" height="275" alt="Nuvem Bombas — Manutenção de Máquinas e Equipamentos" />
    </a>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-marker" aria-hidden="true">
      <span>{number}</span>
      <strong>{label}</strong>
      <i />
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [attribution, setAttribution] = useState<CampaignAttribution>(emptyAttribution);

  useEffect(() => {
    const clean = (value: string | null) => (value || "").trim().slice(0, 120);
    const params = new URLSearchParams(window.location.search);
    let stored: Partial<CampaignAttribution> = {};
    try {
      stored = JSON.parse(sessionStorage.getItem("nuvem_campaign_attribution") || "{}");
    } catch {
      stored = {};
    }

    const current: CampaignAttribution = {
      source: clean(params.get("utm_source")) || clean(stored.source || "") || (params.get("gclid") ? "google" : ""),
      medium: clean(params.get("utm_medium")) || clean(stored.medium || "") || (params.get("gclid") ? "cpc" : ""),
      campaign: clean(params.get("utm_campaign")) || clean(stored.campaign || ""),
      term: clean(params.get("utm_term")) || clean(stored.term || ""),
      content: clean(params.get("utm_content")) || clean(stored.content || ""),
      gclid: clean(params.get("gclid")) || clean(stored.gclid || ""),
      landingPage: `${window.location.pathname}${window.location.search}`.slice(0, 300),
    };

    try {
      sessionStorage.setItem("nuvem_campaign_attribution", JSON.stringify(current));
    } catch {
      // A navegação continua normalmente quando o armazenamento está indisponível.
    }

    const attributionTimer = window.setTimeout(() => setAttribution(current), 0);
    const win = window as typeof window & { dataLayer?: Record<string, string | boolean>[] };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: "landing_page_view",
      page_type: "paid_traffic_landing",
      traffic_source: current.source || "direct",
      traffic_medium: current.medium || "none",
      campaign_name: current.campaign || "not_set",
      campaign_term: current.term || "not_set",
      campaign_content: current.content || "not_set",
      landing_page: current.landingPage,
      has_gclid: Boolean(current.gclid),
      consent_choice: localStorage.getItem("nuvem_cookie_choice") || "pending",
    });

    const cookieTimer = window.setTimeout(() => setCookiesVisible(!localStorage.getItem("nuvem_cookie_choice")), 0);
    return () => {
      window.clearTimeout(attributionTimer);
      window.clearTimeout(cookieTimer);
    };
  }, []);

  function track(event: string, detail?: string) {
    const win = window as typeof window & { dataLayer?: Record<string, string | boolean>[] };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event,
      ...(detail ? { event_label: detail } : {}),
      page_type: "paid_traffic_landing",
      traffic_source: attribution.source || "direct",
      traffic_medium: attribution.medium || "none",
      campaign_name: attribution.campaign || "not_set",
      campaign_term: attribution.term || "not_set",
      campaign_content: attribution.content || "not_set",
      landing_page: attribution.landingPage || window.location.pathname,
      has_gclid: Boolean(attribution.gclid),
    });
  }

  const campaignNote = [
    attribution.source ? `Origem: ${attribution.source}` : "",
    attribution.campaign ? `Campanha: ${attribution.campaign}` : "",
  ].filter(Boolean).join(" | ");

  const leadUrl = (message: string) => whatsappUrl(`${message}${campaignNote ? `\n\n${campaignNote}` : ""}`);

  const closeMenu = () => setMenuOpen(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) return;
    const fields = [
      ["Nome", data.get("nome")],
      ["Cidade e bairro", data.get("localizacao")],
      ["Equipamento", data.get("equipamento")],
      ["Urgência", data.get("urgencia")],
      ["Problema", data.get("problema")],
    ];
    const message = [
      "Olá! Preenchi o formulário no site da Nuvem Bombas e gostaria de solicitar uma avaliação técnica.",
      "",
      ...fields.map(([label, value]) => `${label}: ${value || "Não informado"}`),
      "",
      "Posso enviar fotos ou vídeos do equipamento por aqui.",
      ...(campaignNote ? ["", campaignNote] : []),
    ].join("\n");
    track("generate_lead", "formulario_whatsapp");
    setFormSent(true);
    const target = whatsappUrl(message);
    const opened = window.open(target, "_blank");
    if (opened) opened.opener = null;
    else window.location.href = target;
  }

  function saveCookieChoice(choice: string) {
    localStorage.setItem("nuvem_cookie_choice", choice);
    const win = window as typeof window & { dataLayer?: Record<string, string | boolean>[] };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: "consent_update",
      analytics_storage: choice === "aceitos" ? "granted" : "denied",
      ad_storage: choice === "aceitos" ? "granted" : "denied",
    });
    setCookiesVisible(false);
  }

  return (
    <main id="inicio">
      <header className="site-header">
        <div className="nav-shell">
          <Brand />
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
            <a href="#servicos" onClick={closeMenu}>Serviços</a>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#portfolio" onClick={closeMenu}>Portfólio</a>
            <a href="#atendimento" onClick={closeMenu}>Atendimento</a>
            <a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
          </nav>
          <a className="button button-sm nav-cta" href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "cabecalho")}>Falar no WhatsApp <Icon name="arrow" size={17} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-panel">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Manutenção de bombas e motores em São Paulo</div>
            <h1 id="hero-title">Bomba ou motor <em>com falha?</em></h1>
            <p className="hero-lead"><strong>Solicite uma avaliação técnica pelo WhatsApp.</strong> Descreva os sintomas, envie fotos e receba a orientação inicial para avaliação, retirada ou entrega na oficina.</p>
            <div className="hero-actions">
              <a className="button" href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "hero_avaliacao")}>Solicitar avaliação no WhatsApp <Icon name="arrow" size={18} /></a>
              <a className="button button-secondary" href={leadUrl(whatsappMessages.urgent)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "hero_equipamento_parado")}>Meu equipamento parou</a>
            </div>
            <p className="hero-note"><Icon name="check" size={17} /> Você revisa a mensagem antes de enviar • atendimento de segunda a sábado</p>
          </div>
          <div className="hero-media" role="img" aria-label="Bomba centrífuga e motor elétrico em uma oficina técnica organizada">
            <img src={withBasePath("/images/hero-pump.webp")} width="1536" height="960" fetchPriority="high" alt="Bomba centrífuga acoplada a motor elétrico em uma oficina técnica clara e organizada" />
            <div className="media-badge"><span className="badge-icon"><Icon name="motor" size={22} /></span><span><small>Capacidade técnica</small><strong>Motores de até 500 CV</strong></span></div>
          </div>
          <div className="trust-grid">
            <div><strong>Desde 1996</strong><span>experiência técnica</span></div>
            <div><strong>Até 500 CV</strong><span>motores de grande porte</span></div>
            <div><strong>SP + GSP</strong><span>região de atendimento</span></div>
            <div><strong>90 dias</strong><span>garantia na manutenção*</span></div>
          </div>
        </div>
      </section>

      <section className="section-shell intent-section story-section story-panel" aria-labelledby="intent-title">
        <SectionMarker number="01" label="Identifique o problema" />
        <div className="intent-heading">
          <span className="section-kicker">Atendimento direcionado</span>
          <h2 id="intent-title">Qual situação descreve melhor o seu problema?</h2>
          <p>Escolha uma opção para abrir o WhatsApp com a mensagem certa e agilizar o primeiro atendimento.</p>
        </div>
        <div className="intent-grid">
          {leadIntents.map((intent) => (
            <a key={intent.event} href={leadUrl(intent.message)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", `intent_${intent.event}`)}>
              <span className="intent-icon"><Icon name={intent.icon} size={23} /></span>
              <span><strong>{intent.title}</strong><small>{intent.text}</small></span>
              <Icon name="arrow" size={19} />
            </a>
          ))}
        </div>
        <div className="confidence-bar" aria-label="Compromisso técnico">
          <span className="confidence-mark"><Icon name="droplet" size={19} /></span>
          <p>O reparo só começa após inspeção, apresentação do orçamento e aprovação do cliente.</p>
          <a href="#como-funciona">Entenda o processo <Icon name="arrow" size={17} /></a>
        </div>
      </section>

      <section className="section-shell section-block story-section" id="servicos" aria-labelledby="services-title">
        <SectionMarker number="02" label="Escolha a solução" />
        <div className="section-heading split-heading">
          <div><span className="section-kicker">Áreas de atuação</span><h2 id="services-title">Serviços especializados para diferentes necessidades</h2></div>
          <p>Da avaliação inicial aos testes finais, cada equipamento recebe uma análise técnica para identificar a melhor solução.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.code}>
              <div className="service-top"><span className="service-icon"><Icon name={service.icon} /></span><span className="service-code">{service.code}</span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-card-actions">
                <a className="service-detail-link" href={withBasePath(`/servicos/${service.slug}`)}>Ver detalhes e aplicações <Icon name="arrow" size={17} /></a>
                <a className="service-whatsapp-link" href={leadUrl(`Olá! Vim pelo site da Nuvem Bombas e gostaria de solicitar uma avaliação para: ${service.title}. Meu equipamento e o problema são:`)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", `servico_${service.slug}`)}>Pedir avaliação pelo WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell emergency-panel story-section" aria-labelledby="emergency-title">
        <img src={withBasePath("/images/water-system.webp")} width="1600" height="900" loading="lazy" alt="Sistema moderno e organizado de circulação de água para piscina" />
        <div className="emergency-overlay" />
        <div className="emergency-copy">
          <SectionMarker number="03" label="Resposta rápida" />
          <span className="section-kicker section-kicker-light">Resposta técnica</span>
          <h2 id="emergency-title">Seu equipamento parou? Obtenha orientação antes que a falha comprometa a operação.</h2>
          <p>Informe os sintomas e envie fotos pelo WhatsApp. A equipe orientará o próximo passo para avaliação, retirada ou recebimento na oficina.</p>
          <a className="button button-white" href={leadUrl(whatsappMessages.urgent)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "urgencia")}>Solicitar orientação pelo WhatsApp <Icon name="arrow" size={18} /></a>
        </div>
      </section>

      <section className="section-shell section-block story-section" id="diferenciais" aria-labelledby="different-title">
        <SectionMarker number="04" label="Confiança técnica" />
        <div className="section-heading centered-heading">
          <span className="section-kicker">Precisão e confiança</span>
          <h2 id="different-title">Por que escolher a Nuvem Bombas?</h2>
          <p>Conhecimento técnico, comunicação clara e cuidado em todas as etapas do atendimento.</p>
        </div>
        <div className="differentials-grid">
          {differentiators.map(([title, text], index) => (
            <article className="differential-card" key={title}>
              <span className="differential-number">0{index + 1}</span>
              <span className="mini-check"><Icon name="check" size={17} /></span>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section" id="como-funciona" aria-labelledby="process-title">
        <div className="section-shell section-block story-section">
          <SectionMarker number="05" label="Processo transparente" />
          <div className="section-heading split-heading">
            <div><span className="section-kicker">Como funciona</span><h2 id="process-title">Do diagnóstico à entrega</h2></div>
            <p>Um fluxo simples e transparente para você saber o que acontece com o equipamento em cada etapa.</p>
          </div>
          <ol className="process-grid">
            {steps.map(([title, text], index) => (
              <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell section-block about-grid story-section" id="sobre" aria-labelledby="about-title">
        <SectionMarker number="06" label="Experiência comprovada" />
        <div className="about-media">
          <img src={withBasePath("/images/workshop.webp")} width="1448" height="1086" loading="lazy" alt="Técnico inspecionando um motor elétrico em oficina organizada" />
          <div className="about-caption"><strong>Desde 1996</strong><span>manutenção técnica e recuperação de equipamentos</span></div>
        </div>
        <div className="about-copy">
          <span className="section-kicker">Sobre a empresa</span>
          <h2 id="about-title">Experiência técnica desde 1996</h2>
          <p>A Nuvem Bombas atua na manutenção, recuperação e rebobinagem de bombas, motores e equipamentos. A empresa atende desde demandas residenciais e de condomínios até necessidades de obras, engenheiros e indústrias.</p>
          <p>Com conhecimento em eletrotécnica, automação, sistemas hidrodinâmicos e aplicações para piscinas, busca oferecer diagnósticos claros e soluções adequadas para cada equipamento.</p>
          <p>Mais do que realizar um reparo, o objetivo é recuperar o funcionamento, aumentar a vida útil do equipamento e proporcionar segurança ao cliente.</p>
          <a className="text-link" href={leadUrl(whatsappMessages.question)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "sobre")}>Converse sobre seu equipamento <Icon name="arrow" size={18} /></a>
        </div>
      </section>

      <section className="caio-profile-section section-block" aria-labelledby="caio-profile-title">
        <div className="section-shell caio-profile-grid story-section">
          <SectionMarker number="07" label="Responsável técnico" />
          <div className="caio-profile-copy">
            <span className="section-kicker">Responsável técnico</span>
            <h2 id="caio-profile-title">Conheça Caio Marcolino</h2>
            <p className="caio-role">Engenheiro técnico da Nuvem Bombas</p>
            <p>Caio atua diretamente na avaliação de equipamentos, análise de falhas e orientação das soluções aplicadas em bombas, motores e sistemas elétricos.</p>
            <p>Sua experiência prática em campo contribui para diagnósticos cuidadosos, definição do reparo adequado e acompanhamento técnico até os testes finais.</p>
            <div className="caio-tags" aria-label="Áreas de atuação de Caio Marcolino">
              <span><Icon name="check" size={16} /> Avaliação técnica</span>
              <span><Icon name="check" size={16} /> Bombas e motores</span>
              <span><Icon name="check" size={16} /> Sistemas elétricos</span>
              <span><Icon name="check" size={16} /> Atendimento em campo</span>
            </div>
          </div>
          <div className="caio-profile-media">
            <img src={withBasePath("/images/caio-profile.webp")} width="1000" height="1250" loading="lazy" alt="Caio Marcolino com uniforme técnico e equipamentos de proteção na oficina" />
            <div className="caio-profile-badge"><span className="badge-icon"><Icon name="motor" size={22} /></span><span><small>Responsabilidade técnica</small><strong>Experiência prática e diagnóstico</strong></span></div>
          </div>
        </div>
      </section>

      <section className="section-shell section-block story-section" id="atendimento" aria-labelledby="service-region-title">
        <SectionMarker number="08" label="Área de atendimento" />
        <div className="region-grid">
          <div className="region-copy">
            <span className="section-kicker">Região e modalidades</span>
            <h2 id="service-region-title">Atendimento em São Paulo e Grande São Paulo</h2>
            <p>A Nuvem Bombas atende clientes em São Paulo, Grande São Paulo e regiões como Santana de Parnaíba, Itaquaquecetuba e Poá. Consulte a disponibilidade para sua localização.</p>
            <div className="region-info">
              <div><small>Oficina</small><strong>Rua Ascenso Fernandes, 458</strong><span>São Miguel Paulista, São Paulo — SP</span></div>
              <div><small>Horário</small><strong>Segunda a sábado</strong><span>das 7h às 17h30</span></div>
            </div>
            <p className="cost-note">Retirada, entrega e deslocamento podem ter custo adicional conforme a região.</p>
          </div>
          <div className="modalities-card">
            <span className="service-icon large-icon"><Icon name="shop" size={27} /></span>
            <h3>Modalidades de atendimento</h3>
            <ul>{modalities.map((item) => <li key={item}><Icon name="check" size={17} /> {item}</li>)}</ul>
            <a className="button" href={leadUrl(whatsappMessages.schedule)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "agendamento")}>Agendar uma avaliação <Icon name="calendar" size={18} /></a>
          </div>
        </div>
        <div className="audience-strip" aria-label="Públicos atendidos">
          <small>Atendemos</small>
          <div className="audience-cloud">{audiences.map((audience) => <span key={audience}>{audience}</span>)}</div>
        </div>
      </section>

      <section className="portfolio-section section-block" id="portfolio" aria-labelledby="portfolio-title">
        <div className="section-shell story-section">
          <SectionMarker number="09" label="Prova visual" />
          <div className="section-heading split-heading">
            <div><span className="section-kicker">Portfólio</span><h2 id="portfolio-title">Equipamentos e serviços realizados</h2></div>
            <p>Imagens institucionais ilustrativas das principais frentes de trabalho da Nuvem Bombas, do diagnóstico aos testes finais.</p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <figure className={`portfolio-item portfolio-item-${index + 1}`} key={item.title}>
                <img src={withBasePath(item.image)} width={item.width} height={item.height} alt={`${item.title} — ${item.description}`} loading="lazy" />
                <div className="portfolio-shade" />
                <figcaption>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section section-block" id="duvidas" aria-labelledby="faq-title">
        <div className="section-shell faq-grid story-section">
          <SectionMarker number="10" label="Decisão sem dúvidas" />
          <div className="faq-intro"><span className="section-kicker">Perguntas frequentes</span><h2 id="faq-title">Dúvidas comuns antes da avaliação</h2><p>Não encontrou sua resposta? Envie sua pergunta pelo WhatsApp e contextualize o equipamento.</p><a className="button button-secondary" href={leadUrl(whatsappMessages.question)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "duvidas")}>Perguntar pelo WhatsApp</a></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="section-shell section-block story-section" id="contato" aria-labelledby="contact-title">
        <SectionMarker number="11" label="Próximo passo" />
        <div className="contact-panel">
          <div className="contact-intro">
            <span className="section-kicker section-kicker-light">Contato direto</span>
            <h2 id="contact-title">Organize seu pedido e continue no WhatsApp</h2>
            <p>Informe apenas o necessário para o primeiro atendimento. O WhatsApp abrirá com a mensagem pronta para você revisar e encaminhar.</p>
            <div className="contact-intents" aria-label="Atalhos de contato pelo WhatsApp">
              <a href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "atalho_orcamento")}><Icon name="chat" size={20} /><span><strong>Pedir orçamento</strong><small>Descreva o equipamento</small></span></a>
              <a href={leadUrl(whatsappMessages.schedule)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "atalho_agendamento")}><Icon name="calendar" size={20} /><span><strong>Agendar avaliação</strong><small>Informe local e período</small></span></a>
              <a href={leadUrl(whatsappMessages.urgent)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "atalho_urgencia")}><Icon name="tool" size={20} /><span><strong>Equipamento parado</strong><small>Peça orientação técnica</small></span></a>
            </div>
            <div className="contact-direct"><small>WhatsApp</small><a href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "numero_contato")}>+55 {WHATSAPP_DISPLAY}</a></div>
            <div className="contact-direct"><small>Oficina</small><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Rua Ascenso Fernandes, 458<br />São Miguel Paulista, São Paulo — SP</a></div>
            <p className="contact-security"><Icon name="check" size={17} /> Você controla o envio: revise a mensagem antes de confirmar no WhatsApp.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-intro wide-field"><span>1</span><div><strong>Conte o essencial</strong><p>Cinco campos ajudam a preparar a mensagem e reduzir perguntas repetidas.</p></div></div>
            <label>Nome (obrigatório)<input name="nome" required autoComplete="name" placeholder="Como podemos chamar você?" /></label>
            <label>Cidade e bairro (obrigatório)<input name="localizacao" required autoComplete="address-level2" placeholder="Ex.: São Paulo, Mooca" /></label>
            <label>Tipo de equipamento (obrigatório)<select name="equipamento" required defaultValue=""><option value="" disabled>Selecione</option><option>Bomba submersível</option><option>Bomba centrífuga</option><option>Motor elétrico</option><option>Ferramenta elétrica</option><option>Sistema de piscina</option><option>Outro equipamento</option></select></label>
            <label>Urgência (obrigatório)<select name="urgencia" required defaultValue=""><option value="" disabled>Selecione</option><option>Equipamento parado</option><option>Falha recorrente</option><option>Manutenção preventiva</option><option>Apenas orçamento</option></select></label>
            <label className="wide-field">Descrição do problema (obrigatório)<textarea name="problema" required rows={3} placeholder="Ex.: parou de funcionar, perdeu pressão, apresenta ruído ou vazamento" /></label>
            <div className="photo-guidance wide-field"><Icon name="check" size={19} /><span><strong>Fotos e vídeos ajudam no direcionamento.</strong> Você poderá anexá-los diretamente na conversa do WhatsApp.</span></div>
            <label className="wide-field consent-field"><input name="consentimento" type="checkbox" required /> <span>Autorizo o uso destes dados para responder à solicitação pelo WhatsApp (obrigatório).</span></label>
            <button className="button submit-button" type="submit">Continuar no WhatsApp <Icon name="arrow" size={18} /></button>
            <p className="submit-note">A mensagem será preparada; o envio só acontece após sua confirmação no WhatsApp.</p>
            {formSent && <p className="form-success" role="status">WhatsApp aberto com a mensagem pronta. Revise, toque em enviar e anexe fotos ou vídeos se desejar.</p>}
          </form>
        </div>
      </section>

      <section className="section-shell final-cta" aria-labelledby="final-cta-title">
        <div><span className="section-kicker">Próximo passo</span><h2 id="final-cta-title">Descreva o problema e solicite uma avaliação técnica</h2><p>Fale diretamente com a Nuvem Bombas para alinhar avaliação, retirada ou entrega na oficina.</p></div>
        <div className="final-actions"><a className="button" href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "final")}>Solicitar avaliação <Icon name="chat" size={18} /></a><a className="button button-secondary" href={MAP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("open_map", "final")}>Ver localização</a></div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div className="footer-brand"><Brand light /><p>Manutenção, recuperação e suporte técnico para bombas, motores e equipamentos desde 1996.</p></div>
          <div><h3>Navegação</h3><a href="#inicio">Início</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a><a href="#duvidas">Dúvidas</a><a href="#contato">Contato</a></div>
          <div><h3>Atendimento</h3><a href={MAP_URL} target="_blank" rel="noopener noreferrer">Rua Ascenso Fernandes, 458<br />São Miguel Paulista, São Paulo — SP</a><p>Segunda a sábado<br />7h às 17h30</p></div>
          <div><h3>Contatos</h3><a href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", "rodape")}>WhatsApp: +55 {WHATSAPP_DISPLAY}</a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram: @nuvempiscinas</a><button type="button" onClick={() => setPrivacyOpen(true)}>Política de privacidade</button></div>
        </div>
        <div className="section-shell footer-bottom"><span>© 2026 Nuvem Bombas. Todos os direitos reservados.</span><span>Manutenção de Máquinas e Equipamentos</span></div>
      </footer>

      <a className="floating-whatsapp" href={leadUrl(whatsappMessages.quote)} target="_blank" rel="noopener noreferrer" aria-label="Solicitar avaliação pelo WhatsApp" onClick={() => track("whatsapp_click", "flutuante")}><Icon name="chat" size={22} /><span>Solicitar avaliação</span></a>

      {cookiesVisible && <aside className="cookie-banner" aria-label="Preferências de cookies"><div><strong>Privacidade e cookies</strong><p>Utilizamos cookies essenciais e, após configuração, dados de medição para melhorar o atendimento e as campanhas.</p></div><div className="cookie-actions"><button type="button" onClick={() => saveCookieChoice("essenciais")}>Somente essenciais</button><button className="button button-sm" type="button" onClick={() => saveCookieChoice("aceitos")}>Aceitar</button></div></aside>}

      {privacyOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="privacy-title"><div className="privacy-modal"><button className="modal-close" type="button" onClick={() => setPrivacyOpen(false)} aria-label="Fechar política de privacidade"><Icon name="close" /></button><span className="section-kicker">Privacidade</span><h2 id="privacy-title">Política de privacidade</h2><p>Os dados preenchidos são usados exclusivamente para preparar a mensagem de atendimento. O envio somente ocorre quando você confirma a mensagem no WhatsApp.</p><p>Quando as ferramentas de medição forem configuradas, poderão ser registrados eventos como cliques em contato, envio de orçamento e abertura do mapa, de forma compatível com as escolhas de cookies.</p><p>Para solicitar correção ou exclusão de dados, fale com a Nuvem Bombas pelo <a href={leadUrl("Olá! Gostaria de solicitar correção ou exclusão dos meus dados de atendimento.")} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a>.</p><button className="button" type="button" onClick={() => setPrivacyOpen(false)}>Entendi</button></div></div>}
    </main>
  );
}
