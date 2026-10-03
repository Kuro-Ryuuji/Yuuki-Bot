let handler = async (m, { conn, text }) => {

let [nomor, pesan, jumlah] = text.split('|')

if (!nomor) throw `mau nyepam siapa hayo? 👀 \n\n📝 *cara make nya:*\n.spamwa nomor|teks|jumlah\n\n💡 *contoh:*\n.spamwa 6281234567890|udah makan belom cayaaang|100`


if (!pesan) throw `aku ga bisa ngetik pesan sendiri senpai, kasih aku pesannya biar aku bisa nyepam, mwehehehe 🤭`

if (jumlah && isNaN(jumlah)) throw `senpai yang bener dong, jumlahnya pake angka  bukan huruf`

let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
let fixedJumlah = jumlah ? jumlah * 1 : 10

if (fixedJumlah > 500) throw `aduh kebanyakan ini senpai, nanti nomer ku ke banned 😭\n aku cuma bisa nyepam 500 pesan doang`

await m.reply(`*[❗] SIAP SENPAI!*\naku lagi nyepam nomor ${nomor}\n📤 Jumlah: ${fixedJumlah} pesan\n⏱️ Estimasi selesai: ${Math.ceil(fixedJumlah * 1.5)} detik\n*JANGAN NYEPAM BOT DULU!*`)

for (let i = 0; i < fixedJumlah; i++) {
    await conn.reply(fixedNumber, pesan.trim(), m)
    await new Promise(resolve => setTimeout(resolve, 1500))
}

await m.reply(`✅ *udah senpai, kasih jeda dulu kasian dia abis kena spam*\nberhasil kirim ${fixedJumlah} pesan ke ${nomor}`)
}

handler.help = ['spamwa <nomor>|<pesan>|<jumlah>']
handler.tags = ['tools']
handler.command = /^spam(wa)?$/i
handler.group = false
handler.premium = false
handler.private = true
handler.limit = true
export default handler
