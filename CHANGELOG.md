# Changelog

Semua perubahan penting pada project ini akan didokumentasikan di file ini.

Format mengacu pada [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [6.1.0] - 2026-05-11

### Added
- `resetdb` — Reset seluruh database (users, chats, settings, stats) dengan konfirmasi & auto-backup
- `addpremall` — Set premium ke semua user sekaligus dengan jumlah hari tertentu
- `delpremall` — Hapus premium dari semua user sekaligus

### Changed
- `updatesc` — Sekarang melindungi `config.js`, `database.json`, `elaina_session/`, dan `session/` dari tertimpa saat update

---

## [6.0.0] - 2026-05-11

### Initial Release
- Base bot Elaina-MD dengan ourin-baileys
- Fitur: Downloader, Sticker, Game, RPG, AI, Anime, NSFW, Tools, Group, Owner, dll
- Support Jadibot (pairing code & QR)
- Multi Device support
