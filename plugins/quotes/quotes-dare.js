import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, '../../data/dare.json')

let handler = async (m, { conn, usedPrefix }) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  const dare = data[Math.floor(Math.random() * data.length)]
  
  conn.sendButton(m.chat, dare, author, [
    ['Dare', `${usedPrefix}dare`], 
    ['Truth', `${usedPrefix}truth`]
  ], m)
}

handler.help = ['dare']
handler.tags = ['quotes']
handler.command = /^(dare)$/i

export default handler
