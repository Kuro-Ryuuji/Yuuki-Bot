// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

let handler = async (m, { conn }) => {
    try {
        let user = global.db.data.users[m.sender]
        let now = new Date()
        let today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

        if (user.lastAbsen === today) return m.reply('❌ Kamu sudah absen hari ini!\nKembali lagi besok ya~ 😊')

        user.lastAbsen = today
        user.exp = (user.exp || 0) + 50

        m.reply(`✅ *Absen Berhasil!*\n\n👤 Nama: ${m.pushName || m.sender.split('@')[0]}\n📅 Tanggal: ${now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n⏰ Jam: ${now.toLocaleTimeString('id-ID')}\n⭐ EXP: +50 (Total: ${user.exp})`)
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}

handler.help = ['absen']
handler.tags = ['group']
handler.command = /^(absen)$/i
handler.group = true
handler.register = true

export default handler
