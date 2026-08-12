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
| `generate_lead` | Formulário concluído e WhatsApp aberto | referência do lead e atribuição |
| `click_whatsapp` | Clique em qualquer chamada para WhatsApp | posição do botão e serviço, quando aplicável |
| `open_map` | Clique para abrir a localização | posição do link |
| `consent_update` | Escolha no banner de privacidade | estado das quatro permissões do Consent Mode v2 |

Todos os eventos de aquisição incluem, quando disponíveis: `lead_id`, `traffic_source`, `traffic_medium`, `campaign_name`, `campaign_id`, `campaign_term`, `campaign_content`, `source_platform`, `landing_page` e indicadores dos IDs de clique.

## Configuração atual no GTM

1. A tag do Google `G-RRM25TPPFE` é disparada na inicialização de todas as páginas.
2. A tag `GA4 — Eventos do site` envia os eventos listados acima por meio do acionador `Eventos Nuvem Bombas`.
3. O contêiner publicado é a versão 2, `Mensuração GA4 — Nuvem Bombas`.

Próximas integrações opcionais:

1. Marcar `generate_lead` como evento principal no GA4 após o primeiro recebimento.
2. Criar `click_whatsapp` no Google Ads como conversão secundária e `generate_lead` como primária provisória.
3. Adicionar o Pixel da Meta pelo GTM e disparar `Lead` em `generate_lead` somente após consentimento.

## Limite da medição

`click_whatsapp` mede intenção e `generate_lead` mede a abertura do WhatsApp depois do formulário. Nenhum navegador consegue confirmar sozinho que a mensagem foi realmente enviada. Cada mensagem preparada pelo site inclui uma referência `NB-AAAAMMDD-XXXXXXXX`, a origem, a campanha e, quando houver, o ID de clique. Essa referência deve ser registrada no atendimento ou CRM para associar contato, orçamento e venda à campanha.
