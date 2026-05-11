// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler = async (m, { conn, args, usedPrefix, command }) => {
  throw `Fitur facebook downloader sedang dalam perbaikan. Coba lagi nanti.`
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.exp = 35
handler.disabled = true
export default handler
