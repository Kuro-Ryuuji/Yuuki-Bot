// AI Image Style Converter — toghibli, tocartoon, tochibi
import axios from 'axios'

async function uploadToTelegraph(buffer) {
    const FormData = (await import('form-data')).default
    const fetch = (await import('node-fetch')).default
    const form = new FormData()
    form.append('file', buffer, { filename: 'image.jpg', contentType: 'image/jpeg' })
    const res = await fetch('https://telegra.ph/upload', { method: 'POST', body: form, headers: form.getHeaders() })
    const json = await res.json()
    if (json?.[0]?.src) return 'https://telegra.ph' + json[0].src
    throw 'Upload gagal'
}

let handler = async (m, { conn, command }) => {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!/image/.test(mime)) return m.reply('Reply ke gambar!')
    const img = await q.download()
    await m.react('🕐')
    try {
        const url = await uploadToTelegraph(img)
        let result
        if (/toghibli/i.test(command)) {
            try {
                const { data } = await axios.post('https://api.ryzendesu.vip/api/ai/ghibli', { url }, { responseType: 'arraybuffer' })
                result = Buffer.from(data)
            } catch {
                const { data } = await axios.get('https://api.siputzx.my.id/api/ai/ghibli', { params: { url }, responseType: 'arraybuffer' })
                result = Buffer.from(data)
            }
        } else if (/tocartoon/i.test(command)) {
            const { data } = await axios.get('https://api.siputzx.my.id/api/ai/cartoon', { params: { url }, responseType: 'arraybuffer' })
            result = Buffer.from(data)
        } else if (/tochibi/i.test(command)) {
            const { data } = await axios.get('https://api.siputzx.my.id/api/ai/chibi', { params: { url }, responseType: 'arraybuffer' })
            result = Buffer.from(data)
        }
        await conn.sendFile(m.chat, result, `${command}.jpg`, '', m)
    } catch (e) {
        m.reply('Gagal: ' + (e?.message || e))
    }
}
handler.help = ['toghibli', 'tocartoon', 'tochibi']
handler.tags = ['ai']
handler.command = /^(toghibli|tocartoon|tochibi)$/i
export default handler
