import fetch from 'node-fetch'

// 🕌 100% API DOANG - GA ADA HARDCODE SAMA SEKALI
const API_LIST = 'https://api.quran.gading.dev/surah'
const API_AYAT = (s, a) => `https://api.quran.gading.dev/surah/${s}/${a}`

let handler = async (m, { args, usedPrefix, command }) => {
    if (args.length < 2) throw `🕌 *Cara pakai:* \`${usedPrefix}${command} <nomor/nama surat> <ayat>\`\n💡 *Contoh:* \`${usedPrefix}qs 2 255\` / \`${usedPrefix}qs yasin 10\``
    const a = parseInt(args[1])
    if (!a || a < 1) throw `❌ *Nomor ayat harus angka > 0*`

    try {
        // 1️⃣ AMBIL DAFTAR 114 SURAT DARI API → COCOKIN NAMA/NOMOR
        const list = (await (await fetch(API_LIST)).json()).data
        const q = args[0].trim().toLowerCase()
        const surat = list.find(s => s.number == q || s.name.transliteration.id.toLowerCase().includes(q))
        if (!surat) throw `❌ Surat nya ga ketemu nih senpai`

        // 2️⃣ AMBIL AYATNYA DARI API
        const d = (await (await fetch(API_AYAT(surat.number, a))).json()).data

        m.reply(`
🕌 *QS. ${surat.name.transliteration.id} : ${d.number.inSurah}*
📖 ${surat.name.translation.id} · 📚 Juz ${d.meta.juz}

📜 *ARAB:*
${d.text.arab}

🗣️ *LATIN:*
${d.text.transliteration.id}

📖 *ARTI:*
${d.translation.id}

© *Kemenag RI via Gading.dev*
`.trim())

    } catch (e) { throw `⚠️ *Error:* ${e.message || 'API gangguan'}` }
}

handler.command = /^(qs|alquran|surat|ayat)$/i
handler.help = ['qs <surat> <ayat>']
handler.tags = ['islamic']
handler.limit = false
export default handler
