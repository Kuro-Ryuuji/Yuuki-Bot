import { Jimp } from 'jimp'

let handler = async (m, { conn, text }) => {
  let image = m.message?.imageMessage
    ? await m.download()
    : /image/.test(m.quoted?.mediaType)
    ? await m.quoted.download()
    : m.mentionedJid?.[0]
    ? await conn.profilePictureUrl(m.mentionedJid[0], 'image')
    : await conn.profilePictureUrl(m.quoted?.sender || m.sender, 'image')

  if (!image) throw `Couldn't fetch the required Image`

  const level = isNaN(text) ? 5 : parseInt(text)
  const img = await Jimp.read(image)
  img.blur(level)
  const buffer = await img.getBuffer('image/jpeg')
  m.reply(buffer)
}

handler.command = /^(blur)$/i
export default handler
