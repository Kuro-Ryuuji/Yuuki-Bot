import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.join(' ')
  if (!text) throw `Contoh: ${usedPrefix}${command} https://facebook.com/watch?v=xxx`
  if (!text.includes('facebook.com') && !text.includes('fb.watch')) {
    throw '❌ URL harus dari Facebook'
  }
  
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  
  try {
    // Try multiple APIs for Facebook download
    let result = null
    
    // Try API 1
    try {
      const res1 = await axios.get(`https://api.nexray.web.id/downloader/v2/facebook?url=${encodeURIComponent(text)}`, { timeout: 30000 })
      if (res1.data?.status && res1.data?.data?.video_url) {
        result = res1.data.data
      }
    } catch {}
    
    // Try API 2 if first fails
    if (!result) {
      try {
        const res2 = await axios.get(`https://api.neoxr.eu/api/facebook?url=${encodeURIComponent(text)}&apikey=${global.APIKeys?.neoxr || ''}`, { timeout: 30000 })
        if (res2.data?.status && res2.data?.data?.url) {
          result = { video_url: res2.data.data.url, title: res2.data.data.title }
        }
      } catch {}
    }
    
    if (!result?.video_url) {
      throw '❌ Gagal mengambil video Facebook. Coba link lain.'
    }
    
    await conn.sendMessage(m.chat, { 
      video: { url: result.video_url }, 
      caption: `🎬 *Facebook Video*\n\n${result.title || text}` 
    }, { quoted: m })
    
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    throw `Error: ${e.message || e}`
  }
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.exp = 35
handler.disabled = true
export default handler
