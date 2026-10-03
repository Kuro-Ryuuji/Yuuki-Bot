import { WAMessageStubType } from 'ourin-baileys'
import pkg from 'awesome-phonenumber'
const PhoneNumber = pkg.default || pkg
import chalk from 'chalk'
import { watchFile } from 'fs'

const terminalImage = null // terminal-image removed (not needed in production)
const urlRegex = (await import('url-regex-safe')).default({ strict: false })

export default async function (m, conn = { user: {} }) {
  if (!m.sender) return
  let _name = await conn.getName(m.sender)
  let sender = m.sender.replace('@s.whatsapp.net', '')
  if (_name) sender += ' ~' + _name
  let chat = await conn.getName(m.chat)
  // let ansi = '\x1b['
  let img
  try {
    if (global.opts['img'])
      img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false
  } catch (e) {
    console.error(e)
  }
  let filesize = (m.msg ?
    m.msg.vcard ?
      m.msg.vcard.length :
      m.msg.fileLength ?
        m.msg.fileLength.low || m.msg.fileLength :
        m.msg.axolotlSenderKeyDistributionMessage ?
          m.msg.axolotlSenderKeyDistributionMessage.length :
          m.text ?
            m.text.length :
            0
    : m.text ? m.text.length : 0) || 0
  let user = global.DATABASE.data.users[m.sender]
  let me = PhoneNumber('+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')).number?.international || conn.user?.jid || ''
  const time = (m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date)
    .toTimeString().split(' ')[0]
  const stub = m.messageStubType ? WAMessageStubType[m.messageStubType] : ''
  const mtype = m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'Audio').replace(/^./, v => v.toUpperCase()) : 'Text'
  const sizeStr = filesize > 0
    ? `${(filesize / 1000 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1)} ${['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || ''}B`
    : '—'

  console.log(
    chalk.cyan('┌─') + chalk.cyan('─'.repeat(40)) + chalk.cyan('─┐') + '\n' +
    chalk.cyan('│') + ' ' + chalk.bold.white(`${me}`) + chalk.gray(` (${conn.user?.name || ''})`) + '\n' +
    chalk.cyan('│') + ' ' + chalk.gray(`${time}`) + chalk.gray('  ') + chalk.yellow(mtype) + (stub ? chalk.gray(` · ${stub}`) : '') + '\n' +
    chalk.cyan('│') + '\n' +
    chalk.cyan('│') + ' ' + chalk.green('From  ') + chalk.white(sender) + '\n' +
    chalk.cyan('│') + ' ' + chalk.green('Chat  ') + chalk.white(m.chat + (chat ? ` ~${chat}` : '')) + '\n' +
    chalk.cyan('│') + ' ' + chalk.green('Size  ') + chalk.magenta(sizeStr) + '\n' +
    chalk.cyan('└─') + chalk.cyan('─'.repeat(40)) + chalk.cyan('─┘')
  )
  if (img) console.log(img.trimEnd())
  if (typeof m.text === 'string' && m.text) {
    let log = m.text.replace(/\u200e+/g, '')
    let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
    let mdFormat = (depth = 4) => (_, type, text, monospace) => {
      let types = {
        _: 'italic',
        '*': 'bold',
        '~': 'strikethrough'
      }
      text = text || monospace
      let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
      // console.log({ depth, type, formatted, text, monospace }, formatted)
      return formatted
    }
    if (log.length < 4096)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
      })
    log = log.replace(mdRegex, mdFormat(4))
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + await conn.getName(user)))
    console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }
  if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => {
    // Handle LID JSON format {"id":"...@lid","phoneNumber":"...@s.whatsapp.net"}
    try {
      const parsed = JSON.parse(jid)
      if (parsed?.phoneNumber) jid = parsed.phoneNumber
      else if (parsed?.id) jid = parsed.id
    } catch {}
    jid = conn.decodeJid(jid)
    let name = conn.getName(jid)
    return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '').replace('@lid', '')).number?.international || jid) + (name ? ' ~' + name : '')
  }).join(', '))
  if (/document/i.test(m.mtype)) console.log(`🗂️ ${m.msg.fileName || m.msg.displayName || 'Document'}`)
  else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
  else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
  else if (/audio/i.test(m.mtype)) {
    const duration = m.msg.seconds
    console.log(`${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)
  }

  console.log()
  // if (m.quoted) console.log(m.msg.contextInfo)
}

let file = global.__filename(import.meta.url)
watchFile(file, () => {
  console.log(chalk.redBright("Update 'lib/print.js'"))
})