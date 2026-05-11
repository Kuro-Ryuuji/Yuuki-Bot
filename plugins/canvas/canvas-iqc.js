// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Contoh: ${usedPrefix + command} Budi`)

    try {
        const { createCanvas } = await import('canvas')

        const W = 600, H = 400
        const canvas = createCanvas(W, H)
        const ctx = canvas.getContext('2d')

        // Background
        const grad = ctx.createLinearGradient(0, 0, W, H)
        grad.addColorStop(0, '#0f0c29')
        grad.addColorStop(1, '#302b63')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)

        // Border
        ctx.strokeStyle = '#7c3aed'
        ctx.lineWidth = 4
        ctx.strokeRect(10, 10, W - 20, H - 20)

        // Title
        ctx.fillStyle = '#a78bfa'
        ctx.font = 'bold 28px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('🧠 IQ CARD', W / 2, 60)

        // Name
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText(text, W / 2, 120)

        // Random IQ
        const iq = Math.floor(Math.random() * 151) + 50
        const iqColor = iq >= 140 ? '#22c55e' : iq >= 110 ? '#3b82f6' : iq >= 90 ? '#f59e0b' : '#ef4444'

        ctx.fillStyle = iqColor
        ctx.font = 'bold 72px sans-serif'
        ctx.fillText(iq, W / 2, 210)

        ctx.fillStyle = '#aaaaaa'
        ctx.font = '22px sans-serif'
        ctx.fillText('IQ Score', W / 2, 245)

        // Bar chart background
        const barX = 60, barY = 280, barW = W - 120, barH = 30
        ctx.fillStyle = '#374151'
        ctx.beginPath()
        ctx.roundRect(barX, barY, barW, barH, 15)
        ctx.fill()

        // Bar fill
        const pct = Math.min((iq - 50) / 150, 1)
        ctx.fillStyle = iqColor
        ctx.beginPath()
        ctx.roundRect(barX, barY, barW * pct, barH, 15)
        ctx.fill()

        // Scale labels
        ctx.fillStyle = '#9ca3af'
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText('50', barX, barY + barH + 22)
        ctx.textAlign = 'center'
        ctx.fillText('125', W / 2, barY + barH + 22)
        ctx.textAlign = 'right'
        ctx.fillText('200', barX + barW, barY + barH + 22)

        // Category label
        const cat = iq >= 140 ? 'Jenius 🌟' : iq >= 120 ? 'Sangat Cerdas 💡' : iq >= 110 ? 'Di Atas Rata-rata 📚' : iq >= 90 ? 'Rata-rata 😊' : iq >= 70 ? 'Di Bawah Rata-rata 😅' : 'Perlu Belajar Lagi 📖'
        ctx.fillStyle = iqColor
        ctx.font = 'bold 20px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(cat, W / 2, H - 20)

        const buf = canvas.toBuffer('image/png')
        await conn.sendFile(m.chat, buf, 'iqcard.png', `🧠 *IQ Card: ${text}*\nSkor IQ: *${iq}*`, m)
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['iqc <nama/teks>']
handler.tags = ['canvas']
handler.command = /^(iqc)$/i

export default handler
