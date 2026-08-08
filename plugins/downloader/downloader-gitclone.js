// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, {conn, text, args, usedPrefix, command }) => {
    if (!args[0]) throw `Example: ${usedPrefix}${command} owner/repo`
    const repoInput = (text || '').trim()
    let [usr, rep] = repoInput.split('/').map(s => s.trim())
    if (!usr || !rep) throw `Example: ${usedPrefix}${command} owner/repo`
    // strip possible .git suffix
    rep = rep.replace(/\.git$/i, '')
    let url = `https://api.github.com/repos/${encodeURIComponent(usr)}/${encodeURIComponent(rep)}/zipball`
    let name = `${encodeURIComponent(rep)}.zip`
    m.reply(`D o w n l o a d i n g. . .`)
    conn.sendFile(m.chat, url, name, null, m)
}
handler.help = ['gitclone <username>/<repo>']
handler.tags = ['downloader']
handler.command = /gitclone/i

handler.limit = true

export default handler
