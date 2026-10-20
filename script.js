/* Dimi Festas: menu do celular, botoes de WhatsApp e marcacao do item atual do menu.
   WHATSAPP: numero com DDI e DDD, so digitos (ex.: 5511999999999). Vazio = os botoes rolam ate o contato. */
(function () {
  'use strict';
  var WHATSAPP = '';

  // botoes que viram link do WhatsApp quando o numero estiver preenchido
  Array.prototype.forEach.call(document.querySelectorAll('[data-whatsapp]'), function (a) {
    if (!WHATSAPP) return;
    a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(a.getAttribute('data-whatsapp'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // menu do celular
  var botao = document.querySelector('.hamburguer');
  var menu = document.getElementById('menuCelular');
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = botao.getAttribute('aria-expanded') === 'true';
      botao.setAttribute('aria-expanded', String(!aberto));
      botao.setAttribute('aria-label', aberto ? 'Abrir o menu' : 'Fechar o menu');
      menu.hidden = aberto;
      document.body.classList.toggle('menu-aberto', !aberto);
    });
    menu.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') { botao.click(); }
    });
  }

  // o item do menu acompanha a secao visivel (so na home, onde as secoes existem)
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  var secoes = ['inicio', 'sobre', 'festas', 'galeria', 'contato'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window && links.length && secoes.length >= 3) {
    var atual = null;
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) atual = e.target.id; });
      if (!atual) return;
      links.forEach(function (a) {
        var alvo = a.getAttribute('href').slice(1);
        if (alvo === atual) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secoes.forEach(function (s) { obs.observe(s); });
  }

  // a vitrine da pagina Festas: um tema em destaque; o indice, as setas e o teclado trocam com uma transicao.
  // Troca sozinha a cada 6 s ate a pessoa mexer; para com o mouse em cima e com a aba escondida.
  var reduzido = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var vitrine = document.querySelector('[data-vitrine]');
  if (vitrine) {
    var itensV = Array.prototype.slice.call(vitrine.querySelectorAll('[data-vitrine-item]'));
    var palco = vitrine.querySelector('.vitrine-palco');
    var grande = vitrine.querySelector('[data-vitrine-grande]');
    var imgGrande = grande.querySelector('img');
    var numeroV = vitrine.querySelector('[data-vitrine-n]');
    var tituloV = vitrine.querySelector('[data-vitrine-titulo]');
    var textoV = vitrine.querySelector('[data-vitrine-texto]');
    var atualV = 0, relogioV = null, mexeu = false, trocandoV = false;
    function mostrarV(i) {
      atualV = (i + itensV.length) % itensV.length;
      var item = itensV[atualV];
      itensV.forEach(function (b, k) { b.setAttribute('aria-current', k === atualV ? 'true' : 'false'); });
      if (numeroV) numeroV.textContent = (atualV + 1 < 10 ? '0' : '') + (atualV + 1);
      palco.classList.add('trocando');
      trocandoV = true;
      window.setTimeout(function () {
        imgGrande.src = item.getAttribute('data-foto');
        imgGrande.alt = item.getAttribute('data-alt') || '';
        grande.setAttribute('data-foto', item.getAttribute('data-foto'));
        if (tituloV) tituloV.textContent = item.getAttribute('data-titulo') || '';
        if (textoV) textoV.textContent = item.getAttribute('data-texto') || '';
        var fim = function () { palco.classList.remove('trocando'); trocandoV = false; };
        if (imgGrande.complete) fim(); else { imgGrande.onload = fim; imgGrande.onerror = fim; }
      }, 220);
      // o item escolhido entra na tela quando o indice e uma fila (celular)
      if (item.scrollIntoView && window.matchMedia('(max-width: 980px)').matches) item.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
    function rodarV() { if (reduzido) return; window.clearInterval(relogioV); relogioV = window.setInterval(function () { if (!document.hidden && !mexeu) mostrarV(atualV + 1); }, 6000); }
    function assumirV(i) { mexeu = true; window.clearInterval(relogioV); mostrarV(i); }
    itensV.forEach(function (b, k) { b.addEventListener('click', function () { assumirV(k); }); });
    Array.prototype.forEach.call(vitrine.querySelectorAll('[data-vitrine-seta]'), function (b) {
      b.addEventListener('click', function () { assumirV(atualV + (b.getAttribute('data-vitrine-seta') === 'dir' ? 1 : -1)); });
    });
    vitrine.addEventListener('mouseenter', function () { window.clearInterval(relogioV); });
    vitrine.addEventListener('mouseleave', function () { if (!mexeu) rodarV(); });
    vitrine.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowRight') { ev.preventDefault(); assumirV(atualV + 1); }
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); assumirV(atualV - 1); }
    });
    rodarV();
  }

  // o visualizador das paginas Festas e Brinquedao: toque na foto abre grande, setas e Esc navegam e fecham.
  // A lista e montada na hora de abrir (a foto grande da vitrine muda) e ignora a propria foto grande, que
  // repetiria a miniatura do indice.
  var galeria = document.querySelector('[data-galeria]');
  if (galeria) {
    var fotos = [];
    function listarFotos() {
      fotos = Array.prototype.filter.call(galeria.querySelectorAll('[data-foto]'), function (b) { return !b.hasAttribute('data-vitrine-grande'); })
        .map(function (b) { var img = b.querySelector('img'); return { src: b.getAttribute('data-foto'), alt: b.getAttribute('data-alt') || (img && img.alt) || '' }; });
    }
    var atual = 0, visor = null;
    function montar() {
      visor = document.createElement('div'); visor.className = 'visor'; visor.setAttribute('role', 'dialog'); visor.setAttribute('aria-modal', 'true'); visor.setAttribute('aria-label', 'Foto ampliada');
      visor.innerHTML = '<button class="visor-fechar" type="button" aria-label="Fechar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
        '<button class="visor-seta esq" type="button" aria-label="Foto anterior"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>' +
        '<img alt="">' +
        '<button class="visor-seta dir" type="button" aria-label="Próxima foto"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>' +
        '<p class="visor-legenda"></p>';
      document.body.appendChild(visor);
      visor.querySelector('.visor-fechar').addEventListener('click', fechar);
      visor.querySelector('.esq').addEventListener('click', function () { ir(atual - 1); });
      visor.querySelector('.dir').addEventListener('click', function () { ir(atual + 1); });
      visor.addEventListener('click', function (ev) { if (ev.target === visor) fechar(); });
    }
    function ir(i) {
      atual = (i + fotos.length) % fotos.length;
      var img = visor.querySelector('img'); img.src = fotos[atual].src; img.alt = fotos[atual].alt;
      visor.querySelector('.visor-legenda').textContent = (atual + 1) + ' / ' + fotos.length;
    }
    function abrir(i) { if (!visor) montar(); visor.hidden = false; document.body.classList.add('visor-aberto'); ir(i); visor.querySelector('.visor-fechar').focus(); }
    function fechar() { if (visor) { visor.hidden = true; } document.body.classList.remove('visor-aberto'); }
    galeria.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-foto]'); if (!b) return;
      if (b.hasAttribute('data-vitrine-item')) return; // no indice da vitrine o clique so troca o tema
      listarFotos();
      var src = b.getAttribute('data-foto');
      var i = 0; for (var k = 0; k < fotos.length; k++) if (fotos[k].src === src) { i = k; break; }
      abrir(i);
    });
    document.addEventListener('keydown', function (ev) {
      if (!visor || visor.hidden) return;
      if (ev.key === 'Escape') fechar();
      if (ev.key === 'ArrowLeft') ir(atual - 1);
      if (ev.key === 'ArrowRight') ir(atual + 1);
    });
  }
})();
