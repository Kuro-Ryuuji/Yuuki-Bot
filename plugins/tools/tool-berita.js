import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

let handler = async (m, { args }) => {
  m.reply(global.wait)

  const res = await fetch('https://www.cnbcindonesia.com/rss', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  })
  if (!res.ok) throw 'Layanan berita ga tersedia buat sekarang'

  const $ = cheerio.load(await res.text(), { xmlMode: true })
  const items = []
  $('item').each((i, el) => {
    if (i >= 5) return false
    items.push({
      title: $(el).find('title').text().trim(),
      link: $(el).find('link').text().trim() || $(el).find('guid').text().trim(),
      pubDate: $(el).find('pubDate').text().trim(),
      desc: $(el).find('description').text().replace(/<[^>]+>/g, '').trim().slice(0, 120)
    })
  })

  if (!items.length) throw 'Ga ada berita tersedia'

  const keyword = args.join(' ').toLowerCase()
  const filtered = keyword
    ? items.filter(i => i.title.toLowerCase().includes(keyword) || i.desc.toLowerCase().includes(keyword))
    : items

  const display = (filtered.length ? filtered : items).slice(0, 5)
  const teks = display.map((item, i) =>
    `${i + 1}. *${item.title}*\n   📅 ${item.pubDate}\n   ${item.desc}...\n   🔗 ${item.link}`
  ).join('\n\n')

  m.reply(`📰 *BERITA TERKINI${keyword ? ` — "${args.join(' ')}"` : ''}*\n\n${teks}\n\n${global.wm}`)
}

handler.help = ['berita [keyword]']
handler.tags = ['tools']
handler.command = /^(berita|news|beritahari)$/i
export default handler
