/* GeniusHydra — Steam profile summary + top games (via Cloudflare Worker proxy) */
(function () {
	'use strict';

	var containers = Array.from(document.querySelectorAll('[data-steam]'));
	if (!containers.length) return;

	var t = window.__t || function (k) { return k; };
	var cfg = window.SITE_CONFIG || {};
	var proxy = (cfg.steamProxy || '').replace(/\/+$/, '');
	var STEAM_ID = '76561198995484465';

	if (!proxy) {
		containers.forEach(function (el) { el.hidden = true; });
		return;
	}

	function fmt(mins) {
		return mins >= 60
			? Math.round(mins / 60) + ' ' + t('steam.hours')
			: mins + ' ' + t('steam.minutes');
	}

	function render() {
		fetch(proxy + '/summary')
			.then(function (res) { return res.json(); })
			.then(function (s) {
				if (s && s.error) throw new Error(s.error);

				containers.forEach(function (el) {
					el.textContent = '';

					// summary line
					var summary = document.createElement('div');
					summary.className = 'steam-summary';
					var bits = ['[steam]'];
					if (s.persona) bits.push(s.persona);
					bits.push(t('steam.level') + ' ' + (s.level || 0));
					bits.push((s.game_count || 0) + ' ' + t('steam.games'));
					bits.push(fmt(s.total_minutes || 0));
					summary.textContent = bits.join(' · ');
					el.appendChild(summary);

					// live status
					var status = document.createElement('div');
					status.className = 'steam-status';
					var dot = document.createElement('span');
					if (s.gameid) {
						dot.className = 'status-dot online';
						status.appendChild(dot);
						status.appendChild(document.createTextNode(t('steam.playing') + ': ' + (s.game || '')));
					} else if (s.state !== 0) {
						dot.className = 'status-dot online';
						status.appendChild(dot);
						status.appendChild(document.createTextNode(t('status.online')));
					} else {
						dot.className = 'status-dot offline';
						status.appendChild(dot);
						status.appendChild(document.createTextNode(t('status.offline')));
					}
					el.appendChild(status);

					// top games
					var top = s.top || [];
					if (top.length) {
						var title = document.createElement('div');
						title.className = 'steam-top-title';
						title.textContent = t('steam.top') + ':';
						el.appendChild(title);

						top.forEach(function (g) {
							var row = document.createElement('div');
							row.className = 'steam-game';
							var name = document.createElement('span');
							name.className = 'sg-name';
							name.textContent = g.name;
							var hours = document.createElement('span');
							hours.className = 'sg-hours';
							hours.textContent = fmt(g.minutes || 0);
							row.appendChild(name);
							row.appendChild(hours);
							el.appendChild(row);
						});
					}

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
