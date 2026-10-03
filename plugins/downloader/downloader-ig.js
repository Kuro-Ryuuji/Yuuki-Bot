import fetch from 'node-fetch'

const COBALT_INSTANCES = [
  'https://dwnld.nichijou.co',
  'https://cobalt.api.timelessnesses.me',
  'https://cobalt.tools.hyperionmie.xyz'
]

async function cobaltDownload(url) {
  let lastError
  for (const instance of COBALT_INSTANCES) {
    try {
      // Use AbortController for timeout compatibility
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(instance, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url, downloadMode: 'auto', videoQuality: '720' }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!res.ok) continue
      const data = await res.json()
      if (data.status === 'error') { lastError = data.error?.code; continue }
      return data
    } catch (e) { lastError = e.message }
  }
  throw lastError || 'Semua instance Cobalt tidak merespon'
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Gunakan: ${usedPrefix}${command} https://www.instagram.com/p/xxxxx`
  if (!/instagram\.com/i.test(args[0])) throw 'URL Instagram tidak valid!'

  m.reply(global.wait)

  const data = await cobaltDownload(args[0])

  if (['redirect', 'stream', 'tunnel'].includes(data.status)) {
    await conn.sendMessage(m.chat, { video: { url: data.url }, caption: `📸 Instagram\n\n${global.wm}`, mimetype: 'video/mp4' }, { quoted: m })
  } else if (data.status === 'picker') {
    const items = data.picker?.slice(0, 5) || []
    for (const item of items) {
      const mime = item.type === 'photo' ? 'image/jpeg' : 'video/mp4'
      if (item.type === 'photo') {
        await conn.sendMessage(m.chat, { image: { url: item.url }, caption: global.wm }, { quoted: m })
      } else {
        await conn.sendMessage(m.chat, { video: { url: item.url }, caption: global.wm, mimetype: mime }, { quoted: m })
      }
    }
  } else {
    throw 'Tidak ada media ditemukan'
  }
}

handler.help = ['ig <url>']
handler.tags = ['downloader']
handler.command = /^(ig(dl)?)$/i
handler.limit = true
export default handler
