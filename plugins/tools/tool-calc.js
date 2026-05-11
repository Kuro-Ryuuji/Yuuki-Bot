// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
let handler = async (m, { conn, text }) => {
  let id = m.chat
  if (!text) throw 'Masukkan ekspresi matematika'
  
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('Hmmm...ngecheat?')
  }
  
  // Security: More restrictive input sanitization
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe().]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*/g, '×')
  
  try {
    // Security: Validate expression before evaluation
    if (!val || val.length > 100) throw 'Ekspresi terlalu panjang atau kosong'
    if (/[a-zA-Z]/.test(val.replace(/Math\.(PI|E)/g, ''))) throw 'Karakter tidak diizinkan'
    
    console.log(val)
    let result = (new Function('return ' + val))()
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw 'Hasil perhitungan tidak valid'
    }
    
    m.reply(`*${format}* = _${result}_`)
  } catch (e) {
    if (e == undefined) throw 'Isinya?'
    throw 'Format salah, hanya 0-9 dan Simbol -, +, *, /, ×, ÷, π, e, (, ) yang disupport'
  }
}
handler.help = ['calc <expression>']
handler.tags = ['tools']
handler.command = /^(calc(ulat(e|or))?|kalk(ulator)?)$/i
handler.exp = 5

export default handler