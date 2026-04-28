(function () {
  'use strict';

  var THRESHOLD = 80;

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('modalOverlay');
    var modal = document.getElementById('modal');
    if (!overlay || !modal) return;

    var startY = 0;
    var dy = 0;
    var dragging = false;
    var allowed = false;

    function isTouchEvent(e) {
      return e && e.touches && e.touches.length > 0;
    }

    function reset() {
      dragging = false;
      allowed = false;
      dy = 0;
      modal.style.transition = '';
      modal.style.transform = '';
    }

    function doClose() {
      modal.style.transition = '';
      modal.style.transform = '';
      if (typeof window.closeModal === 'function') {
        try { window.closeModal(); } catch (_) {
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }
      } else {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    modal.addEventListener('touchstart', function (e) {
      if (!isTouchEvent(e)) return;
      if (!overlay.classList.contains('open')) return;
      var t = e.touches[0];
      var onHandle = e.target && e.target.closest && e.target.closest('.modal-handle');
      // モーダル内スクロール中は発火しない（スクロール最上部 or ハンドル直接タップのみ許可）
      allowed = !!onHandle || modal.scrollTop <= 0;
      startY = t.clientY;
      dy = 0;
      dragging = false;
    }, { passive: true });

    modal.addEventListener('touchmove', function (e) {
      if (!isTouchEvent(e)) return;
      if (!allowed) return;
      var t = e.touches[0];
      dy = t.clientY - startY;
      if (dy <= 0) {
        // 上方向は無視（途中で上に戻った場合は元位置へ）
        if (dragging) {
          modal.style.transform = '';
        }
        return;
      }
      if (!dragging) {
        dragging = true;
        modal.style.transition = 'none';
      }
      // ドラッグ中はネイティブスクロールを抑制
      if (e.cancelable) e.preventDefault();
      modal.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: false });

    function endDrag() {
      if (!dragging) {
        reset();
        return;
      }
      var shouldClose = dy >= THRESHOLD;
      if (shouldClose) {
        doClose();
      } else {
        modal.style.transition = '';
        modal.style.transform = '';
      }
      dragging = false;
      allowed = false;
      dy = 0;
    }

    modal.addEventListener('touchend', endDrag, { passive: true });
    modal.addEventListener('touchcancel', endDrag, { passive: true });
  });
})();
