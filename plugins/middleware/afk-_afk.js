export function before(m) {
    // Helper durasi AFK (biar ga keluar format aneh)
    const durasi = (ms) => {
        const d = Math.floor(ms / 86400000), h = Math.floor((ms % 86400000) / 3600000)
        const mi = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000)
        return [d && d + ' hari', h && h + ' jam', mi && mi + ' menit', s && s + ' detik'].filter(Boolean).join(' ') || 'baru saja'
    }

    let user = global.db.data.users[m.sender]
    if (user && user.afk > -1) {
        conn.sendButtonDoc(m.chat, `
Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${durasi(new Date - user.afk)}
`, wm, 'Alooww senpai', 'Ya', m, {
            ...fakeig,
            // ✅ WAJIB ADA INI, biar WA tau siapa yang baru berhenti AFK
            mentions: [m.sender],
            contextInfo: { mentionedJid: [m.sender] }
        })
        user.afk = -1
        user.afkReason = ''
    }

    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user) continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0) continue
        let reason = user.afkReason || ''

        // ✅ 1. UBAH TEKSNYA: HARUS ADA @NOMORNYA (bukan cuma "dia")
        // ✅ 2. TAMBAHKAN mentions DI PARAMETER TERAKHIR (INILAH KUNCI UTAMANYA!)
        conn.sendButtonDoc(m.chat, `
Jangan tag @${jid.split('@')[0]}!
Dia lagi AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
Selama ${durasi(new Date - afkTime)}
`, wm, 'Sabar senpai, nanti dia juga on lagi kok', 'Ya', m, {
            ...fakeig,
            // 🔥 INI YANG HILANG DARI KODE LAMAMU — WAJIB ADA!
            mentions: [jid],
            contextInfo: { mentionedJid: [jid] }
        })
    }
    return true
}
