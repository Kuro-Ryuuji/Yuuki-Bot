// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [atas, bawah] = text.split('|')
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime) throw `Balas gambar dengan perintah\n\n${usedPrefix + command} <teks atas>|<teks bawah>`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak didukung!`
  
  m.reply(global.wait)
  
  try {
    let img = await q.download()
    let form = new FormData()
    form.append('file', img, 'image.jpg')
    
    const { data } = await axios.post('https://file.btch.rf.gd/api/upload.php', form, {
      headers: form.getHeaders()
    })
    
    let url = data.result?.url || data.url
    if (!url) throw 'Gagal upload gambar'
    
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas || '')}/${encodeURIComponent(bawah || '')}.png?background=${url}`
    await conn.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}

handler.help = ['smeme <teks>|<teks>']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?me(me)?)$/i
handler.limit = true
export default handler
