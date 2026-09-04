/* GeniusHydra — seasonal themes + falling FX + preview panel */
(function () {
	'use strict';

	// Lunar holidays (dates change every year)
	var CNY = { 2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3] };
	var EASTER = { 2025: [4, 20], 2026: [4, 5], 2027: [3, 28], 2028: [4, 16], 2029: [4, 1], 2030: [4, 21] };

	var SEASONS = {
		halloween: { emoji: '🎃', fx: ['🎃', '🦇'] },
		newyear:   { emoji: '🎄', fx: ['❄️', '⛄'] },
		cny:       { emoji: '🧧', fx: ['🧧', '🏮'] },
		valentine: { emoji: '💘', fx: ['💖', '❤️', '💕'] },
		easter:    { emoji: '🐰', fx: ['🥚', '🐣', '🌷'] },
		birthday:  { emoji: '🎂', fx: ['🎉', '🎈', '✨'] }
	};

	function inWindow(y, m, day, base, span) {
		var d = new Date(y, m - 1, day);
		var start = new Date(y, base[0] - 1, base[1] - span);
		var end = new Date(y, base[0] - 1, base[1] + span);
		return d >= start && d <= end;
	}

	function seasonForDate(d) {
		var m = d.getMonth() + 1;
		var day = d.getDate();
		var y = d.getFullYear();

		if ((m === 10 && day >= 24) || (m === 11 && day <= 1)) return 'halloween';
		if ((m === 12 && day >= 20) || (m === 1 && day <= 8)) return 'newyear';
		if (m === 2 && day >= 12 && day <= 16) return 'valentine';
		if (CNY[y] && inWindow(y, m, day, CNY[y], 7)) return 'cny';
		if (EASTER[y] && inWindow(y, m, day, EASTER[y], 7)) return 'easter';
		if (m === 11 && day >= 26 && day <= 30) return 'birthday';

		return null;
	}

	/* ---------- falling emoji FX ---------- */

	var fxTimer = null;
	var fxContainer = null;

	function stopFX() {
		if (fxTimer) { clearInterval(fxTimer); fxTimer = null; }
		if (fxContainer) { fxContainer.remove(); fxContainer = null; }
	}

	function startFX(emojiList) {
		stopFX();
		if (!emojiList || !emojiList.length) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		fxContainer = document.createElement('div');
		fxContainer.className = 'fx-container';
		fxContainer.setAttribute('aria-hidden', 'true');
		document.body.appendChild(fxContainer);

		function spawn() {
			var el = document.createElement('span');
			el.className = 'fx-particle';
			el.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
			el.style.left = (Math.random() * 100).toFixed(2) + 'vw';
			el.style.fontSize = (14 + Math.random() * 22).toFixed(0) + 'px';
			el.style.animationDuration = (6 + Math.random() * 5).toFixed(2) + 's';
			el.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
			fxContainer.appendChild(el);
			el.addEventListener('animationend', function () { el.remove(); });
		}

		spawn();
		fxTimer = setInterval(spawn, 600);
	}

	/* ---------- apply / remove a season ---------- */

	function applySeason(id) {
		stopFX();
		var emojiEl = document.querySelector('[data-season-emoji]');

		if (id && SEASONS[id]) {
			document.documentElement.setAttribute('data-season', id);
			if (emojiEl) { emojiEl.textContent = SEASONS[id].emoji; emojiEl.hidden = false; }
			startFX(SEASONS[id].fx);
		} else {
			document.documentElement.removeAttribute('data-season');
			if (emojiEl) { emojiEl.textContent = ''; emojiEl.hidden = true; }
		}
	}

	/* ---------- preview panel (?preview=1 or ?season=…) ---------- */

	function setupPreview(activeId) {
		var panel = document.createElement('div');
		panel.className = 'preview-panel';

		var ids = ['auto'].concat(Object.keys(SEASONS));
		ids.forEach(function (id) {
			var b = document.createElement('button');
			b.type = 'button';
			b.className = 'preview-btn';
			b.textContent = id === 'auto' ? 'auto' : SEASONS[id].emoji + ' ' + id;
			if ((id === 'auto' && !activeId) || id === activeId) b.classList.add('active');

			b.addEventListener('click', function () {
				applySeason(id === 'auto' ? seasonForDate(new Date()) : id);
				panel.querySelectorAll('.preview-btn').forEach(function (x) { x.classList.remove('active'); });
				b.classList.add('active');
			});

			panel.appendChild(b);
		});

		document.body.appendChild(panel);
	}

	/* ---------- init ---------- */

	var params = new URLSearchParams(location.search);
	var forced = params.get('season');
	var preview = params.get('preview') === '1';

	var season = null;
	if (forced && SEASONS[forced]) {
		season = forced;
	} else if (forced !== 'auto') {
		season = seasonForDate(new Date());
	}

	if (season) applySeason(season);

	if (preview || (forced && SEASONS[forced])) setupPreview(season);
})();
