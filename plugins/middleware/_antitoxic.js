let handler = m => m

const linkRegex = /(a(su|nj(([ie])ng|([ie])r)?)|me?me?k|ko?nto?l|ba?bi|fu?ck|ta(e|i)k|bangsat|g([iueo])bl([iueo])(k|g)|col(i|ay)|an?jg|b([ia])ngsat|bacot|bajingan|kepala|kontol|memek|anjing|asu|babi|goblok)/i

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

handler.before = function (m, { user }) {
  if (m.isBaileys && m.fromMe) return false
  if (/masuk|lanjutkan|banjir|(per)?panjang/g.exec(m.text)) return false
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupToxic = linkRegex.exec(m.text)
  if (chat?.antiToxic === true && isGroupToxic) {
    m.reply('Jangan Toxic dong senpai!!\n' + readMore + '\nMau Matiin fiturnya? ketik *.antitoxic off*')
    return true
  }
  return false
}

handler.command = /^antitoxic$/i
handler.tags = ['group']
handler.group = true
handler.exec = async function (m, { conn, args, command }) {
  let chat = global.DATABASE.data.chats[m.chat]
  
  if (!args[0]) {
    return m.reply(`
Status antiToxic: ${chat?.antiToxic ? '✅ Aktif' : '❌ Nonaktif'}
Penggunaan:
• ${command} on - Mengaktifkan antiToxic
• ${command} off - Menonaktifkan antiToxic
    `.trim())
  }
  if (args[0].toLowerCase() === 'on') {
    chat.antiToxic = true
    m.reply('✅ AntiToxic udah aktif')
  } else if (args[0].toLowerCase() === 'off') {
    chat.antiToxic = false
    m.reply('❌ AntiToxic udah nonaktif!')
  } else {
    m.reply('Ada yang salah nih senpai. Gunakan: antitoxic on / antitoxic off')
  }
}

export const disable = true
export default handler