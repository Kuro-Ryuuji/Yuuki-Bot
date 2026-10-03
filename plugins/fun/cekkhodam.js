const KHODAMS = [
  { name: "Harimau Putih", meaning: "Kamu kuat dan berani, pendahulumu mewariskan kekuatan besar." },
  { name: "Panda Ompong", meaning: "Menggemaskan dan selalu bikin orang tersenyum." },
  { name: "Bebek Karet", meaning: "Tenang dan ceria, mampu menghadapi masalah dengan senyum." },
  { name: "Kucing Kulkas", meaning: "Misterius dan selalu ada di tempat tak terduga." },
  { name: "Sabun Wangi", meaning: "Selalu membawa keharuman dan kesegaran." },
  { name: "Semut Kecil", meaning: "Pekerja keras dan selalu bisa diandalkan." },
  { name: "Kecoa Terbang", meaning: "Selalu mengagetkan dan bikin heboh seisi ruangan." },
  { name: "Indomie Goreng", meaning: "Selalu bikin kenyang dan bahagia." },
  { name: "Singa Bermahkota", meaning: "Lahir sebagai pemimpin, memiliki kekuatan dan kebijaksanaan raja." },
  { name: "Elang Biru", meaning: "Memiliki visi tajam dan dapat melihat peluang dari jauh." },
  { name: "Naga Pelangi", meaning: "Tangguh dan memiliki kekuatan untuk melindungi dan menyerang." },
  { name: "Gajah Putih", meaning: "Bijaksana dan memiliki kekuatan besar, lambang keberanian." },
  { name: "Kopi Susu", meaning: "Manis dan selalu bikin semangat orang-orang di sekitarmu." },
  { name: "Motor Astrea", meaning: "Selalu setia dan bandel." },
  { name: "Sandal Jepit", meaning: "Selalu santai dan nyaman." },
  { name: "Bantal Guling", meaning: "Selalu nyaman di pelukan." },
  { name: "Tahu Bulat", meaning: "Selalu enak di segala suasana." },
  { name: "Nasi Uduk", meaning: "Selalu cocok di segala waktu." },
  { name: "Kipas Angin", meaning: "Selalu memberikan angin segar." },
  { name: "Anjing Pelacak", meaning: "Setia dan penuh dedikasi, selalu menemukan jalan menuju tujuan." },
]

let handler = async (m, { conn }) => {
  let targetName = m.pushName || m.sender.split('@')[0]
  if (m.quoted) targetName = m.quoted.pushName || m.quoted.sender.split('@')[0]
  else if (m.mentionedJid?.[0]) targetName = m.mentionedJid[0].split('@')[0]
  else if (m.text) targetName = m.text.trim()

  const k = KHODAMS[Math.floor(Math.random() * KHODAMS.length)]

  m.reply(
    `╭──────────────────\n` +
    `│ 🔮 *CEK KHODAM*\n` +
    `╰──────────────────\n\n` +
    `👤 *Nama:* ${targetName}\n` +
    `🐾 *Khodam:* ${k.name}\n\n` +
    `📖 *Arti:*\n${k.meaning}\n\n` +
    `${global.wm}`
  )
}

handler.help = ['cekkhodam']
handler.tags = ['fun']
handler.command = /^(cekkhodam|khodam|cekhodam)$/i
export default handler
