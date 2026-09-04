/* GeniusHydra — Discord status, activities and Spotify now-playing via Lanyard */
(function () {
	'use strict';

	var t = window.__t || function (k) { return k; };

	var cfg = window.SITE_CONFIG || {};
	var discordId = cfg.discordId;
	var statusEls = Array.from(document.querySelectorAll('[data-discord-status]'));
	var listEls = Array.from(document.querySelectorAll('[data-discord-activities]'));
	var spotifyEls = Array.from(document.querySelectorAll('[data-spotify]'));
	if (!statusEls.length && !listEls.length && !spotifyEls.length) return;

	var TYPE_ORDER = { 0: 0, 1: 1, 3: 2, 5: 3, 2: 4, 4: 5 };
	var spotifyTimer = null;

	function statusLabel(state) {
		return t('status.' + state);
	}

	function setStatus(el, state, text) {
		el.textContent = '';
		var dot = document.createElement('span');
		dot.className = 'status-dot ' + state;
		el.appendChild(dot);
		el.appendChild(document.createTextNode(text));
		el.hidden = false;
	}

	function activityInfo(a) {
		switch (a.type) {
			case 0: return { tag: 'playing', full: t('act.playing') + (a.name || '…'), label: a.name || '', detail: a.details || '' };
			case 1: return { tag: 'streaming', full: t('act.streaming') + (a.name || a.details || ''), label: a.name || a.details || '', detail: a.state || '' };
			case 2: return { tag: 'listening', full: t('act.listening') + (a.details || a.name || ''), label: a.details || a.name || '', detail: a.state || '' };
			case 3: return { tag: 'watching', full: t('act.watching') + (a.name || ''), label: a.name || '', detail: '' };
			case 4: return { tag: 'status', full: a.state || t('act.status'), label: a.state || '', detail: '' };
			case 5: return { tag: 'competing', full: t('act.competing') + (a.name || ''), label: a.name || '', detail: '' };
			default: return { tag: '', full: a.name || a.state || '', label: a.name || a.state || '', detail: '' };
		}
	}

	function renderList(el, activities, spotify) {
		el.textContent = '';
		activities.forEach(function (a) {
			var info = activityInfo(a);
			var artUrl = a.type === 2 && spotify && spotify.album_art_url ? spotify.album_art_url : null;

			var item = document.createElement('div');
			item.className = 'activity-item';

			if (artUrl) {
				var art = document.createElement('img');
				art.className = 'act-art';
				art.alt = '';
				art.loading = 'lazy';
				art.onerror = function () { art.remove(); };
				art.src = artUrl;
				item.appendChild(art);
			}

			if (info.tag) {
				var tag = document.createElement('span');
				tag.className = 'act-tag';
				tag.textContent = '[' + info.tag + ']';
				item.appendChild(tag);
			}

			var text = document.createElement('span');
			text.className = 'act-text';

			var label = document.createElement('span');
			label.className = 'act-label';
			label.textContent = info.label;
			text.appendChild(label);

			if (info.detail) {
				var detail = document.createElement('span');
				detail.className = 'act-detail';
				detail.textContent = info.detail;
				text.appendChild(detail);
			}

			item.appendChild(text);
			el.appendChild(item);
		});
		el.hidden = false;
	}

	function formatTime(ms) {
		var s = Math.max(0, Math.floor(ms / 1000));
		var m = Math.floor(s / 60);
		s = s % 60;
		return m + ':' + (s < 10 ? '0' : '') + s;
	}

	function renderSpotify(s) {
		if (spotifyTimer) { clearInterval(spotifyTimer); spotifyTimer = null; }

		if (!s || !s.song) {
			spotifyEls.forEach(function (el) { el.hidden = true; el.textContent = ''; });
			return;
		}

		var start = s.timestamps && s.timestamps.start ? s.timestamps.start : Date.now();
		var end = s.timestamps && s.timestamps.end ? s.timestamps.end : start + 180000;

		spotifyEls.forEach(function (el) {
			el.textContent = '';
			el.className = 'spotify-card';

			if (s.album_art_url) {
				var img = document.createElement('img');
				img.className = 'spotify-art';
				img.alt = '';
				img.loading = 'lazy';
				img.onerror = function () { img.remove(); };
				img.src = s.album_art_url;
				el.appendChild(img);
			}

			var info = document.createElement('div');
			info.className = 'spotify-info';

			var song = document.createElement('div');
			song.className = 'spotify-song';
			song.textContent = s.song;
			info.appendChild(song);

			if (s.artist) {
				var artist = document.createElement('div');
				artist.className = 'spotify-artist';
				artist.textContent = s.artist;
				info.appendChild(artist);
			}

			var bar = document.createElement('div');
			bar.className = 'spotify-bar';
			var progress = document.createElement('div');
			progress.className = 'spotify-progress';
			bar.appendChild(progress);
			info.appendChild(bar);

			var times = document.createElement('div');
			times.className = 'spotify-times';
			var nowT = document.createElement('span');
			nowT.className = 'spotify-now';
			var totalT = document.createElement('span');
			totalT.className = 'spotify-total';
			totalT.textContent = formatTime(end - start);
			times.appendChild(nowT);
			times.appendChild(totalT);
			info.appendChild(times);

			el.appendChild(info);
			el.hidden = false;

			el._progress = progress;
			el._now = nowT;
			el._start = start;
			el._end = end;
		});

		function tick() {
			var now = Date.now();
			spotifyEls.forEach(function (el) {
				if (!el._progress) return;
				var pct = Math.min(100, Math.max(0, ((now - el._start) / (el._end - el._start)) * 100));
				el._progress.style.width = pct + '%';
				el._now.textContent = formatTime(now - el._start);
			});
		}

		tick();
		spotifyTimer = setInterval(tick, 1000);
	}

	function load() {
		if (!discordId) {
			statusEls.forEach(function (el) {
				if (!el.hasAttribute('data-discord-optional')) {
					setStatus(el, 'offline', t('status.notset'));
				}
			});
			renderSpotify(null);
			return;
		}

		fetch('https://api.lanyard.rest/v1/users/' + discordId)
			.then(function (res) { return res.json(); })
			.then(function (data) {
				if (!data || !data.success) throw new Error('lanyard');

				var d = data.data;
				var state = ['online', 'idle', 'dnd'].indexOf(d.discord_status) !== -1
					? d.discord_status
					: 'offline';

				var username = d.discord_user && d.discord_user.username
					? d.discord_user.username
					: 'Discord';

				var spotify = d.spotify || null;

				var activities = (d.activities || []).slice().sort(function (a, b) {
					var oa = TYPE_ORDER[a.type] !== undefined ? TYPE_ORDER[a.type] : 9;
					var ob = TYPE_ORDER[b.type] !== undefined ? TYPE_ORDER[b.type] : 9;
					return oa - ob;
				});

				var custom = activities.filter(function (a) { return a.type === 4; })[0];
				var game = activities.filter(function (a) { return a.type === 0; })[0];
				var primary = custom || game || activities[0];

				var label = username;
				if (primary) label = activityInfo(primary).full;

				var suffix = state === 'online' ? '' : ' · ' + statusLabel(state);
				statusEls.forEach(function (el) { setStatus(el, state, label + suffix); });

				if (activities.length) {
					listEls.forEach(function (el) { renderList(el, activities, spotify); });
				}

				renderSpotify(spotify);
			})
			.catch(function () {
				statusEls.forEach(function (el) { setStatus(el, 'offline', t('status.unavailable')); });
				renderSpotify(null);
			});
	}

	load();
	document.addEventListener('gh:lang', load);
})();
