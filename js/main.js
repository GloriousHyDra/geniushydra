/* GeniusHydra — minimal progressive enhancement */

(function () {
	'use strict';

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ------------------------------------------------------------------
	 * 1. Image fallbacks — if an <img> fails, swap in the SVG icon/letter
	 *    (error events don't bubble, so we listen in the capture phase)
	 * ------------------------------------------------------------------ */
	document.addEventListener(
		'error',
		function (event) {
			const target = event.target;
			if (target instanceof HTMLImageElement) {
				const box = target.closest('.img-box');
				if (box) box.classList.add('is-failed');
			}
		},
		true
	);

	// Catch images that already failed before this script attached its listener.
	document.querySelectorAll('.img-box img').forEach(function (img) {
		if (img.complete && img.naturalWidth === 0) {
			const box = img.closest('.img-box');
			if (box) box.classList.add('is-failed');
		}
	});

	/* ------------------------------------------------------------------
	 * 2. Footer year
	 * ------------------------------------------------------------------ */
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	/* ------------------------------------------------------------------
	 * 3. Subtle mouse parallax on the aurora blobs
	 * ------------------------------------------------------------------ */
	if (!prefersReducedMotion) {
		const blobs = Array.from(document.querySelectorAll('.blob'));

		if (blobs.length && window.matchMedia('(pointer: fine)').matches) {
			window.addEventListener(
				'pointermove',
				function (event) {
					const nx = event.clientX / window.innerWidth - 0.5;
					const ny = event.clientY / window.innerHeight - 0.5;

					blobs.forEach(function (blob, index) {
						const depth = (index + 1) * 14;
						// Use the individual `translate` property so it composes
						// with the CSS `drift` animation (which owns `transform`).
						blob.style.translate =
							(nx * depth).toFixed(1) + 'px ' + (ny * depth).toFixed(1) + 'px';
					});
				},
				{ passive: true }
			);
		}
	}
})();
