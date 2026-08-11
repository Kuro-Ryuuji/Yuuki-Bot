import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkin Parameter'
  m.reply('Chotto matte ne, lagi diproses nih...')
  let res = `https://ziy.herokuapp.com/api/maker/sadboy?text1=${response[0]}&text2=${response[1]}&apikey=xZiyy`
  conn.sendFile(m.chat, res, 'gfx3.jpg', `Yatta, udah jadi senpai`, m, false)
}
handler.help = ['sadboylogo'].map(v => v + ' <text|text>')
handler.tags = ['tools']
handler.command = /^(logosadboy)$/i
handler.limit = false

export default handler
