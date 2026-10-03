const bucinQuotes = [
  'Aku bisa melakukan segalanya, tapi tidak bisa melakukan itu tanpamu.',
  'Jarak bukan halangan, tapi merindukanmu itu menyakitkan.',
  'Cinta bukan tentang seberapa lama kamu bersama, tapi seberapa besar kamu merindukannya.',
  'Kamu adalah alasan aku tersenyum tanpa sebab.',
  'Dalam setiap langkahku, ada harapan untuk bertemu denganmu lagi.',
  'Aku tidak membutuhkan bintang, karena kamu sudah cukup menjadi cahayaku.',
  'Mencintaimu adalah hal terbaik yang pernah kulakukan.',
  'Bahkan dalam mimpi, aku masih memikirkanmu.',
  'Kamu bukan hanya seseorang, kamu adalah segalanya.',
  'Hatiku sudah punya nama, dan itu namamu.',
  'Setiap detik bersamamu adalah kenangan yang tidak ingin kulupakan.',
  'Aku tidak tahu cara berhenti memikirkanmu.',
]

let handler = async (m) => {
  const quote = bucinQuotes[Math.floor(Math.random() * bucinQuotes.length)]
  m.reply(`💕 *Quotes Bucin*\n\n_"${quote}"_\n\n${global.wm}`)
}

handler.help = ['bucin']
handler.tags = ['quotes']
handler.command = /^(q-bucin|bucin|quotesbucin)$/i
export default handler
