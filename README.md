# GeniusHydra — персональный сайт

Тёмный персональный сайт на **чистых HTML, CSS и JavaScript** — без фреймворков, без сборки, без зависимостей. Деплой на Cloudflare Pages.

## Страницы

| Путь | Описание |
|------|----------|
| `/` | Главная (аватар, кнопки «скопировать», живой статус Discord, ссылки) |
| `/about.html` | Обо мне |
| `/setup.html` | ПК / периферия / софт |
| `/gallery.html` | Галерея с лайтбоксом |
| `/presence.html` | Живой статус «где я активен» |
| `/404.html` | Своя страница 404 |

## Структура

```text
├── index.html          ← главная
├── about.html
├── setup.html
├── gallery.html
├── presence.html
├── 404.html
├── links.json          ← ссылки (меняй их здесь)
├── config.js           ← настройки (Discord ID, никнеймы, аналитика)
├── robots.txt
├── sitemap.xml
├── css/style.css
├── js/
│   ├── main.js         ← смена темы, кнопки копирования, навигация, параллакс
│   ├── links.js        ← рендер ссылок из links.json
│   ├── presence.js     ← живой статус Discord (Lanyard)
│   └── gallery.js      ← лайтбокс
└── assets/
    ├── favicon.svg / favicon.ico
    ├── og-image.png    ← карточка для соцсетей
    ├── icons/          ← аватар и иконки платформ
    └── gallery/        ← клади сюда картинки галереи (1.jpg, 2.jpg, …)
```

## Запуск локально

```sh
cd geniushydra
python -m http.server 4321
# → http://localhost:4321
```

> Используй локальный сервер (не двойной клик по index.html) — список ссылок загружается из links.json, а для этого нужен HTTP.

## Настройка

### Ссылки
Редактируй **`links.json`**. Каждая запись:

```json
{
	"name": "Название",
	"subtitle": "Подпись",
	"url": "https://…",
	"icon": "assets/icons/your-icon.png",
	"platform": "discord",   // discord | telegram | steam | github
	"accent": "#5865F2"       // цвет свечения при наведении
}
```

### Кнопки копирования и статус Discord
Редактируй **`config.js`**:
- `usernames` — что копируют кнопки Discord/Telegram/Steam.
- `discordId` — твой числовой ID пользователя Discord для живого бейджа статуса
  (Discord → Настройки → Расширенные → включи «Режим разработчика» → ПКМ по профилю → «Скопировать ID пользователя»).
  Также нужно состоять на сервере [Lanyard Discord](https://discord.gg/lanyard), чтобы присутствие отслеживалось.
- `goatcounter` — код аналитики (оставь `''` чтобы отключить).

### Цвет акцента
Пять тем переключаются цветными точками в навигации (сохраняются в `localStorage`). Темы задаются в `css/style.css` (блоки `[data-accent=…]`) и кнопками в навигации каждой страницы.

### Галерея
Клади изображения в `assets/gallery/` как `1.jpg`, `2.jpg`, … (или меняй `src` в `gallery.html`). Плитки с отсутствующими картинками скрываются автоматически.

## Деплой

Пуш в `main` — Cloudflare Pages отдаёт корень репозитория **без шага сборки**. Настройки сборки:
- **Build command:** *(пусто)*
- **Build output directory:** `/`
