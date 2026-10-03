import * as googleTTS from '@sefinek/google-tts-api'

const defaultLang = 'id'
let handler = async (m, { conn, args, usedPrefix, command }) => {

  let lang = args[0]
  let text = args.slice(1).join(' ')
  if ((args[0] || '').length !== 2) {
    lang = defaultLang
    text = args.join(' ')
  }
  if (!text && m.quoted?.text) text = m.quoted.text

  let res
  try { res = await tts(text, lang) }
  catch (e) {
    m.reply(e + '')
    text = args.join(' ')
    if (!text) throw `Contoh ${usedPrefix}${command} en hello world`
    res = await tts(text, defaultLang)
  } finally {
    if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true)
  }
}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i

export default handler

async function tts(text, lang = 'id') {
  const parts = await googleTTS.getAllAudioBase64(text, {
    lang,
    splitPunct: ',.!?;:，。！？；：\n',
    timeout: 30000
  })
  return Buffer.concat(parts.map(({ base64 }) => Buffer.from(base64, 'base64')))
}