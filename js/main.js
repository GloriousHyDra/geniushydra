/* GeniusHydra — shared site behaviour */
(function () {
	'use strict';

	var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ------------------------------------------------------------------
	 * 1. Image fallbacks — if an <img> fails, swap in the SVG icon/letter
	 *    (error events don't bubble, so we listen in the capture phase)
	 * ------------------------------------------------------------------ */
	document.addEventListener(
		'error',
		function (event) {
			var target = event.target;
			if (target instanceof HTMLImageElement) {
				var box = target.closest('.img-box');
				if (box) box.classList.add('is-failed');
			}
		},
		true
	);

	// Also catch images that already failed before this script ran.
	// Exposed on window so links.js can call it after rendering.
	function markFailedImages(scope) {
		(scope || document).querySelectorAll('.img-box img').forEach(function (img) {
			if (img.complete && img.naturalWidth === 0) {
				var box = img.closest('.img-box');
				if (box) box.classList.add('is-failed');
			}
		});
	}
	markFailedImages();
	window.__markFailedImages = markFailedImages;

	/* ------------------------------------------------------------------
	 * 2. Accent theme switcher (persisted in localStorage)
	 * ------------------------------------------------------------------ */
	var ACCENT_KEY = 'gh-accent';
	var dots = Array.from(document.querySelectorAll('.accent-dot'));

	function applyAccent(accent) {
		document.documentElement.setAttribute('data-accent', accent);
		dots.forEach(function (dot) {
			dot.classList.toggle('active', dot.getAttribute('data-accent') === accent);
		});
		try { localStorage.setItem(ACCENT_KEY, accent); } catch (e) { /* ignore */ }
	}

	var saved = 'violet';
	try { saved = localStorage.getItem(ACCENT_KEY) || 'violet'; } catch (e) { /* ignore */ }
	applyAccent(saved);

	dots.forEach(function (dot) {
		dot.addEventListener('click', function () {
			applyAccent(dot.getAttribute('data-accent'));
		});
	});

	/* ------------------------------------------------------------------
	 * 3. Highlight the current page in the nav
	 * ------------------------------------------------------------------ */
	var here = location.pathname.split('/').pop() || 'index.html';
	document.querySelectorAll('.nav-links a').forEach(function (a) {
		var href = a.getAttribute('href');
		var page = href === '/' ? 'index.html' : href.replace(/^\//, '');
		if (page === here) a.classList.add('active');
	});

	/* ------------------------------------------------------------------
	 * 4. Footer year
	 * ------------------------------------------------------------------ */
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	/* ------------------------------------------------------------------
	 * 5. Copy-to-clipboard buttons
	 * ------------------------------------------------------------------ */
	var cfg = window.SITE_CONFIG || {};
	var usernames = cfg.usernames || {};

	function legacyCopy(text, done) {
		var ta = document.createElement('textarea');
		ta.value = text;
		ta.setAttribute('readonly', '');
		ta.style.position = 'fixed';
		ta.style.opacity = '0';
		document.body.appendChild(ta);
		ta.select();
		try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
		document.body.removeChild(ta);
	}

	document.querySelectorAll('[data-copy-key]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var value = usernames[btn.getAttribute('data-copy-key')];
			if (!value) return;

			var original = btn.innerHTML;
			function done() {
				btn.classList.add('copied');
				btn.textContent = '✓ Скопировано';
				setTimeout(function () {
					btn.classList.remove('copied');
					btn.innerHTML = original;
				}, 1500);
			}

			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(value).then(done).catch(function () {
					legacyCopy(value, done);
				});
			} else {
				legacyCopy(value, done);
			}
		});
	});

	/* ------------------------------------------------------------------
	 * 6. Subtle mouse parallax on the aurora blobs (home page only)
	 * ------------------------------------------------------------------ */
	if (!prefersReducedMotion) {
		var blobs = Array.from(document.querySelectorAll('.blob'));

		if (blobs.length && window.matchMedia('(pointer: fine)').matches) {
			window.addEventListener(
				'pointermove',
				function (event) {
					var nx = event.clientX / window.innerWidth - 0.5;
					var ny = event.clientY / window.innerHeight - 0.5;

					blobs.forEach(function (blob, index) {
						var depth = (index + 1) * 14;
						// `translate` composes with the CSS `drift` animation (which owns `transform`).
						blob.style.translate =
							(nx * depth).toFixed(1) + 'px ' + (ny * depth).toFixed(1) + 'px';
					});
				},
				{ passive: true }
			);
		}
	}
})();
