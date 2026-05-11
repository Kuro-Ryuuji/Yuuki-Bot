// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// Makasih kode nya RTXZY
import { createHash } from 'crypto'

let handler = async function (m, { usedPrefix }) { 
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`🔐 *SERIAL NUMBER*\n\nSerial number kamu:\n\`\`\`${sn}\`\`\``)
}

handler.help = ['nomorseri']
handler.tags = ['rpg']
handler.command = /^(nomorse(ri|rial)|serialnumber)$/i
handler.group = true
handler.rpg = true

export default handler
