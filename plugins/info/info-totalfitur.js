let handler = async (m, { conn }) => {
    const total = Object.values(global.plugins).filter(v => v.help && v.tags && !v.disabled).length
    const totalCmds = Object.values(global.plugins)
        .filter(v => v.help && !v.disabled)
        .reduce((acc, v) => acc + (Array.isArray(v.help) ? v.help.length : 1), 0)

    await m.reply(`📊 *Total Fitur ${global.namebot}*\n\n` +
        `• Plugin aktif : *${total}*\n` +
        `• Total command : *${totalCmds}*\n\n` +
        `_© ${global.namebot} | ${global.wmcredit}_`)
}

handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = /^(totalfitur|totalcmd|totalcommand)$/i
export default handler
