import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkin teks!'
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    const neoxrKey = global.APIKeys?.neoxr || ''
    const colors = ['FF5733','C70039','900C3F','2E86AB','3A0CA3','7209B7','4361EE']
    const color = colors[Math.floor(Math.random() * colors.length)]
    let url = `https://api.neoxr.eu/api/attp3?text=${encodeURIComponent(teks)}&color=${color}&apikey=${neoxrKey}`
    const res = await axios.get(url, { timeout: 30000 }).catch(() => null)
    const stickerUrl = res?.data?.data?.url
    if (!stickerUrl) throw '❌ Duh gagal generate ATTP. Pastiin neoxr apikey udah diset di config.js'
    conn.sendFile(m.chat, stickerUrl, 'attp.webp', '', m, false, { asSticker: true })
}
handler.help = ['attp <teks>']
handler.tags = ['sticker']
handler.command = /^attp$/i

export default handler
