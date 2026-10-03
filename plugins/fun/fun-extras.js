let handlerRate = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan sesuatu yang ingin di-rate!')
        const pct = Math.floor(Math.random() * 101)
        const comments = [
            'Lumayan lah~', 'Wah mantap!', 'Hmm... bisa ditingkatkan.',
            'Luar biasa!', 'Biasa aja sih.', 'Anjay tinggi banget!',
            'Yah segitu doang?', 'Cukup memuaskan!', 'Gak nyangka segini.'
        ]
        const c = comments[Math.floor(Math.random() * comments.length)]
        await m.reply(`⭐ *Rate: ${text}*\n\n📊 ${pct}%\n💬 ${c}`)
    } catch (e) { throw e }
}
handlerRate.help = ['rate', 'nilai']
handlerRate.tags = ['fun']
handlerRate.command = /^(rate|nilai)$/i

let handlerBagaimana = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const answers = [
            'Dengan penuh keyakinan dan semangat!', 'Pelan-pelan tapi pasti.',
            'Asal jalan dulu aja.', 'Tanya Google deh.',
            'Dengan cara yang tidak terduga!', 'Ikutin feeling aja.',
            'Minta bantuan orang lain.', 'Berdoa dulu baru action.'
        ]
        const a = answers[Math.floor(Math.random() * answers.length)]
        await m.reply(`🤔 *Bagaimana ${text}?*\n\n💬 ${a}`)
    } catch (e) { throw e }
}
handlerBagaimana.help = ['bagaimana']
handlerBagaimana.tags = ['fun']
handlerBagaimana.command = /^(bagaimana)$/i

let handlerBerapa = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const num = Math.floor(Math.random() * 1000)
        const units = ['kali', 'buah', 'orang', 'hari', 'tahun', 'ribu', 'juta', 'persen']
        const u = units[Math.floor(Math.random() * units.length)]
        await m.reply(`🔢 *Berapa ${text}?*\n\n💬 Kira-kira ${num} ${u}!`)
    } catch (e) { throw e }
}
handlerBerapa.help = ['berapa']
handlerBerapa.tags = ['fun']
handlerBerapa.command = /^(berapa)$/i

let handlerDimana = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const places = [
            'Di balik gunung yang jauh.', 'Di dalam hatimu sendiri.',
            'Di warung sebelah.', 'Di dimensi lain.',
            'Di bawah bantal kamu.', 'Di tempat yang tidak terduga.',
            'Di antara bintang-bintang.', 'Di sini, di sana, di mana-mana.'
        ]
        const p = places[Math.floor(Math.random() * places.length)]
        await m.reply(`📍 *Dimana ${text}?*\n\n💬 ${p}`)
    } catch (e) { throw e }
}
handlerDimana.help = ['dimana']
handlerDimana.tags = ['fun']
handlerDimana.command = /^(dimana)$/i

let handlerMengapa = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const reasons = [
            'Karena sudah takdirnya begitu.', 'Karena kamu kurang berdoa.',
            'Karena alam semesta berkehendak demikian.', 'Karena memang harus begitu.',
            'Karena kamu terlalu banyak mikir.', 'Karena itulah hidup.',
            'Karena Tuhan punya rencana yang lebih baik.', 'Karena kamu sendiri yang memilih.'
        ]
        const r = reasons[Math.floor(Math.random() * reasons.length)]
        await m.reply(`❓ *Mengapa ${text}?*\n\n💬 ${r}`)
    } catch (e) { throw e }
}
handlerMengapa.help = ['mengapa']
handlerMengapa.tags = ['fun']
handlerMengapa.command = /^(mengapa)$/i

let handlerHaruskah = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const answers = [
            ['✅ Harus banget!', '✅ Iya, harus!', '✅ Wajib hukumnya!'],
            ['❌ Tidak perlu.', '❌ Jangan deh.', '❌ Mending enggak.']
        ]
        const side = answers[Math.floor(Math.random() * 2)]
        const a = side[Math.floor(Math.random() * side.length)]
        await m.reply(`🤷 *Haruskah ${text}?*\n\n${a}`)
    } catch (e) { throw e }
}
handlerHaruskah.help = ['haruskah']
handlerHaruskah.tags = ['fun']
handlerHaruskah.command = /^(haruskah)$/i

let handlerBisakah = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const answers = [
            ['💪 Bisa banget!', '💪 Tentu bisa!', '💪 Pasti bisa, semangat!'],
            ['😅 Kayaknya enggak deh.', '😅 Susah banget itu.', '😅 Hmm, tidak bisa.']
        ]
        const side = answers[Math.floor(Math.random() * 2)]
        const a = side[Math.floor(Math.random() * side.length)]
        await m.reply(`🤔 *Bisakah ${text}?*\n\n${a}`)
    } catch (e) { throw e }
}
handlerBisakah.help = ['bisakah']
handlerBisakah.tags = ['fun']
handlerBisakah.command = /^(bisakah)$/i

let handlerAkankah = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const answers = [
            ['🌟 Akan terjadi!', '🌟 Iya, akan!', '🌟 Insya Allah akan!'],
            ['🌧️ Sepertinya tidak.', '🌧️ Belum tentu.', '🌧️ Tidak akan terjadi.']
        ]
        const side = answers[Math.floor(Math.random() * 2)]
        const a = side[Math.floor(Math.random() * side.length)]
        await m.reply(`🔮 *Akankah ${text}?*\n\n${a}`)
    } catch (e) { throw e }
}
handlerAkankah.help = ['akankah']
handlerAkankah.tags = ['fun']
handlerAkankah.command = /^(akankah)$/i

let handlerSiapa = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan!')
        const names = [
            'Kamu sendiri!', 'Orang yang kamu suka.', 'Tetangga sebelah.',
            'Seseorang yang tidak terduga.', 'Teman lama kamu.',
            'Orang yang selalu ada buat kamu.', 'Dirimu di masa depan.',
            'Seseorang yang sedang memikirkanmu.'
        ]
        const n = names[Math.floor(Math.random() * names.length)]
        await m.reply(`👤 *Siapa ${text}?*\n\n💬 ${n}`)
    } catch (e) { throw e }
}
handlerSiapa.help = ['siapa']
handlerSiapa.tags = ['fun']
handlerSiapa.command = /^(siapa)$/i

let handlerCoba = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan sesuatu yang ingin dicoba!')
        const motivations = [
            'Coba aja dulu, gagal itu biasa!', 'Kalau tidak dicoba, tidak akan tahu hasilnya.',
            'Jangan takut gagal, takutlah tidak mencoba!', 'Mulai dari langkah kecil.',
            'Percaya diri! Kamu pasti bisa!', 'Bismillah, langsung gas!',
            'Jangan kebanyakan mikir, langsung action!', 'Sekarang atau tidak sama sekali!'
        ]
        const mot = motivations[Math.floor(Math.random() * motivations.length)]
        await m.reply(`💪 *Coba ${text}*\n\n✨ ${mot}`)
    } catch (e) { throw e }
}
handlerCoba.help = ['coba']
handlerCoba.tags = ['fun']
handlerCoba.command = /^(coba)$/i

let handlerMimpi = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan sesuatu yang ingin ditafsirkan mimpinya!')
        const interpretations = [
            'Pertanda akan ada rezeki nomplok!', 'Kamu terlalu banyak mikirin hal itu sebelum tidur.',
            'Itu pertanda kamu harus move on.', 'Mimpi itu hanya bunga tidur, jangan dipercaya!',
            'Wah, itu pertanda baik! Semoga terwujud.', 'Kamu butuh liburan segera.',
            'Itu artinya ada yang kangen sama kamu.', 'Pertanda kamu harus lebih banyak makan sebelum tidur.'
        ]
        const i = interpretations[Math.floor(Math.random() * interpretations.length)]
        await m.reply(`🌙 *Tafsir Mimpi: ${text}*\n\n💭 ${i}`)
    } catch (e) { throw e }
}
handlerMimpi.help = ['mimpi']
handlerMimpi.tags = ['fun']
handlerMimpi.command = /^(mimpi)$/i

let handlerPuisi = async (m, { text }) => {
    try {
        if (!text) return m.reply('Masukkan kata untuk dijadikan puisi!')
        const templates = [
            `Di bawah langit yang membiru,\n${text} hadir dalam hidupku,\nSeperti angin yang berlalu,\nMeninggalkan kenangan yang syahdu.`,
            `${text}, oh ${text},\nKau hadir bagai embun pagi,\nMenyejukkan jiwa yang sepi,\nMembuat hati ini bernyanyi.`,
            `Kutulis namamu di pasir pantai,\n${text} terukir dalam hati,\nOmbak datang menghapus jejak,\nNamun cintaku tak pernah retak.`,
            `Dalam diam aku merindu,\n${text} selalu ada di pikiranku,\nSeperti bintang di malam hari,\nSelalu bersinar meski sendiri.`
        ]
        const p = templates[Math.floor(Math.random() * templates.length)]
        await m.reply(`📝 *Puisi: ${text}*\n\n${p}`)
    } catch (e) { throw e }
}
handlerPuisi.help = ['puisi']
handlerPuisi.tags = ['fun']
handlerPuisi.command = /^(puisi)$/i

let handlerSenja = async (m, { }) => {
    try {
        const quotes = [
            '🌅 "Senja mengajarkan kita bahwa akhir hari pun bisa sangat indah."',
            '🌇 "Di antara jingga dan ungu, senja menyimpan sejuta cerita yang belum terucap."',
            '🌆 "Senja adalah pengingat bahwa setiap hari selalu berakhir dengan keindahan."',
            '🌃 "Seperti senja yang selalu datang, harapan pun selalu ada di ujung hari."',
            '🌄 "Senja bukan perpisahan, tapi janji bahwa esok matahari akan kembali bersinar."',
            '🌠 "Di senja hari, semua luka terasa lebih ringan dan semua rindu terasa lebih nyata."'
        ]
        const q = quotes[Math.floor(Math.random() * quotes.length)]
        await m.reply(q)
    } catch (e) { throw e }
}
handlerSenja.help = ['senja']
handlerSenja.tags = ['fun']
handlerSenja.command = /^(senja)$/i

let handlerTop = async (m, { text, conn }) => {
    try {
        if (!text) return m.reply('Masukkan pertanyaan! Contoh: .top @user paling ganteng')
        const mentioned = m.mentionedJid && m.mentionedJid.length > 0
            ? m.mentionedJid
            : null
        const adjectives = [
            'paling keren', 'paling ganteng/cantik', 'paling lucu',
            'paling pintar', 'paling bucin', 'paling gabut',
            'paling rajin', 'paling setia', 'paling kaya',
            'paling baik hati'
        ]
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
        if (mentioned) {
            const tag = '@' + mentioned[0].split('@')[0]
            await m.reply(`🏆 *TOP*\n\nSiapa yang ${text}?\n\n👑 Jawabannya adalah: ${tag}!\nDia memang ${adj} di antara kalian semua! 🎉`, null, { mentions: mentioned })
        } else {
            await m.reply(`🏆 *TOP*\n\nSiapa yang ${text}?\n\n👑 Jawabannya adalah: Kamu sendiri!\nKamu memang ${adj}! 🎉`)
        }
    } catch (e) { throw e }
}
handlerTop.help = ['top']
handlerTop.tags = ['fun']
handlerTop.command = /^(top)$/i

// ─── Bucin ───────────────────────────────────────────────────
import { getRandomItem } from '../../lib/game-data.js'

let handlerBucin = async (m) => {
    try {
        const quote = getRandomItem('bucin.json')
        if (!quote) return m.reply('❌ Data tidak tersedia!')
        await m.reply(`\`\`\`"${quote}"\`\`\`\n\n`)
    } catch (e) { throw e }
}
handlerBucin.help = ['bucin2', 'gombal']
handlerBucin.tags = ['fun']
handlerBucin.command = /^(bucin2|gombal|love|romantis)$/i

// ─── Dare ───────────────────────────────────────────────────
let handlerDare = async (m) => {
    try {
        const challenge = getRandomItem('dare.json')
        if (!challenge) return m.reply('❌ Data tidak tersedia!')
        await m.reply(`\`\`\`${challenge}\`\`\``)
    } catch (e) { throw e }
}
handlerDare.help = ['dare2']
handlerDare.tags = ['fun']
handlerDare.command = /^(dare2|dareq|tantang)$/i

// ─── Truth ───────────────────────────────────────────────────
let handlerTruth = async (m) => {
    try {
        const question = getRandomItem('truth.json')
        if (!question) return m.reply('❌ Data tidak tersedia!')
        await m.reply(`\`\`\`${question}\`\`\``)
    } catch (e) { throw e }
}
handlerTruth.help = ['truth2']
handlerTruth.tags = ['fun']
handlerTruth.command = /^(truth2|truthq)$/i

// ─── Gay ───────────────────────────────────────────────────
let handlerGay = async (m) => {
    try {
        if (!m.isGroup) return m.reply('❌ Perintah ini hanya bisa digunakan di grup!')
        const groupMetadata = m.groupMetadata
        const participants = groupMetadata.participants
        const member = participants.map(u => u.jid || u.id)
        const orang1 = member[Math.floor(Math.random() * member.length)]
        const orang2 = member[Math.floor(Math.random() * member.length)]
        const text = `@${orang1.split('@')[0]} *Nge gay sama* @${orang2.split('@')[0]}`
        await m.reply(text, null, { mentions: [orang1, orang2] })
    } catch (e) { throw e }
}
handlerGay.help = ['gay']
handlerGay.tags = ['fun']
handlerGay.command = /^(gay|howgay)$/i
handlerGay.group = true

// ─── Renungan ───────────────────────────────────────────────────
let handlerRenungan = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
        const imageUrl = getRandomItem('renungan.json')
        if (!imageUrl) return m.reply('❌ Data tidak tersedia!')
        await conn.sendFile(m.chat, imageUrl, 'renungan.jpg', '', m)
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        throw e
    }
}
handlerRenungan.help = ['renungan', 'motivasi']
handlerRenungan.tags = ['fun']
handlerRenungan.command = /^(renungan|motivasi|mutiara)$/i

export { handlerRate, handlerBagaimana, handlerBerapa, handlerDimana, handlerMengapa, handlerHaruskah, handlerBisakah, handlerAkankah, handlerSiapa, handlerCoba, handlerMimpi, handlerPuisi, handlerSenja, handlerTop, handlerBucin, handlerDare, handlerTruth, handlerGay, handlerRenungan }
export default handlerRate
