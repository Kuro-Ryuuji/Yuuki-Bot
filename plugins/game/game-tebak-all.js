// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import { getRandomItem, checkAnswerAdvanced, getProgressiveHint, createSession, setSessionTimer, getSession, endSession, hasActiveSession } from '../../lib/game-data.js'

const TIMEOUT = 90000
const REWARD_EXP = 3000

// ─── Generic tebak game factory ──────────────────────────────
function createTebakGame({ name, aliases, emoji, title, dataFile, questionField, answerField, hasImage }) {
    const dataFileName = (dataFile || name) + '.json'
    const qField = questionField || 'soal'
    const aField = answerField || 'jawaban'

    let handler = async (m, { conn, usedPrefix }) => {
        if (hasActiveSession(m.chat)) throw '⚠️ Masih ada soal yang belum terjawab! Ketik *nyerah* untuk menyerah.'
        const item = getRandomItem(dataFileName)
        if (!item) throw `❌ Data ${title} tidak tersedia!`

        const question = item[qField] || item.soal || item.pertanyaan || item.question || JSON.stringify(item)
        const answer = item[aField] || item.jawaban || item.answer

        let caption = `${emoji} *${title}*\n\n`
        if (!hasImage) caption += `${question}\n\n`
        caption += `⏱️ Timeout: *${TIMEOUT / 1000} detik*\n> Ketik *nyerah* untuk menyerah`

        let sent
        if (hasImage && item.img) {
            sent = await conn.sendFile(m.chat, item.img, 'soal.jpg', caption, m)
        } else {
            sent = await conn.reply(m.chat, caption, m)
        }

        const session = createSession(m.chat, name, { question, answer, item }, sent?.key || m.key, TIMEOUT)
        setSessionTimer(m.chat, async () => {
            await conn.reply(m.chat, `⏰ *Waktu habis!*\n\nJawabannya: *${answer}*`, sent)
        })
    }
    handler.help = [name, ...aliases]
    handler.tags = ['game']
    handler.command = new RegExp(`^(${[name, ...aliases].join('|')})$`, 'i')

    return handler
}

// ─── Answer handler (shared for all tebak games) ─────────────
// Only intercepts replies to bot messages that contain game session marker
export async function before(m) {
    if (!m.text || m.text.startsWith(m.prefix)) return true
    // Must be a reply to bot's message
    if (!m.quoted || !m.quoted.fromMe) return true
    // Only handle if quoted message contains game marker
    if (!/⏱️ Timeout|Timeout \*/.test(m.quoted.text || '')) return true

    const session = getSession(m.chat)
    if (!session) return true
    // Only handle if quoted message id matches session
    if (m.quoted.id !== session.messageKey?.id) return true

    const text = m.text.trim()

    const surrenderWords = ['nyerah', 'menyerah', 'skip', 'give up', 'gatau', 'ga tau']
    if (surrenderWords.includes(text.toLowerCase())) {
        const s = endSession(m.chat)
        await m.reply(`🏳️ Kamu menyerah!\n\nJawabannya: *${s.question.answer}*`)
        return false
    }

    const result = checkAnswerAdvanced(session.question.answer, text)
    if (result.status === 'correct') {
        endSession(m.chat)
        if (global.db?.data?.users?.[m.sender]) {
            global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + REWARD_EXP
        }
        await m.reply(`✅ *Benar!* +${REWARD_EXP} XP\n\nJawaban: *${session.question.answer}*`)
        return false
    } else if (result.status === 'close') {
        session.attempts = (session.attempts || 0) + 1
        const hint = getProgressiveHint(session.question.answer, session.attempts)
        await m.reply(`🔥 *Hampir!* Hint: \`${hint}\``)
        return false
    }

    return true
}
export const exp = 0

// ─── Register all games ───────────────────────────────────────
export const tebakBendera = createTebakGame({ name: 'tebakbendera', aliases: ['tbendera', 'flag'], emoji: '🏳️', title: 'TEBAK BENDERA', dataFile: 'tebakbendera2', answerField: 'name', hasImage: true })
export const tebakDrakor = createTebakGame({ name: 'tebakdrakor', aliases: ['drakor', 'kdrama'], emoji: '🇰🇷', title: 'TEBAK DRAKOR', hasImage: true })
export const tebakEpep = createTebakGame({ name: 'tebakepep', aliases: ['tebakff', 'tebakfreefire'], emoji: '🔫', title: 'TEBAK EPEP', hasImage: true })
export const tebakFilm = createTebakGame({ name: 'tebakfilm', aliases: ['guessmovie'], emoji: '🎬', title: 'TEBAK FILM' })
export const tebakHewan = createTebakGame({ name: 'tebakhewan', aliases: ['th', 'guessanimal'], emoji: '🐾', title: 'TEBAK HEWAN' })
export const tebakJkt48 = createTebakGame({ name: 'tebakjkt48', aliases: ['jkt48', 'jkt'], emoji: '🎀', title: 'TEBAK JKT48', hasImage: true })
export const tebakKalimat = createTebakGame({ name: 'tebakkalimat', aliases: ['tkl', 'peribahasa'], emoji: '📖', title: 'TEBAK KALIMAT' })
export const tebakKimia = createTebakGame({ name: 'tebakkimia', aliases: ['kimia', 'unsur'], emoji: '🧪', title: 'TEBAK KIMIA', questionField: 'unsur', answerField: 'lambang' })
export const tebakLagu = createTebakGame({ name: 'tebaklagu', aliases: ['tl', 'guesssong'], emoji: '🎵', title: 'TEBAK LAGU' })
export const tebakLirik = createTebakGame({ name: 'tebaklirik', aliases: [], emoji: '🎤', title: 'TEBAK LIRIK' })
export const tebakMakanan = createTebakGame({ name: 'tebakmakanan', aliases: ['makanan', 'food'], emoji: '🍲', title: 'TEBAK MAKANAN', hasImage: true })
export const tebakNegara = createTebakGame({ name: 'tebaknegara', aliases: ['tn', 'guesscountry'], emoji: '🌍', title: 'TEBAK NEGARA' })
export const tebakProfesi = createTebakGame({ name: 'tebakprofesi', aliases: ['tp', 'guessjob'], emoji: '👨‍💼', title: 'TEBAK PROFESI' })
export const tebakTebakan = createTebakGame({ name: 'tebaktebakan', aliases: ['tbt', 'receh'], emoji: '😄', title: 'TEBAK-TEBAKAN' })
export const tekaTeki = createTebakGame({ name: 'tekateki', aliases: ['teka2'], emoji: '🧩', title: 'TEKA-TEKI' })
export const asahOtak = createTebakGame({ name: 'asahotak', aliases: ['asah', 'quiz'], emoji: '🧠', title: 'ASAH OTAK' })
export const riddleGame = createTebakGame({ name: 'riddle', aliases: ['rd', 'riddles'], emoji: '❓', title: 'RIDDLE' })
export const kataAcak = createTebakGame({ name: 'kataacak', aliases: ['ka', 'acakkata'], emoji: '🔤', title: 'KATA ACAK' })

export default tebakBendera
