import fetch from 'node-fetch'

const sc = s => s.toString().toLowerCase().split('').map(c => ({a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'}[c]||c)).join('')

const MYQ = (id, t) => `https://api.myquran.com/v2/sholat/jadwal/${id}/${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,'0')}/${String(t.getDate()).padStart(2,'0')}`
const MYQ_CARI = q => `https://api.myquran.com/v2/sholat/kota/cari/${encodeURIComponent(q)}`
const ASAN = q => `https://api.ahmadsanusi.com/v1/sholat/wilayah/search?q=${encodeURIComponent(q)}`

let handler = async (m, { text, usedPrefix, command }) => {
    const daerah = text?.trim() || 'jakarta'
    const today = new Date(Date.now() + 7 * 3600 * 1000) // WIB = UTC+7

    try {
        let res = await fetch(MYQ_CARI(daerah))
        let data = await res.json()
        if (!data.status || !data.data?.length) {
            res = await fetch(ASAN(daerah))
            data = await res.json()
            if (!data.data?.length) throw `❌ ${sc('Daerah')} \`${sc(daerah)}\` ${sc('ga ketemu nih')}\n\n💡 ${sc('Coba ketik nama kab/kota yang lebih jelas senpai')}\n${sc('Contoh:')} \`${usedPrefix}${command} ${sc('yogyakarta')}\``
        }
        const kota = data.data[0]
        const idKota = kota.id || kota.kode
        const namaKota = kota.lokasi || kota.nama

        res = await fetch(MYQ(idKota, today))
        data = await res.json()
        if (!data.status) throw `⚠️ ${sc('API Kemenag sedang gangguan, coba lagi nanti')}`
        const j = data.data.jadwal

        const out = `
🕌 *${sc('JADWAL SHOLAT HARI INI')}* 🕌
📍 ${sc('Lokasi')}: \`${sc(namaKota.toUpperCase())}\`
📅 ${sc(j.tanggal)}
🌙 ${sc('Hijriah')}: \`${sc(j.date?.split('-').reverse().join('-') || '-')}\`
━━━━━━━━━━━━━━━━━━━━━━

🌌 ${sc('Imsak')}   ───  \`${sc(j.imsak)}\`
🌅 ${sc('Subuh')}   ───  \`${sc(j.subuh)}\`
☀️ ${sc('Terbit')}  ───  \`${sc(j.terbit)}\`
🌤️ ${sc('Dhuha')}   ───  \`${sc(j.dhuha)}\`
🕌 ${sc('Dzuhur')}  ───  \`${sc(j.dzuhur)}\`
🌇 ${sc('Ashar')}   ───  \`${sc(j.ashar)}\`
🌆 ${sc('Maghrib')} ───  \`${sc(j.maghrib)}\`
🌙 ${sc('Isya')}    ───  \`${sc(j.isya)}\`

━━━━━━━━━━━━━━━━━━━━━━
💡 ${sc('Cara ganti lokasi:')}
\`${usedPrefix}${command} ${sc('<nama kab/kota>')}\`
📌 ${sc('Contoh:')}
\`${usedPrefix}${command} ${sc('bantul')}\`
\`${usedPrefix}${command} ${sc('jakarta')}\`

_© ${sc('Sumber resmi: Kemenag RI Bimas Islam via MyQuran API')}_
`.trim()

        await m.reply(out)

    } catch (e) {
        console.log('[ERROR SHOLAT]', e.message)
        throw `⚠️ ${sc('Lagi error nih senpai 😭')}\n\n${sc(e.message || 'API gangguan, coba lagi beberapa menit')}`
    }
}

handler.help = ['salat <daerah>', 'sholat <daerah>', 'jadwalsholat <daerah>']
handler.tags = ['islamic']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i
handler.group = false
handler.premium = false
handler.limit = false

export default handler
