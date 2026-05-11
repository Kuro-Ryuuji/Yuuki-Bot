// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
export async function all(m) {
    if (!m.message)
        return
    this.spam = this.spam ? this.spam : {}
    const ts = typeof m.messageTimestamp?.toNumber === 'function'
        ? m.messageTimestamp.toNumber()
        : Number(m.messageTimestamp || 0)
    if (m.sender in this.spam) {
        this.spam[m.sender].count++
        if (ts - this.spam[m.sender].lastspam > 10) {
            if (this.spam[m.sender].count > 10) {
                //global.db.data.users[m.sender].banned = true
                m.reply('*Jangan Spam!!*')
            }
            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = ts
        }
    }
    else
        this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
}