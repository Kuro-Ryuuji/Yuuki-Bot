// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, '../../data/siapakahaku.json')

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
        throw false
    }
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const json = data[Math.floor(Math.random() * data.length)]
    
    let caption = `
Siapakah aku? ${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.siapakahaku[id] = [
        await conn.sendButton(m.chat, caption, author, ['hint', `${usedPrefix}who`], m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, ['siapahaku', '/siapakahaku'], conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

export default handler