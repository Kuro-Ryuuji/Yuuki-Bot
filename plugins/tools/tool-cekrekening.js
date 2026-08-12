import fetch from 'node-fetch'

const BANK_LIST = {
  bca: '014', bni: '009', bri: '002', mandiri: '008', bsi: '451',
  cimb: '022', danamon: '011', permata: '013', btn: '200',
  ocbc: '028', panin: '019', maybank: '016', bukopin: '441', mega: '426',
}

let handler = async (m, { args, usedPrefix, command }) => {
  if (args.length < 2) throw `Format: ${usedPrefix}${command} [bank] [nomor]\nContoh: ${usedPrefix}${command} bca 1234567890\nBank: ${Object.keys(BANK_LIST).join(', ')}`

  const [bank, norek] = args
  const bankCode = BANK_LIST[bank.toLowerCase()]
  if (!bankCode) throw `Bank "${bank}" Ga dikenal nih. Tersedia: ${Object.keys(BANK_LIST).join(', ')}`

  m.reply(global.wait)

  const res = await fetch('https://cekrekening.id/home/SearchRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://cekrekening.id/', 'Origin': 'https://cekrekening.id'
    },
    body: JSON.stringify({ NomorRekening: norek, KodeBank: bankCode })
  })
  if (!res.ok) throw 'shumimasen, layanan cekrekening.id lagi ada masalah senpai'

  const json = await res.json()
  let statusEmoji = '✅', status = 'AMAN - Ga ada laporan penipuan senpai'
  if (json.StatusRekening === 'TERLAPOR' || json.JumlahLaporan > 0) {
    statusEmoji = '⚠️'
    status = `TERLAPOR - ${json.JumlahLaporan || '?'} laporan penipuan`
  }

  m.reply(`🏦 *CEK REKENING*\n\n🏧 *Bank:* ${bank.toUpperCase()}\n💳 *No. Rekening:* ${norek}\n${statusEmoji} *Status:* ${status}\n\n_Data dari cekrekening.id (OJK RI)_\n\n${global.wm}`)
}

handler.help = ['cekrekening [bank] [nomor]']
handler.tags = ['tools']
handler.command = /^(cekrekening|rekening|ceknorek)$/i
export default handler
