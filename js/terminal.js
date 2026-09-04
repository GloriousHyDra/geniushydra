/* GeniusHydra — interactive terminal (home page) */
(function () {
	'use strict';

	var history = document.getElementById('term-history');
	var form = document.getElementById('term-form');
	var input = document.getElementById('term-input');
	if (!history || !form || !input) return;

	function print(text, cls) {
		var line = document.createElement('div');
		line.className = cls || 'term-out';
		line.textContent = text;
		history.appendChild(line);
		history.scrollTop = history.scrollHeight;
	}

	function printCommand(cmd) {
		var line = document.createElement('div');
		line.className = 'term-cmd';
		var p = document.createElement('span');
		p.className = 'prompt';
		p.textContent = '$ ';
		line.appendChild(p);
		line.appendChild(document.createTextNode(cmd));
		history.appendChild(line);
		history.scrollTop = history.scrollHeight;
	}

	var HELP = [
		'available commands:',
		'  help             show this help',
		'  whoami           who am I',
		'  links            list social links',
		'  neofetch         system info',
		'  matrix           toggle matrix rain',
		'  theme <name>     green | amber | cyan | red | paper',
		'  lang <ru|en>     switch language',
		'  season <name>    halloween | newyear | cny | valentine | easter | birthday | auto',
		'  ls | pwd | date | echo | clear',
		'  about | setup | gallery | presence'
	];

	var NEOFETCH = [
		'geniushydra@web',
		'----------------',
		'OS      : Windows 11 Home',
		'CPU     : AMD Ryzen 7 9800X3D',
		'GPU     : NVIDIA GeForce RTX 5070',
		'RAM     : 32 GB DDR5-6000 CL32',
		'Storage : Kingston NV3 1 TB',
		'Board   : ASUS PRIME B840M-A',
		'Shell   : bash'
	];

	function run(cmd) {
		var args = cmd.trim().split(/\s+/);
		var c = (args[0] || '').toLowerCase();
		var rest = args.slice(1).join(' ').toLowerCase();

		switch (c) {
			case '': break;
			case 'help': HELP.forEach(function (h) { print(h); }); break;
			case 'whoami': print('GeniusHydra'); break;
			case 'links':
				var names = Array.from(document.querySelectorAll('#links .link-name')).map(function (e) { return e.textContent; });
				if (names.length) names.forEach(function (n, idx) { print(String(idx + 1).padStart(2, '0') + '  ' + n); });
				else print('links not loaded yet');
				break;
			case 'neofetch': NEOFETCH.forEach(function (l) { print(l); }); break;
			case 'matrix':
				var on = window.__matrix ? window.__matrix.toggle() : false;
				print('matrix rain: ' + (on ? 'on' : 'off'));
				break;
			case 'theme':
				if (['green', 'amber', 'cyan', 'red', 'paper'].indexOf(rest) !== -1 && window.__setAccent) {
					window.__setAccent(rest);
					print('theme set to ' + rest);
				} else {
					print('usage: theme <green|amber|cyan|red|paper>');
				}
				break;
			case 'lang':
				if ((rest === 'ru' || rest === 'en') && window.__setLang) {
					window.__setLang(rest);
					print('language set to ' + rest);
				} else {
					print('usage: lang <ru|en>');
				}
				break;
			case 'season':
				var ids = ['halloween', 'newyear', 'cny', 'valentine', 'easter', 'birthday'];
				if (rest === 'auto') {
					if (window.__applySeason) window.__applySeason(null);
					print('season: auto');
				} else if (ids.indexOf(rest) !== -1 && window.__applySeason) {
					window.__applySeason(rest);
					print('season set to ' + rest);
				} else {
					print('usage: season <halloween|newyear|cny|valentine|easter|birthday|auto>');
				}
				break;
			case 'pwd': print('~'); break;
			case 'ls': print('about.md  setup.md  gallery/  presence/  links.json  config.js'); break;
			case 'date': print(new Date().toString()); break;
			case 'echo': print(args.slice(1).join(' ')); break;
			case 'clear':
			case 'cls': history.textContent = ''; break;
			case 'about': location.href = '/about.html'; break;
			case 'setup': location.href = '/setup.html'; break;
			case 'gallery': location.href = '/gallery.html'; break;
			case 'presence': location.href = '/presence.html'; break;
			case 'home':
			case 'cd': location.href = '/'; break;
			case 'sudo': print('Permission denied. (nice try)'); break;
			case 'rm': print('Nice try. Nothing was deleted.'); break;
			case 'exit':
			case 'logout': print('There is no escape.'); break;
			default: print('command not found: ' + c + ' — type "help"'); break;
		}
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var cmd = input.value;
		if (!cmd.trim()) return;
		printCommand(cmd);
		run(cmd);
		input.value = '';
	});

	history.addEventListener('click', function () { input.focus(); });

	print('type "help" for a list of commands');
})();
