// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
const HARI_JAWA = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon']
const NEPTU_HARI = { Minggu: 5, Senin: 4, Selasa: 3, Rabu: 7, Kamis: 8, Jumat: 6, Sabtu: 9 }
const NEPTU_PASARAN = { Legi: 5, Pahing: 9, Pon: 7, Wage: 4, Kliwon: 8 }
const WATAK = {
  7: 'Penderita, penuh cobaan, namun tegar dan sabar',
  8: 'Rendah hati, mudah bergaul, cocok jadi pemimpin',
  9: 'Ceria, optimis, banyak rezeki namun boros',
  10: 'Pendiam, tekun, bisa sukses jika rajin',
  11: 'Penolong, dermawan, disukai banyak orang',
  12: 'Kuat, pemberani, cocok di bidang militer/olahraga',
  13: 'Cerdas, kreatif, banyak ide besar',
  14: 'Sabar, penyayang, cocok untuk keluarga',
  15: 'Berwibawa, keras hati, sering menjadi pemimpin',
  16: 'Sensitif, perasa, butuh ketenangan',
  17: 'Pembawa rezeki, pandai berbicara, cocok berdagang',
  18: 'Keras kepala namun setia, banyak teman baik',
}

function getWeton(tgl) {
  const d = new Date(tgl)
  const hari = HARI_JAWA[d.getDay()]
  const pasaran = PASARAN[((Math.floor(d.getTime() / 86400000) % 5) + 5) % 5]
  const neptu = NEPTU_HARI[hari] + NEPTU_PASARAN[pasaran]
  return { hari, pasaran, neptu, weton: `${hari} ${pasaran}` }
}

const BULAN_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Contoh: ${usedPrefix}${command} 1999-05-21\nFormat: YYYY-MM-DD`
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text.trim())) throw `Format salah! Gunakan YYYY-MM-DD\nContoh: ${usedPrefix}${command} 1999-05-21`

  const d = new Date(text.trim())
  if (isNaN(d.getTime())) throw 'Tanggal tidak valid!'

  const weton = getWeton(text.trim())
  const watak = WATAK[weton.neptu] || 'Kepribadian unik, penuh misteri'
  const umur = Math.floor((Date.now() - d) / (365.25 * 24 * 60 * 60 * 1000))

  m.reply(`🌺 *PRIMBON JAWA*\n\n` +
    `📅 *Lahir:* ${d.getDate()} ${BULAN_ID[d.getMonth()]} ${d.getFullYear()}\n` +
    `📆 *Hari:* ${HARI_JAWA[d.getDay()]}\n` +
    `🎂 *Umur:* ${umur} tahun\n\n` +
    `⚡ *WETON:* ${weton.weton} (Neptu: ${weton.neptu})\n\n` +
    `🌟 *WATAK:*\n_${watak}_\n\n` +
    `_⚠️ Primbon adalah kepercayaan adat, bukan ramalan pasti._\n${global.wm}`)
}

handler.help = ['primbon <tanggal_lahir>', 'weton <tanggal_lahir>']
handler.tags = ['fun', 'tools']
handler.command = /^(primbon|weton|wetonjawa|ramal)$/i
export default handler
