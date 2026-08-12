"use client";

import { useEffect, useState } from "react";
import { updateConsent } from "./analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hasChoice = false;
    try {
      hasChoice = Boolean(localStorage.getItem("nuvem_cookie_choice"));
    } catch {
      hasChoice = false;
    }
    const timer = window.setTimeout(() => setVisible(!hasChoice), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function saveChoice(accepted: boolean) {
    try {
      localStorage.setItem("nuvem_cookie_choice", accepted ? "aceitos" : "essenciais");
    } catch {
      // A escolha ainda é aplicada à navegação atual quando o armazenamento falha.
    }
    updateConsent(accepted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies">
      <div>
        <strong>Privacidade e cookies</strong>
        <p>Usamos armazenamento essencial para manter a origem do atendimento e, com sua autorização, medição para melhorar o site e as campanhas.</p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => saveChoice(false)}>Somente essenciais</button>
        <button className="button button-sm" type="button" onClick={() => saveChoice(true)}>Aceitar medição</button>
      </div>
    </aside>
  );
}
