"use client";

import { whatsappUrl } from "./seo-data";

const ATTRIBUTION_KEY = "nuvem_campaign_attribution";
const LEAD_ID_KEY = "nuvem_lead_id";

export type CampaignAttribution = {
  source: string;
  medium: string;
  campaign: string;
  campaignId: string;
  term: string;
  content: string;
  sourcePlatform: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbclid: string;
  landingPage: string;
  referrer: string;
  leadId: string;
  capturedAt: string;
};

export const emptyAttribution: CampaignAttribution = {
  source: "",
  medium: "",
  campaign: "",
  campaignId: "",
  term: "",
  content: "",
  sourcePlatform: "",
  gclid: "",
  gbraid: "",
  wbraid: "",
  fbclid: "",
  landingPage: "",
  referrer: "",
  leadId: "",
  capturedAt: "",
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function clean(value: string | null | undefined, maxLength = 180) {
  return (value || "").trim().slice(0, maxLength);
}

function createLeadId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()
    : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `NB-${date}-${random}`;
}

function getLeadId() {
  try {
    const stored = sessionStorage.getItem(LEAD_ID_KEY);
    if (stored) return stored;
    const leadId = createLeadId();
    sessionStorage.setItem(LEAD_ID_KEY, leadId);
    return leadId;
  } catch {
    return createLeadId();
  }
}

function inferSource(params: URLSearchParams, referrer: string) {
  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) {
    return { source: "google", medium: "cpc" };
  }
  if (params.get("fbclid")) return { source: "meta", medium: "social" };

  try {
    const hostname = new URL(referrer).hostname.replace(/^www\./, "");
    if (hostname && hostname !== window.location.hostname) {
      return { source: hostname, medium: "referral" };
    }
  } catch {
    // A origem direta continua válida quando o referenciador não é uma URL.
  }

  return { source: "", medium: "" };
}

export function captureAttribution(): CampaignAttribution {
  const params = new URLSearchParams(window.location.search);
  let stored: Partial<CampaignAttribution> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch {
    stored = {};
  }

  const inferred = inferSource(params, document.referrer);
  const firstValue = (paramName: string, storedValue?: string) => clean(params.get(paramName)) || clean(storedValue);
  const current: CampaignAttribution = {
    source: firstValue("utm_source", stored.source) || inferred.source,
    medium: firstValue("utm_medium", stored.medium) || inferred.medium,
    campaign: firstValue("utm_campaign", stored.campaign),
    campaignId: firstValue("utm_id", stored.campaignId),
    term: firstValue("utm_term", stored.term),
    content: firstValue("utm_content", stored.content),
    sourcePlatform: firstValue("utm_source_platform", stored.sourcePlatform),
    gclid: firstValue("gclid", stored.gclid),
    gbraid: firstValue("gbraid", stored.gbraid),
    wbraid: firstValue("wbraid", stored.wbraid),
    fbclid: firstValue("fbclid", stored.fbclid),
    landingPage: clean(stored.landingPage) || clean(`${window.location.pathname}${window.location.search}`, 500),
    referrer: clean(stored.referrer) || clean(document.referrer, 500),
    leadId: clean(stored.leadId) || getLeadId(),
    capturedAt: clean(stored.capturedAt) || new Date().toISOString(),
  };

  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(current));
  } catch {
    // O atendimento segue normalmente quando o armazenamento está indisponível.
  }
  return current;
}

export function pushDataLayer(event: string, data: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackEvent(event: string, attribution: CampaignAttribution, data: Record<string, unknown> = {}) {
  // Cliques muito rápidos podem ocorrer antes de o estado React receber a
  // atribuição capturada no carregamento. Nesse caso, recuperamos os dados da
  // sessão no próprio clique para não perder a origem do contato.
  const resolvedAttribution = attribution.leadId ? attribution : captureAttribution();
  const isWhatsAppContact = event === "click_whatsapp" || event === "generate_lead";

  pushDataLayer(event, {
    ...data,
    ...(isWhatsAppContact ? {
      contact_method: "whatsapp",
      conversion_stage: event === "generate_lead" ? "form_completed" : "contact_intent",
    } : {}),
    lead_id: resolvedAttribution.leadId || "not_set",
    traffic_source: resolvedAttribution.source || "direct",
    traffic_medium: resolvedAttribution.medium || "none",
    campaign_name: resolvedAttribution.campaign || "not_set",
    campaign_id: resolvedAttribution.campaignId || "not_set",
    campaign_term: resolvedAttribution.term || "not_set",
    campaign_content: resolvedAttribution.content || "not_set",
    source_platform: resolvedAttribution.sourcePlatform || "not_set",
    landing_page: resolvedAttribution.landingPage || window.location.pathname,
    has_gclid: Boolean(resolvedAttribution.gclid),
    has_gbraid: Boolean(resolvedAttribution.gbraid),
    has_wbraid: Boolean(resolvedAttribution.wbraid),
    has_fbclid: Boolean(resolvedAttribution.fbclid),
  });
}

export function attributionNote(attribution: CampaignAttribution) {
  const clickId = attribution.gclid || attribution.gbraid || attribution.wbraid || attribution.fbclid;
  return [
    attribution.leadId ? `Referência: ${attribution.leadId}` : "",
    attribution.source ? `Origem: ${attribution.source}${attribution.medium ? ` / ${attribution.medium}` : ""}` : "",
    attribution.campaign ? `Campanha: ${attribution.campaign}` : "",
    clickId ? `ID de clique: ${clickId}` : "",
  ].filter(Boolean).join(" | ");
}

export function leadWhatsappUrl(message: string, attribution: CampaignAttribution) {
  const note = attributionNote(attribution);
  return whatsappUrl(`${message}${note ? `\n\n${note}` : ""}`);
}

export function updateConsent(accepted: boolean) {
  const value = accepted ? "granted" : "denied";
  const consent = {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  };
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("consent", "update", consent);
  pushDataLayer("consent_update", { consent_choice: accepted ? "accepted" : "essential_only", ...consent });
}
