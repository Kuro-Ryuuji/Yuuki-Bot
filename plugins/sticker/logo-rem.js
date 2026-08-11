import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkin Parameter'
  m.reply('Chotto matte ne, lagi diproses nih..')
  let res = `https://ziy.herokuapp.com/api/maker/rem?nama=${response[0]}&apikey=xZiyy`
  conn.sendFile(m.chat, res, 'rem.jpg', `Yatta, udah jadi senpai`, m, false)
}
handler.help = ['logorem'].map(v => v + ' <text|text>')
handler.tags = ['tools']
handler.command = /^(logorem)$/i
handler.register = false

handler.limit = false

export default handler
