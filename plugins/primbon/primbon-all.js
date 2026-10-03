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

// ─── Kecocokan Nama Pasangan ──────────────────────────────────
export const kecocokannamapasangan = async (m, { conn, args }) => {
  if (args.length < 2) throw `💕 *ᴋᴇᴄᴏᴄᴏᴋᴀɴ ɴᴀᴍᴀ*\n\n> Format: nama1 nama2\n\n\`Contoh: ${m.prefix}kecocokannamapasangan putu keyla\``
  const [nama1, nama2] = args
  conn.sendMessage(m.chat, { react: { text: '💕', key: m.key } })
  const { data } = await (await import('axios')).default.get(
    `https://api.siputzx.my.id/api/primbon/kecocokan_nama_pasangan?nama1=${encodeURIComponent(nama1)}&nama2=${encodeURIComponent(nama2)}`,
    { timeout: 30000 }
  ).catch(() => ({ data: null }))
  if (!data?.status || !data?.data) throw '❌ Gagal menganalisa'
  const r = data.data
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  await m.reply(`💕 *ᴋᴇᴄᴏᴄᴏᴋᴀɴ ɴᴀᴍᴀ ᴘᴀsᴀɴɢᴀɴ*\n\n> 👤 ${r.nama_anda}\n> 💑 ${r.nama_pasangan}\n\n✅ *Positif:*\n${r.sisi_positif}\n\n❌ *Negatif:*\n${r.sisi_negatif}\n\n> _${r.catatan}_`)
}
kecocokannamapasangan.help = ['kecocokannamapasangan nama1 nama2']
kecocokannamapasangan.tags = ['primbon']
kecocokannamapasangan.command = /^(kecocokannamapasangan|kecocokannama|namacouple)$/i

// ─── Potensi Penyakit ─────────────────────────────────────────
export const potensipenyakit = async (m, { conn, args }) => {
  if (args.length < 3) throw `🏥 *ᴘᴏᴛᴇɴsɪ ᴘᴇɴʏᴀᴋɪᴛ*\n\n> Format: tgl bln thn\n\n\`Contoh: ${m.prefix}potensipenyakit 12 05 1998\``
  const [tgl, bln, thn] = args
  conn.sendMessage(m.chat, { react: { text: '🏥', key: m.key } })
  const { data } = await (await import('axios')).default.get(
    `https://api.siputzx.my.id/api/primbon/cek_potensi_penyakit?tgl=${tgl}&bln=${bln}&thn=${thn}`,
    { timeout: 30000 }
  ).catch(() => ({ data: null }))
  if (!data?.status || !data?.data) throw '❌ Gagal menganalisa'
  const r = data.data
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  await m.reply(`🏥 *ᴘᴏᴛᴇɴsɪ ᴘᴇɴʏᴀᴋɪᴛ*\n\n> Lahir: *${tgl}-${bln}-${thn}*\n\n📊 *Elemen:*\n${r.sektor}\n\n⚠️ *Potensi:*\n${r.elemen}\n\n> _${r.catatan}_`)
}
potensipenyakit.help = ['potensipenyakit tgl bln thn']
potensipenyakit.tags = ['primbon']
potensipenyakit.command = /^(potensipenyakit|cekpenyakit)$/i

// ─── Sifat Usaha Bisnis ───────────────────────────────────────
export const sifatusahabisnis = async (m, { conn, args }) => {
  if (args.length < 3) throw `💼 *sɪꜰᴀᴛ ᴜsᴀʜᴀ/ʙɪsɴɪs*\n\n> Format: tgl bln thn\n\n\`Contoh: ${m.prefix}sifatusahabisnis 1 1 2000\``
  const [tgl, bln, thn] = args
  conn.sendMessage(m.chat, { react: { text: '💼', key: m.key } })
  const { data } = await (await import('axios')).default.get(
    `https://api.siputzx.my.id/api/primbon/sifat_usaha_bisnis?tgl=${tgl}&bln=${bln}&thn=${thn}`,
    { timeout: 30000 }
  ).catch(() => ({ data: null }))
  if (!data?.status || !data?.data) throw '❌ Gagal menganalisa'
  const r = data.data
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  await m.reply(`💼 *sɪꜰᴀᴛ ᴜsᴀʜᴀ/ʙɪsɴɪs*\n\n> Lahir: *${r.hari_lahir}*\n\n📊 *Analisa:*\n${r.usaha}\n\n> _${r.catatan}_`)
}
sifatusahabisnis.help = ['sifatusahabisnis tgl bln thn']
sifatusahabisnis.tags = ['primbon']
sifatusahabisnis.command = /^(sifatusahabisnis|sifatbisnis|usahabisnis)$/i
