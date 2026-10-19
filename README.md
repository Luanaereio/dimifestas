# Dimi Festas

Site do Dimi Festas, espaco para locacao de festas em Jd. das Americas, SP. Uma pagina, HTML + CSS + JS puros,
sem build: `index.html`, `estilo.css`, `script.js` e a pasta `img/`. Feito a partir do mockup da Luana, com
largura de desenho de 1215 px e adaptacao para celular.

## Provisorios a trocar

- **Fotos e logos em `img/`** foram recortados do mockup e estao em baixa resolucao. Trocar pelos originais
  mantendo os nomes: `logo-cabecalho.png` (216x92), `logo-heroi.png` (400x76, fundo transparente),
  `logo-rodape.png` (216x92), `heroi.jpg` (885x345 ou maior na mesma proporcao), `sobre-1.jpg` (376x236),
  `sobre-2.jpg` e `sobre-3.jpg` (270x116), `galeria-1.jpg` a `galeria-4.jpg` (cerca de 205x190).
- **Frase manuscrita do heroi** ("Um espaco feito para sorrisos!"): a foto provisoria ja traz a frase desenhada,
  por isso a versao em HTML esta com a classe `escondido-provisorio`. Quando a foto original entrar, tirar a classe.
- **WhatsApp:** preencher `WHATSAPP` no comeco de `script.js` com DDI + DDD + numero (so digitos). Enquanto
  estiver vazio, os botoes rolam ate o contato.
- **Instagram e Facebook:** trocar os `href="#"` marcados com `data-pendente` no rodape.
- **Menu:** Decoracao e Festas levam a faixa de servicos, Regras e Contato ao rodape, Brinquedao a galeria.
  Se virarem paginas proprias, trocar os `href`.

## Publicar

Site estatico: basta apontar um projeto da Vercel para o repositorio, sem build e sem variavel de ambiente.
