let handler = async (m, { conn, text }) => {
  if (!text) throw 'Masukkan jumlah level yang ingin ditambahkan. Contoh: .addlevel @user 10'
  
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } })

  let mentionedJid = m.mentionedJid?.[0]
  if (!mentionedJid) throw 'Tag pengguna yang ingin ditambahkan levelnya. Contoh: .addlevel @user 10'

  let levelToAdd = parseInt(text.split(' ')[1])
  if (isNaN(levelToAdd) || levelToAdd < 1) throw 'Jumlah level harus berupa angka positif. Contoh: .addlevel @user 10'

  let users = global.db.data.users
  if (!users[mentionedJid]) {
    users[mentionedJid] = { level: 0, exp: 0, lastclaim: 0 }
  }

  users[mentionedJid].level += levelToAdd

  await conn.reply(m.chat, `✅ Berhasil menambahkan *${levelToAdd} level* untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  })
}

handler.help = ['addlevel @user <jumlah>']
handler.tags = ['rpg']
handler.command = /^addlevel$/i
handler.owner = true
handler.rpg = true

export default handler
