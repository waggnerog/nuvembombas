# Nuvem Bombas

Site institucional da Nuvem Bombas, preparado para geração estática e publicação automática no GitHub Pages.

## Desenvolvimento

```bash
npm ci
npm run dev:pages
```

## Validação da versão estática

```bash
NEXT_PUBLIC_BASE_PATH=/nuvembombas \
NEXT_PUBLIC_SITE_URL=https://waggnerog.github.io/nuvembombas \
npm run build:pages
```

O conteúdo final é gerado em `out/`. As páginas de serviços, sitemap, robots, imagens e metadados são incluídos na exportação.

## Publicação

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente cada commit enviado à branch `main`.

Endereço padrão:

`https://waggnerog.github.io/nuvembombas/`

## Domínio personalizado

Quando o domínio definitivo estiver disponível:

1. Em **Settings → Pages**, informe o domínio no campo **Custom domain**.
2. Em **Settings → Secrets and variables → Actions → Variables**, crie a variável `CUSTOM_DOMAIN` contendo apenas o domínio, por exemplo `www.nuvembombas.com.br`.
3. No provedor de DNS, aponte o registro `CNAME` do subdomínio para `waggnerog.github.io` — sem incluir `/nuvembombas`.
4. Execute novamente o workflow **Deploy GitHub Pages**.
5. Depois que o certificado estiver disponível, ative **Enforce HTTPS** no GitHub Pages.

Com `CUSTOM_DOMAIN` configurado, a compilação remove automaticamente o prefixo `/nuvembombas` e atualiza URLs canônicas, sitemap, manifest e arquivos estáticos para o novo domínio.
