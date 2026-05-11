/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */

// ─── Set Bot Profile Picture ───────────────────────────────
let handler = async (m, { conn, usedPrefix, command }) => {
  const isImg = /image/.test((m.quoted?.msg || m.msg || m)?.mimetype || '')
  if (!isImg) throw `❌ Reply ke gambar dengan \`${usedPrefix}${command}\``
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    const buf = m.quoted ? await m.quoted.download() : await m.download()
    if (!buf?.length) throw '❌ Gagal download gambar'
    await conn.updateProfilePicture(conn.user.id, buf)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    m.reply('✅ Foto profil bot berhasil diubah!')
  } catch {
    throw '❌ Gagal mengubah foto profil!'
  }
}
handler.help = ['setpp (reply gambar)']
handler.tags = ['owner']
handler.command = /^(setpp)$/i
handler.owner = true
export default handler

// ─── Set Bot Name ──────────────────────────────────────────
export const setnameHandler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `❌ Contoh: ${usedPrefix}${command} Elaina Bot`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    await conn.updateProfileName(text)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    m.reply(`✅ Nama bot berhasil diubah ke: *${text}*`)
  } catch {
    throw '❌ Gagal mengubah nama bot!'
  }
}
setnameHandler.help = ['setname <nama>']
setnameHandler.tags = ['owner']
setnameHandler.command = /^(setname|botname)$/i
setnameHandler.owner = true

// ─── Set Bot Bio ───────────────────────────────────────────
export const setbioHandler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `❌ Contoh: ${usedPrefix}${command} Bot WhatsApp Elaina`
  conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
  try {
    await conn.updateProfileStatus(text)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    m.reply(`✅ Bio bot berhasil diubah ke:\n${text}`)
  } catch {
    throw '❌ Gagal mengubah bio bot!'
  }
}
setbioHandler.help = ['setbio <bio>']
setbioHandler.tags = ['owner']
setbioHandler.command = /^(setbio|botstatus)$/i
setbioHandler.owner = true
