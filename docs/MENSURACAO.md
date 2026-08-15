# Mensuração do site Nuvem Bombas

O site carrega o contêiner `GTM-NCCTFKH2` do Google Tag Manager (GTM) e envia eventos padronizados ao `dataLayer`. O contêiner publicado envia as visualizações e os eventos do site ao fluxo GA4 `G-RRM25TPPFE`.

## Variáveis de publicação

Os identificadores atuais estão definidos como padrão no workflow de publicação. Para substituí-los futuramente sem editar o código, configure em **Settings → Secrets and variables → Actions → Variables**:

| Variável | Exemplo | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | `GTM-NCCTFKH2` | Substitui o contêiner GTM padrão |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | código fornecido pelo Search Console | Substitui o código de verificação padrão no HTML |

Depois de salvar uma variável, execute novamente o workflow **Deploy GitHub Pages** ou faça um novo push na branch `main`.

## Eventos disponíveis

| Evento | Quando ocorre | Parâmetros principais |
| --- | --- | --- |
| `landing_page_view` | Entrada na página inicial | origem, mídia, campanha e página de entrada |
| `view_service` | Abertura ou clique em uma página de serviço | serviço e posição |
| `form_start` | Primeira interação com o formulário | posição do formulário |
| `generate_lead` | Formulário concluído e WhatsApp aberto | referência do lead, atribuição e etapa `form_completed` |
| `click_whatsapp` | Clique em qualquer chamada para WhatsApp | posição do botão, serviço e etapa `contact_intent` |
| `open_map` | Clique para abrir a localização | posição do link |
| `consent_update` | Escolha no banner de privacidade | estado das quatro permissões do Consent Mode v2 |

Todos os eventos de aquisição incluem, quando disponíveis: `lead_id`, `traffic_source`, `traffic_medium`, `campaign_name`, `campaign_id`, `campaign_term`, `campaign_content`, `source_platform`, `landing_page` e indicadores dos IDs de clique. Os eventos de contato também levam `contact_method=whatsapp` e a etapa correspondente. Dados preenchidos no formulário não são enviados ao Analytics ou ao Google Ads.

## Configuração atual no GTM

1. A tag do Google `G-RRM25TPPFE` é disparada na inicialização de todas as páginas.
2. A tag `GA4 — Eventos do site` envia os eventos listados acima por meio do acionador `Eventos Nuvem Bombas`.
3. O contêiner publicado é a versão 2, `Mensuração GA4 — Nuvem Bombas`.

## Google Ads

A conversão principal da campanha deve ser a categoria **Contato**, usando o evento `click_whatsapp` importado da propriedade GA4 vinculada. A contagem deve ser **Uma** por interação com o anúncio, pois vários cliques no WhatsApp podem pertencer ao mesmo atendimento. O evento `generate_lead` permanece como sinal diagnóstico do formulário e não deve duplicar a conversão principal.

Use este sufixo de URL final na campanha para completar a atribuição sem editar cada anúncio:

```text
utm_source=google&utm_medium=cpc&utm_campaign=nb_pesquisa_servicos&utm_id={campaignid}&utm_term={keyword}&utm_content={creative}&utm_source_platform=google_ads
```

Integração opcional futura: adicionar o Pixel da Meta pelo GTM e disparar `Lead` apenas após consentimento.

## Limite da medição

`click_whatsapp` mede a intenção de contato e `generate_lead` mede a abertura do WhatsApp depois do formulário. Nenhum navegador consegue confirmar sozinho que a mensagem foi realmente enviada. Cada mensagem preparada pelo site inclui uma referência `NB-AAAAMMDD-XXXXXXXX`, a origem, a campanha e, quando houver, o ID de clique. Essa referência deve ser registrada no atendimento ou CRM para associar contato, orçamento e venda à campanha.
