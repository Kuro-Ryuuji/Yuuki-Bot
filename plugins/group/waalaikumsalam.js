import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `Wa'alaikumsalam warahmatullahi wabarakatuh`

let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
conn.reply(m.chat, info, m, { quoted: fkontak },{ contextInfo: { externalAdReply: { showAdAttribution: true,
      mediaUrl: "https://github.com/fulanzz2886-cpu",
      mediaType: 2,
      description: "https://github.com/fulanzz2886-cpu", 
      title: 'ᴇʟᴀɪɴᴀ-ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
      body: wm,
      thumbnail: thumb,
      sourceUrl: sig  }}})
}
handler.customPrefix = /^(assalamualaikum|salam|Assalamualaikum|Assalamualaikum wr wb|Assalamualaikum warahmatullahi wabarakatuh|assalamualaikum wr wb|assalamualaikum warahmatullahi wabarakatuh)$/i
handler.command = new RegExp

export default handler
