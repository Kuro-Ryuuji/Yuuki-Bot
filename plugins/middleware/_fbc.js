// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => await conn.send3ButtonLoc(m.chat, await (await fetch(fla + 'Broadcast Here')).buffer(), `
*ʙʀᴏᴀᴅᴄᴀsᴛ ʜᴇʀᴇ*

${text}
`.trim(), 'ᴇʟᴀɪɴᴀ ʙᴏᴛ💌', 'ᴍᴇɴᴜ🎀', '.menu', 'sᴏᴜʀᴄᴇ ᴄᴏᴅᴇ?', '.sc', 'ᴅᴏɴᴀsɪ🧧', '.donasi', m)
handler.help = ['bchere <text>']
handler.tags = ['owner']
handler.command = ['bchere']
handler.rowner = true

export default handler