import { pinterestSearch } from '../../lib/pinterest-search.js'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example use ${usedPrefix + command} minecraft`
  
  try {
    const results = await pinterestSearch(text)
    if (!results || results.length === 0) throw 'Tidak ada hasil ditemukan'
    
    const randomImage = results[Math.floor(Math.random() * results.length)]
    await conn.sendFile(m.chat, randomImage, 'pinterest.jpg', `
*Hasil pencarian*
${text}
`.trim(), m)
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}
handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinsearch|pinterestsearch)$/i

export default handler