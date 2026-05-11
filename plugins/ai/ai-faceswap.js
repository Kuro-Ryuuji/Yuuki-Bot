// AI Face Swap
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

let handler = async (m, { conn }) => {
    // source = quoted image, target = message image (or second quoted)
    const q = m.quoted
    const mMime = (m.msg || m).mimetype || ''
    const qMime = q ? ((q.msg || q).mimetype || '') : ''

    const hasMsg = /image/.test(mMime)
    const hasQuoted = /image/.test(qMime)

    if (!hasMsg && !hasQuoted) return m.reply('Kirim 2 gambar: reply gambar pertama sambil kirim gambar kedua!')
    if (!hasMsg || !hasQuoted) return m.reply('Kirim 2 gambar: reply gambar pertama sambil kirim gambar kedua!')

    await m.react('🕐')
    try {
        const [sourceBuf, targetBuf] = await Promise.all([q.download(), m.download()])
        const [source, target] = await Promise.all([uploadToTelegraph(sourceBuf), uploadToTelegraph(targetBuf)])
        const { data } = await axios.post('https://api.ryzendesu.vip/api/ai/faceswap', { source, target }, { responseType: 'arraybuffer' })
        await conn.sendFile(m.chat, Buffer.from(data), 'faceswap.jpg', '', m)
    } catch (e) {
        m.reply('Gagal: ' + (e?.message || e))
    }
}
handler.help = ['faceswap']
handler.tags = ['ai']
handler.command = /^faceswap$/i
export default handler
