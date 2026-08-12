# Mensuração do site Nuvem Bombas

O site está preparado para carregar um contêiner do Google Tag Manager (GTM) e enviar eventos padronizados ao `dataLayer`. As tags só são publicadas quando a variável do GTM é configurada no GitHub.

## Variáveis de publicação

Em **Settings → Secrets and variables → Actions → Variables**, configure:

| Variável | Exemplo | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | `GTM-ABC1234` | Carrega o contêiner GTM no site |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | código fornecido pelo Search Console | Adiciona a verificação do domínio ao HTML |

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

## Configuração recomendada no GTM

1. Adicionar a tag de configuração do Google Analytics 4 em todas as páginas.
2. Criar eventos GA4 para cada nome listado acima usando gatilhos de **Evento personalizado**.
3. Marcar `generate_lead` como evento principal no GA4.
4. Criar a conversão `click_whatsapp` no Google Ads como conversão secundária e `generate_lead` como primária provisória.
5. Adicionar o Pixel da Meta pelo GTM e disparar `Lead` em `generate_lead` somente após consentimento.
6. Publicar o contêiner e validar com Tag Assistant, DebugView do GA4 e Meta Pixel Helper.

## Limite da medição

`click_whatsapp` mede intenção e `generate_lead` mede a abertura do WhatsApp depois do formulário. Nenhum navegador consegue confirmar sozinho que a mensagem foi realmente enviada. Cada mensagem preparada pelo site inclui uma referência `NB-AAAAMMDD-XXXXXXXX`, a origem, a campanha e, quando houver, o ID de clique. Essa referência deve ser registrada no atendimento ou CRM para associar contato, orçamento e venda à campanha.
