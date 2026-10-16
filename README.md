# Portfólio · Gabriel Rizzo

Portfólio pessoal com foco em **UI/UX Design, Front-End e Design Engineering**.

Site estático em HTML, CSS e JavaScript, sem framework, sem build e sem dependências instaladas. As fontes vêm do Google Fonts.

## Identidade: "Do traço ao código"

- **Contorno (traço)** representa o design: títulos de seção e a palavra "traço" do hero.
- **Sólido** representa a interface: títulos de conteúdo.
- **Mono** representa o código: rótulos, metadados e numeração.
- **Moldura de seleção** (cantos com alças, como numa ferramenta de design) é o motivo gráfico recorrente.
- **Cor por função:** violeta para vitrine, papel claro para leitura, tinta escura para conteúdo técnico, e lima para ação.

## Estrutura

```text
index.html                    # Home: hero com contatos → estudos de caso → sobre → trajetória → ferramentas → contato
projetos/
  buscar-animes.html          # Estudos de caso (um por projeto)
  incentivart.html
  bocchi-the-rock.html
  horror-game-lux.html
assets/css/base.css           # Tokens, tipografia, cabeçalho, botões, caixa de e-mail, rodapé (todas as páginas)
assets/css/home.css           # Seções da home
assets/css/case-study.css     # Template dos estudos de caso
assets/js/main.js             # Menu no celular, copiar e-mail, índice ativo e revelação no scroll
assets/images/projects/<projeto>/   # Capturas reais de cada projeto
portfolio-projects-section.html     # Protótipo original da seção de projetos (já integrado à home)
```

## Como rodar localmente

Abra o `index.html` no navegador ou sirva a pasta com um servidor local:

```bash
python -m http.server 5500
```

Depois acesse <http://localhost:5500>. O botão "Copiar" do e-mail usa a área de transferência, que funciona em `localhost` e em HTTPS.

## Como atualizar

### Novo estudo de caso

1. Copie um arquivo de `projetos/` e troque o conteúdo. A estrutura é sempre: hero (`case-hero` com `case-facts`), capa (`case-cover`), corpo com índice (`case-toc` + `case-section`), registros (`case-gallery`) e próximo estudo (`case-next`).
2. Defina a cor do projeto em `assets/css/case-study.css` com uma classe `case--nome { --case-accent: … }`.
3. Blocos disponíveis: `decisions` (cards de decisões), `tech-table`, `swatches` (tokens de cor), `type-specimens`, `evolution` + `milestones` (antes/depois), `split` (divisão do trabalho em equipe), `principles` e `pending` (material ainda não publicado).
4. Adicione o card na home (`portfolio-project`). A grade defasada se repete a cada quatro cards.

### Cabeçalho e rodapé

São repetidos em cada página (o site não tem build). Ao mudar um link de contato, atualize os cinco arquivos HTML.

### Materiais pendentes

Os pontos a completar estão marcados com comentários HTML em maiúsculas (`FIGMA`, `FOTO`, `PAPEL`, `PROCESSO`, `REGISTROS`).

## Acessibilidade e desempenho

- Link para pular ao conteúdo, foco visível (o card inteiro ganha contorno ao focar o link), navegação por teclado; o menu do celular fecha com Esc.
- Um link por card de projeto, com nome descritivo para leitores de tela.
- Respeita `prefers-reduced-motion` e funciona sem JavaScript.
- Imagens com `width`/`height` e `loading="lazy"`; cada página carrega só o CSS que usa.

## Imagens

- **Buscar Animes:** capturas do README do repositório; `versao-2024.jpg` foi capturada a partir do primeiro commit (2024).
- **Bocchi The Rock!:** capturas da demonstração pública; `versao-alpha.jpg` e `versao-beta-3-1.jpg` vêm de commits antigos do repositório.
- **Incentivart:** capturas do site público incentivart.com.br (outubro de 2026).
- **Horror Game Lux:** sem imagens ainda (capa tipográfica).
