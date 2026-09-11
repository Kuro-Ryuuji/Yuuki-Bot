const CATEGORY_ORDER = [
    'owner', 'main', 'downloader', 'sticker', 'tools', 'group',
    'ai', 'game', 'rpg', 'fun', 'xp', 'info', 'internet',
    'islamic', 'quotes', 'random', 'audio', 'anime', 'canvas'
]

const CATEGORY_EMOJIS = {
    owner: '👑',
    main: '🏠',
    downloader: '📥',
    sticker: '🖼️',
    tools: '🔧',
    group: '👥',
    ai: '🤖',
    game: '🎮',
    rpg: '⚔️',
    fun: '🎉',
    xp: '📊',
    info: 'ℹ️',
    internet: '🌐',
    islamic: '☪️',
    quotes: '💬',
    random: '🎲',
    audio: '🎵',
    anime: '🌸',
    canvas: '🎨'
}

function normalizeTags(tags) {
    const values = Array.isArray(tags) ? tags : [tags || 'main']

    return values
        .flatMap(tag => String(tag).split('|'))
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean)
}

function normalizeHelp(help) {
    const values = Array.isArray(help) ? help : (help ? [help] : [])

    return values
        .filter(value => typeof value === 'string')
        .map(value => value.trim())
        .filter(Boolean)
}

function mentionDigits(jid) {
    const raw = String(jid || '').split('@')[0].replace(/\D/g, '')
    if (!raw) return 'user'
    if (raw.startsWith('0')) return '62' + raw.slice(1)
    if (/^8\d{7,12}$/.test(raw)) return '62' + raw
    if (String(jid || '').includes('@lid') && (raw.length < 8 || raw.length > 15)) return 'user'
    return raw
}

/**
 * Build the menu from the same metadata used by handler.js.
 *
 * Plugins without handler.help are skipped on purpose (hooks / middleware).
 */
export function buildCommandMap(plugins = global.plugins || {}) {
    const map = {}

    for (const plugin of Object.values(plugins)) {
        if (!plugin || plugin.disabled) continue

        const helps = normalizeHelp(plugin.help)
        if (!helps.length) continue

        const commandInfo = {
            owner: !!plugin.owner,
            premium: !!plugin.premium,
            limit: !!plugin.limit
        }

        for (const tag of normalizeTags(plugin.tags)) {
            if (!map[tag]) map[tag] = new Map()

            for (const name of helps) {
                const key = name.toLowerCase()
                const previous = map[tag].get(key)

                map[tag].set(key, previous ? {
                    name: previous.name,
                    owner: previous.owner || commandInfo.owner,
                    premium: previous.premium || commandInfo.premium,
                    limit: previous.limit || commandInfo.limit
                } : {
                    name,
                    ...commandInfo
                })
            }
        }
    }

    return Object.fromEntries(
        Object.entries(map).map(([tag, commands]) => [tag, [...commands.values()]])
    )
}

function getVisibleCommandMap(commandMap, isOwner) {
    return Object.fromEntries(
        Object.entries(commandMap)
            .map(([tag, commands]) => [
                tag,
                tag === 'owner' && !isOwner ? [] : commands
            ])
            .filter(([tag, commands]) => commands.length > 0 && tag !== 'nsfw')
    )
}

function getOrderedTags(commandMap) {
    return [...new Set([...CATEGORY_ORDER, ...Object.keys(commandMap)])]
        .filter(tag => tag !== 'nsfw')
}

async function readThumbnails() {
    let thumbBuffer = null
    let thumbSmall = null

    try {
        const { readFileSync } = await import('fs')
        const thumbnailPath = global.thumbAllmenu || global.thumb2 || global.thumb
        if (!thumbnailPath) return { thumbBuffer, thumbSmall }
        thumbBuffer = readFileSync(thumbnailPath)
    } catch {
        return { thumbBuffer, thumbSmall }
    }

    try {
        const sharp = (await import('sharp')).default
        thumbSmall = await sharp(thumbBuffer)
            .resize(300, 300, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer()
    } catch {
        thumbSmall = thumbBuffer
    }

    return { thumbBuffer, thumbSmall }
}

function makeQuotedMessage(thumbnail, totalCmds, namebot, nomorbot) {
    const seller = nomorbot
        ? `${String(nomorbot).replace(/[^0-9]/g, '')}@s.whatsapp.net`
        : '0@s.whatsapp.net'

    return {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
        },
        message: {
            orderMessage: {
                orderId: '1337',
                thumbnail: thumbnail || null,
                itemCount: totalCmds,
                status: 'INQUIRY',
                surface: 'CATALOG',
                message: `${namebot} — ${totalCmds} Commands`,
                orderTitle: `📋 ${totalCmds} Commands`,
                sellerJid: seller,
                token: 'yuuki-allmenu',
                totalAmount1000: 0,
                totalCurrencyCode: 'IDR',
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 9999,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363208449943317@newsletter',
                        newsletterName: namebot,
                        serverMessageId: 127
                    }
                }
            }
        }
    }
}

const handler = async (m, { conn, usedPrefix, isOwner }) => {
    const namebot = global.namebot || 'Yuuki BOT'
    const credit = global.wmcredit || 'github.com/Kuro-Ryuuji/Yuuki-Bot'
    const sender = m.sender || ''
    const mentionId = mentionDigits(sender)
    const prefix = usedPrefix || global.prefix || '.'

    const commandMap = getVisibleCommandMap(buildCommandMap(), !!isOwner)
    const totalCmds = Object.values(commandMap)
        .reduce((total, commands) => total + commands.length, 0)

    let body = `Hai *@${mentionId}* 🪸\n\n`
    body += `╭─〔 📖 \`ᴋᴇᴛᴇʀᴀɴɢᴀɴ\` 〕─⬣\n`
    body += `│ ✦ *Ⓞ = Owner Only*\n`
    body += `│ ✦ *ⓟ = Premium Only*\n`
    body += `│ ✦ *Ⓛ = Limit Required*\n`
    body += `╰─⬣\n\n`

    for (const tag of getOrderedTags(commandMap)) {
        const commands = commandMap[tag]
        if (!commands?.length) continue

        const emoji = CATEGORY_EMOJIS[tag] || '📁'
        body += `╭─〔 ${emoji} \`${tag.toUpperCase()}\` 〕─⬣\n`

        for (const command of commands) {
            const symbols = [
                command.owner ? 'Ⓞ' : '',
                command.premium ? 'ⓟ' : '',
                command.limit ? 'Ⓛ' : ''
            ].filter(Boolean).join(' ')

            body += `│ ✦ *${prefix}${command.name}*`
            body += symbols ? ` ${symbols}` : ''
            body += '\n'
        }

        body += `╰─⬣\n\n`
    }

    body += `_© ${namebot} | ${credit}_`

    const { thumbBuffer, thumbSmall } = await readThumbnails()
    const quoted = makeQuotedMessage(
        thumbSmall || thumbBuffer,
        totalCmds,
        namebot,
        global.nomorbot
    )

    const externalAdReply = {
        title: namebot,
        body: `${totalCmds} Commands`,
        mediaType: 1,
        renderLargerThumbnail: true,
        ...(thumbBuffer ? { thumbnail: thumbBuffer } : {})
    }

    await conn.sendMessage(
        m.chat,
        {
            text: body,
            contextInfo: {
                mentionedJid: sender ? [sender] : [],
                forwardingScore: 9,
                isForwarded: true,
                externalAdReply
            }
        },
        { quoted }
    )
}

handler.help = ['allmenu', 'fullmenu', 'am']
handler.tags = ['main']
handler.command = /^(allmenu|fullmenu|am|semua)$/i
handler.owner = false
handler.premium = false

export default handler
    const extraTags = Object.keys(cmdMap).filter(t => !CATEGORY_ORDER.includes(t))
    const allTags = [...CATEGORY_ORDER, ...extraTags]

    let body = `Hai *@${m.sender.split('@')[0]}* 🪸\n\n`
    body += `╭─〔 📖 \`ᴋᴇᴛᴇʀᴀɴɢᴀɴ\` 〕─⬣\n│ ✦ *Ⓞ = Owner Only*\n│ ✦ *ⓟ = Premium Only*\n│ ✦ *Ⓛ = Limit Required*\n╰─⬣\n\n`

    for (const tag of allTags) {
        const cmds = cmdMap[tag]
        if (!cmds || cmds.length === 0) continue
        if (tag === 'owner' && !isOwner) continue
        const emoji = CATEGORY_EMOJIS[tag] || '📁'
        body += `╭─〔 ${emoji} \`${tag.toUpperCase()}\` 〕─⬣\n`
        for (const cmd of cmds) {
            const sym = [cmd.owner ? 'Ⓞ' : '', cmd.premium ? 'ⓟ' : '', cmd.limit ? 'Ⓛ' : ''].filter(Boolean).join(' ')
            body += `│ ✦ *${usedPrefix}${cmd.name}*${sym ? ' ' + sym : ''}\n`
        }
        body += `╰─⬣\n\n`
    }
    body += `_© ${global.namebot} | ${global.wmcredit}_`

    let thumbBuffer = null
    try {
        const { readFileSync } = await import('fs')
        thumbBuffer = readFileSync(global.thumbAllmenu || global.thumb2 || global.thumb)
    } catch { }

    let thumbSmall = thumbBuffer
    if (thumbBuffer) {
        try {
            const sharp = (await import('sharp')).default
            thumbSmall = await sharp(thumbBuffer).resize(300, 300, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer()
        } catch { thumbSmall = thumbBuffer }
    }

    const ftroliQuoted = {
        key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
        message: {
            orderMessage: {
                orderId: '1337',
                thumbnail: thumbSmall || null,
                itemCount: totalCmds,
                status: 'INQUIRY',
                surface: 'CATALOG',
                message: `${global.namebot} — ${totalCmds} Commands`,
                orderTitle: `📋 ${totalCmds} Commands`,
                sellerJid: `${global.nomorbot}@s.whatsapp.net`,
                token: 'elaina-allmenu',
                totalAmount1000: 0,
                totalCurrencyCode: 'IDR',
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 9999,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363208449943317@newsletter',
                        newsletterName: global.namebot,
                        serverMessageId: 127
                    }
                }
            }
        }
    }

    const contextInfo = {
        mentionedJid: [m.sender],
        forwardingScore: 9,
        isForwarded: true,
        externalAdReply: {
            title: global.namebot,
            body: `${totalCmds} Commands`,
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: thumbBuffer
        }
    }

    await conn.sendMessage(m.chat, { text: body, contextInfo }, { quoted: ftroliQuoted })
}

handler.help = ['allmenu', 'fullmenu', 'am']
handler.tags = ['main']
handler.command = /^(allmenu|fullmenu|am|semua)$/i
handler.owner = false
handler.premium = false

export default handler
