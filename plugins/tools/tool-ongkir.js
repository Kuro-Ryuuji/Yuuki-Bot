import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
  const key = global.APIKeys?.rajaongkir
  if (!key) throw `API Key RajaOngkir belum diset!\nDaftar GRATIS di https://rajaongkir.com/dokumentasi/starter\nLalu isi di config.js:\nglobal.APIKeys['rajaongkir'] = 'apikey_kamu'`

  if (args.length < 4) throw `Format: ${usedPrefix}${command} [asal] [tujuan] [berat_gram] [kurir]\nContoh: ${usedPrefix}${command} jakarta bandung 1000 jne\nKurir: jne, pos, tiki`

  const [asal, tujuan, berat, kurir] = args
  const headers = { key }

  const [asalRes, tujuanRes] = await Promise.all([
    fetch(`https://api.rajaongkir.com/starter/city?search=${asal}`, { headers }),
    fetch(`https://api.rajaongkir.com/starter/city?search=${tujuan}`, { headers })
  ])

  const asalData = (await asalRes.json()).rajaongkir?.results?.[0]
  const tujuanData = (await tujuanRes.json()).rajaongkir?.results?.[0]

  if (!asalData) throw `Kota asal "${asal}" ga ketemu nih`
  if (!tujuanData) throw `Kota tujuan "${tujuan}" ga ketemu nih`

  const costRes = await fetch('https://api.rajaongkir.com/starter/cost', {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ origin: asalData.city_id, destination: tujuanData.city_id, weight: berat, courier: kurir.toLowerCase() })
  })
  const costs = (await costRes.json()).rajaongkir?.results?.[0]?.costs
  if (!costs?.length) throw 'Shumimasen, lagi ada kendala untuk rute ini senpai'

  const lines = costs.map(c =>
    `📦 *${c.service}* — ${c.description}\n   💰 Rp ${c.cost[0].value.toLocaleString('id-ID')}\n   ⏱️ ${c.cost[0].etd} hari`
  ).join('\n\n')

  m.reply(`📬 *CEK ONGKIR*\n\n🏙️ *Dari:* ${asalData.type} ${asalData.city_name}, ${asalData.province}\n📍 *Ke:* ${tujuanData.type} ${tujuanData.city_name}, ${tujuanData.province}\n⚖️ *Berat:* ${parseInt(berat).toLocaleString('id-ID')} gram\n🚚 *Kurir:* ${kurir.toUpperCase()}\n\n${lines}\n\n${global.wm}`)
}

handler.help = ['ongkir [asal] [tujuan] [berat] [kurir]']
handler.tags = ['tools']
handler.command = /^(ongkir|cekongkir)$/i
export default handler
