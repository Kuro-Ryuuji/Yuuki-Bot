// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import { translate } from '@vitalets/google-translate-api'

const defaultLang = 'en'

let handler = async (m, { args, usedPrefix, command }) => {
    const err = `Contoh:\n${usedPrefix + command} <lang> [text]\n${usedPrefix + command} id your messages\n\nDaftar bahasa: https://cloud.google.com/translate/docs/languages`

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text
    if (!text) throw err

    try {
        const result = await translate(text, { to: lang })
        m.reply(result.text)
    } catch (e) {
        try {
            const result = await translate(text, { to: defaultLang })
            m.reply(result.text)
        } catch {
            throw 'Gagal menerjemahkan: ' + e.message
        }
    }
}

handler.help = ['translate <lang> <teks>']
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

export default handler
