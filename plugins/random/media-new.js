// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

// ─── Music Collection (music1-music65) ───────────────────────
let handlerMusic = async (m, { conn, command }) => {
    const num = parseInt(command.replace(/music/i, ''))
    if (!num || isNaN(num) || num < 1 || num > 65) throw `🎵 *ᴍᴜsɪᴄ ᴄᴏʟʟᴇᴄᴛɪᴏɴ*\n\n> Tersedia: \`${m.prefix}music1\` - \`${m.prefix}music65\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const url = `https://raw.githubusercontent.com/Rez4-3yz/Music-rd/master/music/music${num}.mp3`
    await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerMusic.help = ['music1 - music65']
handlerMusic.tags = ['media']
handlerMusic.command = /^music([1-9]|[1-5][0-9]|6[0-5])$/i
export { handlerMusic }

// ─── Sound Effects (sound1-sound250) ─────────────────────────
let handlerSound = async (m, { conn, command }) => {
    const num = parseInt(command.replace(/sound/i, ''))
    if (!num || isNaN(num) || num < 1 || num > 250) throw `🔊 *sᴏᴜɴᴅ ᴇꜰꜰᴇᴄᴛ*\n\n> Tersedia: \`${m.prefix}sound1\` - \`${m.prefix}sound250\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const url = `https://raw.githubusercontent.com/Rez4-3yz/Sound-rd/master/sound/sound${num}.mp3`
    await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerSound.help = ['sound1 - sound250']
handlerSound.tags = ['media']
handlerSound.command = /^sound([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/i
export { handlerSound }

// ─── Mengkane Music (mengkane1-mengkane52) ───────────────────
let handlerMengkane = async (m, { conn, command }) => {
    const num = parseInt(command.replace(/mengkane/i, ''))
    if (!num || isNaN(num) || num < 1 || num > 52) throw `🎵 *ᴍᴇɴɢᴋᴀɴᴇ ᴍᴜsɪᴄ*\n\n> Tersedia: \`${m.prefix}mengkane1\` - \`${m.prefix}mengkane52\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const fixcmd = `mangkane${num}`
    const url = num < 25
        ? `https://raw.githubusercontent.com/hyuura/Rest-Sound/main/HyuuraKane/${fixcmd}.mp3`
        : `https://raw.githubusercontent.com/aisyah-rest/mangkane/main/Mangkanenya/${fixcmd}.mp3`
    await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
handlerMengkane.help = ['mengkane1 - mengkane52']
handlerMengkane.tags = ['media']
handlerMengkane.command = /^mengkane([1-9]|[1-4][0-9]|5[0-2])$/i
export { handlerMengkane }

export default handlerMusic
