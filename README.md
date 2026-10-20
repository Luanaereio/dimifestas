# Dimi Festas

Site do Dimi Festas, espaco para locacao de festas em Jd. das Americas, SP. Uma pagina, HTML + CSS + JS puros,
sem build: `index.html`, `estilo.css`, `script.js` e a pasta `img/`. Feito a partir do mockup da Luana, com
largura de desenho de 1215 px e adaptacao para celular.

## Provisorios a trocar

- **Foto do heroi** (`img/heroi-estrelas.jpg`, 1800x658) e a original do salao com a parede estrelada; sobre ela
  ficam so a frase, os selos, o botao e a frase manuscrita (sem logo). Ao trocar a foto, use um nome NOVO de
  arquivo, senao o navegador mostra a versao antiga guardada em cache.
- **Logos e demais fotos em `img/`** foram recortados do mockup e estao em baixa resolucao. Trocar pelos originais
  mantendo os nomes: `logo-cabecalho.png` (216x92, fundo transparente), `logo-rodape.png` (216x92),
  `sobre-1.jpg` (376x236), `sobre-2.jpg` e `sobre-3.jpg` (270x116), `galeria-1.jpg` a `galeria-4.jpg`
  (cerca de 205x190). `logo-heroi.png` nao e mais usado.
- **WhatsApp:** preencher `WHATSAPP` no comeco de `script.js` com DDI + DDD + numero (so digitos). Enquanto
  estiver vazio, os botoes rolam ate o contato.
- **Instagram e Facebook:** trocar os `href="#"` marcados com `data-pendente` no rodape.
- **Menu:** Decoracao leva a faixa de servicos da home; Festas abre `festas.html`; Brinquedao abre
  `brinquedao.html`; Regras abre `brinquedao.html#regras`; Contato vai ao rodape.
- **Paginas internas** (`festas.html`, `brinquedao.html`) sao escuras e "cinematograficas" (classes `ch-`):
  fotos de ponta a ponta sem cantos, filetes finos, legendas pequenas e espacadas, muito ar. A galeria de temas
  e um lookbook horizontal (fotos altas no tamanho natural, arrasta com o mouse ou o dedo, setas, contador e
  barra de progresso). Qualquer foto abre em tela cheia.
- **Textos do brinquedao e das regras** (`brinquedao.html`) sao uma proposta: confirmar com o cliente o que o
  brinquedao tem de fato e quais sao as regras da casa (meias, idade, acompanhamento, comida fora).

## Publicar

Site estatico: basta apontar um projeto da Vercel para o repositorio, sem build e sem variavel de ambiente.
