import fetch from 'node-fetch'

const COBALT_INSTANCES = [
  'https://dwnld.nichijou.co',
  'https://cobalt.api.timelessnesses.me',
  'https://cobalt.tools.hyperionmie.xyz'
]

async function cobaltDownload(url, audioOnly = false) {
  let lastError
  for (const instance of COBALT_INSTANCES) {
    try {
      // Create timeout controller for older Node.js compatibility
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      const res = await fetch(instance, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url, downloadMode: audioOnly ? 'audio' : 'auto', videoQuality: '720', audioFormat: 'mp3' }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!res.ok) continue
      const data = await res.json()
      if (data.status === 'error') { lastError = data.error?.code; continue }
      return data
    } catch (e) { 
      lastError = e.message 
    }
  }
  throw lastError || 'Semua instance Cobalt ga ngerespon'
}

function detectPlatform(url) {
  if (url.includes('youtube')) return '🎬 YouTube'
  if (url.includes('tiktok')) return '🎵 TikTok'
  if (url.includes('instagram')) return '📸 Instagram'
  if (url.includes('twitter') || url.includes('x.com')) return '🐦 Twitter/X'
  if (url.includes('reddit')) return '🔴 Reddit'
  if (url.includes('soundcloud')) return '🎧 SoundCloud'
  if (url.includes('facebook') || url.includes('fb.watch')) return '📘 Facebook'
  return '🌐 Website'
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Download dari 20+ platform!\n\nContoh:\n${usedPrefix}${command} https://youtu.be/xxxxx\n${usedPrefix}${command} https://www.tiktok.com/...\n\nUntuk audio: ${usedPrefix}dla <url>`

  const audioOnly = /^(dla|downloadaudio|dlmp3)$/i.test(command)
  const platform = detectPlatform(args[0])

  m.reply(`${platform}\n\n${global.wait}`)

  const data = await cobaltDownload(args[0], audioOnly)
  const caption = `${platform}\n\n${global.wm}`

  if (['redirect', 'stream', 'tunnel'].includes(data.status)) {
    if (audioOnly) {
      await conn.sendMessage(m.chat, { audio: { url: data.url }, mimetype: 'audio/mpeg', fileName: 'audio.mp3', ptt: false }, { quoted: m })
    } else {
      try {
        await conn.sendMessage(m.chat, { video: { url: data.url }, caption, mimetype: 'video/mp4' }, { quoted: m })
      } catch {
        m.reply(`${caption}\n\n📥 *Link:*\n${data.url}`)
      }
    }
  } else if (data.status === 'picker') {
    const items = data.picker?.slice(0, 5) || []
    m.reply(`${platform}\n\n📦 ${items.length} media:\n\n` + items.map((item, i) => `${i + 1}. ${item.url}`).join('\n') + `\n\n${global.wm}`)
  } else {
    throw 'Format response tidak dikenal'
  }
}

handler.help = ['dl <url>', 'dla <url> (audio only)']
handler.tags = ['downloader']
handler.command = /^(dl|download|dla|downloadaudio|dlmp3)$/i
handler.limit = true
export default handler
