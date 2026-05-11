// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} 😂+🔥`
  
  try {
    let [emoji1, emoji2] = text.split('+')
    if (!emoji1 || !emoji2) throw 'Format salah! Gunakan: emoji1+emoji2'
    
    m.reply(global.wait)
    
    const url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1.trim())}_${encodeURIComponent(emoji2.trim())}`
    const { data } = await axios.get(url)
    
    if (!data.results || data.results.length === 0) throw 'Kombinasi emoji tidak ditemukan!'
    
    await conn.sendImageAsSticker(m.chat, data.results[0].url, m, { packname: global.packname, author: global.author })
  } catch (e) {
    throw `Error: ${e.message || 'Emoji tidak support!'}`
  }
}

handler.help = ['emojimix <emoji1>+<emoji2>']
handler.tags = ['sticker']
handler.command = /^(emojimix|emix)$/i
handler.limit = true
export default handler
