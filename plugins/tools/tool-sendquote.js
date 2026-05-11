// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
async function handler(m) {
    if (!m.quoted) throw 'reply pesan!'
    let q = await m.getQuotedObj()
    if (!q.quoted) throw 'pesan yang anda reply tidak mengandung reply!'
    await q.quoted.copyNForward(m.chat, true)
}
handler.command = /^q$/i

export default handler