// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

const ELEMENTS = ['Api 🔥', 'Air 💧', 'Tanah 🌍', 'Angin 🌪️', 'Petir ⚡', 'Es ❄️', 'Cahaya ✨', 'Bayangan 🌑']
const ZODIAC = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo',
    '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces']
const SOUL_TYPES = [
    'Pemimpin Yang Berani', 'Penyeimbang Bijaksana', 'Kreator Ekspresif', 'Pembangun Solid',
    'Petualang Bebas', 'Pelindung Setia', 'Pemikir Mistis', 'Penakluk Kuat', 'Humanitarian Murni'
]

function generateSoulData(name, seed) {
    const nameVal = Array.from(name.toLowerCase()).reduce((a, c) => a + c.charCodeAt(0), 0)
    return {
        element: ELEMENTS[(nameVal + seed) % ELEMENTS.length],
        zodiac: ZODIAC[(nameVal + seed * 2) % ZODIAC.length],
        soulType: SOUL_TYPES[(nameVal + seed * 3) % SOUL_TYPES.length]
    }
}

function getMatchDesc(score) {
    if (score >= 90) return '💫 Takdir Sejati'
    if (score >= 80) return '✨ Harmoni Sempurna'
    if (score >= 70) return '🌟 Koneksi Kuat'
    if (score >= 60) return '⭐ Potensi Bagus'
    if (score >= 50) return '🌙 Perlu Perjuangan'
    return '🌑 Tantangan Berat'
}

function getReading(score) {
    if (score >= 80) return 'Jiwa kalian memiliki koneksi yang sangat istimewa dan langka. Takdir telah merencanakan pertemuan ini.'
    if (score >= 60) return 'Ada chemistry yang kuat di antara kalian. Perbedaan kalian justru menciptakan harmoni.'
    if (score >= 40) return 'Butuh waktu untuk saling memahami. Setiap tantangan akan memperkuat ikatan kalian.'
    return 'Perbedaan signifikan dalam energi jiwa. Butuh banyak adaptasi dan pengertian.'
}

let handler = async (m, { text }) => {
    if (!text || !text.includes('|')) return m.reply(
        `💫 *sᴏᴜʟ ᴍᴀᴛᴄʜ*\n\n> Cek kecocokan jiwa 2 orang!\n\n*Format:*\n> \`${m.prefix}soulmatch nama1|nama2\`\n\n*Contoh:*\n> \`${m.prefix}soulmatch Raiden|Mei\``
    )

    const [nama1, nama2] = text.split('|').map(n => n.trim())
    if (!nama1 || !nama2) return m.reply(`❌ Masukkan 2 nama dengan format: \`${m.prefix}soulmatch nama1|nama2\``)

    await conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const seed1 = Date.now() % 100
    const seed2 = (Date.now() + 50) % 100
    const soul1 = generateSoulData(nama1, seed1)
    const soul2 = generateSoulData(nama2, seed2)
    const combined = nama1.toLowerCase() + nama2.toLowerCase()
    const baseScore = Array.from(combined).reduce((a, c) => a + c.charCodeAt(0), 0)
    const compatibility = (baseScore % 51) + 50

    let txt = `╭═══❯ *💫 SOUL MATCH* ❮═══\n│\n`
    txt += `│ 👤 *${nama1}*\n│ ├ 🔮 Soul: ${soul1.soulType}\n│ ├ 🌟 Element: ${soul1.element}\n│ └ 🎯 Zodiac: ${soul1.zodiac}\n│\n`
    txt += `│ 👤 *${nama2}*\n│ ├ 🔮 Soul: ${soul2.soulType}\n│ ├ 🌟 Element: ${soul2.element}\n│ └ 🎯 Zodiac: ${soul2.zodiac}\n│\n`
    txt += `│ 💕 *COMPATIBILITY*\n│ ├ 📊 Score: *${compatibility}%*\n│ └ 🎭 Status: ${getMatchDesc(compatibility)}\n│\n`
    txt += `│ 🔮 *Reading:*\n│ ${getReading(compatibility)}\n│\n╰════════════════════`

    await m.reply(txt)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handler.help = ['soulmatch nama1|nama2']
handler.tags = ['fun']
handler.command = /^(soulmatch|belahanjiwaku)$/i

export default handler
