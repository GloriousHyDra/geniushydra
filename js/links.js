/* GeniusHydra — рендер ссылок из links.json */
(function () {
	'use strict';

	var container = document.getElementById('links');
	if (!container) return;

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
				name.textContent = link.name;
				main.appendChild(name);

				if (link.subtitle) {
					var sub = document.createElement('span');
					sub.className = 'link-sub';
					sub.textContent = link.subtitle;
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

			container.appendChild(frag);
		})
		.catch(function (err) {
			container.innerHTML =
				'<p style="color:var(--muted);font-size:0.85rem">не удалось загрузить links.json (' + err.message + ')</p>';
		});
})();
