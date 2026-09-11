/**
 * Mention helpers for WhatsApp JIDs.
 *
 * Newer WhatsApp sessions often give participants as `@lid` instead of
 * `number@s.whatsapp.net`. Printing that LID (or running it through a
 * phone parser with a US default) shows up as "+1 8123..." or the raw
 * WhatsApp id. These helpers pick a real phone number when possible
 * and never format local 8xxxx numbers as +1.
 */

function onlyDigits(value) {
    return String(value || '').split('@')[0].replace(/\D/g, '')
}

function isLid(value) {
    return String(value || '').toLowerCase().includes('@lid')
}

function isPnJid(value) {
    return String(value || '').toLowerCase().includes('@s.whatsapp.net')
}

/**
 * Indonesian / local numbers that are missing the country code.
 * 0812... → 62812...
 * 812...  → 62812...
 */
export function normalizePhoneDigits(digits) {
    let n = onlyDigits(digits)
    if (!n) return ''

    if (n.startsWith('00')) n = n.slice(2)
    if (n.startsWith('0')) n = '62' + n.slice(1)
    else if (/^8\d{7,12}$/.test(n)) n = '62' + n

    return n
}

function looksLikePhone(digits) {
    const n = onlyDigits(digits)
    if (n.length < 8 || n.length > 15) return false
    if (n.startsWith('62') && n.length >= 10 && n.length <= 15) return true
    if (n.startsWith('0') && n.length >= 9 && n.length <= 14) return true
    if (/^8\d{7,12}$/.test(n)) return true
    // Other country codes, but reject very long LID-like ids.
    if (n.length >= 9 && n.length <= 13) return true
    return false
}

function collectSources(jidOrParticipant, extra = {}) {
    const participant = jidOrParticipant && typeof jidOrParticipant === 'object' && jidOrParticipant.id
        ? jidOrParticipant
        : extra.participant || null

    const rawJid = participant
        ? (participant.id || '')
        : String(jidOrParticipant || extra.jid || '')

    return {
        participant,
        rawJid,
        candidates: [
            extra.phoneNumber,
            extra.jid,
            participant?.phoneNumber,
            participant?.jid,
            participant?.pn,
            isPnJid(rawJid) ? rawJid : '',
            rawJid
        ].filter(Boolean).map(String)
    }
}

export function getPhoneDigits(jidOrParticipant, extra = {}) {
    const { candidates } = collectSources(jidOrParticipant, extra)

    for (const src of candidates) {
        if (isLid(src)) continue
        const digits = onlyDigits(src)
        if (looksLikePhone(digits)) return normalizePhoneDigits(digits)
    }

    return ''
}

export function toMentionJid(jidOrParticipant, extra = {}) {
    const { participant, rawJid } = collectSources(jidOrParticipant, extra)
    const id = String(participant?.id || rawJid || '')
    return id
}

/**
 * Text token used in the message body.
 * Prefers @62812... never @lid, never +1 812..., never full JID.
 */
export function mentionText(jidOrParticipant, extra = {}) {
    const digits = getPhoneDigits(jidOrParticipant, extra)
    if (digits) return '@' + digits

    const name = extra.name || extra.pushName || extra.notify || ''
    const clean = String(name).trim().replace(/\s+/g, '')
    if (clean) return '@' + clean

    return '@user'
}

export function mentionPair(jidOrParticipant, extra = {}) {
    return {
        text: mentionText(jidOrParticipant, extra),
        jid: toMentionJid(jidOrParticipant, extra)
    }
}

export function formatDisplayNumber(jidOrParticipant, extra = {}) {
    const digits = getPhoneDigits(jidOrParticipant, extra)
    if (!digits) return ''
    if (digits.startsWith('62') && digits.length >= 11) {
        return '0' + digits.slice(2)
    }
    return digits
}
