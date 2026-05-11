// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { args }) => {
  const ip = args[0] || ''
  const url = `https://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,isp,org,as,query,proxy,hosting,mobile`

  const res = await fetch(url)
  if (!res.ok) throw 'Gagal mengambil data IP'

  const data = await res.json()
  if (data.status === 'fail') throw `Gagal: ${data.message}`

  m.reply(`🌐 *INFO IP ADDRESS*\n\n` +
    `📡 *IP:* ${data.query}\n` +
    `🏳️ *Negara:* ${data.country}\n` +
    `📍 *Wilayah:* ${data.regionName}\n` +
    `🏙️ *Kota:* ${data.city}\n` +
    `🔌 *ISP:* ${data.isp}\n` +
    `🏢 *Org:* ${data.org || '-'}\n` +
    `🔢 *AS:* ${data.as || '-'}\n\n` +
    `${data.proxy ? '⚠️ Terdeteksi VPN/Proxy' : '✅ Tidak ada VPN/Proxy'}\n` +
    `${data.hosting ? '🖥️ Hosting/Datacenter' : '🏠 Residential'}\n` +
    `${data.mobile ? '📱 Koneksi Mobile' : '💻 Kabel/WiFi'}\n\n${global.wm}`)
}

handler.help = ['cekip', 'cekip <ip>']
handler.tags = ['tools']
handler.command = /^(cekip|ipinfo|checkip|myip)$/i
export default handler
