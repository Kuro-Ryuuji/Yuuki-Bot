import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkin Parameter'
  m.reply('Chotto matte ne, lagi diproses nih...')
  let res = `https://ziy.herokuapp.com/api/maker/kaneki?nama=${response[0]}&apikey=xZiyy`
  conn.sendFile(m.chat, res, 'kaneki.jpg', `Yatta, udah jadi senpai`, m, false)
}
handler.help = ['logokaneki'].map(v => v + ' <text>')
handler.tags = ['tools']
handler.command = /^(logokaneki)$/i

export default handler
