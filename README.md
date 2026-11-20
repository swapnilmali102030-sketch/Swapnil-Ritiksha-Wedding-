# स्वप्निल & रितिक्षा – Digital Wedding Invitation

React + Vite single-page invitation (Marathi, mobile-first). No paid services.

## Run locally

Requires Node.js 18+ (https://nodejs.org).

```bash
npm install
npm run dev      # opens at http://localhost:5173 (also on your Wi-Fi for phone testing)
npm run build    # production build in /dist
```

## Edit content

Everything is in `src/data.js`:
- `CONTACTS` – add phone numbers (format `919876543210`, no `+`). Empty = shows "लवकरच".
- `RSVP_WHATSAPP` – WhatsApp number that receives RSVP messages.
- `MAP_*` – Google Maps links are search-based on "RCF Sabhagruh, Kurul, Alibag". For an exact pin, open the venue in Google Maps, copy the Share link, and paste it as `MAP_VIEW_URL` / `MAP_NAV_URL`.
- Event times, family names and the blessing poem.

## Set your link first (important for the WhatsApp preview)

WhatsApp's preview card needs absolute URLs. Before building:
1. Choose your site name (e.g. `swapnil-ritiksha`) – Netlify link will be `https://swapnil-ritiksha.netlify.app`.
2. Put that link in `.env` as `VITE_SITE_URL=...` (Vercel/Netlify: also add it as an environment variable named `VITE_SITE_URL`).
3. Build and deploy. Then check the preview at https://developers.facebook.com/tools/debug/ (paste link, "Scrape Again"). If you change the image later, re-scrape; WhatsApp caches previews.

## QR code
After deploying: `npm run qr -- https://your-site.netlify.app` creates `qr-code.png`.

## Deploy and get a public link

### Option A – Netlify Drop (easiest, no account setup tools)
1. `npm install && npm run build`
2. Go to https://app.netlify.com/drop and drag the **dist** folder onto the page.
3. You get a public `https://….netlify.app` link. Share it on WhatsApp.

### Option B – Vercel
1. Push this folder to a GitHub repository.
2. At https://vercel.com → Add New Project → import the repo → Deploy (settings are auto-detected from `vercel.json`).
3. Copy the `https://….vercel.app` link.

### Option C – Netlify via Git
Import the repo on Netlify; `netlify.toml` already sets build command and `dist` folder.

## Notes
- Music is generated in the browser (soft tanpura-style Raag Bhoopali) and starts only after the guest taps "Open Wedding Invitation". The round speaker button mutes/unmutes. To use your own MP3, put it in `public/music.mp3` and replace `src/audio.js` with an `<audio>` element.
- WhatsApp share button sends the invitation text plus the live page link.
- Fonts (Noto Sans Devanagari, Tiro Devanagari Marathi) load from Google Fonts; the map embed also needs internet.
- Animations respect "reduce motion" settings.
