/* GeniusHydra — boot sequence overlay (once per session, skippable) */
(function () {
	'use strict';

	var overlay = document.getElementById('boot-overlay');
	if (!overlay) return;

	try {
		if (sessionStorage.getItem('gh-booted') === '1') { overlay.remove(); return; }
	} catch (e) { /* ignore */ }

	if (new URLSearchParams(location.search).get('noboot') === '1') { overlay.remove(); return; }

	var lines = [
		'GENIUSHYDRA BIOS v1.0.0',
		'CPU : AMD Ryzen 7 9800X3D ........ [OK]',
		'MEM : 32 GB DDR5-6000 ............ [OK]',
		'GPU : NVIDIA GeForce RTX 5070 .... [OK]',
		'NET : online .................... [OK]',
		'LOAD: genius@web ................ [OK]',
		'boot complete.'
	];

	var out = overlay.querySelector('.boot-output');
	var i = 0;
	var done = false;
	var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function finish() {
		if (done) return;
		done = true;
		try { sessionStorage.setItem('gh-booted', '1'); } catch (e) { /* ignore */ }
		overlay.classList.add('done');
		setTimeout(function () { overlay.remove(); }, 500);
	}

	function typeNext() {
		if (done) return;
		if (i >= lines.length) { finish(); return; }
		var line = document.createElement('div');
		line.textContent = lines[i];
		out.appendChild(line);
		i++;
		if (reduced) { typeNext(); return; }
		setTimeout(typeNext, 130 + Math.random() * 150);
	}

	overlay.addEventListener('click', finish);
	window.addEventListener('keydown', function (e) {
		if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') finish();
	});

	typeNext();
})();
