// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// Makasih kode nya RTXZY

const MENU = {
    ayambakar:    { harga: 20000, emoji: '🍗', nama: 'Ayam Bakar' },
    ayamgoreng:   { harga: 15000, emoji: '🍗', nama: 'Ayam Goreng' },
    rendang:      { harga: 15000, emoji: '🥩', nama: 'Rendang' },
    steak:        { harga: 20000, emoji: '🥩', nama: 'Steak' },
    gulaiayam:    { harga: 15000, emoji: '🍲', nama: 'Gulai Ayam' },
    oporayam:     { harga: 15000, emoji: '🍲', nama: 'Opor Ayam' },
    sushi:        { harga: 30000, emoji: '🍣', nama: 'Sushi' },
    bandage:      { harga: 20000, emoji: '🩹', nama: 'Bandage' },
    soda:         { harga: 10000, emoji: '🥤', nama: 'Soda' },
    roti:         { harga: 10000, emoji: '🍞', nama: 'Roti' },
    ikanbakar:    { harga: 15000, emoji: '🐟', nama: 'Ikan Bakar' },
    lelebakar:    { harga: 15000, emoji: '🐟', nama: 'Lele Bakar' },
    nilabakar:    { harga: 15000, emoji: '🐟', nama: 'Nila Bakar' },
    bawalbakar:   { harga: 15000, emoji: '🐟', nama: 'Bawal Bakar' },
    udangbakar:   { harga: 15000, emoji: '🦐', nama: 'Udang Bakar' },
    kepitingbakar:{ harga: 20000, emoji: '🦀', nama: 'Kepiting Bakar' },
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const user = global.db?.data?.users?.[m.sender]
    if (!user) return m.reply('❌ Kamu belum terdaftar! Ketik *daftar* terlebih dahulu.')

    const jualbeli = (args[0] || '').toLowerCase()
    const itemKey = (args[1] || '').toLowerCase()
    const count = Math.max(1, Math.min(99999, parseInt(args[2]) || 1))

    if (!jualbeli || jualbeli === 'list' || jualbeli === 'menu') {
        const menuList = Object.entries(MENU)
            .map(([k, v]) => `│ ${v.emoji} *${k}* : ${v.harga.toLocaleString('id')}`)
            .join('\n')
        return m.reply(
            `🍽️ *ʀᴇsᴛᴏʀᴀɴ*\n\n` +
            `╭──『 ᴍᴇɴᴜ 』\n${menuList}\n╰───────────────\n\n` +
            `> *Cara beli:* \`${usedPrefix}resto beli <item> <jumlah>\`\n` +
            `> Contoh: \`${usedPrefix}resto beli ayambakar 2\``
        )
    }

    if (jualbeli !== 'beli') {
        return m.reply(`❓ Perintah tidak dikenal. Gunakan:\n• \`${usedPrefix}resto\` — lihat menu\n• \`${usedPrefix}resto beli <item> <jumlah>\``)
    }

    if (!itemKey || !MENU[itemKey]) {
        const available = Object.keys(MENU).join(', ')
        return m.reply(`❌ Item *${itemKey || '?'}* tidak ada di menu!\n\nItem tersedia: ${available}`)
    }

    const item = MENU[itemKey]
    const totalHarga = item.harga * count

    if ((user.money || 0) < totalHarga) {
        return m.reply(
            `❌ *Uang tidak cukup!*\n\n` +
            `💰 Uangmu: *${(user.money || 0).toLocaleString('id')}*\n` +
            `🏷️ Harga: *${totalHarga.toLocaleString('id')}*`
        )
    }

    user.money -= totalHarga
    user[itemKey] = (user[itemKey] || 0) + count

    m.reply(
        `✅ *Berhasil membeli!*\n\n` +
        `${item.emoji} *${item.nama}* x${count}\n` +
        `💸 Dibayar: *${totalHarga.toLocaleString('id')}*\n` +
        `💰 Sisa uang: *${user.money.toLocaleString('id')}*`
    )
}

handler.help = ['resto', 'resto beli <item> <jumlah>']
handler.tags = ['rpg']
handler.command = /^(resto|restauran|restoran)$/i
handler.register = true
handler.limit = false

export default handler
