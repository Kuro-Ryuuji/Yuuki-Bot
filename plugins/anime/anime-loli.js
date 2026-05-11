// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let res = await fetch('https://raw.githubusercontent.com/Xmell91/loli/master/loli.json')
  if (!res.ok) throw `${res.status} ${res.statusText}`
  let json = await res.json()
  let url = json[Math.floor(Math.random() * json.length)]
  await conn.sendMessage(m.chat, { image: { url }, caption: '🌸 Loli' }, { quoted: m })
}
handler.command = /^(loli)$/i
handler.tags = ['anime']
handler.help = ['loli']
export default handler
