// DISABLED: API tidak tersedia
let handler = async (m, { conn, text, usedPrefix, command }) => {
    throw `Fitur wallpaper sedang dalam perbaikan. Coba lagi nanti.`
}
handler.help = ['', '2'].map(v => 'wallpaper' + v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(wallpaper2?)$/i
handler.disabled = true

export default handler