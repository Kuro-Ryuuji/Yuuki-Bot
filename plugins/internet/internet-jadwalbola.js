/**
 * Elaina-MD — github.com/OmmniDevv/Elaina-MD
 * Jangan Dijual!
 */
import axios from 'axios'

let handler = async (m, { conn }) => {
  const neoxrKey = global.APIKeys?.neoxr || ''
  const res = await axios.get(`https://api.neoxr.eu/api/bola?apikey=${neoxrKey}`, {
    timeout: 15000, headers: { 'user-agent': 'Mozilla/5.0' }
  }).catch(() => null)
  const data = res?.data?.data
  if (!data?.length) throw '❌ Gagal mengambil jadwal bola'
  let txt = `⚽ *JADWAL BOLA*\n\n`
  data.slice(0, 5).forEach(d => {
    txt += `🏟️ *${d.league || d.match || '-'}*\n`
    txt += `⏰ Waktu: ${d.time || d.waktu || '-'}\n`
    txt += `🏠 ${d.home_team || '-'} vs ${d.away_team || '-'}\n\n`
  })
  m.reply(txt.trim())
}
handler.help = ['jadwalbola']
handler.tags = ['internet']
handler.command = /^jadwalbola$/i
export default handler
