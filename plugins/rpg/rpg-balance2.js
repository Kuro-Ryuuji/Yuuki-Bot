// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// Makasih kode nya RTXZY

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let user = global.db.data.users[who]
  
  if (!(who in global.db.data.users)) throw '✳️ Pengguna tidak ditemukan di database'
  
  conn.reply(m.chat, `
┌───⊷ *BALANCE* ⊶
▢ *📌 Nama* : @${who.split('@')[0]}
▢ *💎 Diamond* : ${user.diamond || 0}
▢ *⬆️ XP* : ${user.exp || 0}
▢ *💰 Money* : ${(user.money || 0).toLocaleString('id')}
└──────────────

*NOTA:*
Anda dapat membeli 💎 diamond menggunakan:
❏ *${usedPrefix}buydm <jumlah>*
❏ *${usedPrefix}buyalldm*`, m, { mentions: [who] })
}

handler.help = ['balance', 'bal']
handler.tags = ['rpg']
handler.command = /^(bal(ance)?)$/i
handler.rpg = true

export default handler
