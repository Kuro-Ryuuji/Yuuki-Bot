# Setup Elaina BOT 2026

## Prerequisites

- **Node.js v20+** (LTS) — https://nodejs.org
- **ffmpeg** — untuk konversi audio/video
- **imagemagick** — untuk sticker

### Install Prerequisites

**Ubuntu/Debian/VPS:**
```bash
sudo apt update
sudo apt install -y ffmpeg imagemagick
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

**Termux (Android):**
```bash
pkg update && pkg upgrade
pkg install nodejs ffmpeg imagemagick
```

---

## Install & Jalankan

```bash
git clone https://github.com/ImYanXiao/Elaina-MultiDevice
cd Elaina-MultiDevice
npm install
```

Edit `config.js` — ganti nomor bot, nomor owner, nama:
```js
global.nomorbot = '628xxxxxxxxxx'   // Nomor bot
global.nomorown = '628xxxxxxxxxx'   // Nomor owner
global.namebot = 'Elaina BOT'
global.nameown = 'NamaMu'
```

Jalankan:
```bash
node index.js
```

Scan QR code yang muncul di terminal. Bot siap!

---

## Jika Error "Session Expired" / "Logged Out"

```bash
rm -rf session/
node index.js
```
Scan QR ulang.

---

## Perubahan Migrasi 2022 → 2026

| Komponen | Sebelum | Sesudah |
|---|---|---|
| Baileys | `@adiwajshing/baileys` | `@whiskeysockets/baileys` |
| Auth state | `useSingleFileAuthState` | `useMultiFileAuthState` |
| Session | `session.data.json` (1 file) | `session/` (folder) |
| YouTube DL | y2mate scraper (mati) | `@distube/ytdl-core` |
| Facebook DL | aiovideodl.ml (mati) | `@bochilteam/scraper` |
| Anime API | Jikan v3 (deprecated) | Jikan v4 |
| Wikipedia | `@bochilteam/scraper` | Wikipedia REST API |
| Brainly | `require()` CJS | ESM `brainly-scraper-v2` |
| Translate | `translate-google-api` | `@vitalets/google-translate-api` |
| Cuaca | OpenWeatherMap (key expired) | wttr.in (gratis, no key) |
| lowdb | v3 | v7 (`lowdb/node`) |
| FormData | `formdata-node` | Built-in Node 18+ |

## Plugin yang Dinonaktifkan (`.disabled`)

Plugin berikut dinonaktifkan karena API/package-nya sudah mati:

| Plugin | Alasan |
|---|---|
| `tool-carigroup.js` | anabotofc.herokuapp.com mati |
| `nsfw-nhentai.js`, `nsfw-nhentai2.js` | lolhuman API mati |
| `tool-nobg.js` | violetics.pw mati |
| `sticker-ttp.js`, `sticker-attp.js` | api.xteam.xyz mati |
| `internet-brainly.js` | violetics.pw fallback mati |
| `xnxx.js`, `xnxxdl.js` | API mati + CJS syntax |
| `downloader-pixiv.js` | `@ibaraki-douji/pixivts` dihapus dari npm |
| `tool-ocr.js` | `ocr-space-api-wrapper` dihapus |
| `sticker-emoji.js` | `emoji-api` dihapus |
| `downloader-zippyshare.js` | Zippyshare tutup 2023 |

Untuk mengaktifkan kembali, rename file (hapus `.disabled`) dan sediakan API key/alternatif yang baru.

---

## Troubleshooting

**Error: `Cannot find module '@whiskeysockets/baileys'`**
```bash
npm install
```

**Error: `ERR_REQUIRE_ESM`**
Pastikan `"type": "module"` ada di `package.json`.

**QR tidak muncul**
Coba tambahkan `--server` untuk scan via browser:
```bash
node index.js --server
```
Buka `http://localhost:3000`

**Bot tidak merespons command**
Cek prefix di `config.js` — default prefix: `/ ! # $ % . -`
