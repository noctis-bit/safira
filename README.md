# Safira Secure 2.0

Site estático em HTML, CSS e JavaScript, pronto para publicação em hospedagem compatível com arquivos estáticos.

## Estrutura

- `index.html`: Home
- `solucoes/`: serviços
- `cyber-ot/`: vertical de Cyber OT / ICS
- `sobre/`: Safira e fundador
- `insights/`: conteúdo e artigos
- `contato/`: contato
- `assets/css/main.css`: identidade visual e responsividade
- `assets/js/main.js`: menu, animações, progressão do método e formulário
- `robots.txt`: rastreamento
- `sitemap.xml`: URLs indexáveis
- `.well-known/security.txt`: canal de relato de vulnerabilidades

## Publicação

Envie o conteúdo desta pasta para a raiz pública de `https://www.safirasecure.com.br/`.

As URLs usam caminhos absolutos iniciados por `/`, portanto o site deve ser testado em um servidor HTTP local ou na hospedagem, e não apenas abrindo o `index.html` diretamente pelo sistema de arquivos.

Exemplo local com Python:

`python -m http.server 8080`

Depois abra `http://localhost:8080`.

## Antes de publicar

1. Confirme se os links de Instagram e LinkedIn continuam corretos.
2. Revise a apresentação pública de Jony Azevedo e adicione certificações somente quando desejar.
3. O formulário de contato usa `mailto:` e não possui backend.
4. Se Google Analytics, Meta Pixel, reCAPTCHA ou outra ferramenta de terceiros for adicionada, revise Privacidade e Cookies.
5. Valide o JSON-LD no Rich Results Test e envie o sitemap no Google Search Console.
6. Comprima e converta imagens para WebP/AVIF se a hospedagem não fizer otimização automática.
7. Configure HTTPS, cabeçalhos de segurança e redirecionamento canônico no provedor de hospedagem.

## SEO e IA

O conteúdo principal está no HTML e não depende de JavaScript. Cada página possui:
- title e meta description exclusivos
- canonical
- Open Graph
- JSON-LD de Organization
- Article nas páginas de Insights
- Person na página Sobre
- sitemap e robots.txt

Não foram adicionados textos invisíveis, keyword stuffing ou páginas artificiais.

## Observação jurídica

As páginas de Privacidade e Cookies são uma base técnica coerente com esta versão sem analytics. Revise-as novamente se o site passar a coletar ou compartilhar dados com terceiros.
