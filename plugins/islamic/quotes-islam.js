import fetch from 'node-fetch'

let handler = async (m) => {
  const ayat = Math.floor(Math.random() * 6236) + 1
  const [resId, resAr] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/ayah/${ayat}/id.indonesian`),
    fetch(`https://api.alquran.cloud/v1/ayah/${ayat}/ar.alafasy`)
  ])
  if (!resId.ok) throw 'Gagal mengambil ayat'
  const data = (await resId.json()).data
  const arab = (await resAr.json()).data?.text || ''

  m.reply(`☪️ *Ayat Quran*\n\n${arab}\n\n_${data.text}_\n\n📖 *${data.surah.englishName} (${data.surah.name}) : ${data.numberInSurah}*\n\n${global.wm}`)
}

handler.help = ['quranrandom']
handler.tags = ['quotes']
handler.command = /^(q-islam|islamquotes|quranrandom)$/i
export default handler
