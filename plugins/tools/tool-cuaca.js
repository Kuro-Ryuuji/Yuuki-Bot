import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} Jakarta`

  const kota = args.join(' ')
  const res = await fetch(`https://wttr.in/${encodeURIComponent(kota)}?format=j1`, {
    headers: { 'User-Agent': 'curl/7.68.0' }
  })
  if (!res.ok) throw 'Kota ga ketemu atau layanan cuaca lagi ada kendala'

  const data = await res.json()
  const current = data.current_condition[0]
  const area = data.nearest_area[0]

  m.reply(
    `🌤️ *CUACA ${kota.toUpperCase()}*\n\n` +
    `🏙️ *Lokasi:* ${area.areaName[0].value}, ${area.country[0].value}\n` +
    `🌡️ *Suhu:* ${current.temp_C}°C (terasa ${current.FeelsLikeC}°C)\n` +
    `💧 *Kelembaban:* ${current.humidity}%\n` +
    `💨 *Angin:* ${current.windspeedKmph} km/jam\n` +
    `☁️ *Kondisi:* ${current.weatherDesc[0].value}\n` +
    `👁️ *Visibility:* ${current.visibility} km\n` +
    `⬇️ *Tekanan:* ${current.pressure} hPa\n\n${global.wm}`
  )
}

handler.help = ['cuaca <kota>']
handler.tags = ['tools']
handler.command = /^(cuaca|weather)$/i
export default handler
