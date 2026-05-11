/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
import axios from 'axios'

async function primbon(endpoint, params) {
  const qs = new URLSearchParams(params).toString()
  const res = await axios.get(`https://api.siputzx.my.id/api/primbon/${endpoint}?${qs}`, {
    timeout: 15000, headers: { 'user-agent': 'Mozilla/5.0' }
  })
  return res.data?.data || res.data?.result || res.data
}

// ─── Zodiak ────────────────────────────────────────────────
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `♈ *ᴢᴏᴅɪᴀᴋ*\n\nContoh: ${usedPrefix}${command} aries`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const d = await primbon('zodiak', { zodiak: text })
  if (!d) throw '❌ Zodiak tidak ditemukan'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`♈ *ᴢᴏᴅɪᴀᴋ — ${text.toUpperCase()}*\n\n${typeof d === 'string' ? d : JSON.stringify(d, null, 2)}`)
}
handler.help = ['zodiak <nama zodiak>']
handler.tags = ['tools']
handler.command = /^zodiak$/i
export default handler

// ─── Arti Nama ─────────────────────────────────────────────
export const artinama = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `📛 *ᴀʀᴛɪ ɴᴀᴍᴀ*\n\nContoh: ${usedPrefix}${command} Budi`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const d = await primbon('artinama', { nama: text })
  if (!d) throw '❌ Nama tidak ditemukan'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`📛 *ᴀʀᴛɪ ɴᴀᴍᴀ — ${text}*\n\n${typeof d === 'string' ? d : JSON.stringify(d, null, 2)}`)
}
artinama.help = ['artinama <nama>']
artinama.tags = ['primbon']
artinama.command = /^artinama$/i

// ─── Tafsir Mimpi ──────────────────────────────────────────
export const tafsirmimpi = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `💤 *ᴛᴀꜰsɪʀ ᴍɪᴍᴘɪ*\n\nContoh: ${usedPrefix}${command} mimpi terbang`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const d = await primbon('tafsirmimpi', { mimpi: text })
  if (!d) throw '❌ Tafsir tidak ditemukan'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`💤 *ᴛᴀꜰsɪʀ ᴍɪᴍᴘɪ*\n\n${typeof d === 'string' ? d : JSON.stringify(d, null, 2)}`)
}
tafsirmimpi.help = ['tafsirmimpi <mimpi>']
tafsirmimpi.tags = ['primbon']
tafsirmimpi.command = /^tafsirmimpi$/i

// ─── Ramalan Jodoh ─────────────────────────────────────────
export const ramalanjodoh = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `💕 *ʀᴀᴍᴀʟᴀɴ ᴊᴏᴅᴏʜ*\n\nContoh: ${usedPrefix}${command} Budi`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const d = await primbon('ramalanjodoh', { nama: text })
  if (!d) throw '❌ Gagal meramal'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`💕 *ʀᴀᴍᴀʟᴀɴ ᴊᴏᴅᴏʜ — ${text}*\n\n${typeof d === 'string' ? d : JSON.stringify(d, null, 2)}`)
}
ramalanjodoh.help = ['ramalanjodoh <nama>']
ramalanjodoh.tags = ['primbon']
ramalanjodoh.command = /^ramalanjodoh$/i

// ─── Nomer Hoki ────────────────────────────────────────────
export const nomerhoki = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🍀 *ɴᴏᴍᴇʀ ʜᴏᴋɪ*\n\nContoh: ${usedPrefix}${command} Budi`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const d = await primbon('nomerhoki', { nama: text })
  if (!d) throw '❌ Gagal mendapatkan nomer hoki'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`🍀 *ɴᴏᴍᴇʀ ʜᴏᴋɪ — ${text}*\n\n${typeof d === 'string' ? d : JSON.stringify(d, null, 2)}`)
}
nomerhoki.help = ['nomerhoki <nama>']
nomerhoki.tags = ['primbon']
nomerhoki.command = /^nomerhoki$/i
