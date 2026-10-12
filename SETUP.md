# IE Marbles & Traders — local setup (Windows)

Needs Node 20+ (`node -v`). Database: MongoDB Atlas (connection string is in `server/.env`).

| Folder      | What                         | URL                    |
|-------------|------------------------------|------------------------|
| `server`    | Express + MongoDB API        | http://localhost:5050  |
| `India`     | India website                | http://localhost:3000  |
| `Australia` | Australia website (to build) | http://localhost:3001  |
| `admin`     | Admin panel (both websites)  | http://localhost:3002  |

Open 3 terminals (4 once Australia is built):

    cd server   && npm install && npm run dev
    cd India    && npm install && npm run dev
    cd admin    && npm install && npm run dev
    cd Australia && npm install && npm run dev

Admin login = `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env` (used only the first time the server starts;
afterwards change it with "Forgot password").

## How India and Australia stay separate
- One server, one database. Every project / service / blog / message is saved with `site: "india"` or `site: "australia"`.
- The admin panel has an **India | Australia** switch at the top — whatever you add is saved for the selected website only.
- Each website reads only its own content because of `SITE` in `src/config.js`.

## Building the Australia website
`Australia/src/config.js`, `Australia/src/api.js` and `Australia/vite.config.js` (port 3001 + API proxy) are ready.
Copy `India/src/components` and `India/src/pages`, `India/src/App.jsx`, `India/src/index.css` into `Australia/src`
(keep Australia's own `config.js`), and copy `India/index.html` fonts. Then `npm run dev` in `Australia`.

## Colours (from the brand board)
Taupe Marble `#6F6252` · Ivory Stone `#F4EBDD` · Antique Gold `#B38A45` — defined once as CSS variables in `India/src/index.css`
(`--ie-taupe`, `--ie-ivory`, `--ie-gold`, …).

## Contact-form email alerts
New messages always appear in admin → Messages. To also get an email, set `EMAIL_PASS` in `server/.env`
to a 16-letter Google App Password (Google account → Security → App passwords). Alerts go to `NOTIFICATION_EMAIL`.

## Commands (in `server`)
    npm run seed         add sample content where a site is empty
    npm run seed:force   wipe + recreate sample content
