// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

async function getWaifuIm(tag) {
  const t = tag || 'waifu'
  const res = await fetch(`https://api.waifu.im/images?IncludedTags=${t}&IsNsfw=False`)
  const json = await res.json()
  return json.items?.[0]?.url
}

async function getWaifuPics(type) {
  const res = await fetch(`https://api.waifu.pics/sfw/${type}`)
  const json = await res.json()
  return json.url
}

let handler = async (m, { conn, command }) => {
  let url
  switch (command.toLowerCase()) {
    case 'neko':    url = await getWaifuPics('neko'); break
    case 'waifu':   url = await getWaifuIm('waifu'); break
    case 'maid':    url = await getWaifuIm('maid'); break
    case 'shinobu': url = await getWaifuPics('shinobu'); break
    case 'hug':     url = await getWaifuPics('hug'); break
    case 'pat':     url = await getWaifuPics('pat'); break
    case 'kiss':    url = await getWaifuPics('kiss'); break
    case 'slap':    url = await getWaifuPics('slap'); break
    case 'cry':     url = await getWaifuPics('cry'); break
    case 'dance':   url = await getWaifuPics('dance'); break
    case 'smug':    url = await getWaifuPics('smug'); break
    case 'blush':   url = await getWaifuPics('blush'); break
    default:        url = await getWaifuIm('waifu'); break
  }

  if (!url) throw 'Gagal mengambil gambar'
  await conn.sendMessage(m.chat, { image: { url }, caption: global.wm }, { quoted: m })
}

handler.help = ['waifu', 'neko', 'maid', 'hug', 'pat', 'kiss', 'slap', 'cry', 'dance', 'smug', 'blush']
handler.tags = ['anime']
handler.command = /^(neko|waifu|maid|shinobu|hug|pat|kiss|slap|cry|dance|smug|blush)$/i
export default handler
