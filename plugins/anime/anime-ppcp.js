// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
  const res = await fetch('https://api.waifu.im/images?IncludedTags=waifu&IsNsfw=False')
  const json = await res.json()
  const url = json.items?.[0]?.url
  if (!url) throw 'Gagal mengambil gambar'
  await conn.sendMessage(m.chat, { image: { url }, caption: global.wm }, { quoted: m })
}

handler.help = ['ppcouple']
handler.tags = ['anime']
handler.command = /^(ppcp|ppcouple)$/i
export default handler
