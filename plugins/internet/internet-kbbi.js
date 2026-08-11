import fetch from 'node-fetch'

const sc = s => s.toString().toLowerCase().split('').map(c => ({a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'}[c]||c)).join('')

const API = w => `https://kbbi-api.ruell.workers.dev/api/${w}`

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `📖 ${sc('Cara pakai')}:\n> \`${usedPrefix}${command} ${sc('<kata>')}\`\n\n💡 ${sc('Contoh')}: \`${usedPrefix}${command} ${sc('ngapain')}\` / \`${usedPrefix}${command} ${sc('cinta')}\``
    const kata = text.trim().toLowerCase()

    try {

        let cek = await (await fetch(API(`check/${encodeURIComponent(kata)}`))).json()

        if (cek.is_standard === false && cek.suggestions?.length) {
            const baku = cek.suggestions.slice(0,3).map(s => sc(s.word)).join(' / ')
            return m.reply(`📖 ${sc('KAMUS BAHASA INDONESIA')} 📖\n\n❌ ${sc('Kata tidak baku')}: \`${sc(kata)}\`\n✅ ${sc('Kata baku')}: \`${baku}\`\n\n💡 ${sc('Ketik ulang pakai kata baku untuk lihat arti lengkapnya ya senpai~')}`)
        }

        let data = await (await fetch(API(`lookup/${encodeURIComponent(kata)}`))).json()
        if (!data.exists || !data.data?.entri?.length) {

            let sim = await (await fetch(API(`similar/${encodeURIComponent(kata)}?limit=3`))).json()
            const saran = sim.suggestions?.slice(0,3).map(s => sc(s.word)).join(', ') || '-'
            throw `❌ ${sc('Kata')} \`${sc(kata)}\` ${sc('tidak ditemukan di KBBI')}\n\n💭 ${sc('Maksudnya')}: \`${saran}\`?`
        }

        let out = `📖 ${sc('KBBI DARING')} 📖\n📌 ${sc('Kata')}: \`${sc(kata.toUpperCase())}\`\n━━━━━━━━━━━━━━━━\n\n`
        let no = 1
        for (const e of data.data.entri) {
            out += `🔹 *${sc(e.nama || kata)}*\n`
            for (const makna of e.makna || []) out += `${no++}. ${sc(makna)}\n`
            out += `\n`
        }
        out += `━━━━━━━━━━━━━━━━\n_© ${sc('Sumber: KBBI Kemdikbudristek')}_`
        m.reply(out)

    } catch (e) {
        throw `⚠️ ${sc('Lagi error nih senpai 😭')}\n\n${sc(e.message || 'API gangguan, coba lagi nanti')}`
    }
}

handler.help = ['kbbi <kata>']
handler.tags = ['internet', 'tools']
handler.command = /^kbbi|kamus|arti$/i
handler.limit = false
export default handler
