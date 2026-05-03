/* ══ CONTACT FORM ═══════════════════════════ */
(function () {
  'use strict';

  var formData = {
    name: '', company: '', email: '', category: [],
    budget: '', deadline: '', message: '', privacy: false
  };
  var touched = {};

  var validators = {
    name:     function (v) { return v.trim().length >= 2; },
    company:  function ()  { return true; },
    email:    function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
    category: function (v) { return v.length > 0; },
    budget:   function ()  { return true; },
    deadline: function ()  { return true; },
    message:  function (v) { return v.trim().length >= 10; },
    privacy:  function (v) { return !!v; }
  };

  var REQUIRED = ['name', 'email', 'category', 'message', 'privacy'];

  var PROGRESS_ITEMS = [
    { k: 'name',     label: 'Name' },
    { k: 'company',  label: 'Company' },
    { k: 'email',    label: 'Email' },
    { k: 'category', label: 'Project' },
    { k: 'budget',   label: 'Budget' },
    { k: 'deadline', label: 'Deadline' },
    { k: 'message',  label: 'Message' },
    { k: 'privacy',  label: 'Consent' }
  ];

  var TICK_SVG = '<svg width="9" height="9" viewBox="0 0 10 10"><path d="M1.5 5.5L4 8L8.5 2.5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function isFilled(k) {
    var v = formData[k];
    if (k === 'privacy') return !!v;
    if (Array.isArray(v)) return v.length > 0;
    return !!v;
  }

  function allValid() {
    for (var i = 0; i < REQUIRED.length; i++) {
      if (!validators[REQUIRED[i]](formData[REQUIRED[i]])) return false;
    }
    return true;
  }

  /* ── Progress sidebar ── */
  function buildProgress() {
    var container = document.getElementById('ct-progress');
    if (!container) return;
    PROGRESS_ITEMS.forEach(function (item, i) {
      var el = document.createElement('div');
      el.className = 'ct-prog';
      el.setAttribute('data-prog', item.k);

      var n = document.createElement('span');
      n.className = 'ct-prog-n';
      n.textContent = '0' + (i + 1);

      var lbl = document.createElement('span');
      lbl.textContent = item.label;

      var tick = document.createElement('span');
      tick.className = 'ct-prog-tick';

      el.appendChild(n);
      el.appendChild(lbl);
      el.appendChild(tick);
      container.appendChild(el);
    });
  }

  function updateProgress() {
    PROGRESS_ITEMS.forEach(function (item) {
      var el = document.querySelector('[data-prog="' + item.k + '"]');
      if (!el) return;
      var filled = isFilled(item.k);
      el.classList.toggle('on', filled);
      var tick = el.querySelector('.ct-prog-tick');
      if (filled) {
        tick.innerHTML = TICK_SVG;
      } else {
        tick.textContent = '';
      }
    });
  }

  /* ── Field status ── */
  function updateFieldStatus(k) {
    var fieldEl = document.querySelector('[data-key="' + k + '"]');
    if (!fieldEl) return;
    var statusEl = fieldEl.querySelector('.ct-status');
    if (!statusEl) return;

    if (!touched[k]) { statusEl.hidden = true; return; }

    var v = formData[k];
    var empty = Array.isArray(v) ? v.length === 0 : !v;
    if (empty && k !== 'company') { statusEl.hidden = true; return; }

    var valid = validators[k](v);
    statusEl.hidden = false;
    statusEl.classList.toggle('ct-ok', valid);
    statusEl.classList.toggle('ct-ng', !valid);

    var ic = statusEl.querySelector('.ct-status-ic');
    ic.textContent = valid ? '✓' : '!';

    var txt = statusEl.querySelector('.ct-status-text');
    if (k === 'category' && valid) {
      txt.textContent = formData.category.length + ' selected';
    } else {
      txt.textContent = valid ? 'OK' : '未入力です';
    }
  }

  function updateSubmitButton() {
    var btn = document.getElementById('ct-submit');
    if (btn) btn.disabled = !allValid();
  }

  /* ── Field events ── */
  function setupField(fieldEl) {
    var k = fieldEl.getAttribute('data-key');
    var input = fieldEl.querySelector('input[type=text], input[type=email], input[type=date], textarea, select');
    if (!input) return;

    input.addEventListener('focus', function () {
      fieldEl.classList.add('ct-focused');
      touched[k] = true;
    });

    input.addEventListener('blur', function () {
      fieldEl.classList.remove('ct-focused');
      updateFieldStatus(k);
    });

    input.addEventListener('input', function () {
      formData[k] = input.value;
      fieldEl.classList.toggle('ct-filled', !!input.value);
      updateFieldStatus(k);
      updateProgress();
      updateSubmitButton();
    });

    if (input.tagName === 'SELECT') {
      input.addEventListener('change', function () {
        formData[k] = input.value;
        fieldEl.classList.toggle('ct-filled', !!input.value);
        touched[k] = true;
        updateFieldStatus(k);
        updateProgress();
        updateSubmitButton();
      });
    }
  }

  /* ── Chips ── */
  function setupChips() {
    var chips = document.querySelectorAll('.ct-chip');
    var hiddenInput = document.querySelector('input[name="category"]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var val = chip.getAttribute('data-value');
        var idx = formData.category.indexOf(val);
        if (idx >= 0) {
          formData.category.splice(idx, 1);
        } else {
          formData.category.push(val);
        }
        chip.classList.toggle('on', formData.category.indexOf(val) >= 0);
        if (hiddenInput) hiddenInput.value = formData.category.join(', ');
        touched.category = true;
        updateFieldStatus('category');
        updateProgress();
        updateSubmitButton();

        var fieldEl = document.querySelector('[data-key="category"]');
        if (fieldEl) fieldEl.classList.toggle('ct-filled', formData.category.length > 0);
      });
    });
  }

  /* ── Privacy ── */
  function setupPrivacy() {
    var el = document.getElementById('ct-privacy');
    if (!el) return;
    var svg = el.querySelector('svg');
    var hiddenInput = document.querySelector('input[name="privacy"]');

    el.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') return;
      formData.privacy = !formData.privacy;
      el.classList.toggle('on', formData.privacy);
      if (svg) svg.style.display = formData.privacy ? '' : 'none';
      if (hiddenInput) hiddenInput.value = formData.privacy ? 'agreed' : '';
      touched.privacy = true;
      updateProgress();
      updateSubmitButton();
    });
  }

  /* ── Submit ── */
  function setupSubmit() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!allValid()) return;

      var overlay = document.getElementById('ct-sending');
      var errorEl = document.getElementById('ct-error');
      if (errorEl) errorEl.hidden = true;
      if (overlay) overlay.classList.add('on');

      var fd = new URLSearchParams();
      fd.append('form-name', 'contact');
      fd.append('name', formData.name.trim());
      fd.append('company', formData.company.trim());
      fd.append('email', formData.email.trim());
      fd.append('category', formData.category.join(', '));
      fd.append('budget', formData.budget);
      fd.append('deadline', formData.deadline);
      fd.append('message', formData.message.trim());
      fd.append('privacy', 'agreed');

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: fd.toString()
      })
      .then(function (res) {
        if (!res.ok) throw new Error('送信に失敗しました');
        if (overlay) overlay.classList.remove('on');
        showSuccess();
      })
      .catch(function (err) {
        if (overlay) overlay.classList.remove('on');
        if (errorEl) {
          errorEl.textContent = err.message || '通信エラーが発生しました。時間をおいて再度お試しください。';
          errorEl.hidden = false;
        }
      });
    });
  }

  /* ── Success ── */
  function showSuccess() {
    var formSection = document.querySelector('.ct-page');
    var scrollInd = document.getElementById('ct-scroll-ind');
    var successSection = document.getElementById('ct-success');

    if (formSection) formSection.hidden = true;
    if (scrollInd) scrollInd.hidden = true;
    if (successSection) successSection.hidden = false;

    buildReceipt();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function buildReceipt() {
    var container = document.getElementById('ct-rcpt');
    if (!container) return;

    var rows = [
      ['FROM', formData.name || '—'],
      ['EMAIL', formData.email || '—'],
      ['PROJECT', formData.category.join(', ') || '—'],
      ['REF', '#' + Math.random().toString(36).slice(2, 8).toUpperCase()],
      ['SENT AT', new Date().toISOString().slice(0, 16).replace('T', ' ')]
    ];

    rows.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'ct-rcpt-row';

      var key = document.createElement('span');
      key.className = 'ct-rcpt-key';
      key.textContent = r[0];

      var val = document.createElement('span');
      val.className = 'ct-rcpt-val';
      val.textContent = r[1];

      row.appendChild(key);
      row.appendChild(val);
      container.appendChild(row);
    });
  }

  /* ── Scroll reveal (matches existing site pattern) ── */
  function setupReveal() {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('on');
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Init ── */
  function init() {
    buildProgress();

    document.querySelectorAll('.ct-field').forEach(function (el) {
      setupField(el);
    });

    setupChips();
    setupPrivacy();
    setupSubmit();
    setupReveal();
    updateSubmitButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
