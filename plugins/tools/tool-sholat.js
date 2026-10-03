import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} Jakarta`

  const city = args.join(' ')
  const d = new Date()
  const dateStr = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=Indonesia&method=11`
  )
  if (!res.ok) throw 'Kota ga ketemu atau layanan lagi ada kendala'

  const json = await res.json()
  if (json.code !== 200) throw 'Duh gagal ngambil jadwal sholat nih'

  const t = json.data.timings
  const hijri = json.data.date.hijri
  const greg = json.data.date.gregorian

  m.reply(`☪️ *JADWAL SHOLAT*\n📍 *${city.toUpperCase()}*\n\n` +
    `📅 *${greg.weekday.en}, ${greg.date}*\n` +
    `🌙 *${hijri.day} ${hijri.month.en} ${hijri.year} H*\n\n` +
    `🌅 *Imsak  :* ${t.Imsak}\n` +
    `🌄 *Subuh  :* ${t.Fajr}\n` +
    `☀️ *Terbit :* ${t.Sunrise}\n` +
    `🌞 *Dzuhur :* ${t.Dhuhr}\n` +
    `🌤️ *Ashar  :* ${t.Asr}\n` +
    `🌇 *Maghrib:* ${t.Maghrib}\n` +
    `🌃 *Isya   :* ${t.Isha}\n\n${global.wm}`)
}

handler.help = ['sholat <kota>']
handler.tags = ['tools']
handler.command = /^(sholat|jadwalsholat|shalattime|prayertime)$/i
export default handler
