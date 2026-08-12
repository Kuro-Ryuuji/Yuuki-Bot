// DISABLED: API tidak tersedia
let handler = async (m, { conn, text, usedPrefix, command }) => {
    throw `Fitur google image sedang dalam perbaikan. Coba lagi nanti.`
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i
handler.disabled = true

export default handler