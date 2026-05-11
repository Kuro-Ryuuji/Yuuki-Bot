/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
// ============================================================
// CEK PLUGINS — Makasih kode nya OURIN
// ============================================================

function makeCekHandler(name, aliases, desc, levels) {
  const handler = async (m, { conn, usedPrefix, command }) => {
    const percent = Math.floor(Math.random() * 101)
    const mentioned = m.mentionedJid?.[0] || m.sender
    let lvl = levels.find(l => percent >= l.min) || levels[levels.length - 1]
    const isSelf = mentioned === m.sender
    const txt = isSelf
      ? `Hai @${mentioned.split('@')[0]}\n\n${desc} kamu *${percent}%*\n\`\`\`${lvl.desc}\`\`\``
      : `Kamu ingin ngecek ${desc.toLowerCase()} @${mentioned.split('@')[0]} yak?\n\n${desc} dia sebesar *${percent}%*\n\`\`\`${lvl.desc}\`\`\``
    await m.reply(txt, { mentions: [mentioned] })
  }
  handler.help = [`${name} <nama/@tag>`]
  handler.tags = ['cek']
  handler.command = new RegExp(`^(${[name, ...aliases].join('|')})$`, 'i')
  return handler
}

// --- Cantik ---
export const cantikHandler = makeCekHandler('cekcantik', ['cantik', 'beautiful'], 'Tingkat kecantikan', [
  { min: 90, desc: 'Cantik banget kayak bidadari! 👸✨' },
  { min: 70, desc: 'Cantik banget! 💕' },
  { min: 50, desc: 'Manis dan cantik~ 🌸' },
  { min: 30, desc: 'Lumayan cantik 😊' },
  { min: 0,  desc: 'Tetep cantik kok! 💖' },
])
export default cantikHandler

// --- Ganteng ---
export const gantengHandler = makeCekHandler('cekganteng', ['ganteng', 'handsome'], 'Tingkat kegantengan', [
  { min: 90, desc: 'Ganteng maksimal! 😍🔥' },
  { min: 70, desc: 'Ganteng banget! 😎' },
  { min: 50, desc: 'Lumayan ganteng~ 👍' },
  { min: 30, desc: 'Biasa aja sih 😅' },
  { min: 0,  desc: 'Mungkin inner beauty? 🤭' },
])

// --- Wibu ---
export const wibuHandler = makeCekHandler('cekwibu', ['wibu', 'otaku2'], 'Tingkat kewibu-an', [
  { min: 90, desc: 'Wibu sejati! Waifu mu pasti banyak 🎌' },
  { min: 70, desc: 'Wibu banget! 🍜' },
  { min: 50, desc: 'Lumayan wibu~ 🌸' },
  { min: 30, desc: 'Sedikit wibu 😅' },
  { min: 0,  desc: 'Bukan wibu sama sekali 😂' },
])

// --- Bucin ---
export const bucinHandler = makeCekHandler('cekbucin', ['bucin2'], 'Tingkat kebucin-an', [
  { min: 90, desc: 'Bucin parah! Udah gak bisa diselamatkan 💘' },
  { min: 70, desc: 'Bucin banget! 😍' },
  { min: 50, desc: 'Lumayan bucin~ 🥺' },
  { min: 30, desc: 'Sedikit bucin 😊' },
  { min: 0,  desc: 'Gak bucin sama sekali 😎' },
])

// --- Jomblo ---
export const jombloHandler = makeCekHandler('cekjomblo', ['jomblo2'], 'Tingkat kejombloan', [
  { min: 90, desc: 'Jomblo akut! Kapan nikah? 😭' },
  { min: 70, desc: 'Jomblo banget 😢' },
  { min: 50, desc: 'Lumayan jomblo~ 😅' },
  { min: 30, desc: 'Sedikit jomblo 🙂' },
  { min: 0,  desc: 'Gak jomblo! Ada yang suka nih 😏' },
])

// --- Gila ---
export const gilaHandler = makeCekHandler('cekgila', ['gila2'], 'Tingkat kegilaan', [
  { min: 90, desc: 'Gila parah! Perlu dirawat 🤪' },
  { min: 70, desc: 'Gila banget! 😜' },
  { min: 50, desc: 'Lumayan gila~ 😝' },
  { min: 30, desc: 'Sedikit gila 😅' },
  { min: 0,  desc: 'Waras banget! 😇' },
])

// --- Malas ---
export const malasHandler = makeCekHandler('cekmalas', ['malas2'], 'Tingkat kemalasan', [
  { min: 90, desc: 'Mager parah! Gerak dikit dong 🦥' },
  { min: 70, desc: 'Malas banget! 😴' },
  { min: 50, desc: 'Lumayan malas~ 😪' },
  { min: 30, desc: 'Sedikit malas 🙂' },
  { min: 0,  desc: 'Rajin banget! 💪' },
])

// --- Gabut ---
export const gabutHandler = makeCekHandler('cekgabut', ['gabut2'], 'Tingkat kegabutan', [
  { min: 90, desc: 'Gabut parah! Cari kerjaan dong 😂' },
  { min: 70, desc: 'Gabut banget! 🥱' },
  { min: 50, desc: 'Lumayan gabut~ 😑' },
  { min: 30, desc: 'Sedikit gabut 🙂' },
  { min: 0,  desc: 'Sibuk banget! 💼' },
])

// --- Kaya ---
export const kayaHandler = makeCekHandler('cekkaya', ['kaya2'], 'Tingkat kekayaan', [
  { min: 90, desc: 'Sultan! Tajir melintir 💰👑' },
  { min: 70, desc: 'Kaya banget! 💵' },
  { min: 50, desc: 'Lumayan kaya~ 💳' },
  { min: 30, desc: 'Pas-pasan 😅' },
  { min: 0,  desc: 'Bokek! Nabung dulu 😭' },
])

// --- Pintar ---
export const pintarHandler = makeCekHandler('cekpintar', ['pintar2', 'cekiq'], 'Tingkat kepintaran', [
  { min: 90, desc: 'Jenius! IQ over 9000 🧠✨' },
  { min: 70, desc: 'Pintar banget! 📚' },
  { min: 50, desc: 'Lumayan pintar~ 🎓' },
  { min: 30, desc: 'Biasa aja 😅' },
  { min: 0,  desc: 'Perlu belajar lebih banyak 📖' },
])

// --- Sabar ---
export const sabarHandler = makeCekHandler('ceksabar', ['sabar2'], 'Tingkat kesabaran', [
  { min: 90, desc: 'Sabar banget! Kayak nabi 😇' },
  { min: 70, desc: 'Sabar banget! 🙏' },
  { min: 50, desc: 'Lumayan sabar~ 😊' },
  { min: 30, desc: 'Sedikit sabar 😤' },
  { min: 0,  desc: 'Gampang emosi! Tarik napas dulu 😡' },
])

// --- Jahat ---
export const jahatHandler = makeCekHandler('cekjahat', ['jahat2'], 'Tingkat kejahatanmu', [
  { min: 90, desc: 'Villain sejati! 😈' },
  { min: 70, desc: 'Jahat banget! 😠' },
  { min: 50, desc: 'Lumayan jahat~ 😏' },
  { min: 30, desc: 'Sedikit nakal 😅' },
  { min: 0,  desc: 'Baik banget! 😇' },
])

// --- Baik ---
export const baikHandler = makeCekHandler('cekbaik', ['baik2'], 'Tingkat kebaikanmu', [
  { min: 90, desc: 'Malaikat! Baik banget 😇✨' },
  { min: 70, desc: 'Baik banget! 💖' },
  { min: 50, desc: 'Lumayan baik~ 😊' },
  { min: 30, desc: 'Biasa aja 🙂' },
  { min: 0,  desc: 'Perlu banyak belajar kebaikan 😅' },
])

// --- Imut ---
export const imutHandler = makeCekHandler('cekimut', ['imut2', 'cute'], 'Tingkat keimutan', [
  { min: 90, desc: 'Imut banget! Mau diculik 🥺💕' },
  { min: 70, desc: 'Imut banget! 🌸' },
  { min: 50, desc: 'Lumayan imut~ 😊' },
  { min: 30, desc: 'Biasa aja 🙂' },
  { min: 0,  desc: 'Kurang imut 😅' },
])

// --- Sexy ---
export const sexyHandler = makeCekHandler('ceksexy', ['sexy2'], 'Tingkat keseksian', [
  { min: 90, desc: 'Sexy parah! 🔥😍' },
  { min: 70, desc: 'Sexy banget! 💃' },
  { min: 50, desc: 'Lumayan sexy~ 😏' },
  { min: 30, desc: 'Biasa aja 🙂' },
  { min: 0,  desc: 'Kurang sexy 😅' },
])

// --- Hoki ---
export const hokiHandler = makeCekHandler('cekhoki', ['hoki2', 'luck'], 'Tingkat keberuntungan', [
  { min: 90, desc: 'Hoki banget! Beli lotre sekarang 🍀🎰' },
  { min: 70, desc: 'Lumayan hoki! 🌟' },
  { min: 50, desc: 'Biasa aja~ 😊' },
  { min: 30, desc: 'Kurang hoki 😅' },
  { min: 0,  desc: 'Sial banget hari ini 😭' },
])

// --- Sial ---
export const sialHandler = makeCekHandler('ceksial', ['sial2'], 'Tingkat kesialanmu', [
  { min: 90, desc: 'Sial parah! Hati-hati hari ini 😱' },
  { min: 70, desc: 'Lumayan sial 😢' },
  { min: 50, desc: 'Biasa aja~ 😅' },
  { min: 30, desc: 'Sedikit sial 🙂' },
  { min: 0,  desc: 'Beruntung banget! 🍀' },
])

// --- Otaku ---
export const otakuHandler = makeCekHandler('cekotaku', ['otaku2'], 'Tingkat keotakuan', [
  { min: 90, desc: 'Otaku sejati! Waifu > segalanya 🎌' },
  { min: 70, desc: 'Otaku banget! 🍜' },
  { min: 50, desc: 'Lumayan otaku~ 🌸' },
  { min: 30, desc: 'Sedikit otaku 😅' },
  { min: 0,  desc: 'Bukan otaku 😂' },
])

// --- Introvert ---
export const introvertHandler = makeCekHandler('cekintrovert', ['introvert2'], 'Tingkat keintrovetan', [
  { min: 90, desc: 'Introvert parah! Rumah > segalanya 🏠' },
  { min: 70, desc: 'Introvert banget! 🤫' },
  { min: 50, desc: 'Lumayan introvert~ 😶' },
  { min: 30, desc: 'Sedikit introvert 🙂' },
  { min: 0,  desc: 'Extrovert banget! 🎉' },
])

// --- Gamer ---
export const gamerHandler = makeCekHandler('cekgamer', ['gamer2'], 'Tingkat kegameran', [
  { min: 90, desc: 'Pro player! Rank tertinggi 🎮🏆' },
  { min: 70, desc: 'Gamer banget! 🕹️' },
  { min: 50, desc: 'Lumayan gamer~ 🎯' },
  { min: 30, desc: 'Casual gamer 😅' },
  { min: 0,  desc: 'Bukan gamer 😂' },
])

// --- Mesum ---
export const mesumHandler = makeCekHandler('cekmesum', ['mesum2'], 'Tingkat kemesumanmu', [
  { min: 90, desc: 'Mesum parah! Istighfar dulu 😳' },
  { min: 70, desc: 'Lumayan mesum 😏' },
  { min: 50, desc: 'Biasa aja~ 😅' },
  { min: 30, desc: 'Sedikit mesum 🙂' },
  { min: 0,  desc: 'Suci banget! 😇' },
])

// --- Cupu ---
export const cupuHandler = makeCekHandler('cekcupu', ['cupu2'], 'Tingkat kecupuan', [
  { min: 90, desc: 'Cupu parah! 🤓' },
  { min: 70, desc: 'Lumayan cupu 😅' },
  { min: 50, desc: 'Biasa aja~ 🙂' },
  { min: 30, desc: 'Sedikit cupu 😊' },
  { min: 0,  desc: 'Kece banget! 😎' },
])

// --- Kece ---
export const keceHandler = makeCekHandler('cekkece', ['kece2'], 'Tingkat kekecean', [
  { min: 90, desc: 'Kece parah! Swag level 100 😎🔥' },
  { min: 70, desc: 'Kece banget! 😏' },
  { min: 50, desc: 'Lumayan kece~ 🙂' },
  { min: 30, desc: 'Biasa aja 😅' },
  { min: 0,  desc: 'Kurang kece 😂' },
])

// --- Jodoh ---
const jodohHandler = async (m, { conn, usedPrefix, command }) => {
  const input = (m.text || '').trim()
  const parts = input.split(/[&,]/).map(s => s.trim()).filter(Boolean)
  if (parts.length < 2) return m.reply(`💕 *ᴄᴇᴋ ᴊᴏᴅᴏʜ*\n\n> Masukkan 2 nama!\n\n> Contoh: ${usedPrefix}cekjodoh Budi & Ani`)
  const percent = Math.floor(Math.random() * 101)
  const desc = percent >= 90 ? 'Jodoh banget! Langsung nikah aja! 💍'
    : percent >= 70 ? 'Cocok banget! 💕'
    : percent >= 50 ? 'Lumayan cocok~ 😊'
    : percent >= 30 ? 'Hmm, perlu usaha lebih 🤔'
    : 'Mungkin cari yang lain? 😅'
  m.reply(`💕 *ᴄᴇᴋ ᴊᴏᴅᴏʜ*\n\n👫 *${parts[0]}* & *${parts[1]}*\n\nTingkat kecocokan: *${percent}%*\n\`\`\`${desc}\`\`\``)
}
jodohHandler.help = ['cekjodoh <nama1> & <nama2>']
jodohHandler.tags = ['cek']
jodohHandler.command = /^(cekjodoh|jodoh|match)$/i
export { jodohHandler }

// --- Khodam (text only, no TTS to avoid gtts dep issues) ---
const KHODAMS = [
  { name: 'Harimau Putih', meaning: 'Kamu kuat dan berani seperti harimau.' },
  { name: 'Panda Ompong', meaning: 'Kamu menggemaskan dan selalu membuat orang tersenyum.' },
  { name: 'Bebek Karet', meaning: 'Kamu selalu tenang dan ceria menghadapi masalah.' },
  { name: 'Ninja Turtle', meaning: 'Kamu lincah dan tangguh, siap melindungi yang lemah.' },
  { name: 'Kucing Kulkas', meaning: 'Kamu misterius dan selalu ada di tempat tak terduga.' },
  { name: 'Sabun Wangi', meaning: 'Kamu selalu membawa keharuman di mana pun berada.' },
  { name: 'Semut Kecil', meaning: 'Kamu pekerja keras dan selalu bisa diandalkan.' },
  { name: 'Indomie Goreng', meaning: 'Selalu bikin kenyang dan bahagia.' },
  { name: 'Singa Bermahkota', meaning: 'Kamu lahir sebagai pemimpin, bijaksana seperti raja.' },
  { name: 'Macan Kumbang', meaning: 'Kamu misterius dan kuat, selalu waspada.' },
  { name: 'Kuda Emas', meaning: 'Kamu berharga dan kuat, siap berlari menuju sukses.' },
  { name: 'Elang Biru', meaning: 'Kamu memiliki visi tajam dan melihat peluang dari jauh.' },
  { name: 'Naga Pelangi', meaning: 'Kamu tangguh dan memiliki kekuatan besar.' },
  { name: 'Gajah Putih', meaning: 'Kamu bijaksana, lambang keberanian dan keteguhan hati.' },
  { name: 'Banteng Sakti', meaning: 'Kamu kuat dan penuh semangat, tidak takut rintangan.' },
  { name: 'Sandal Jepit', meaning: 'Selalu santai dan nyaman.' },
  { name: 'Bantal Guling', meaning: 'Selalu nyaman di pelukan.' },
  { name: 'Anjing Pelacak', meaning: 'Kamu setia dan penuh dedikasi.' },
  { name: 'Kopi Susu', meaning: 'Kamu manis dan selalu bikin semangat orang sekitarmu.' },
  { name: 'Teh Celup', meaning: 'Selalu memberikan rasa hangat di hati.' },
]
const khodamHandler = async (m, { conn, usedPrefix, command }) => {
  let targetName = m.name || m.sender.split('@')[0]
  if (m.quoted) targetName = m.quoted.pushName || m.quoted.sender?.split('@')[0] || targetName
  else if (m.mentionedJid?.[0]) targetName = m.mentionedJid[0].split('@')[0]
  else if (m.text) targetName = m.text
  const khodam = KHODAMS[Math.floor(Math.random() * KHODAMS.length)]
  m.reply(`🔮 *ᴄᴇᴋ ᴋʜᴏᴅᴀᴍ*\n\nHalo kak *${targetName}*!\n\nKhodam kamu adalah:\n*${khodam.name}*\n\n_${khodam.meaning}_`)
}
khodamHandler.help = ['cekkhodam', 'khodam']
khodamHandler.tags = ['fun']
khodamHandler.command = /^(cekkhodam|khodam|cekhodam)$/i
export { khodamHandler }
