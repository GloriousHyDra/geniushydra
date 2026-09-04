/* GeniusHydra — рендер ссылок из links.json */
(function () {
	'use strict';

	var container = document.getElementById('links');
	if (!container) return;

	var getLang = window.__getLang || function () { return 'ru'; };

	function render() {
		var lang = getLang();

		fetch('links.json')
			.then(function (res) {
				if (!res.ok) throw new Error('links.json returned ' + res.status);
				return res.json();
			})
			.then(function (links) {
				var frag = document.createDocumentFragment();

				links.forEach(function (link, index) {
					var a = document.createElement('a');
					a.className = 'link-row reveal';
					a.href = link.url;
					a.target = '_blank';
					a.rel = 'noopener noreferrer';
					a.style.setProperty('--i', index);

					var idx = document.createElement('span');
					idx.className = 'link-index';
					idx.textContent = String(index + 1).padStart(2, '0');

					var main = document.createElement('span');
					main.className = 'link-main';

					var name = document.createElement('span');
					name.className = 'link-name';
					name.textContent = lang === 'en' ? (link.name_en || link.name) : link.name;
					main.appendChild(name);

					var subtitle = lang === 'en' ? (link.subtitle_en || link.subtitle) : link.subtitle;
					if (subtitle) {
						var sub = document.createElement('span');
						sub.className = 'link-sub';
						sub.textContent = subtitle;
						main.appendChild(sub);
					}

					var tag = document.createElement('span');
					tag.className = 'link-tag';
					tag.textContent = '[' + link.platform + ']';

					var arrow = document.createElement('span');
					arrow.className = 'link-arrow';
					arrow.textContent = '↗';

					a.appendChild(idx);
					a.appendChild(main);
					a.appendChild(tag);
					a.appendChild(arrow);
					frag.appendChild(a);
				});

				container.textContent = '';
				container.appendChild(frag);
			})
			.catch(function (err) {
				container.textContent = '';
				var p = document.createElement('p');
				p.style.cssText = 'color:var(--muted);font-size:0.85rem';
				p.textContent = 'не удалось загрузить links.json (' + err.message + ')';
				container.appendChild(p);
			});
	}

	render();
	document.addEventListener('gh:lang', render);
})();
