import axios from 'axios'

let handler = async (m, { conn }) => {
  try {
    const res = await axios.get('https://api.deline.web.id/random/ppcouple', { timeout: 15000 })
    const { cowo, cewe } = res.data.result
    await conn.sendMessage(m.chat, {
      albumMessage: [
        { image: { url: cowo } },
        { image: { url: cewe } }
      ]
    }, { quoted: m })
  } catch (e) {
    throw '❌ Gagal mengambil gambar pp couple. Coba lagi nanti.'
  }
}

handler.help = ['ppcouple']
handler.tags = ['random']
handler.command = /^(ppcp|ppcouple|cp)$/i
export default handler
