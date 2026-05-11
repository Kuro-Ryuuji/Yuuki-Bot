// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import axios from 'axios'
import FormData from 'form-data'
import * as cheerio from 'cheerio'

const EFFECT_URLS = {
  glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
  writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
  neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
  glowingtext: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
  gradienttext: 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
  luxurygold: 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
  galaxystyle: 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html',
  rainytext: 'https://en.ephoto360.com/foggy-rainy-text-effect-75.html',
  royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html',
  blackpinklogo: 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
}

async function ephoto(url, textInput) {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
  const init = await axios.get(url, { headers: { 'user-agent': ua } })
  const $ = cheerio.load(init.data)
  const token = $('input[name=token]').val()
  const buildServer = $('input[name=build_server]').val()
  const buildServerId = $('input[name=build_server_id]').val()
  const form = new FormData()
  form.append('text[]', textInput)
  form.append('token', token)
  form.append('build_server', buildServer)
  form.append('build_server_id', buildServerId)
  const post = await axios({ url, method: 'POST', data: form, headers: {
    'user-agent': ua, 'cookie': init.headers['set-cookie']?.join('; '), ...form.getHeaders()
  }})
  const $$ = cheerio.load(post.data)
  const fv = JSON.parse($$('input[name=form_value_input]').val())
  fv['text[]'] = fv.text; delete fv.text
  const { data } = await axios.post('https://en.ephoto360.com/effect/create-image', new URLSearchParams(fv), {
    headers: { 'user-agent': ua, 'cookie': init.headers['set-cookie'].join('; ') }
  })
  return buildServer + data.image
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (command === 'ephoto' && !args[0]) {
    const list = Object.keys(EFFECT_URLS).map(e => `• \`${usedPrefix}${e}\``).join('\n')
    return m.reply(`🎨 *ᴇᴘʜᴏᴛᴏ ᴇꜰꜰᴇᴄᴛs*\n\n${list}\n\n> Contoh: \`${usedPrefix}glitchtext Elaina\``)
  }
  const effectUrl = EFFECT_URLS[command]
  if (!effectUrl) return
  if (!text) throw `❌ Masukkan text!\n> Contoh: ${usedPrefix}${command} Elaina`
  m.react('🕕')
  try {
    const imageUrl = await ephoto(effectUrl, text)
    await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `🎨 *${command}*` }, { quoted: m })
    m.react('✅')
  } catch {
    throw '❌ Gagal membuat efek ephoto'
  }
}
handler.help = ['ephoto <efek> <teks>', ...Object.keys(EFFECT_URLS).map(e => `${e} <teks>`)]
handler.tags = ['tools']
handler.command = new RegExp(`^(ephoto|${Object.keys(EFFECT_URLS).join('|')})$`, 'i')
export default handler
