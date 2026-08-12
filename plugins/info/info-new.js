import axios from 'axios'

// ─── Blue Archive Character ───────────────────────────────────
function findBaChar(input, urls) {
    const clean = input.toLowerCase().replace(/\s+/g, '_')
    if (urls.includes(clean)) return clean
    const words = clean.split('_')
    return urls.find(url => words.every(w => url.toLowerCase().includes(w))) || null
}

let handlerBaChar = async (m, { conn, text }) => {
    if (!text) throw `🎮 *ʙʟᴜᴇ ᴀʀᴄʜɪᴠᴇ ᴄʜᴀʀ*\n\n> Contoh: \`${m.prefix}bachar shiroko\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const list = await axios.get('https://api.dotgg.gg/bluearchive/characters', { timeout: 15000 }).then(r => r.data).catch(() => null)
    if (!list) throw '❌ Gagal mengambil data Blue Archive'
    const urls = list.map(c => c.url)
    const foundUrl = findBaChar(text, urls)
    if (!foundUrl) {
        const suggest = urls.filter(u => u.includes(text.toLowerCase().split(' ')[0])).slice(0, 5)
        throw `❌ Character tidak ditemukan\n> Mungkin: ${suggest.join(', ') || '-'}`
    }
    const char = await axios.get(`https://api.dotgg.gg/bluearchive/characters/${foundUrl}`, { timeout: 15000 }).then(r => r.data).catch(() => null)
    if (!char) throw '❌ Gagal mengambil detail character'
    const img = char.img ? 'https://images.dotgg.gg/bluearchive/characters/' + char.img : null
    let caption = `🎮 *${char.name?.toUpperCase()}*\n\n`
    if (char.bio) caption += `> ${char.bio.substring(0, 200)}${char.bio.length > 200 ? '...' : ''}\n\n`
    caption += `╭┈┈⬡「 📋 *ᴘʀᴏꜰɪʟᴇ* 」\n`
    if (char.profile?.age) caption += `┃ 🎂 Age: *${char.profile.age}*\n`
    if (char.profile?.height) caption += `┃ 📏 Height: *${char.profile.height}*\n`
    if (char.profile?.school) caption += `┃ 🏫 School: *${char.profile.school}*\n`
    if (char.profile?.club) caption += `┃ 🎯 Club: *${char.profile.club}*\n`
    caption += `╰┈┈┈┈┈┈┈┈⬡\n\n`
    caption += `╭┈┈⬡「 ⚔️ *ʙᴀᴛᴛʟᴇ* 」\n`
    if (char.type) caption += `┃ 🏷️ Type: *${char.type}*\n`
    if (char.role) caption += `┃ 🎭 Role: *${char.role}*\n`
    if (char.profile?.weaponType) caption += `┃ 🔫 Weapon: *${char.profile.weaponType}*\n`
    caption += `╰┈┈┈┈┈┈┈┈⬡`
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    if (img) await conn.sendMessage(m.chat, { image: { url: img }, caption }, { quoted: m })
    else await m.reply(caption)
}
handlerBaChar.help = ['bachar <nama>']
handlerBaChar.tags = ['info']
handlerBaChar.command = /^(bachar|bluearchivechar|bluechar)$/i
export { handlerBaChar }

// ─── Build ML ─────────────────────────────────────────────────
let handlerBuildML = async (m, { conn, text }) => {
    if (!text) throw `⚔️ *ʙᴜɪʟᴅ ᴍʟ*\n\n> Contoh: \`${m.prefix}buildml gusion\``
    conn.sendMessage(m.chat, { react: { text: '🕕', key: m.key } })
    const res = await axios.get(`https://api.apocalypse.web.id/search/buildml?hero=${encodeURIComponent(text)}`, { timeout: 20000 }).catch(() => null)
    const heroes = res?.data?.builds
    if (!heroes?.length) throw `❌ Build tidak ditemukan untuk: ${text}`
    const pick = heroes[Math.floor(Math.random() * heroes.length)]
    const items = pick.items?.map(v =>
        `*${v.name}* (${v.type})\n💵 ${v.price}\n${v.passive_description ? `> ${v.passive_description.substring(0, 80)}` : ''}`
    ).join('\n\n') || '-'
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    await m.reply(`⚔️ *BUILD ${text.toUpperCase()}*\n\n🍯 *${pick.title}*\n\n${items}`)
}
handlerBuildML.help = ['buildml <hero>']
handlerBuildML.tags = ['info']
handlerBuildML.command = /^(buildml|mlbuild|herobuild)$/i
export { handlerBuildML }

export default handlerBaChar
