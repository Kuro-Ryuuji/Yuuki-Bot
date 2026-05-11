/**
 * Elaina-MD — github.com/OmmniDevv/Elaina-MD
 * Jangan Dijual!
 */
import axios from 'axios'

// Map command → waifu.im tag atau nekos.best endpoint (semua gratis, no key)
const ANIME_MAP = {
  // waifu.im tags
  waifu:    { src: 'waifuim', tag: 'waifu' },
  maid:     { src: 'waifuim', tag: 'maid' },
  marin:    { src: 'waifuim', tag: 'marin-kitagawa' },
  raiden:   { src: 'waifuim', tag: 'raiden-shogun' },
  oppai:    { src: 'waifuim', tag: 'oppai' },
  selfies:  { src: 'waifuim', tag: 'selfies' },
  uniform:  { src: 'waifuim', tag: 'uniform' },
  // nekos.best endpoints
  neko:     { src: 'nekosbest', tag: 'neko' },
  kitsune:  { src: 'nekosbest', tag: 'kitsune' },
  husbando: { src: 'nekosbest', tag: 'husbando' },
  shinobu:  { src: 'nekosbest', tag: 'shinobu' },
  megumin:  { src: 'nekosbest', tag: 'megumin' },
  bully:    { src: 'nekosbest', tag: 'bully' },
  cuddle:   { src: 'nekosbest', tag: 'cuddle' },
  cry:      { src: 'nekosbest', tag: 'cry' },
  hug:      { src: 'nekosbest', tag: 'hug' },
  awoo:     { src: 'nekosbest', tag: 'awoo' },
  kiss:     { src: 'nekosbest', tag: 'kiss' },
  lick:     { src: 'nekosbest', tag: 'lick' },
  pat:      { src: 'nekosbest', tag: 'pat' },
  smug:     { src: 'nekosbest', tag: 'smug' },
  bonk:     { src: 'nekosbest', tag: 'bonk' },
  yeet:     { src: 'nekosbest', tag: 'yeet' },
  blush:    { src: 'nekosbest', tag: 'blush' },
  smile:    { src: 'nekosbest', tag: 'smile' },
  wave:     { src: 'nekosbest', tag: 'wave' },
  highfive: { src: 'nekosbest', tag: 'highfive' },
  happy:    { src: 'nekosbest', tag: 'happy' },
  dance:    { src: 'nekosbest', tag: 'dance' },
  // old commands → redirect to nekos.best neko
  akira: { src: 'nekosbest', tag: 'neko' }, akiyama: { src: 'nekosbest', tag: 'neko' },
  anna: { src: 'nekosbest', tag: 'neko' }, asuna: { src: 'nekosbest', tag: 'neko' },
  ayuzawa: { src: 'nekosbest', tag: 'neko' }, boruto: { src: 'nekosbest', tag: 'neko' },
  chiho: { src: 'nekosbest', tag: 'neko' }, chitoge: { src: 'nekosbest', tag: 'neko' },
  deidara: { src: 'nekosbest', tag: 'neko' }, eba: { src: 'nekosbest', tag: 'neko' },
  elaina: { src: 'waifuim', tag: 'waifu' }, emilia: { src: 'waifuim', tag: 'waifu' },
  erza: { src: 'nekosbest', tag: 'neko' }, hestia: { src: 'waifuim', tag: 'waifu' },
  hinata: { src: 'nekosbest', tag: 'neko' }, inori: { src: 'waifuim', tag: 'waifu' },
  isuzu: { src: 'nekosbest', tag: 'neko' }, itachi: { src: 'nekosbest', tag: 'neko' },
  itori: { src: 'nekosbest', tag: 'neko' }, kaga: { src: 'nekosbest', tag: 'neko' },
  kagura: { src: 'nekosbest', tag: 'neko' }, kaori: { src: 'waifuim', tag: 'waifu' },
  keneki: { src: 'nekosbest', tag: 'neko' }, kotori: { src: 'waifuim', tag: 'waifu' },
  kurumi: { src: 'waifuim', tag: 'waifu' }, madara: { src: 'nekosbest', tag: 'neko' },
  mikasa: { src: 'nekosbest', tag: 'neko' }, miku: { src: 'waifuim', tag: 'waifu' },
  minato: { src: 'nekosbest', tag: 'neko' }, naruto: { src: 'nekosbest', tag: 'neko' },
  nezuko: { src: 'waifuim', tag: 'waifu' }, sagiri: { src: 'waifuim', tag: 'waifu' },
  sakura: { src: 'nekosbest', tag: 'neko' }, sasuke: { src: 'nekosbest', tag: 'neko' },
  cosplay: { src: 'waifuim', tag: 'uniform' },
}

async function getAnimeImg(src, tag) {
  if (src === 'waifuim') {
    const res = await axios.get(`https://api.waifu.im/images?IncludedTags=${tag}&IsNsfw=False`, { timeout: 10000 })
    return res.data?.items?.[0]?.url
  }
  const res = await axios.get(`https://nekos.best/api/v2/${tag}`, { timeout: 10000 })
  return res.data?.results?.[0]?.url
}

const COMMANDS = Object.keys(ANIME_MAP)

let handler = async (m, { conn, command }) => {
  const cfg = ANIME_MAP[command]
  if (!cfg) return
  const url = await getAnimeImg(cfg.src, cfg.tag)
  if (!url) throw `❌ Gagal ambil gambar ${command}`
  await conn.sendMessage(m.chat, { image: { url }, caption: `_${command}_\n\n${global.wm}` }, { quoted: m })
}
handler.help = COMMANDS.map(c => c)
handler.tags = ['anime']
handler.command = new RegExp(`^(${COMMANDS.join('|')})$`, 'i')
export default handler
