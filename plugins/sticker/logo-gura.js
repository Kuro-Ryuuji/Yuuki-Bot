import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkin Parameter'
  m.reply('Chotto matte ne, lagi diproses nih...')
  let res = `https://api-xzn-yotsuya.up.railway.app/docs/gura?name=${response[0]}`
  conn.sendFile(m.chat, res, 'gura.jpg', `Yatta, udah jadi senpai`, m, false)
}
handler.help = ['logogura'].map(v => v + ' <text>')
handler.tags = ['tools']
handler.command = /^(logogura)$/i
handler.register = false

handler.limit = false

export default handler
