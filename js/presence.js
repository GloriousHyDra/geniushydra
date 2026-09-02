/* GeniusHydra — живой статус Discord и список активностей через API Lanyard */
(function () {
	'use strict';

	var cfg = window.SITE_CONFIG || {};
	var discordId = cfg.discordId;
	var statusEls = Array.from(document.querySelectorAll('[data-discord-status]'));
	var listEls = Array.from(document.querySelectorAll('[data-discord-activities]'));
	if (!statusEls.length && !listEls.length) return;

	var STATUS_LABEL = { online: 'в сети', idle: 'отошёл', dnd: 'не беспокоить', offline: 'не в сети' };
	var TYPE_ORDER = { 0: 0, 1: 1, 3: 2, 5: 3, 2: 4, 4: 5 };

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
			case 0: return { icon: '🎮', label: 'Играет в ' + (a.name || 'игру'), detail: a.details || '' };
			case 1: return { icon: '📺', label: 'Стримит ' + (a.name || a.details || ''), detail: a.state || '' };
			case 2: return { icon: '🎧', label: 'Слушает — ' + (a.details || a.name || 'музыку'), detail: a.state || '' };
			case 3: return { icon: '🍿', label: 'Смотрит ' + (a.name || ''), detail: '' };
			case 4: return { icon: (a.emoji && a.emoji.name) ? a.emoji.name : '💬', label: a.state || 'Статус', detail: '' };
			case 5: return { icon: '🏆', label: 'Соревнуется в ' + (a.name || ''), detail: '' };
			default: return { icon: '', label: a.name || a.state || '', detail: '' };
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
			} else {
				var icon = document.createElement('span');
				icon.className = 'act-icon';
				icon.textContent = info.icon;
				item.appendChild(icon);
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

	if (!discordId) {
		statusEls.forEach(function (el) {
			if (!el.hasAttribute('data-discord-optional')) {
				setStatus(el, 'offline', 'Discord ID не указан — смотри config.js');
			}
		});
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

			// Главная активность для статусной строки
			var custom = activities.filter(function (a) { return a.type === 4; })[0];
			var game = activities.filter(function (a) { return a.type === 0; })[0];
			var primary = custom || game || activities[0];

			var label = username;
			if (primary) label = activityInfo(primary).label;

			var suffix = state === 'online' ? '' : ' · ' + STATUS_LABEL[state];
			statusEls.forEach(function (el) { setStatus(el, state, label + suffix); });

			if (activities.length) {
				listEls.forEach(function (el) { renderList(el, activities, spotify); });
			}
		})
		.catch(function () {
			statusEls.forEach(function (el) { setStatus(el, 'offline', 'Статус Discord недоступен'); });
		});
})();
