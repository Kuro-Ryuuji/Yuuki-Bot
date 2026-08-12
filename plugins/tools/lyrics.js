import fetch from 'node-fetch'

// 🎵 API LRCLIB (GRATIS - TANPA API KEY - STABIL 2026)
const LRC_SEARCH = q => `https://lrclib.net/api/search?q=${encodeURIComponent(q)}&limit=5`
const LRC_GET = id => `https://lrclib.net/api/get/${id}`

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `🎵 *Cara pakai cari lirik:*\n\n> \`${usedPrefix}${command} <judul lagu>\`\n> \`${usedPrefix}${command} <judul - nama artis>\`\n\n💡 *Contoh:*\n\`${usedPrefix}${command} cinta luar biasa\`\n\`${usedPrefix}${command} perfect - ed sheeran\``

    const query = text.trim()

    try {
        // 1️⃣ CARI LAGU BERDASARKAN QUERY
        let res = await fetch(LRC_SEARCH(query), {
            headers: { 'User-Agent': 'Yuuki-BOT/1.0 (WhatsApp Bot)' }
        })
        let list = await res.json()

        if (!Array.isArray(list) || list.length === 0) {
            throw `❌ *Lirik tidak ditemukan* 😭\n\nJudul \`${query}\` tidak ada di database.\n💡 Coba tambah nama artis: \`${usedPrefix}${command} ${query} - nama artis\``
        }

        // ✅ AMBIL HASIL PALING COCOK
        const lagu = list[0]
        const id = lagu.id
        const judul = lagu.trackName || 'Tidak diketahui'
        const artis = lagu.artistName || 'Tidak diketahui'
        const album = lagu.albumName || 'Single / Tidak ada album'

        // 2️⃣ AMBIL LIRIK LENGKAPNYA
        res = await fetch(LRC_GET(id), {
            headers: { 'User-Agent': 'Yuuki-BOT/1.0 (WhatsApp Bot)' }
        })
        const detail = await res.json()
        let lirik = detail.plainLyrics?.trim() || lagu.plainLyrics?.trim() || ''

        if (!lirik) {
            const synced = detail.syncedLyrics || lagu.syncedLyrics || ''
            lirik = synced.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim()
        }
        if (!lirik) throw `⚠️ *Lirik lagu ini belum tersedia di database*`

        // 🔥 BATAS DITAMBAH JADI 6400 (LEBIH BANYAK LIRIK YANG MUAT, GA KEPOTONG)
        const MAX = 6400
        let dipotong = false
        if (lirik.length > MAX) {
            lirik = lirik.slice(0, MAX)
            const akhiri = lirik.lastIndexOf('\n')
            if (akhiri > MAX * 0.85) lirik = lirik.slice(0, akhiri)
            dipotong = true
        }

        // 🎨 FORMAT BARU: JUDUL + DURASI + BAHASA SUDAH DIHAPUS!
        const out = `
🎵 *LIRIK LAGU DITEMUKAN* 🎵

🎤 *Artis* : ${artis}
💿 *Album* : ${album}

${'━'.repeat(34)}

${lirik}

${dipotong ? `\n⚠️ *Lirik dipotong karena terlalu panjang*\n` : ''}
${'━'.repeat(34)}

💡 *Cari lebih akurat:*
\`${usedPrefix}${command} ${judul} - ${artis}\`

© *Sumber: LRCLib Public Lyrics Database*
`.trim()

        await m.reply(out)

    } catch (e) {
        console.log('[ERROR LIRIK]', e.message)
        throw `⚠️ *Ada masalah nih senpai 😭*\n\n${e.message || 'Gagal ambil lirik, coba lagi dalam beberapa menit'}`
    }
}

handler.help = ['lirik <judul>', 'lyrics <judul>']
handler.tags = ['internet', 'tools']
handler.command = /^(lirik|lyrics|lyric)$/i
handler.group = false
handler.premium = false
handler.limit = false

export default handler
