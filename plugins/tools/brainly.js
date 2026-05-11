// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import { Brainly } from 'brainly-scraper-v2'
const brain = new Brainly('id')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Soalnya mana?\n\nContoh:\n${usedPrefix + command} apa itu javascript?`)

    try {
        const res = await brain.search(text, 'id')
        if (!res || !res.length) throw 'Tidak ada jawaban ditemukan'

        const answer = res.slice(0, 3).map(({ question, answers }, i) =>
            `_*PERTANYAAN KE ${i + 1}*_\n${question.content}\n${
                answers.slice(0, 2).map((a, j) =>
                    `*JAWABAN KE ${j + 1}*${a.isBest ? ' ✅' : ''}\n${
                        a.content.replace(/<[^>]+>/g, '').trim()
                    }`
                ).join('\n')
            }`
        ).join('\n\n•------------•\n\n')

        m.reply(answer)
    } catch (e) {
        m.reply('Gagal mengambil data Brainly: ' + (e.message || e))
    }
}

handler.help = ['brainly <soal>']
handler.tags = ['internet']
handler.command = /^brainly$/i
handler.limit = true

export default handler
