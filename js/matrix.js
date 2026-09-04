/* GeniusHydra — matrix rain background (toggleable) */
(function () {
	'use strict';

	var KEY = 'gh-matrix';
	var canvas = null;
	var ctx = null;
	var raf = null;
	var running = false;
	var cols = 0;
	var drops = [];
	var chars = 'アカサタナハマヤラワ0123456789ABCDEF<>/\\|{}[]#$%&*+=?';

	function init() {
		canvas = document.createElement('canvas');
		canvas.className = 'matrix-canvas';
		canvas.setAttribute('aria-hidden', 'true');
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		resize();
		window.addEventListener('resize', resize);
	}

	function resize() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		cols = Math.ceil(canvas.width / 14);
		drops = [];
		for (var i = 0; i < cols; i++) drops[i] = Math.random() * -60;
	}

	function draw() {
		if (!ctx) return;
		ctx.fillStyle = 'rgba(5, 8, 6, 0.12)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#0f0';
		ctx.font = '14px monospace';
		for (var i = 0; i < cols; i++) {
			var ch = chars[Math.floor(Math.random() * chars.length)];
			ctx.fillText(ch, i * 14, drops[i] * 14);
			if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
			drops[i]++;
		}
		raf = requestAnimationFrame(draw);
	}

	function start() {
		if (running) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (!canvas) init();
		running = true;
		draw();
		try { localStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
	}

	function stop() {
		running = false;
		if (raf) { cancelAnimationFrame(raf); raf = null; }
		if (canvas) { canvas.remove(); canvas = null; ctx = null; }
		try { localStorage.setItem(KEY, '0'); } catch (e) { /* ignore */ }
	}

	function toggle() {
		if (running) stop(); else start();
		return running;
	}

	window.__matrix = {
		start: start,
		stop: stop,
		toggle: toggle,
		isOn: function () { return running; }
	};

	try { if (localStorage.getItem(KEY) === '1') start(); } catch (e) { /* ignore */ }
})();
