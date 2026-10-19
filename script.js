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

  // o item do menu acompanha a secao visivel
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  var secoes = ['inicio', 'sobre', 'festas', 'galeria', 'contato'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window && links.length) {
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
})();
