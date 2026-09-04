// Cloudflare Pages Function — proxies Steam's GetRecentlyPlayedGames API.
// Keeps the STEAM_API_KEY secret on the server and avoids Steam's CORS block.
export async function onRequestGet({ env, request }) {
	const key = env.STEAM_API_KEY;
	const url = new URL(request.url);
	const steamid = url.searchParams.get('steamid') || '76561198995484465';
	const count = url.searchParams.get('count') || '5';

	const headers = {
		'content-type': 'application/json; charset=utf-8',
		'cache-control': 'public, max-age=300'
	};

	if (!key) {
		return new Response(JSON.stringify({ error: 'STEAM_API_KEY is not set' }), { status: 500, headers });
	}

	const api = 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=' +
		encodeURIComponent(key) +
		'&steamid=' + encodeURIComponent(steamid) +
		'&count=' + encodeURIComponent(count);

	try {
		const res = await fetch(api, { headers: { accept: 'application/json' } });
		const data = await res.json();
		return new Response(JSON.stringify(data), { headers });
	} catch (err) {
		return new Response(JSON.stringify({ error: 'steam api error' }), { status: 502, headers });
	}
}
