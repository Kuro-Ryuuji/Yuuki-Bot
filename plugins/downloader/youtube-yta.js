import ytdl from '@distube/ytdl-core'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} https://youtu.be/xxxxx`
  if (!ytdl.validateURL(args[0])) throw 'URL YouTube tidak valid!'

  m.reply(global.wait)

  const info = await ytdl.getInfo(args[0])
  const { title, thumbnails } = info.videoDetails
  const thumbnail = thumbnails.slice(-1)[0]?.url

  const format = ytdl.chooseFormat(info.formats, {
    quality: 'highestaudio',
    filter: 'audioonly'
  })
  if (!format) throw 'Format audio tidak tersedia'

  const contentLength = parseInt(format.contentLength || 0)
  const MAX_SIZE = 50 * 1024 * 1024 // 50MB
  if (contentLength > MAX_SIZE) throw `File terlalu besar (${(contentLength / 1024 / 1024).toFixed(1)} MB). Maksimal 50MB untuk dikirim via WhatsApp.`

  const size = contentLength ? (contentLength / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'

  // Send thumbnail + caption first
  await conn.sendMessage(m.chat, {
    image: { url: thumbnail },
    caption: `🎵 *${title}*\n📦 Ukuran: ${size}`
  }, { quoted: m })

  // Download audio buffer
  const chunks = []
  await new Promise((resolve, reject) => {
    ytdl(args[0], { format })
      .on('data', chunk => chunks.push(chunk))
      .on('end', resolve)
      .on('error', reject)
  })
  const audioBuffer = Buffer.concat(chunks)

  await conn.sendMessage(m.chat, {
    audio: audioBuffer,
    mimetype: 'audio/mpeg',
    fileName: `${title.slice(0, 50)}.mp3`,
    ptt: false
  }, { quoted: m })
}

handler.help = ['yta <url>']
handler.tags = ['downloader']
handler.command = /^(yta|ytaudio|ytmp3)$/i
handler.limit = true
export default handler
