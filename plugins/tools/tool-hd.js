import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {
  const isImg = /image/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
  if (!isImg) return m.reply('❌ Reply ke gambar yang kamu mau senpai!')
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    const buf = m.quoted ? await m.quoted.download() : await m.download()
    if (!buf?.length) throw '❌ Duh gagal download gambar nih'
    const b64 = buf.toString('base64')
    const res = await axios.post('https://api.ryzendesu.vip/api/image/remini',
      { image: b64 },
      { responseType: 'arraybuffer', timeout: 60000 }
    )
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await conn.sendMessage(m.chat, { image: Buffer.from(res.data), caption: '✨ *ʜᴅ ᴇɴʜᴀɴᴄᴇ*\n\nGambar berhasil di-enhance!' }, { quoted: m })
  } catch {
    throw '❌ Duh gagal enhance gambar! nih'
  }
}
handler.help = ['enhancehd (reply gambar)']
handler.tags = ['tools']
handler.command = /^(enhancehd|hdimage)$/i
export default handler
