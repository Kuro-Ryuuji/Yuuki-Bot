// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler = async (m, { conn, text, usedPrefix, command }) => {
    throw `Fitur lyrics sedang dalam perbaikan. Coba lagi nanti.`
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i
handler.disabled = true

export default handler