// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler= async (m, { args, usedPrefix, command }) => {
    throw `Fitur Instagram stalk sedang dalam perbaikan. Coba lagi nanti.`
}

handler.help = ['igstalk'].map(v => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(igstalk)$/i
handler.disabled = true

export default handler