// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler = async (m, { conn, args, usedPrefix, command }) => {
    throw `Fitur sticker Line/Telegram sedang dalam perbaikan. Coba lagi nanti.`
}
handler.help = ['stikerline <url>']
handler.tags = ['sticker']
handler.command = /^(stic?ker(line|tele(gram)?))$/i
handler.limit = true
handler.disabled = true

export default handler