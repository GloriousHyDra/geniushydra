/* GeniusHydra — i18n (RU / EN) */
(function () {
	'use strict';

	var I18N = {
		ru: {
			"footer.note": "все системы работают",
			"accent.group": "Цвет фосфора",
			"accent.green": "Зелёный",
			"accent.amber": "Янтарный",
			"accent.cyan": "Голубой",
			"accent.red": "Красный",
			"accent.paper": "Белый",
			"copy.copied": "✓ Скопировано",
			"act.playing": "Играет в ",
			"act.streaming": "Стримит ",
			"act.listening": "Слушает — ",
			"act.watching": "Смотрит ",
			"act.competing": "Соревнуется в ",
			"act.status": "Статус",
			"status.online": "в сети",
			"status.idle": "отошёл",
			"status.dnd": "не беспокоить",
			"status.offline": "не в сети",
			"status.notset": "Discord ID не указан — смотри config.js",
			"status.unavailable": "Статус Discord недоступен",
			"about.title": "Обо мне",
			"about.lead": "Немного обо мне.",
			"about.who": "Кто я",
			"about.bio": "Привет, я GeniusHydra — обитаю в Discord, Telegram и Steam. [Замени это на короткую биографию: кто ты, чем занимаешься, что тебе интересно.]",
			"about.interests": "Чем увлекаюсь",
			"about.games": "Игры",
			"about.games.text": "[Во что играешь, любимые жанры, текущее увлечение.]",
			"about.other": "Прочее",
			"about.other.text": "[Что-нибудь ещё — музыка, стримы, проекты.]",
			"about.find": "Связаться со мной",
			"about.find.text": "Быстрее всего меня найти в Discord или Telegram.",
			"setup.title": "Сетап",
			"setup.lead": "Моё железо.",
			"setup.pc": "ПК",
			"setup.peripherals": "Периферия",
			"setup.software": "Софт",
			"spec.cpu": "Процессор",
			"spec.gpu": "Видеокарта",
			"spec.ram": "Оперативная память",
			"spec.storage": "Накопитель",
			"spec.motherboard": "Материнская плата",
			"spec.cooling": "Охлаждение",
			"spec.case": "Корпус",
			"spec.psu": "Блок питания",
			"spec.monitor1": "Монитор 1",
			"spec.monitor2": "Монитор 2",
			"spec.keyboard1": "Клавиатура 1",
			"spec.keyboard2": "Клавиатура 2",
			"spec.mouse": "Мышь",
			"spec.headphones": "Наушники",
			"spec.microphone": "Микрофон",
			"spec.chair": "Кресло",
			"spec.chair.value": "Jysk VARPELEV (чёрный mesh)",
			"spec.os": "ОС",
			"spec.browser": "Браузер",
			"spec.recording": "Запись",
			"spec.editing": "Монтаж",
			"spec.music": "Музыка",
			"spec.other": "Прочее",
			"gallery.title": "Галерея",
			"gallery.lead": "Клипы, скриншоты и моменты.",
			"presence.title": "Статус",
			"presence.lead": "Где я сейчас активен.",
			"presence.profiles": "Профили",
			"presence.active": "Сейчас активен",
			"presence.recent": "Недавно в Steam",
			"steam.hours": "ч.",
			"steam.none": "нет недавних игр",
			"steam.error": "Steam недоступен — проверь STEAM_API_KEY",
			"error.msg": "bash: cd: /this-path: Нет такого файла или каталога",
			"meta.index.title": "GeniusHydra",
			"meta.index.desc": "GeniusHydra — Discord, Telegram, Steam и не только.",
			"meta.about.title": "Обо мне — GeniusHydra",
			"meta.about.desc": "О GeniusHydra.",
			"meta.setup.title": "Сетап — GeniusHydra",
			"meta.setup.desc": "ПК и сетап GeniusHydra.",
			"meta.gallery.title": "Галерея — GeniusHydra",
			"meta.gallery.desc": "Клипы, скриншоты и моменты.",
			"meta.presence.title": "Статус — GeniusHydra",
			"meta.presence.desc": "Где GeniusHydra сейчас активен.",
			"meta.404.title": "Страница не найдена — GeniusHydra"
		},
		en: {
			"footer.note": "all systems operational",
			"accent.group": "Phosphor colour",
			"accent.green": "Green",
			"accent.amber": "Amber",
			"accent.cyan": "Cyan",
			"accent.red": "Red",
			"accent.paper": "White",
			"copy.copied": "✓ Copied",
			"act.playing": "Playing ",
			"act.streaming": "Streaming ",
			"act.listening": "Listening to ",
			"act.watching": "Watching ",
			"act.competing": "Competing in ",
			"act.status": "Status",
			"status.online": "online",
			"status.idle": "idle",
			"status.dnd": "dnd",
			"status.offline": "offline",
			"status.notset": "Discord ID not set — see config.js",
			"status.unavailable": "Discord status unavailable",
			"about.title": "About",
			"about.lead": "A few things about me.",
			"about.who": "Who I am",
			"about.bio": "Hey, I'm GeniusHydra — I hang out on Discord, Telegram and Steam. [Replace this with a short bio: who you are, what you do, what you're into.]",
			"about.interests": "What I'm into",
			"about.games": "Gaming",
			"about.games.text": "[Games you play, favourite genres, current obsession.]",
			"about.other": "Other",
			"about.other.text": "[Anything else — music, streams, projects.]",
			"about.find": "Find me",
			"about.find.text": "The fastest way to reach me is Discord or Telegram.",
			"setup.title": "Setup",
			"setup.lead": "My gear.",
			"setup.pc": "PC",
			"setup.peripherals": "Peripherals",
			"setup.software": "Software",
			"spec.cpu": "CPU",
			"spec.gpu": "GPU",
			"spec.ram": "RAM",
			"spec.storage": "Storage",
			"spec.motherboard": "Motherboard",
			"spec.cooling": "Cooling",
			"spec.case": "Case",
			"spec.psu": "PSU",
			"spec.monitor1": "Monitor 1",
			"spec.monitor2": "Monitor 2",
			"spec.keyboard1": "Keyboard 1",
			"spec.keyboard2": "Keyboard 2",
			"spec.mouse": "Mouse",
			"spec.headphones": "Headphones",
			"spec.microphone": "Microphone",
			"spec.chair": "Chair",
			"spec.chair.value": "Jysk VARPELEV (black mesh)",
			"spec.os": "OS",
			"spec.browser": "Browser",
			"spec.recording": "Recording",
			"spec.editing": "Editing",
			"spec.music": "Music",
			"spec.other": "Other",
			"gallery.title": "Gallery",
			"gallery.lead": "Clips, screenshots and moments.",
			"presence.title": "Presence",
			"presence.lead": "Where I'm active right now.",
			"presence.profiles": "Profiles",
			"presence.active": "Currently active",
			"presence.recent": "Recently played on Steam",
			"steam.hours": "h",
			"steam.none": "no recent games",
			"steam.error": "Steam unavailable — check STEAM_API_KEY",
			"error.msg": "bash: cd: /this-path: No such file or directory",
			"meta.index.title": "GeniusHydra",
			"meta.index.desc": "GeniusHydra — Discord, Telegram, Steam and more.",
			"meta.about.title": "About — GeniusHydra",
			"meta.about.desc": "About GeniusHydra.",
			"meta.setup.title": "Setup — GeniusHydra",
			"meta.setup.desc": "GeniusHydra's PC and setup.",
			"meta.gallery.title": "Gallery — GeniusHydra",
			"meta.gallery.desc": "Clips, screenshots and moments.",
			"meta.presence.title": "Presence — GeniusHydra",
			"meta.presence.desc": "Where GeniusHydra is active right now.",
			"meta.404.title": "Page not found — GeniusHydra"
		}
	};

	window.I18N = I18N;

	var LANG_KEY = 'gh-lang';
	var current = 'ru';

	function getInitialLang() {
		try {
			var saved = localStorage.getItem(LANG_KEY);
			if (saved === 'ru' || saved === 'en') return saved;
			var nav = (navigator.language || '').toLowerCase();
			return nav.indexOf('en') === 0 ? 'en' : 'ru';
		} catch (e) {
			return 'ru';
		}
	}

	current = getInitialLang();

	function t(key) {
		if (I18N[current] && I18N[current][key] != null) return I18N[current][key];
		if (I18N.ru[key] != null) return I18N.ru[key];
		return key;
	}

	function apply() {
		document.documentElement.lang = current;

		document.querySelectorAll('[data-i18n]').forEach(function (el) {
			el.textContent = t(el.getAttribute('data-i18n'));
		});

		document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
			el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
		});

		document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
			var val = t(el.getAttribute('data-i18n-title'));
			el.setAttribute('title', val);
			if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', val);
		});

		document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
			btn.textContent = current === 'ru' ? 'EN' : 'RU';
		});

		document.dispatchEvent(new CustomEvent('gh:lang', { detail: { lang: current } }));
	}

	function setLang(lang) {
		if (lang !== 'ru' && lang !== 'en') return;
		current = lang;
		try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
		apply();
	}

	window.__t = t;
	window.__getLang = function () { return current; };
	window.__setLang = setLang;

	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-lang-toggle]');
		if (btn) setLang(current === 'ru' ? 'en' : 'ru');
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', apply);
	} else {
		apply();
	}
})();
