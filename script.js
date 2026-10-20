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

  // o visualizador da pagina Festas: toque na foto abre grande, setas e Esc navegam e fecham
  var galeria = document.querySelector('[data-galeria]');
  if (galeria) {
    var fotos = Array.prototype.map.call(galeria.querySelectorAll('[data-foto]'), function (b) { return { src: b.getAttribute('data-foto'), alt: b.querySelector('img').alt }; });
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
      abrir(Array.prototype.indexOf.call(galeria.querySelectorAll('[data-foto]'), b));
    });
    document.addEventListener('keydown', function (ev) {
      if (!visor || visor.hidden) return;
      if (ev.key === 'Escape') fechar();
      if (ev.key === 'ArrowLeft') ir(atual - 1);
      if (ev.key === 'ArrowRight') ir(atual + 1);
    });
  }
})();
