/* AMAR KHUNKHUN: behaviour. Plain JS, no framework, no network.
   Assigns window.AK. The real site can load this file as-is (main.js). */
(function () {
  'use strict';

  var reduced = function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  var ms = function (name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    var n = parseFloat(v);
    return isNaN(n) ? fallback : (/s$/.test(v) && !/ms$/.test(v) ? n * 1000 : n);
  };
  var wait = function (t) { return new Promise(function (r) { setTimeout(r, t); }); };
  var pad = function (n, w) { n = String(n); while (n.length < (w || 2)) n = '0' + n; return n; };

  /* ---------- Shutter ----------
     AK.shutter(el, { frame: 'FR 02', word: 'PHOTOS', onShut: fn }) -> Promise
     Close (dur-cut) -> slate holds (dur-hold) while onShut swaps the page -> open (dur-open). */
  function shutter(el, opts) {
    opts = opts || {};
    if (el.getAttribute('data-busy') === 'true') return Promise.resolve(false);
    el.setAttribute('data-busy', 'true');
    var frame = el.querySelector('.ak-shutter__frame');
    var word = el.querySelector('.ak-shutter__word');
    if (frame) frame.textContent = opts.frame || '';
    if (word) word.textContent = '';
    var cut = reduced() ? ms('--dur-fade', 200) : ms('--dur-cut', 220);
    var hold = reduced() ? 60 : ms('--dur-hold', 160);
    var open = reduced() ? ms('--dur-fade', 200) : ms('--dur-open', 260);
    el.setAttribute('data-state', 'closing');
    return wait(cut).then(function () {
      el.setAttribute('data-state', 'shut');
      var text = opts.word || '';
      var step = Math.max(12, Math.floor((hold * 0.6) / Math.max(text.length, 1)));
      if (word) {
        if (reduced()) word.textContent = text;
        else text.split('').forEach(function (ch, i) {
          setTimeout(function () { word.textContent += ch; }, i * step);
        });
      }
      return Promise.resolve(opts.onShut && opts.onShut()).then(function () { return wait(hold); });
    }).then(function () {
      el.setAttribute('data-state', 'opening');
      return wait(open);
    }).then(function () {
      el.setAttribute('data-state', 'idle');
      el.removeAttribute('data-busy');
      return true;
    });
  }

  /* ---------- Justified grid ----------
     Children carry data-ratio (width / height). Rows fill the width exactly,
     nothing is cropped, the last row keeps the target height. */
  function justify(container, opts) {
    opts = opts || {};
    function layout() {
      var W = container.clientWidth;
      if (!W) return;
      var narrow = W < 600;
      var target = opts.rowHeight ? opts.rowHeight(W) : (narrow ? 180 : 320);
      var gap = parseFloat(getComputedStyle(container).columnGap) || 8;
      var items = Array.prototype.slice.call(container.children);
      var row = [], sum = 0, lastH = target;
      function flush(last) {
        var gaps = gap * (row.length - 1);
        // last row: match the row above it so the grid ends evenly, but never stretch to fill
        var h = last ? Math.min(lastH, (W - gaps) / sum) : (W - gaps) / sum;
        if (!last) lastH = h;
        var used = 0;
        row.forEach(function (it, i) {
          var r = parseFloat(it.getAttribute('data-ratio')) || 1.5;
          var w = i === row.length - 1 && !last ? (W - gaps - used) : Math.floor(h * r);
          used += w;
          it.style.width = w + 'px';
          it.style.height = Math.round(h) + 'px';
        });
        row = []; sum = 0;
      }
      items.forEach(function (it) {
        var r = parseFloat(it.getAttribute('data-ratio')) || 1.5;
        row.push(it); sum += r;
        if (sum * target + gap * (row.length - 1) >= W) flush(false);
      });
      if (row.length) flush(true);
    }
    layout();
    if (window.ResizeObserver) new ResizeObserver(layout).observe(container);
    else window.addEventListener('resize', layout);
    return layout;
  }

  /* ---------- Lightbox ----------
     AK.lightbox(el, items) -> { open(i), close(), go(d) }
     items: [{ src, ratio, tone }]; tone is placeholder-only. */
  function lightbox(el, items) {
    var stage = el.querySelector('.ak-lightbox__stage');
    var counter = el.querySelector('.ak-lightbox__count');
    var idx = 0, lastFocus = null;
    function render() {
      var it = items[idx];
      var node;
      if (it.src) {
        node = document.createElement('img');
        node.src = it.src; node.alt = it.alt || '';
        node.decoding = 'async';
      } else {
        node = document.createElement('div');
        node.className = 'ak-ph';
        node.setAttribute('data-tone', it.tone || 'night');
        node.setAttribute('role', 'img');
        node.setAttribute('aria-label', 'Placeholder photo');
      }
      node.classList.add('ak-lightbox__img', 'is-in');
      node.style.setProperty('--r', it.ratio || 1.5);
      stage.innerHTML = '';
      stage.appendChild(node);
      if (counter) counter.textContent = pad(idx + 1) + ' / ' + pad(items.length);
      // preload neighbours so next/prev is instant
      [idx + 1, idx - 1].forEach(function (j) {
        var n = items[(j + items.length) % items.length];
        if (n && n.src) { var p = new Image(); p.src = n.src; }
      });
    }
    function go(d) { idx = (idx + d + items.length) % items.length; render(); }
    function open(i) {
      lastFocus = document.activeElement;
      idx = i || 0; render();
      el.setAttribute('data-open', 'true');
      el.setAttribute('aria-hidden', 'false');
      var c = el.querySelector('[data-ak="close"]'); if (c) c.focus();
    }
    function close() {
      el.setAttribute('data-open', 'false');
      el.setAttribute('aria-hidden', 'true');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    el.addEventListener('click', function (e) {
      var a = e.target.closest('[data-ak]');
      if (!a) return;
      var k = a.getAttribute('data-ak');
      if (k === 'close') close();
      if (k === 'prev') go(-1);
      if (k === 'next') go(1);
    });
    document.addEventListener('keydown', function (e) {
      if (el.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });
    var x0 = null;
    el.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    el.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    });
    return { open: open, close: close, go: go };
  }

  /* ---------- Hero scroll ----------
     Writes --p (0..1) on the hero as its stage scrolls through.
     scroller: window (site) or an element (preview). */
  function heroScroll(hero, scroller, onFrame) {
    scroller = scroller || window;
    // Browsers with CSS scroll-driven animations drive --p in styles.css; nothing to do here.
    if (scroller === window && !onFrame && window.CSS && CSS.supports('animation-timeline: view()')) return function () {};
    var ticking = false;
    function update() {
      ticking = false;
      var viewH = scroller === window ? window.innerHeight : scroller.clientHeight;
      var top = scroller === window
        ? -hero.getBoundingClientRect().top
        : hero.getBoundingClientRect().top * -1 + scroller.getBoundingClientRect().top;
      var range = hero.offsetHeight - viewH;
      var p = Math.min(1, Math.max(0, top / range));
      hero.style.setProperty('--p', p.toFixed(4));
      if (onFrame) onFrame(p);
    }
    (scroller === window ? window : scroller).addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
    return update;
  }

  /* ---------- Mobile menu ---------- */
  function menu(bar, panel) {
    var btn = bar.querySelector('.ak-bar__btn');
    function set(open) {
      bar.setAttribute('data-open', String(open));
      panel.setAttribute('data-open', String(open));
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    }
    btn.addEventListener('click', function () { set(bar.getAttribute('data-open') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    return set;
  }

  /* ---------- Video hover previews (fine pointers only) ---------- */
  function videoHover(root) {
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    Array.prototype.forEach.call(root.querySelectorAll('.ak-vtile'), function (t) {
      var v = t.querySelector('video.ak-vtile__preview');
      function on() {
        if (!fine || reduced()) return;
        t.classList.add('is-playing');
        if (v) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play && v.play().catch(function () {}); }
      }
      function off() {
        t.classList.remove('is-playing');
        if (v && v.pause) { v.pause(); v.currentTime = 0; }
      }
      t.addEventListener('mouseenter', on);
      t.addEventListener('mouseleave', off);
      t.addEventListener('focus', on);
      t.addEventListener('blur', off);
    });
  }

  window.AK = {
    shutter: shutter, justify: justify, lightbox: lightbox,
    heroScroll: heroScroll, menu: menu, videoHover: videoHover,
    reduced: reduced, pad: pad
  };
})();

/* ============================================================
   SITE: wires the components to media.js on every page.
   You shouldn't need to edit anything below.
   ============================================================ */
(function () {
  'use strict';
  var AK = window.AK, MEDIA = window.MEDIA || {}, LINKS = window.LINKS || {};
  var root = document.body.getAttribute('data-root') || '';
  var page = document.body.getAttribute('data-page');
  var url = function (p) { return !p ? '' : (/^(https?:)?\/\//.test(p) ? p : root + p); };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) {} }
  };
  var saveData = navigator.connection && navigator.connection.saveData;

  /* ---------- social links (from media.js) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-link]'), function (a) {
    var href = LINKS[a.getAttribute('data-link')];
    if (href) { a.href = href; a.target = '_blank'; a.rel = 'noopener'; }
  });

  /* ---------- mobile menu ---------- */
  var bar = $('.ak-bar'), menu = $('.ak-menu');
  if (bar && menu) AK.menu(bar, menu);

  /* ---------- shutter: incoming ---------- */
  var sh = $('.ak-shutter');
  function openIncoming() {
    var raw = store.get('ak-cut');
    store.del('ak-cut');
    if (!raw || !sh) { document.documentElement.classList.remove('ak-incoming'); return; }
    var cut = {};
    try { cut = JSON.parse(raw); } catch (e) {}
    $('.ak-shutter__frame', sh).textContent = cut.frame || '';
    $('.ak-shutter__word', sh).textContent = cut.word || '';
    sh.setAttribute('data-state', 'shut');
    document.documentElement.classList.remove('ak-incoming');
    setTimeout(function () {
      sh.setAttribute('data-state', 'opening');
      setTimeout(function () { sh.setAttribute('data-state', 'idle'); }, AK.reduced() ? 200 : 260);
    }, AK.reduced() ? 40 : 120);
  }
  openIncoming();
  // coming back with the browser's Back button: never stay shut
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && sh) { sh.setAttribute('data-state', 'idle'); sh.removeAttribute('data-busy'); }
  });

  /* ---------- shutter: outgoing ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-cut]');
    if (!a || !sh) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (a.getAttribute('aria-current') === 'page') { e.preventDefault(); return; }
    e.preventDefault();
    var href = a.href;
    var cut = { frame: 'FR ' + a.getAttribute('data-frame'), word: a.getAttribute('data-cut') };
    store.set('ak-cut', JSON.stringify(cut));
    AK.shutter(sh, { frame: cut.frame, word: cut.word, onShut: function () {
      window.location.href = href;
      return new Promise(function () {}); // stay shut while the next page loads
    }});
  });

  /* ---------- helpers ---------- */
  function loaded(img) {
    var on = function () { img.classList.add('is-loaded'); };
    if (img.complete && img.naturalWidth) on();
    else { img.addEventListener('load', on); img.addEventListener('error', on); }
  }
  function placeholder(el, tone) { el.classList.add('ak-ph'); el.setAttribute('data-tone', tone || 'night'); }
  function photoTile(p, i, onOpen) {
    var a = document.createElement('a');
    a.className = 'ak-tile';
    a.href = p.src ? url(p.src) : '#';
    a.setAttribute('data-ratio', p.ratio || 1.5);
    a.setAttribute('aria-label', 'Open ' + (p.alt || 'photo ' + (i + 1)));
    if (p.thumb || p.src) {
      var img = document.createElement('img');
      img.src = url(p.thumb || p.src); img.alt = p.alt || '';
      img.loading = 'lazy'; img.decoding = 'async';
      loaded(img);
      a.appendChild(img);
    } else placeholder(a, p.tone);
    if (onOpen) a.addEventListener('click', function (e) { e.preventDefault(); onOpen(i); });
    return a;
  }

  /* ---------- HOME ---------- */
  if (page === 'home') {
    var hero = $('.ak-hero'), vidSlot = $('.ak-hero__video');
    var h = MEDIA.hero || {};
    if (h.src && !saveData) {
      var v = document.createElement('video');
      v.className = 'ak-hero__video';
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.preload = 'metadata';
      if (h.poster) v.poster = url(h.poster);
      v.src = url(h.src);
      vidSlot.replaceWith(v);
      if (AK.reduced()) v.removeAttribute('autoplay');
      else v.play && v.play().catch(function () {});
    } else if (h.poster) {
      var im = document.createElement('img');
      im.className = 'ak-hero__video'; im.src = url(h.poster); im.alt = '';
      vidSlot.replaceWith(im);
    }
    var photos = MEDIA.photos || [];
    var feat = photos.filter(function (p) { return p.featured; });
    if (feat.length < 4) feat = feat.concat(photos.filter(function (p) { return !p.featured; })).slice(0, 4);
    var strip = $('.ak-hero__strip');
    feat.slice(0, 4).forEach(function (p) {
      var d = document.createElement('div');
      if (p.thumb || p.src) {
        d.style.background = 'var(--ground-raised) url("' + url(p.thumb || p.src) + '") center / cover no-repeat';
      } else placeholder(d, p.tone);
      strip.appendChild(d);
    });
    AK.heroScroll(hero, window);
  }

  /* ---------- PHOTOS ---------- */
  if (page === 'photos') {
    var list = MEDIA.photos || [];
    $('#count').textContent = list.length + ' frames';
    var grid = $('#grid'), lbEl = $('.ak-lightbox');
    var items = list.map(function (p) { return { src: url(p.src), ratio: p.ratio, tone: p.tone, alt: p.alt }; });
    var lb = AK.lightbox(lbEl, items);
    list.forEach(function (p, i) { grid.appendChild(photoTile(p, i, lb.open)); });
    AK.justify(grid);
  }

  /* ---------- VIDEOS ---------- */
  if (page === 'videos') {
    var vids = MEDIA.videos || [];
    $('#count').textContent = vids.length + ' clips';
    var player = $('.ak-player'), pFrame = $('.ak-player__frame'), pLabel = $('#p-label'), pTime = $('#p-time');
    var lastFocus = null;
    function openPlayer(v, n) {
      lastFocus = document.activeElement;
      pFrame.innerHTML = '';
      pFrame.style.setProperty('--r', v.ratio || 1.778);
      var el;
      if (v.src) {
        el = document.createElement('video');
        el.src = url(v.src); el.controls = true; el.playsInline = true; el.setAttribute('playsinline', '');
        el.muted = true; el.autoplay = true; el.preload = 'metadata';
        if (v.poster) el.poster = url(v.poster);
      } else {
        el = document.createElement('div');
        placeholder(el, v.tone); el.classList.add('ak-ph--moving');
        el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'Placeholder video');
      }
      pFrame.appendChild(el);
      pLabel.textContent = v.group === 'intro' ? 'Intro' : 'Clip';
      pTime.textContent = v.duration || '';
      player.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      $('[data-ak="close-player"]').focus();
    }
    function closePlayer() {
      var el = pFrame.querySelector('video');
      if (el) { el.pause(); el.removeAttribute('src'); el.load(); }
      pFrame.innerHTML = '';
      player.hidden = true;
      document.documentElement.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    $('[data-ak="close-player"]').addEventListener('click', closePlayer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !player.hidden) closePlayer(); });

    var intros = $('#intros'), clips = $('#clips');
    vids.forEach(function (v, i) {
      var a = document.createElement('a');
      a.className = 'ak-tile ak-vtile';
      a.href = v.src ? url(v.src) : '#';
      a.setAttribute('data-ratio', v.ratio || 1.778);
      a.setAttribute('aria-label', 'Play video ' + (i + 1));
      if (v.poster) {
        var im = document.createElement('img');
        im.src = url(v.poster); im.alt = ''; im.loading = 'lazy'; im.decoding = 'async';
        loaded(im);
        a.appendChild(im);
      } else placeholder(a, v.tone);
      if (v.preview) {
        var pv = document.createElement('video');
        pv.className = 'ak-vtile__preview';
        pv.muted = true; pv.loop = true; pv.playsInline = true; pv.preload = 'none';
        pv.setAttribute('muted', ''); pv.setAttribute('playsinline', '');
        pv.dataset.src = url(v.preview);
        a.appendChild(pv);
      } else {
        var ph = document.createElement('div');
        ph.className = 'ak-vtile__preview ak-ph ak-ph--moving';
        ph.setAttribute('data-tone', v.tone || 'neon');
        a.appendChild(ph);
      }
      var meta = document.createElement('div');
      meta.className = 'ak-vtile__meta';
      meta.innerHTML = '<span class="ak-counter"></span>';
      meta.children[0].textContent = v.duration || '';
      meta.style.justifyContent = 'flex-end';
      a.appendChild(meta);
      a.addEventListener('click', function (e) { e.preventDefault(); openPlayer(v, i + 1); });
      (v.group === 'intro' ? intros : clips).appendChild(a);
    });
    [intros, clips].forEach(function (g) {
      if (!g.children.length) g.closest('section').hidden = true;
      else AK.justify(g, { rowHeight: function (w) { return w < 600 ? 180 : 260; } });
    });
    AK.videoHover(document);
  }

  /* ---------- ABOUT ---------- */
  if (page === 'about') {
    var slot = $('.ak-about__portrait'), pic = (MEDIA.about || {}).portrait;
    if (pic) {
      var img = document.createElement('img');
      img.className = 'ak-about__portrait'; img.src = url(pic); img.alt = 'Amar Khunkhun';
      img.loading = 'lazy'; img.decoding = 'async'; img.style.objectFit = 'cover';
      slot.replaceWith(img);
    }
  }
})();
