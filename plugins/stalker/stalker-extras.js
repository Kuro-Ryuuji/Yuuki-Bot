/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
import axios from 'axios'

// ─── WA Stalk ──────────────────────────────────────────────
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let number = args[0] || m.quoted?.sender
  if (!number) throw `📱 *ᴡᴀ sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} 628xxx\nAtau reply pesan kontak`
  number = number.replace(/[^0-9]/g, '')
  if (!number) throw '❌ Nomor tidak valid'
  const jid = number + '@s.whatsapp.net'
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const [pp, status] = await Promise.all([
    conn.profilePictureUrl(jid, 'image').catch(() => global.thumb),
    conn.fetchStatus(jid).catch(() => null)
  ])
  let name = '-'
  try { name = conn.contacts[jid]?.name || conn.contacts[jid]?.notify || '-' } catch {}
  const caption = `📱 *ᴡʜᴀᴛsᴀᴘᴘ sᴛᴀʟᴋ*\n\n📞 *Nomor:* +${number}\n👤 *Nama:* ${name}\n💬 *Status:* ${status?.status || '-'}\n\n> Powered by Elaina-MD`
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  await conn.sendMessage(m.chat, { image: { url: pp }, caption }, { quoted: m })
}
handler.help = ['wastalk <nomor>']
handler.tags = ['tools']
handler.command = /^(wastalk|stalkwa)$/i
export default handler

// ─── Free Fire Stalk ───────────────────────────────────────
export const ffStalkHandler = async (m, { conn, args, usedPrefix, command }) => {
  const id = args[0]
  if (!id) throw `🎮 *ꜰꜰ sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} 123456789`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  try {
    const { data } = await axios.get(`https://api.eliasnau.dev/ff/player?id=${id}`, { timeout: 15000 })
    if (!data) throw ''
    const caption = `🎮 *ꜰʀᴇᴇ ꜰɪʀᴇ sᴛᴀʟᴋ*\n\n🆔 *ID:* ${id}\n👤 *Nama:* ${data.name || data.nickname || '-'}\n🏆 *Level:* ${data.level || '-'}\n⭐ *Rank:* ${data.rank || '-'}\n❤️ *Likes:* ${data.likes || '-'}\n🌍 *Region:* ${data.region || '-'}\n\n> Powered by Elaina-MD`
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    m.reply(caption)
  } catch {
    throw 'Gagal mengambil data!'
  }
}
ffStalkHandler.help = ['ffstalk <id>']
ffStalkHandler.tags = ['stalker']
ffStalkHandler.command = /^(ffstalk|stalkff|freefirestal)$/i

// ─── Roblox Stalk ──────────────────────────────────────────
export const robloxStalkHandler = async (m, { conn, args, usedPrefix, command }) => {
  const username = args[0]
  if (!username) throw `🎮 *ʀᴏʙʟᴏx sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} Builderman`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  try {
    const { data } = await axios.get(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`, { timeout: 15000 })
    if (!data?.Id) throw ''
    const uid = data.Id
    const [avatar] = await Promise.all([
      axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${uid}&size=420x420&format=Png&isCircular=false`, { timeout: 10000 }).catch(() => null)
    ])
    const caption = `🎮 *ʀᴏʙʟᴏx sᴛᴀʟᴋ*\n\n🆔 *ID:* ${uid}\n👤 *Username:* ${data.Username}\n✅ *Online:* ${data.IsOnline ? 'Ya' : 'Tidak'}\n\n🔗 https://www.roblox.com/users/${uid}/profile\n\n> Powered by Elaina-MD`
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    const thumbUrl = avatar?.data?.data?.[0]?.imageUrl
    if (thumbUrl) await conn.sendMessage(m.chat, { image: { url: thumbUrl }, caption }, { quoted: m })
    else m.reply(caption)
  } catch {
    throw 'Gagal mengambil data!'
  }
}
robloxStalkHandler.help = ['robloxstalk <username>']
robloxStalkHandler.tags = ['stalker']
robloxStalkHandler.command = /^(robloxstalk|stalkroblox)$/i
