let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Contoh: ${usedPrefix + command} Budi`)

    try {
        const { createCanvas } = await import('canvas')

        const W = 480, H = 854
        const canvas = createCanvas(W, H)
        const ctx = canvas.getContext('2d')

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 0, H)
        grad.addColorStop(0, '#1a1a2e')
        grad.addColorStop(1, '#16213e')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)

        // WhatsApp label
        ctx.fillStyle = '#25D366'
        ctx.font = 'bold 22px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('WhatsApp', W / 2, 80)

        // Caller name
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText(text, W / 2, H / 2 - 60)

        // Status
        ctx.fillStyle = '#aaaaaa'
        ctx.font = '20px sans-serif'
        ctx.fillText('Panggilan WhatsApp', W / 2, H / 2 - 20)

        // Avatar circle
        ctx.beginPath()
        ctx.arc(W / 2, H / 2 - 160, 70, 0, Math.PI * 2)
        ctx.fillStyle = '#25D366'
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 48px sans-serif'
        ctx.fillText(text.charAt(0).toUpperCase(), W / 2, H / 2 - 140)

        // Decline button (red)
        ctx.beginPath()
        ctx.arc(W / 2 - 90, H - 160, 40, 0, Math.PI * 2)
        ctx.fillStyle = '#FF3B30'
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText('✕', W / 2 - 90, H - 150)

        // Accept button (green)
        ctx.beginPath()
        ctx.arc(W / 2 + 90, H - 160, 40, 0, Math.PI * 2)
        ctx.fillStyle = '#25D366'
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.fillText('✓', W / 2 + 90, H - 150)

        // Labels
        ctx.fillStyle = '#ffffff'
        ctx.font = '14px sans-serif'
        ctx.fillText('Tolak', W / 2 - 90, H - 108)
        ctx.fillText('Terima', W / 2 + 90, H - 108)

        const buf = canvas.toBuffer('image/png')
        await conn.sendFile(m.chat, buf, 'fakecall.png', `📞 *Fake Call: ${text}*`, m)
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['fakecall <nama>']
handler.tags = ['canvas']
handler.command = /^(fakecall)$/i

export default handler
