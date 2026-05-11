// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'

// ─── Discord Stalk ────────────────────────────────────────────
let handlerDiscordStalk = async (m, { conn, args }) => {
    const userId = args?.[0]?.trim()
    if (!userId) throw `🎮 *ᴅɪsᴄᴏʀᴅ sᴛᴀʟᴋ*\n\n> Masukkan Discord User ID\n\n\`Contoh: ${m.prefix}discordstalk 297574907510784000\``
    if (!/^\d+$/.test(userId)) throw '❌ User ID harus berupa angka!'
    conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    const res = await axios.get(`https://api.neoxr.eu/api/dcstalk?id=${userId}&apikey=${neoxrKey}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.data) throw `❌ User ID *${userId}* tidak ditemukan`
    const d = res.data.data
    const caption = `🎮 *ᴅɪsᴄᴏʀᴅ sᴛᴀʟᴋ*\n\n` +
        `👤 *Username:* ${d.username || '-'}\n` +
        `📛 *Display Name:* ${d.global_name || '-'}\n` +
        `🔢 *Discriminator:* #${d.discriminator || '0'}\n` +
        `🆔 *User ID:* ${d.id}\n\n` +
        `> _Discord User Lookup_`
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    if (d.avatar_url) await conn.sendMessage(m.chat, { image: { url: d.avatar_url }, caption }, { quoted: m })
    else await m.reply(caption)
}
handlerDiscordStalk.help = ['discordstalk <userid>']
handlerDiscordStalk.tags = ['stalker']
handlerDiscordStalk.command = /^(discordstalk|dcstalk|stalkdc)$/i
export { handlerDiscordStalk }

// ─── Pinterest Stalk ──────────────────────────────────────────
let handlerPinterestStalk = async (m, { conn, args }) => {
    const username = args?.[0]?.trim()
    if (!username) throw `📌 *ᴘɪɴᴛᴇʀᴇsᴛ sᴛᴀʟᴋ*\n\n> Masukkan username Pinterest\n\n\`Contoh: ${m.prefix}pintereststalk shiroko\``
    conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    const res = await axios.get(`https://api.baguss.xyz/api/stalker/pinterest?username=${encodeURIComponent(username)}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.user) throw `❌ Username *${username}* tidak ditemukan`
    const u = res.data.user, s = u.stats
    const caption = `📌 *ᴘɪɴᴛᴇʀᴇsᴛ sᴛᴀʟᴋ*\n\n` +
        `👤 *Username:* ${u.username}\n📛 *Nama:* ${u.full_name}\n\n` +
        `📍 *Pins:* ${s.pins}\n👥 *Followers:* ${s.followers}\n` +
        `👤 *Following:* ${s.following}\n📋 *Boards:* ${s.boards}\n\n` +
        `📝 *Bio:*\n${u.bio || '-'}\n\n🔗 ${u.profile_url}`
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    const pic = u.image?.original || u.image?.large
    if (pic) await conn.sendMessage(m.chat, { image: { url: pic }, caption }, { quoted: m })
    else await m.reply(caption)
}
handlerPinterestStalk.help = ['pintereststalk <username>']
handlerPinterestStalk.tags = ['stalker']
handlerPinterestStalk.command = /^(pintereststalk|pinstalk|stalkpin)$/i
export { handlerPinterestStalk }

// ─── Roblox Player Search ─────────────────────────────────────
let handlerRoblox = async (m, { conn, text }) => {
    if (!text) throw `🎮 *ʀᴏʙʟᴏx sᴇᴀʀᴄʜ*\n\n\`${m.prefix}robloxplayer linkmon\``
    conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
    const neoxrKey = global.APIKeys?.neoxr || ''
    const res = await axios.get(`https://api.neoxr.eu/api/roblox-search?q=${encodeURIComponent(text)}&apikey=${neoxrKey}`, { timeout: 30000 }).catch(() => null)
    if (!res?.data?.status || !res?.data?.data?.length) throw `❌ Tidak ditemukan player: ${text}`
    const players = res.data.data.slice(0, 10)
    let txt = `🎮 *ʀᴏʙʟᴏx ᴘʟᴀʏᴇʀ sᴇᴀʀᴄʜ*\n\n> Query: \`${text}\`\n> Ditemukan: *${players.length}* player\n\n`
    players.forEach((p, i) => {
        txt += `*${i + 1}.* ${p.displayName}\n   🆔 \`${p.id}\` | 👤 \`${p.name}\`${p.hasVerifiedBadge ? ' ✅' : ''}\n\n`
    })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(txt.trim())
}
handlerRoblox.help = ['robloxplayer <username>']
handlerRoblox.tags = ['stalker']
handlerRoblox.command = /^(robloxplayer|robloxsearch|searchroblox)$/i
export { handlerRoblox }

export default handlerDiscordStalk
