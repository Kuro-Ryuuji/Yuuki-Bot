// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: Gunakan youtube-play-v2.js untuk command play/playaudio/putar
let handler = async (m, { conn, command, text, usedPrefix }) => {
  throw `Fitur ini sudah dipindah. Gunakan *${usedPrefix}play <judul lagu>*`
}
handler.help = []
handler.tags = ['downloader']
handler.command = /^(play_legacy)$/i
handler.exp = 0
handler.limit = false
handler.register = false
handler.disabled = true

export default handler
