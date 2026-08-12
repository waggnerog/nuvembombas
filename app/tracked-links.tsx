"use client";

import { useEffect, useState } from "react";
import { captureAttribution, emptyAttribution, leadWhatsappUrl, trackEvent } from "./analytics";
import { whatsappUrl } from "./seo-data";

type TrackedWhatsAppLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  message: string;
  position: string;
  service?: string;
};

export function TrackedWhatsAppLink({ message, position, service, children, ...props }: TrackedWhatsAppLinkProps) {
  const [attribution, setAttribution] = useState(emptyAttribution);

  useEffect(() => {
    const current = captureAttribution();
    const timer = window.setTimeout(() => setAttribution(current), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <a
      {...props}
      href={attribution.leadId ? leadWhatsappUrl(message, attribution) : whatsappUrl(message)}
      onClick={() => trackEvent("click_whatsapp", attribution, { button_position: position, service_name: service || "not_set" })}
    >
      {children}
    </a>
  );
}

export function ServiceView({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    const attribution = captureAttribution();
    trackEvent("view_service", attribution, { service_slug: slug, service_name: title });
  }, [slug, title]);

  return null;
}
