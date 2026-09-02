/* GeniusHydra — gallery lightbox */
(function () {
	'use strict';

	var items = Array.from(document.querySelectorAll('.gallery-item'));
	if (!items.length) return;

	var lb = document.createElement('div');
	lb.className = 'lightbox';
	lb.setAttribute('role', 'dialog');
	lb.setAttribute('aria-label', 'Image viewer');
	lb.innerHTML = '<button class="lb-close" aria-label="Close">×</button><img alt="" />';
	document.body.appendChild(lb);

	var img = lb.querySelector('img');

	function open(src) {
		img.src = src;
		lb.classList.add('open');
		document.body.style.overflow = 'hidden';
	}

	function close() {
		lb.classList.remove('open');
		document.body.style.overflow = '';
		img.removeAttribute('src');
	}

	items.forEach(function (item) {
		var im = item.querySelector('img');
		if (!im) return;
		item.addEventListener('click', function () { open(im.src); });
	});

	lb.addEventListener('click', function (event) {
		if (event.target === lb || event.target.classList.contains('lb-close')) close();
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') close();
	});
})();
