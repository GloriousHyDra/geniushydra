/* GeniusHydra — render the link cards from links.json */
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
				a.className = 'link-card reveal';
				a.href = link.url;
				a.target = '_blank';
				a.rel = 'noopener noreferrer';
				a.style.setProperty('--accent', link.accent);
				a.style.setProperty('--i', index);

				// Static template (structure only — text is set safely below).
				a.innerHTML =
					'<span class="link-icon img-box">' +
						'<img alt="" loading="lazy" />' +
						'<svg class="img-fallback" viewBox="0 0 24 24"><use href="#icon-' + link.platform + '" /></svg>' +
						'<span class="platform-badge platform-' + link.platform + '" aria-hidden="true">' +
							'<svg viewBox="0 0 24 24"><use href="#icon-' + link.platform + '" /></svg>' +
						'</span>' +
					'</span>' +
					'<span class="link-text">' +
						'<span class="link-name"></span>' +
						'<span class="link-subtitle"></span>' +
					'</span>' +
					'<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>';

				a.querySelector('.link-icon img').src = link.icon;
				a.querySelector('.link-name').textContent = link.name;
				if (link.subtitle) a.querySelector('.link-subtitle').textContent = link.subtitle;

				frag.appendChild(a);
			});

			container.appendChild(frag);
			if (window.__markFailedImages) window.__markFailedImages(container);
		})
		.catch(function (err) {
			container.innerHTML =
				'<p style="color:#9aa0b4;font-size:0.9rem">Could not load links (' + err.message + ').</p>';
		});
})();
