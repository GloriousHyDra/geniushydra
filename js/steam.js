/* GeniusHydra — Steam recently played (via /api/steam-recent proxy) */
(function () {
	'use strict';

	var containers = Array.from(document.querySelectorAll('[data-steam]'));
	if (!containers.length) return;

	var t = window.__t || function (k) { return k; };
	var STEAM_ID = '76561198995484465';

	function render() {
		fetch('/api/steam-recent?steamid=' + STEAM_ID + '&count=5')
			.then(function (res) { return res.json(); })
			.then(function (data) {
				if (data && data.error) throw new Error(data.error);
				var games = (data && data.response && data.response.games) || [];

				containers.forEach(function (el) {
					el.textContent = '';

					if (!games.length) {
						var p0 = document.createElement('p');
						p0.className = 'steam-empty';
						p0.textContent = t('steam.none');
						el.appendChild(p0);
						el.hidden = false;
						return;
					}

					games.forEach(function (g) {
						var row = document.createElement('div');
						row.className = 'steam-game';

						var name = document.createElement('span');
						name.className = 'sg-name';
						name.textContent = g.name;

						var hours = document.createElement('span');
						hours.className = 'sg-hours';
						hours.textContent = Math.round((g.playtime_forever || 0) / 60) + ' ' + t('steam.hours');

						row.appendChild(name);
						row.appendChild(hours);
						el.appendChild(row);
					});

					el.hidden = false;
				});
			})
			.catch(function () {
				containers.forEach(function (el) {
					el.textContent = '';
					var p = document.createElement('p');
					p.className = 'steam-empty';
					p.textContent = t('steam.error');
					el.appendChild(p);
					el.hidden = false;
				});
			});
	}

	render();
	document.addEventListener('gh:lang', render);
})();
