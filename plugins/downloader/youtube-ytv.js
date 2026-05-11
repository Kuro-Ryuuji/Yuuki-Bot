// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import ytdl from '@distube/ytdl-core'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} https://youtu.be/xxxxx`
  if (!ytdl.validateURL(args[0])) throw 'URL YouTube tidak valid!'

  m.reply(global.wait)

  const info = await ytdl.getInfo(args[0])
  const { title, thumbnails, lengthSeconds } = info.videoDetails
  const thumbnail = thumbnails.slice(-1)[0]?.url

  const format = ytdl.chooseFormat(info.formats, {
    quality: 'highestvideo',
    filter: f => f.container === 'mp4' && f.hasVideo && f.hasAudio
  }) || ytdl.chooseFormat(info.formats, { quality: '360p' })

  if (!format) throw 'Format video tidak tersedia'

  const size = format.contentLength
    ? (parseInt(format.contentLength) / 1024 / 1024).toFixed(2) + ' MB'
    : 'Unknown'
  const mins = Math.floor(lengthSeconds / 60)
  const secs = lengthSeconds % 60

  await conn.sendMessage(m.chat, {
    image: { url: thumbnail },
    caption: `🎬 *${title}*\n⏱️ Durasi: ${mins}m ${secs}s\n📦 Ukuran: ${size}\n\n🔗 ${format.url}`
  }, { quoted: m })
}

handler.help = ['ytv <url>']
handler.tags = ['downloader']
handler.command = /^(ytv|ytvideo|ytmp4)$/i
handler.limit = true
export default handler
