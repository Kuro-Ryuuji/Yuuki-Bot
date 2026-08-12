function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function mentioned(m) { return m.mentionedJid?.[0] || m.sender }
function tag(jid) { return `@${jid.split('@')[0]}` }

function makeCekPercent({ name, aliases, emoji, label, descs }) {
    let h = async (m, { conn }) => {
        const jid = mentioned(m)
        const pct = randInt(0, 100)
        const desc = descs.find(d => pct >= d.min)?.text || descs[descs.length - 1].text
        const txt = jid === m.sender
            ? `Hai ${tag(jid)}\n\n${emoji} *${label}* kamu *${pct}%*\n\`\`\`${desc}\`\`\``
            : `Kamu ingin ngecek ${label.toLowerCase()} ${tag(jid)} yak?\n\n${emoji} *${label}* dia *${pct}%*\n\`\`\`${desc}\`\`\``
        await conn.sendMessage(m.chat, { text: txt, mentions: [jid] }, { quoted: m })
    }
    h.help = [name, ...aliases]
    h.tags = ['fun']
    h.command = new RegExp(`^(${[name, ...aliases].join('|')})$`, 'i')
    return h
}

export const cekCreative = makeCekPercent({
    name: 'cekcreative', aliases: ['creative', 'kreativitas'], emoji: '🎨', label: 'KREATIVITAS',
    descs: [{ min: 90, text: 'SUPER KREATIF! Artis sejati! 🎨✨' }, { min: 70, text: 'Sangat kreatif! 🌟' }, { min: 50, text: 'Lumayan kreatif 😊' }, { min: 30, text: 'Masih bisa berkembang 💪' }, { min: 0, text: 'Butuh lebih banyak inspirasi 🌱' }]
})

export const cekGacha = makeCekPercent({
    name: 'cekgacha', aliases: ['gacha', 'hoki'], emoji: '🎰', label: 'HOKI GACHA',
    descs: [{ min: 90, text: 'HOKI PARAH! SSR GUARANTEED! ✨💎' }, { min: 70, text: 'Lumayan hoki! SR dapet! 🌟' }, { min: 50, text: 'Standar aja 😅' }, { min: 30, text: 'Agak sial nih 😬' }, { min: 0, text: 'UNLUCKY! Pity dulu ya 💀' }]
})

export const cekKarma = makeCekPercent({
    name: 'cekkarma', aliases: ['karma'], emoji: '☯️', label: 'KARMA',
    descs: [{ min: 80, text: 'Karma baik! Surga menantimu~ ✨' }, { min: 60, text: 'Karma cukup baik 😊' }, { min: 40, text: 'Karma netral ⚖️' }, { min: 20, text: 'Karma agak buruk 😬' }, { min: 0, text: 'Karma buruk! Tobat dulu! 😱' }]
})

export const cekKpopers = makeCekPercent({
    name: 'cekkpopers', aliases: ['kpopers', 'kpop'], emoji: '🎤', label: 'KPOPERS',
    descs: [{ min: 90, text: 'ARMY/BLINK level max! 💜💗' }, { min: 70, text: 'Kpopers sejati! 🎵' }, { min: 50, text: 'Lumayan suka kpop 😊' }, { min: 30, text: 'Casual listener 🎧' }, { min: 0, text: 'Bukan kpopers nih 😅' }]
})

export const cekLapar = makeCekPercent({
    name: 'ceklapar', aliases: ['lapar', 'hungry'], emoji: '🍔', label: 'LAPAR',
    descs: [{ min: 90, text: 'LAPARRR! Makan sekarang! 🍔🍕🍜' }, { min: 70, text: 'Lumayan lapar nih 🍱' }, { min: 50, text: 'Agak lapar 😋' }, { min: 30, text: 'Masih kenyang 😊' }, { min: 0, text: 'Kenyang banget! 🤤' }]
})

export const cekNgantuk = makeCekPercent({
    name: 'cekngantuk', aliases: ['ngantuk', 'sleepy'], emoji: '😴', label: 'NGANTUK',
    descs: [{ min: 90, text: 'ZZZZZ... Tidur sana! 😴💤' }, { min: 70, text: 'Ngantuk banget nih 🥱' }, { min: 50, text: 'Agak ngantuk 😪' }, { min: 30, text: 'Masih melek 👀' }, { min: 0, text: 'Seger banget! ⚡' }]
})

export const cekOverpower = makeCekPercent({
    name: 'cekoverpower', aliases: ['overpower', 'op'], emoji: '👑', label: 'OVERPOWER',
    descs: [{ min: 90, text: 'OVERPOWER BANGET! LEGEND! 👑🔥' }, { min: 70, text: 'Kuat banget! 💪' }, { min: 50, text: 'Lumayan kuat 😎' }, { min: 30, text: 'Masih biasa aja 😅' }, { min: 0, text: 'Masih perlu grinding 📈' }]
})

export const cekPelit = makeCekPercent({
    name: 'cekpelit', aliases: ['pelit', 'stingy'], emoji: '💰', label: 'PELIT',
    descs: [{ min: 90, text: 'PELIT PARAH! Scrooge McDuck! 💰🔒' }, { min: 70, text: 'Lumayan pelit nih 😬' }, { min: 50, text: 'Standar aja 😅' }, { min: 30, text: 'Lumayan dermawan 😊' }, { min: 0, text: 'Dermawan banget! 🎁' }]
})

export const cekPintar = makeCekPercent({
    name: 'cekpintar', aliases: ['pintar', 'iq', 'smart'], emoji: '🧠', label: 'IQ',
    descs: [{ min: 90, text: 'JENIUS! Einstein level! 🧠✨' }, { min: 75, text: 'Sangat cerdas! 🎓' }, { min: 60, text: 'Di atas rata-rata! 👍' }, { min: 40, text: 'Normal, rata-rata 😊' }, { min: 0, text: 'Tetap semangat belajar! 📚' }]
})

export const cekPsikopat = makeCekPercent({
    name: 'cekpsikopat', aliases: ['psikopat', 'psycho'], emoji: '🔪', label: 'PSIKOPAT',
    descs: [{ min: 90, text: 'PSIKOPAT LEVEL MAX! 🔪😈' }, { min: 70, text: 'Agak psikopat nih 😬' }, { min: 50, text: 'Standar aja 😅' }, { min: 30, text: 'Normal kok 😊' }, { min: 0, text: 'Baik hati banget! 🌸' }]
})

export const cekRezeki = makeCekPercent({
    name: 'cekrezeki', aliases: ['rezeki', 'fortune'], emoji: '💸', label: 'REZEKI',
    descs: [{ min: 90, text: 'Rezeki melimpah! Jackpot! 💰🎉' }, { min: 70, text: 'Rezeki lancar! 😊' }, { min: 50, text: 'Rezeki cukup 🙏' }, { min: 30, text: 'Sabar ya, rezeki ada waktunya 💪' }, { min: 0, text: 'Banyak berdoa dan berusaha! 🤲' }]
})

export const cekSetia = makeCekPercent({
    name: 'ceksetia', aliases: ['setia', 'loyal'], emoji: '💍', label: 'KESETIAAN',
    descs: [{ min: 90, text: 'Setia sampai mati! 💍💕' }, { min: 70, text: 'Sangat setia! 💖' }, { min: 50, text: 'Lumayan setia 😊' }, { min: 30, text: 'Agak gampang tergoda 😬' }, { min: 0, text: 'Playboy/Playgirl detected! 💀' }]
})

export const cekSocmed = makeCekPercent({
    name: 'ceksocmed', aliases: ['socmed', 'medsos'], emoji: '📱', label: 'KECANDUAN SOCMED',
    descs: [{ min: 90, text: 'Kecanduan parah! Detox needed! 📱💀' }, { min: 70, text: 'Lumayan kecanduan 😅' }, { min: 50, text: 'Standar aja 😊' }, { min: 30, text: 'Bisa kontrol diri 👍' }, { min: 0, text: 'Sehat banget! Jarang main HP 🌿' }]
})

export const cekTsundere = makeCekPercent({
    name: 'cektsundere', aliases: ['tsundere'], emoji: '😤', label: 'TSUNDERE',
    descs: [{ min: 90, text: 'BAKA! B-BUKAN BERARTI AKU SUKA! 😤💢' }, { min: 70, text: 'Tsundere banget nih 😳' }, { min: 50, text: 'Agak tsundere 😊' }, { min: 30, text: 'Lumayan terbuka 😄' }, { min: 0, text: 'Deredere! Terbuka banget! 💕' }]
})

export const cekYandere = makeCekPercent({
    name: 'cekyandere', aliases: ['yandere'], emoji: '🔪', label: 'YANDERE',
    descs: [{ min: 90, text: 'Kamu milikku selamanya~ 🔪💕' }, { min: 70, text: 'Agak yandere nih 😳' }, { min: 50, text: 'Standar aja 😅' }, { min: 30, text: 'Masih wajar 😊' }, { min: 0, text: 'Santai banget! 🌸' }]
})

// ─── Cek Sisa Umur (special) ──────────────────────────────────
export let cekSisaUmur = async (m, { conn }) => {
    const jid = mentioned(m)
    const tahun = randInt(20, 99), bulan = randInt(0, 11), hari = randInt(0, 29)
    const desc = tahun > 80 ? 'Panjang umur banget! 🎉' : tahun > 60 ? 'Lumayan panjang~ ✨' : tahun > 40 ? 'Cukup lah ya 😊' : 'Jaga kesehatan ya! 🙏'
    const txt = jid === m.sender
        ? `Hai ${tag(jid)}\n\nSisa umur kamu *${tahun} Tahun ${bulan} Bulan ${hari} Hari*\n\`\`\`${desc}\`\`\``
        : `Kamu ingin ngecek sisa umur ${tag(jid)} yak?\n\nSisa umur dia *${tahun} Tahun ${bulan} Bulan ${hari} Hari*\n\`\`\`${desc}\`\`\``
    await conn.sendMessage(m.chat, { text: txt, mentions: [jid] }, { quoted: m })
}
cekSisaUmur.help = ['ceksisaumur']
cekSisaUmur.tags = ['fun']
cekSisaUmur.command = /^(ceksisaumur|sisaumur|umur)$/i

// ─── Cek Umur (random age) ────────────────────────────────────
export let cekUmur = async (m, { conn }) => {
    const jid = mentioned(m)
    const age = randInt(5, 80)
    const desc = age >= 60 ? 'Bijaksana seperti orang tua! 🧓' : age >= 30 ? 'Dewasa dan matang! 😊' : age >= 17 ? 'Muda dan energik! ⚡' : 'Masih bocil! 🍼'
    const txt = jid === m.sender
        ? `Hai ${tag(jid)}\n\nUmur kamu *${age} tahun*\n\`\`\`${desc}\`\`\``
        : `Kamu ingin ngecek umur ${tag(jid)} yak?\n\nUmur dia *${age} tahun*\n\`\`\`${desc}\`\`\``
    await conn.sendMessage(m.chat, { text: txt, mentions: [jid] }, { quoted: m })
}
cekUmur.help = ['cekumur']
cekUmur.tags = ['fun']
cekUmur.command = /^(cekumur|cekage|age)$/i

// ─── Cek Berat ────────────────────────────────────────────────
export let cekBerat = async (m, { conn }) => {
    const jid = mentioned(m)
    const berat = randInt(40, 100)
    const desc = berat >= 90 ? 'Big boy/girl! 💪' : berat >= 70 ? 'Berisi dan sehat! 😊' : berat >= 55 ? 'Ideal banget! 👍' : berat >= 45 ? 'Langsing nih~ 🌸' : 'Kurus banget, makan yang banyak! 🍔'
    const txt = jid === m.sender
        ? `Hai ${tag(jid)}\n\nBerat badan kamu *${berat} kg*\n\`\`\`${desc}\`\`\``
        : `Kamu ingin ngecek berat badan ${tag(jid)} yak?\n\nBerat badan dia *${berat} kg*\n\`\`\`${desc}\`\`\``
    await conn.sendMessage(m.chat, { text: txt, mentions: [jid] }, { quoted: m })
}
cekBerat.help = ['cekberat']
cekBerat.tags = ['fun']
cekBerat.command = /^(cekberat|berat|weight)$/i

// ─── Cek Tinggi ───────────────────────────────────────────────
export let cekTinggi = async (m, { conn }) => {
    const jid = mentioned(m)
    const tinggi = randInt(150, 200)
    const desc = tinggi >= 190 ? 'TINGGI BANGET! Model basketball! 🏀' : tinggi >= 175 ? 'Tinggi ideal! 😎' : tinggi >= 165 ? 'Lumayan tinggi 👍' : tinggi >= 155 ? 'Standard kok 🙂' : 'Imut dan mungil! 🥺'
    const txt = jid === m.sender
        ? `Hai ${tag(jid)}\n\nTinggi badan kamu *${tinggi} cm*\n\`\`\`${desc}\`\`\``
        : `Kamu ingin ngecek tinggi badan ${tag(jid)} yak?\n\nTinggi badan dia *${tinggi} cm*\n\`\`\`${desc}\`\`\``
    await conn.sendMessage(m.chat, { text: txt, mentions: [jid] }, { quoted: m })
}
cekTinggi.help = ['cektinggi']
cekTinggi.tags = ['fun']
cekTinggi.command = /^(cektinggi|tinggi|tall|height)$/i

export default cekCreative
