if (!global.tembakSessions) global.tembakSessions = {}

const romanticQuotes = [
    'Aku bukan pilot, tapi aku bisa buat hatimu terbang tinggi bersamaku 💕',
    'Kamu tau kenapa aku suka hujan? Karena hujan itu seperti kamu, sejuk di hati 🌧️',
    'Kamu adalah alasan kenapa aku senyum tanpa sebab 😊',
    'Kalau kamu bintang, aku mau jadi langit yang selalu nemenin kamu ✨',
    'Aku gak butuh GPS, karena hatiku udah nunjuk ke arahmu 💘',
    'Boleh pinjam hatimu? Janji bakal dijaga selamanya 💖',
]

let handler = async (m, { conn, args }) => {
    let targetJid = null
    if (m.quoted) {
        targetJid = m.quoted.sender
    } else if (m.mentionedJid?.[0]) {
        targetJid = m.mentionedJid[0]
    } else if (args[0]) {
        let num = args[0].replace(/[^0-9]/g, '')
        if (num.length > 5 && num.length < 20) targetJid = num + '@s.whatsapp.net'
    }

    if (!targetJid) return m.reply(
        `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n> \`${m.prefix}tembak @tag\`\n> Reply pesan + \`${m.prefix}tembak\``
    )

    const namaTarget = conn.getName(targetJid) || targetJid.split('@')[0]
    const namaPengirim = conn.getName(m.sender) || m.sender.split('@')[0]
    if (targetJid === m.sender) return m.reply('ga bisa nembak diri sendiri senpai!')

    const db = global.db.data
    if (!db.users[m.sender]) db.users[m.sender] = {}
    if (!db.users[targetJid]) db.users[targetJid] = {}
    const senderData = db.users[m.sender]
    const targetData = db.users[targetJid]

    if (senderData.pasangan) return m.reply(
        `❌ Yare yare, kamu udah punya pacar lho senpai, putus dulu sana\n \`${m.prefix}putus\``
    )

    if (targetData.pasangan && targetData.pasangan !== m.sender) return m.reply(
        `💔 dia udah punya pacar senpai, cari yang lain aja!`
    )

    if (targetData.tembakTarget === m.sender) {
        senderData.pasangan = targetJid
        targetData.pasangan = m.sender
        delete senderData.tembakTarget
        delete targetData.tembakTarget
        await conn.sendMessage(m.chat, { react: { text: '💕', key: m.key } })
        return m.reply(
            `💕 *CIE CIEE :3*\n\n@${m.sender.split('@')[0]} dan @${targetJid.split('@')[0]} resmi pacaran!\n\nSemoga langgeng ya senpai! 💍`,
            null, { mentions: [m.sender, targetJid] }
        )
    }

    senderData.tembakTarget = targetJid
    global.tembakSessions[`${m.chat}_${targetJid}`] = {
        shooter: m.sender, target: targetJid, chat: m.chat, timestamp: Date.now()
    }

    await conn.sendMessage(m.chat, { react: { text: '💘', key: m.key } })
    const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)]
    await m.reply(
        `💘 *ADA YANG NEMBAK NIHH*\n\nHei @${targetJid.split('@')[0]}, kamu ditembak oleh @${m.sender.split('@')[0]}!\n\n_"${quote}"_\n\n⏱️ Berlaku *1 jam* dari sekarang\nGunakan: \`${m.prefix}terima\` / \`${m.prefix}tolak\``,
        null, { mentions: [targetJid, m.sender] }
    )
}
handler.help = ['tembak @tag']
handler.tags = ['fun']
handler.command = /^(tembak|nembak|propose)$/i
handler.group = true

// ─── Terima ───────────────────────────────────────────────────
export let handlerTerima = async (m) => {
    const db = global.db.data
    const allSessions = Object.entries(global.tembakSessions || {}).filter(
        ([, val]) => val.target === m.sender && val.chat === m.chat && Date.now() - val.timestamp < 3600000
    )
    if (!allSessions.length) return m.reply('❌ ga ada yang nembak kamu senpai!')

    const [sessKey, sessData] = allSessions[0]
    if (!db.users[m.sender]) db.users[m.sender] = {}
    if (!db.users[sessData.shooter]) db.users[sessData.shooter] = {}

    db.users[m.sender].pasangan = sessData.shooter
    db.users[sessData.shooter].pasangan = m.sender
    delete db.users[sessData.shooter].tembakTarget
    delete global.tembakSessions[sessKey]

    await conn.sendMessage(m.chat, { react: { text: '💕', key: m.key } })
    await m.reply(
        `💕 *WIDIHHHH, CIE CIE DITERIMA* @${sessData.shooter.split('@')[0]}\n\n@${m.sender.split('@')[0]} dan @${sessData.shooter.split('@')[0]} resmi pacaran!\n\nSemoga langgeng dan bahagia 💍`,
        null, { mentions: [m.sender, sessData.shooter] }
    )
}
handlerTerima.help = ['terima']
handlerTerima.tags = ['fun']
handlerTerima.command = /^(terima)$/i
handlerTerima.group = true

// ─── Tolak ───────────────────────────────────────────────────
export let handlerTolak = async (m) => {
    const db = global.db.data
    const allSessions = Object.entries(global.tembakSessions || {}).filter(
        ([, val]) => val.target === m.sender && val.chat === m.chat && Date.now() - val.timestamp < 3600000
    )
    if (!allSessions.length) return m.reply('❌ ga ada yang nembak kamu senpai!')

    const [sessKey, sessData] = allSessions[0]
    if (db.users[sessData.shooter]) delete db.users[sessData.shooter].tembakTarget
    delete global.tembakSessions[sessKey]

    await conn.sendMessage(m.chat, { react: { text: '💔', key: m.key } })
    await m.reply(
        `💔 *WADUHH, YANG SABAR YA SENPAI* @${sessData.shooter.split('@')[0]}\n\n@${m.sender.split('@')[0]} nolak jadi pacar kamu @${sessData.shooter.split('@')[0]}\n\nSabar ya, masih banyak yang lain kok senpai! 😢`,
        null, { mentions: [m.sender, sessData.shooter] }
    )
}
handlerTolak.help = ['tolak']
handlerTolak.tags = ['fun']
handlerTolak.command = /^(tolak)$/i
handlerTolak.group = true

// ─── Putus ───────────────────────────────────────────────────
export let handlerPutus = async (m) => {
    const db = global.db.data
    if (!db.users[m.sender]) db.users[m.sender] = {}
    const senderData = db.users[m.sender]
    if (!senderData.pasangan) return m.reply('❌ Kamu belum punya pacar senpai!')

    const partnerJid = senderData.pasangan
    if (db.users[partnerJid]) delete db.users[partnerJid].pasangan
    delete senderData.pasangan

    await conn.sendMessage(m.chat, { react: { text: '💔', key: m.key } })
    await m.reply(
        `💔 *PUTUS*\n\n@${m.sender.split('@')[0]} dan @${partnerJid.split('@')[0]} udah putus.\n\nSemoga bisa move on ya senpai! 😢`,
        null, { mentions: [m.sender, partnerJid] }
    )
}
handlerPutus.help = ['putus']
handlerPutus.tags = ['fun']
handlerPutus.command = /^(putus|cerai)$/i

// ─── Cek Pacar ───────────────────────────────────────────────────
export let handlerCekPacar = async (m) => {
    const db = global.db.data
    const userData = db.users[m.sender]
    if (!userData?.pasangan) return m.reply('💔 Kamu masih jomblo nih senpai!\n\nPake `.tembak @tag` untuk nembak seseorang biar jadi pacar kamu!')
    await m.reply(
        `💕 *ᴘᴀsᴀɴɢᴀɴᴍᴜ*\n\n> @${userData.pasangan.split('@')[0]}`,
        null, { mentions: [userData.pasangan] }
    )
}
handlerCekPacar.help = ['cekpacar']
handlerCekPacar.tags = ['fun']
handlerCekPacar.command = /^(cekpacar|pacarku|pasanganku)$/i

export default handler
