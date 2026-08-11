const delay = (time) => new Promise((res) => setTimeout(res, time))

export async function before(m) {
  this.judipvp = this.judipvp ? this.judipvp : {}
  let room = Object.values(this.judipvp).find(room => room.id.startsWith('judipvp') && room.status && [room.p, room.p2].includes(m.sender))
  let user = global.db.data.users
  let score = Math.ceil(Math.random() * 100)
  let score2 = Math.ceil(Math.random() * 100)

  if (room) {
    if (m.sender === room.p2 && /y(a|es)?/i.test(m.text.toLowerCase()) && m.isGroup && room.status === 'wait') {
      if (/n(o)?|tidak/i.test(m.text.toLowerCase())) {
        this.reply(m.chat, `@${room.p2.split('@')[0]} menolak judipvp, judipvp dibatalkan`, m, { mentions: [room.p2] })
        delete this.judipvp[room.id]
        return true
      }
      if (user[room.p2][room.type] < room.taruhan) return m.reply(`Uang kamu kurang! Butuh ${room.taruhan} ${room.type}`)
      if (user[room.p][room.type] < room.taruhan) return m.reply(`Uang lawan kurang! Butuh ${room.taruhan} ${room.type}`)
      clearTimeout(room.waktu)
      room.status = 'spin'
      room.asal = m.chat
      room.spin = room.p
      await this.reply(room.asal, `Silahkan spin @${room.p.split('@')[0]}\n\nKetik *spin* atau *judi*`, m, { mentions: [room.p] })
      room.waktu = setTimeout(() => {
        this.reply(m.chat, `⏰ Waktu habis @${room.spin.split('@')[0]}`, m, { mentions: [room.spin] })
        delete this.judipvp[room.id]
      }, 60000)
    } else if (room.status === 'spin' && /spin|judi/i.test(m.text)) {
      if (m.sender !== room.spin) return m.reply('Bukan giliran kamu')
      if (user[room.spin][room.type] < room.taruhan) return m.reply(`Uang kamu kurang! Butuh ${room.taruhan} ${room.type}`)
      if (user[room.p2][room.type] < room.taruhan) return m.reply(`Uang lawan kurang! Butuh ${room.taruhan} ${room.type}`)
      clearTimeout(room.waktu)
      room.score = score
      room.status = 'spinp'
      room.spin = room.p2
      room.waktu = setTimeout(() => {
        this.reply(m.chat, `⏰ Waktu habis @${room.spin.split('@')[0]}`, m, { mentions: [room.spin] })
        delete this.judipvp[room.id]
      }, 60000)
      this.reply(room.asal, `@${m.sender.split('@')[0]} dapat score *${score}*\nGiliran @${room.p2.split('@')[0]}\n\nKetik *spin* atau *judi*`, m, { mentions: [room.p, room.p2] })
    } else if (room.status === 'spinp' && /spin|judi/i.test(m.text)) {
      if (m.sender !== room.spin) return m.reply('Bukan giliran kamu')
      if (user[room.spin][room.type] < room.taruhan) return m.reply(`Uang kamu kurang! Butuh ${room.taruhan} ${room.type}`)
      if (user[room.p][room.type] < room.taruhan) return m.reply(`Uang lawan kurang! Butuh ${room.taruhan} ${room.type}`)
      clearTimeout(room.waktu)
      
      if (room.score < score2) {
        user[room.p2][room.type] += room.taruhan
        user[room.p][room.type] -= room.taruhan
        room.win = room.p2
      } else if (room.score > score2) {
        user[room.p2][room.type] -= room.taruhan
        user[room.p][room.type] += room.taruhan
        room.win = room.p
      } else {
        room.win = 'draw'
      }
      
      this.reply(room.asal, `
🎲 *HASIL JUDI PVP*

👤 @${room.p.split('@')[0]}: *${room.score}*
👤 @${room.p2.split('@')[0]}: *${score2}*

${room.win !== 'draw' ? `🏆 Pemenang: @${room.win.split('@')[0]}\n💰 Hadiah: ${room.taruhan} ${room.type}` : `🤝 Draw! Masing-masing dapat ${room.taruhan} ${room.type}`}
`.trim(), m, { mentions: [room.p, room.p2] })
      delete this.judipvp[room.id]
    }
    return true
  }
  return true
}
