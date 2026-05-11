// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Contoh: ${usedPrefix + command} Halo dunia!`)

    try {
        const { createCanvas } = await import('canvas')

        const W = 1080, H = 1920
        const canvas = createCanvas(W, H)
        const ctx = canvas.getContext('2d')

        // Dark background
        ctx.fillStyle = '#111111'
        ctx.fillRect(0, 0, W, H)

        // Top bar: avatar circle + name + time
        const now = new Date()
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        const name = m.pushName || 'User'

        ctx.beginPath()
        ctx.arc(80, 100, 40, 0, Math.PI * 2)
        ctx.fillStyle = '#25D366'
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 36px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(name.charAt(0).toUpperCase(), 80, 115)

        ctx.textAlign = 'left'
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 34px sans-serif'
        ctx.fillText(name, 140, 95)
        ctx.fillStyle = '#aaaaaa'
        ctx.font = '28px sans-serif'
        ctx.fillText(timeStr, 140, 135)

        // Story progress bar
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(40, 40, W - 80, 5)

        // Center text (word-wrap)
        ctx.textAlign = 'center'
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 64px sans-serif'
        const words = text.split(' ')
        let line = '', lines = [], maxW = W - 120
        for (let w of words) {
            let test = line + (line ? ' ' : '') + w
            if (ctx.measureText(test).width > maxW && line) {
                lines.push(line)
                line = w
            } else line = test
        }
        if (line) lines.push(line)
        const lineH = 80
        const startY = H / 2 - (lines.length * lineH) / 2
        lines.forEach((l, i) => ctx.fillText(l, W / 2, startY + i * lineH))

        const buf = canvas.toBuffer('image/png')
        await conn.sendFile(m.chat, buf, 'fakestory.png', `📸 *Fake Story*`, m)
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['fakestory <teks>']
handler.tags = ['canvas']
handler.command = /^(fakestory)$/i

export default handler
