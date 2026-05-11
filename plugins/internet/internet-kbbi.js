// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler = async (m, { text, usedPrefix, command }) => {
    throw `Fitur KBBI sedang dalam perbaikan. Coba lagi nanti.`
}
handler.help = ['kbbi <teks>']
handler.tags = ['internet']
handler.disabled = true
handler.command = /^kbbi$/i
handler.disabled = true

export default handler