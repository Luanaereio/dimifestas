# Dimi Festas

Site do Dimi Festas, espaco para locacao de festas em Jd. das Americas, SP. Uma pagina, HTML + CSS + JS puros,
sem build: `index.html`, `estilo.css`, `script.js` e a pasta `img/`. Feito a partir do mockup da Luana, com
largura de desenho de 1215 px e adaptacao para celular.

## Provisorios a trocar

- **Foto do heroi** (`img/heroi.jpg`, 1800x658) e a original, com o logo pintado na parede; por isso o heroi nao
  tem logo em imagem separada.
- **Logos e demais fotos em `img/`** foram recortados do mockup e estao em baixa resolucao. Trocar pelos originais
  mantendo os nomes: `logo-cabecalho.png` (216x92, fundo transparente), `logo-rodape.png` (216x92),
  `sobre-1.jpg` (376x236), `sobre-2.jpg` e `sobre-3.jpg` (270x116), `galeria-1.jpg` a `galeria-4.jpg`
  (cerca de 205x190). `logo-heroi.png` nao e mais usado.
- **WhatsApp:** preencher `WHATSAPP` no comeco de `script.js` com DDI + DDD + numero (so digitos). Enquanto
  estiver vazio, os botoes rolam ate o contato.
- **Instagram e Facebook:** trocar os `href="#"` marcados com `data-pendente` no rodape.
- **Menu:** Decoracao e Festas levam a faixa de servicos, Regras e Contato ao rodape, Brinquedao a galeria.
  Se virarem paginas proprias, trocar os `href`.

## Publicar

Site estatico: basta apontar um projeto da Vercel para o repositorio, sem build e sem variavel de ambiente.
