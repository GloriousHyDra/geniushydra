/* GeniusHydra — seasonal themes (Halloween, New Year, Chinese New Year) */
(function () {
	'use strict';

	// Chinese New Year dates (lunar) per year, +/- 7 days window
	var CNY = {
		2025: [1, 29],
		2026: [2, 17],
		2027: [2, 6],
		2028: [1, 26],
		2029: [2, 13],
		2030: [2, 3]
	};

	function currentSeason() {
		var now = new Date();
		var m = now.getMonth() + 1; // 1..12
		var d = now.getDate();
		var y = now.getFullYear();

		// Halloween: Oct 24 – Nov 1
		if ((m === 10 && d >= 24) || (m === 11 && d <= 1)) {
			return { id: 'halloween', emoji: '🎃' };
		}

		// Chinese New Year
		var cny = CNY[y];
		if (cny) {
			var start = new Date(y, cny[0] - 1, cny[1] - 7);
			var end = new Date(y, cny[0] - 1, cny[1] + 7);
			if (now >= start && now <= end) {
				return { id: 'cny', emoji: '🧧' };
			}
		}

		// New Year / Christmas: Dec 20 – Jan 8
		if ((m === 12 && d >= 20) || (m === 1 && d <= 8)) {
			return { id: 'newyear', emoji: '🎄' };
		}

		return null;
	}

	var season = currentSeason();
	var emojiEl = document.querySelector('[data-season-emoji]');

	if (season) {
		document.documentElement.setAttribute('data-season', season.id);
		if (emojiEl) {
			emojiEl.textContent = season.emoji;
			emojiEl.hidden = false;
			emojiEl.title = season.id;
		}
	}
})();
