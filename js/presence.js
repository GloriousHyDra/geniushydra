/* GeniusHydra — живой статус Discord через API Lanyard */
(function () {
	'use strict';

	var cfg = window.SITE_CONFIG || {};
	var discordId = cfg.discordId;
	var els = Array.from(document.querySelectorAll('[data-discord-status]'));
	if (!els.length) return;

	var STATUS_LABEL = { online: 'в сети', idle: 'отошёл', dnd: 'не беспокоить', offline: 'не в сети' };

	function render(el, state, text) {
		el.textContent = '';
		var dot = document.createElement('span');
		dot.className = 'status-dot ' + state;
		el.appendChild(dot);
		el.appendChild(document.createTextNode(text));
		el.hidden = false;
	}

	// Если Discord ID не указан, подсказка показывается только на необязательных элементах.
	if (!discordId) {
		els.forEach(function (el) {
			if (!el.hasAttribute('data-discord-optional')) {
				render(el, 'offline', 'Discord ID не указан — смотри config.js');
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

			var activities = d.activities || [];
			var custom = activities.filter(function (a) { return a.type === 4; })[0];
			var game = activities.filter(function (a) { return a.type === 0; })[0];

			var label = username;
			if (custom && custom.state) label = custom.state;
			else if (game && game.name) label = 'Играет в ' + game.name;

			var suffix = state === 'online' ? '' : ' · ' + STATUS_LABEL[state];
			els.forEach(function (el) { render(el, state, label + suffix); });
		})
		.catch(function () {
			els.forEach(function (el) { render(el, 'offline', 'Статус Discord недоступен'); });
		});
})();
