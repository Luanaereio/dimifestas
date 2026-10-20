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

  // o lookbook da pagina Festas: fotos deslizando na horizontal. Setas rolam, o contador acompanha a foto no
  // comeco da tela, a barra mostra o progresso, e no computador da para arrastar com o mouse.
  var lookbook = document.querySelector('[data-lookbook]');
  if (lookbook) {
    var faixa = lookbook.querySelector('ul');
    var itensL = faixa.children;
    var nL = document.querySelector('[data-lookbook-n]');
    var barraL = document.querySelector('[data-lookbook-barra]');
    function atualizarL() {
      var max = faixa.scrollWidth - faixa.clientWidth;
      if (barraL) barraL.style.width = (max > 0 ? Math.min(100, Math.max(0, (faixa.scrollLeft / max) * 100)) : 100) + '%';
      var esquerda = faixa.scrollLeft + parseFloat(getComputedStyle(faixa).paddingLeft || '0');
      var melhor = 0, dist = Infinity;
      for (var i = 0; i < itensL.length; i++) { var d = Math.abs(itensL[i].offsetLeft - esquerda); if (d < dist) { dist = d; melhor = i; } }
      if (max > 0 && faixa.scrollLeft >= max - 2) melhor = itensL.length - 1;
      if (nL) nL.textContent = (melhor + 1 < 10 ? '0' : '') + (melhor + 1);
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-lookbook-seta]'), function (b) {
      b.addEventListener('click', function () {
        var dir = b.getAttribute('data-lookbook-seta') === 'dir' ? 1 : -1;
        faixa.scrollBy({ left: dir * faixa.clientWidth * 0.7, behavior: 'smooth' });
      });
    });
    faixa.addEventListener('scroll', atualizarL, { passive: true });
    window.addEventListener('resize', atualizarL);
    var arr = { ativo: false, x: 0, s: 0, moveu: 0 };
    faixa.addEventListener('pointerdown', function (ev) { if (ev.pointerType !== 'mouse') return; arr.ativo = true; arr.x = ev.clientX; arr.s = faixa.scrollLeft; arr.moveu = 0; faixa.classList.add('arrastando'); });
    window.addEventListener('pointermove', function (ev) { if (!arr.ativo) return; var dx = ev.clientX - arr.x; arr.moveu = Math.max(arr.moveu, Math.abs(dx)); faixa.scrollLeft = arr.s - dx; });
    window.addEventListener('pointerup', function () { if (!arr.ativo) return; arr.ativo = false; faixa.classList.remove('arrastando'); });
    // depois de arrastar, o clique que solta o mouse nao abre a foto
    faixa.addEventListener('click', function (ev) { if (arr.moveu > 6) { ev.stopPropagation(); ev.preventDefault(); arr.moveu = 0; } }, true);
    atualizarL();
  }

  // o visualizador das paginas Festas e Brinquedao: toque na foto abre grande, setas e Esc navegam e fecham.
  // A lista e montada na hora de abrir, na ordem em que as fotos aparecem na pagina.
  var galeria = document.querySelector('[data-galeria]');
  if (galeria) {
    var fotos = [];
    function listarFotos() {
      fotos = Array.prototype.map.call(galeria.querySelectorAll('[data-foto]'), function (b) { var img = b.querySelector('img'); return { src: b.getAttribute('data-foto'), alt: (img && img.alt) || '' }; });
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
