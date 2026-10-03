import fetch from 'node-fetch'

let handler = async (m) => {
  const res = await fetch('https://api.quotable.io/random?maxLength=200')
  if (!res.ok) throw 'Gagal mengambil kata bijak'
  const json = await res.json()
  m.reply(`✨ *Kata Bijak*\n\n_"${json.content}"_\n\n— *${json.author}*\n\n${global.wm}`)
}

handler.help = ['katabijak']
handler.tags = ['quotes']
handler.command = /^(katabijak|bijak)$/i
export default handler
