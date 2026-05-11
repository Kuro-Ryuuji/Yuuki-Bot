/**
 * Elaina-MD — https://github.com/OmmniDevv/Elaina-MD
 * Script by OmmniDevv — Jangan Dijual!
 */
import axios from 'axios'

let handler = async (m, { usedPrefix, command, args }) => {
  const domain = args[0]
  if (!domain) throw `🔍 *ᴅɴs ʟᴏᴏᴋᴜᴘ*\n\nContoh: ${usedPrefix}${command} google.com`
  m.react('🔍')
  try {
    const { data } = await axios.get(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`, { timeout: 15000 })
    if (!data?.Answer?.length) throw `❌ Tidak ada record A untuk *${domain}*`
    const records = data.Answer.map(r => `  • ${r.data} (TTL: ${r.TTL}s)`).join('\n')
    m.react('✅')
    m.reply(`🔍 *ᴅɴs ʟᴏᴏᴋᴜᴘ*\n\n🌐 *Domain:* ${domain}\n📋 *Status:* ${data.Status === 0 ? 'OK' : 'Error'}\n\n📌 *Record A:*\n${records}\n\n> Powered by Google DNS`)
  } catch (e) {
    if (typeof e === 'string') throw e
    throw 'Gagal mengambil data!'
  }
}
handler.help = ['lookup <domain>']
handler.tags = ['tools']
handler.command = /^(lookup|dnslookup|nslookup)$/i
export default handler
