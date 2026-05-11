// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
  const from = (args[0] || 'USD').toUpperCase()
  const to = (args[1] || 'IDR').toUpperCase()
  const amount = parseFloat(args[2]) || 1

  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`)
  if (!res.ok) throw 'Gagal mengambil data kurs'

  const data = await res.json()
  if (data.result !== 'success') throw 'Mata uang tidak ditemukan'

  const rate = data.rates[to]
  if (!rate) throw `Mata uang ${to} tidak ditemukan`

  m.reply(`💱 *KONVERSI MATA UANG*\n\n${amount} *${from}* = *${(amount * rate).toFixed(2)} ${to}*\n\n📅 Update: ${data.time_last_update_utc}\n\n${global.wm}`)
}

handler.help = ['kurs [from] [to] [amount]', 'kurs USD IDR 100']
handler.tags = ['tools']
handler.command = /^(kurs|currency|konversi)$/i
export default handler
