// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler = async (m, { conn, command, args }) => {
  throw `Fitur google search sedang dalam perbaikan. Coba lagi nanti.`
}

handler.help = ['google <pencarian>', 'googlef <pencarian>']
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.disabled = true
export default handler
