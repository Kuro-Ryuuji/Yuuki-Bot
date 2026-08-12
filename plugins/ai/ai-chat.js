import axios from 'axios'
import FormData from 'form-data'

// ─── GPT-4o via Covenant ───────────────────────────────────
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🧠 *ɢᴘᴛ-4ᴏ*\n\nContoh: ${usedPrefix}${command} Hai apa kabar?`
  const key = global.APIKeys?.covenant
  if (!key) throw '❌ API Key Covenant belum diset di config.js → global.APIKeys.covenant'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.get(`https://api.covenant.sbs/api/ai/gpt4o?text=${encodeURIComponent(text)}&apikey=${key}`, { timeout: 60000 })
  const result = res.data?.result || res.data?.data?.result || res.data?.message
  if (!result) throw '❌ AI tidak merespon'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`🧠 *GPT-4o*\n\n${result}`)
}
handler.help = ['gpt4o <pertanyaan>']
handler.tags = ['ai']
handler.command = /^(gpt4o|gpt4)$/i
export default handler

// ─── Gemini Vision (image analysis) ───────────────────────
export const geminiVisionHandler = async (m, { conn, text, usedPrefix, command }) => {
  const isImg = /image/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
  if (!isImg) throw `👁️ *ɢᴇᴍɪɴɪ ᴠɪsɪᴏɴ*\n\nReply gambar dengan \`${usedPrefix}${command} <pertanyaan>\``
  const apiKey = global.APIKeys?.gemini
  if (!apiKey) throw '❌ API Key Gemini belum diset di config.js → global.APIKeys.gemini'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const buf = m.quoted ? await m.quoted.download() : await m.download()
  if (!buf) throw '❌ Gagal download gambar'
  const base64 = buf.toString('base64')
  const prompt = text || 'Jelaskan gambar ini dalam bahasa Indonesia'
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    { contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/jpeg', data: base64 } }] }] },
    { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
  )
  const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!result) throw '❌ AI tidak merespon'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`👁️ *ɢᴇᴍɪɴɪ ᴠɪsɪᴏɴ*\n\n${result}`)
}
geminiVisionHandler.help = ['geminicek (reply gambar)', 'geminicek <pertanyaan> (reply gambar)']
geminiVisionHandler.tags = ['ai']
geminiVisionHandler.command = /^(geminicek|geminivis|gemvision|cekgambar)$/i

// ─── AI Rewriter ───────────────────────────────────────────
export const aiRewriterHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✍️ *ᴀɪ ʀᴇᴡʀɪᴛᴇʀ*\n\nContoh: ${usedPrefix}${command} teks yang ingin ditulis ulang`
  const apiKey = global.APIKeys?.gemini
  if (!apiKey) throw '❌ API Key Gemini belum diset'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    { contents: [{ parts: [{ text: `Tulis ulang teks berikut dengan lebih baik dan natural dalam bahasa Indonesia:\n\n${text}` }] }] },
    { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
  )
  const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!result) throw '❌ AI tidak merespon'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`✍️ *ᴀɪ ʀᴇᴡʀɪᴛᴇʀ*\n\n${result}`)
}
aiRewriterHandler.help = ['airewrite <teks>']
aiRewriterHandler.tags = ['ai']
aiRewriterHandler.command = /^(airewrite|rewrite|parafrase)$/i

// ─── Text to Image (via Pollinations) ─────────────────────
export const txt2imgHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🎨 *ᴛxᴛ2ɪᴍɢ*\n\nContoh: ${usedPrefix}${command} anime girl with sword`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(text)}?width=512&height=512&nologo=true`
  await conn.sendMessage(m.chat, { image: { url }, caption: `🎨 *${text}*` }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
txt2imgHandler.help = ['txt2img <prompt>', 'text2img <prompt>']
txt2imgHandler.tags = ['ai']
txt2imgHandler.command = /^(txt2img|text2img|t2i|imagine)$/i

// ─── Matematika (AI solve) ─────────────────────────────────
export const matematikaHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🔢 *ᴍᴀᴛᴇᴍᴀᴛɪᴋᴀ*\n\nContoh: ${usedPrefix}${command} 2x + 5 = 15`
  const apiKey = global.APIKeys?.gemini
  if (!apiKey) throw '❌ API Key Gemini belum diset'
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    { contents: [{ parts: [{ text: `Selesaikan soal matematika berikut dengan langkah-langkah yang jelas:\n\n${text}` }] }] },
    { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
  )
  const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!result) throw '❌ AI tidak merespon'
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  m.reply(`🔢 *ᴍᴀᴛᴇᴍᴀᴛɪᴋᴀ*\n\n${result}`)
}
matematikaHandler.help = ['matematika <soal>']
matematikaHandler.tags = ['ai']
matematikaHandler.command = /^(matematika|math|solvemath)$/i

// ─── To Anime (image style transfer) ──────────────────────
export const toAnimeHandler = async (m, { conn, text, usedPrefix, command }) => {
  const isImg = /image/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
  if (!isImg) throw `🎌 *ᴛᴏ ᴀɴɪᴍᴇ*\n\nReply gambar dengan \`${usedPrefix}${command}\``
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  const buf = m.quoted ? await m.quoted.download() : await m.download()
  if (!buf) throw '❌ Gagal download gambar'
  // Upload to catbox then use vreden/siputzx
  const FormData2 = (await import('form-data')).default
  const uploadForm = new FormData2()
  uploadForm.append('reqtype', 'fileupload')
  uploadForm.append('fileToUpload', buf, { filename: 'image.jpg', contentType: 'image/jpeg' })
  const uploadRes = await axios.post('https://catbox.moe/user/api.php', uploadForm, {
    headers: uploadForm.getHeaders(), timeout: 30000
  })
  const imgUrl = uploadRes.data
  if (!imgUrl?.startsWith('http')) throw '❌ Gagal upload gambar'
  const res = await axios.get(`https://api.siputzx.my.id/api/ai/toanime?url=${encodeURIComponent(imgUrl)}`, {
    responseType: 'arraybuffer', timeout: 120000, headers: { 'user-agent': 'Mozilla/5.0' }
  }).catch(() => null)
  if (!res?.data) throw '❌ Gagal convert ke anime'
  await conn.sendMessage(m.chat, { image: Buffer.from(res.data), caption: '🎌 *Anime Style!*' }, { quoted: m })
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
toAnimeHandler.help = ['toanime (reply gambar)']
toAnimeHandler.tags = ['ai']
toAnimeHandler.command = /^(toanime|anime2d)$/i
