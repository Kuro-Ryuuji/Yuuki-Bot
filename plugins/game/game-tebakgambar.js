// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, '../../data/tebakgambar.json')

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
    if (id in conn.tebakgambar) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.tebakgambar[id][0])
        throw false
    }
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    let json = data[Math.floor(Math.random() * data.length)]
    
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hint untuk hint
Bonus: ${poin} XP
    `.trim()
    conn.tebakgambar[id] = [
        await conn.sendButton(m.chat, caption, author, json.img, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakgambar[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, null, [
                ['tebakgambar', '/tebakgambar']
            ], conn.tebakgambar[id][0])
            delete conn.tebakgambar[id]
        }, timeout)
    ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i

export default handler

const buttons = [
    ['hint', '/hint'],
    ['nyerah', 'menyerah']
]