import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const res = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  })
  if (!res.ok) throw 'Duh gagal akses data BMKG'

  const g = (await res.json()).Infogempa?.gempa
  if (!g) throw 'Data gempa lagi ada kendala nih senpai'

  const mag = parseFloat(g.Magnitude)
  const levelEmoji = mag >= 7 ? '🔴' : mag >= 5 ? '🟡' : mag >= 4 ? '🟠' : '🟢'
  const tsunamiEmoji = (g.Potensi || '').toLowerCase().includes('tidak') ? '✅' : '⚠️'

  const info = `🌍 *GEMPA BUMI TERKINI — BMKG*\n\n` +
    `📅 *Tanggal:* ${g.Tanggal}\n` +
    `⏰ *Waktu:* ${g.Jam} WIB\n` +
    `${levelEmoji} *Magnitudo:* ${g.Magnitude} SR\n` +
    `🔽 *Kedalaman:* ${g.Kedalaman}\n` +
    `📍 *Koordinat:* ${g.Lintang}, ${g.Bujur}\n` +
    `🗺️ *Wilayah:* ${g.Wilayah}\n\n` +
    `${tsunamiEmoji} *Potensi:* ${g.Potensi}\n` +
    `🏛️ *Dirasakan:* ${g.Dirasakan || 'Belum ada laporan'}\n\n` +
    `_Sumber: BMKG (data.bmkg.go.id)_\n${global.wm}`

  const shakemapUrl = g.Shakemap ? `https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}` : null

  if (shakemapUrl) {
    try {
      await conn.sendMessage(m.chat, { image: { url: shakemapUrl }, caption: info }, { quoted: m })
      return
    } catch { /* fallback */ }
  }
  m.reply(info)
}

handler.help = ['gempa']
handler.tags = ['tools']
handler.command = /^(gempa|earthquake|gempabumi)$/i
export default handler
