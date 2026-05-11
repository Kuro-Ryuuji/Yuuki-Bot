// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// DISABLED: API tidak tersedia
let handler = async (m, { text, usedPrefix, command }) => {
    throw `Fitur jadwal sholat sedang dalam perbaikan. Coba lagi nanti.`
}
handler.help = ['salat <daerah>']
handler.tags = ['islamic']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i
handler.disabled = true

export default handler