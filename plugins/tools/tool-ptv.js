let handler = async (m, { conn, usedPrefix, command }) => {
  const isVid = /video/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
  if (!isVid) throw `❌ Reply ke video dengan \`${usedPrefix}${command}\``
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    const buf = m.quoted ? await m.quoted.download() : await m.download()
    if (!buf?.length) throw '❌ Duh gagal download video nih'
    await conn.sendMessage(m.chat, { video: buf, ptv: true }, { quoted: m })
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch {
    throw '❌ Duh gagal convert video ke PTV! nih'
  }
}
handler.help = ['ptv (reply video)']
handler.tags = ['tools']
handler.command = /^(ptv|videobulet|roundvideo)$/i
export default handler
