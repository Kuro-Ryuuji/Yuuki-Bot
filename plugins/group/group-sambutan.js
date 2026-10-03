import { Canvas, loadImage, FontLibrary } from 'skia-canvas'
import fs from 'fs'
import path from 'path'

const W = 1280
const H = 720
const CACHE_DIR = path.join(process.cwd(), 'tmp', 'sambutan-bg')

const BACKGROUNDS = {
  kurumi: 'https://i.ibb.co.com/F4t7njVk/Tokisaki-Kurumi.jpg',
  waguri: 'https://i.ibb.co.com/vCFS446g/Kaoroko-Waguri.jpg',
  columbina: 'https://i.ibb.co.com/S47pfY8k/Columbina.jpg',
  itachi: 'https://i.ibb.co.com/dsTrfPjD/Uchiha-Itachi.jpg',
  sukuna: 'https://i.ibb.co.com/6cvwSjxn/Ryomen-Sukuna.jpg',
  ruby: 'https://i.ibb.co.com/M5Wx4Zhg/Hoshino-Ruby.jpg',
  violet: 'https://i.ibb.co.com/DgS5PcyL/Violet.jpg',
  sandrone: 'https://i.ibb.co.com/V0Lcd22w/Sandrone.jpg',
  alya: 'https://i.ibb.co.com/Lz0ybjqg/Alya-Kujou.jpg',
  masha: 'https://i.ibb.co.com/KpLnnMth/Masha.jpg',
  yagami: 'https://i.ibb.co.com/DHhwPjWr/Light-Yagami.jpg',
  zenitsu: 'https://i.ibb.co.com/rKMTmZsB/Zenitsu.jpg',
  akaza: 'https://i.ibb.co.com/V0TWj2SS/Akaza.jpg',
  tomioko: 'https://i.ibb.co.com/N6j4LB5r/Tomioko.jpg',
  saionji: 'https://i.ibb.co.com/QFTQGs9J/Sarasa-Saionji.jpg',
  komari: 'https://i.ibb.co.com/ds4nTd7R/Terakomari-Gandesblood.jpg',
  aot: 'https://i.ibb.co.com/pB7n4DkP/AOT.jpg',
  akatsuki: 'https://i.ibb.co.com/TJ8R100/Akatsuki.jpg',
  chissa: 'https://i.ibb.co.com/Wp0wTGns/Chissa.jpg',
  shadow: 'https://i.ibb.co.com/TDFBf0hM/Shadow.jpg',
  ayanokouji: 'https://i.ibb.co.com/n5Kc856/Ayanokouji-Kiyotaka.jpg',
  amasawa: 'https://i.ibb.co.com/G4F5X4mR/Amasawa-Ichika.jpg',
  ninym: 'https://i.ibb.co.com/mV8xfjzV/Ninym-Ralei.jpg',
  yuuki: 'https://i.ibb.co.com/DfXpyzg0/Yuuki.jpg',
  ichinose: 'https://i.ibb.co.com/SD9b1S9X/Ichinose-Honami.jpg'
}

const LEAVE_KEYS = [
  'itachi',
  'shadow',
  'tomioko',
  'ayanokouji',
  'akaza',
  'zenitsu',
  'akatsuki',
  'komari',
  'yagami',
  'sukuna'
]

const JOIN_KEYS = Object.keys(BACKGROUNDS).filter(k => !LEAVE_KEYS.includes(k))

const FALLBACK_PP = 'https://telegra.ph/file/2d06f0936842064f6b3bb.png'

const TEXT = {
  join: 'Yookoso senpai, semoga betah ya',
  leave: 'Sayonara senpai, hati-hati ya'
}

let fontReady = false
function ensureFont() {
  if (fontReady) return
  const candidates = [
    path.join(process.cwd(), 'assets', 'fonts', 'Epep.ttf'),
    '/usr/share/fonts/truetype/roboto/unhinted/RobotoTTF/Roboto-Bold.ttf',
    '/usr/share/fonts/truetype/lato/Lato-Bold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
  ]
  const found = candidates.filter(p => {
    try { return fs.existsSync(p) } catch { return false }
  })
  if (found.length) {
    try { FontLibrary.use('SambutanBold', found) } catch {}
  }
  fontReady = true
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatTanggal(unixSec) {
  const d = new Date((Number(unixSec) || Date.now() / 1000) * 1000)
  const wib = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
  
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).formatToParts(d)
    const day = parts.find(p => p.type === 'day')?.value || pad(wib.getDate())
    const month = parts.find(p => p.type === 'month')?.value || pad(wib.getMonth() + 1)
    const year = parts.find(p => p.type === 'year')?.value || String(wib.getFullYear()).slice(-2)
    return `${day}/${month}/${year}`
  } catch {
    return `${pad(wib.getDate())}/${pad(wib.getMonth() + 1)}/${String(wib.getFullYear()).slice(-2)}`
  }
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
    }
  })
  if (!res.ok) throw new Error(`Gagal unduh ${url} (${res.status})`)
  return Buffer.from(await res.arrayBuffer())
}

async function loadCachedImage(key, url) {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true })
  const file = path.join(CACHE_DIR, `${key}.jpg`)
  try {
    if (fs.existsSync(file) && fs.statSync(file).size > 1000) {
      return await loadImage(file)
    }
  } catch {}
  const buf = await fetchBuffer(url)
  try { fs.writeFileSync(file, buf) } catch {}
  return await loadImage(buf)
}

function drawCover(ctx, img, w, h) {
  const ir = img.width / img.height
  const cr = w / h
  let dw, dh, dx, dy
  if (ir > cr) {
    dh = h
        dw = h * ir
    dx = (w - dw) / 2
    dy = 0
  } else {
    dw = w
    dh = w / ir
    dx = 0
    dy = (h - dh) / 2
  }
  ctx.drawImage(img, dx, dy, dw, dh)
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function drawGlowCube(ctx, x, y, size) {
  
  for (let i = 18; i >= 1; i--) {
    ctx.save()
    ctx.shadowColor = `rgba(176, 38, 255, ${0.18 + i * 0.03})`
    ctx.shadowBlur = 8 + i * 3
    ctx.strokeStyle = `rgba(196, 70, 255, ${0.045 * i})`
    ctx.lineWidth = i * 1.6
    ctx.strokeRect(x, y, size, size)
    ctx.restore()
  }
  ctx.save()
  ctx.strokeStyle = '#C026FF'
  ctx.lineWidth = 8
  ctx.shadowColor = '#E879F9'
  ctx.shadowBlur = 28
  ctx.strokeRect(x, y, size, size)
  ctx.restore()

  ctx.save()
  ctx.strokeStyle = '#F5D0FE'
  ctx.lineWidth = 2.5
  ctx.strokeRect(x - 1, y - 1, size + 2, size + 2)
  ctx.restore()
}

function isUpperLetter(ch) {
  return ch.toLowerCase() !== ch.toUpperCase() && ch === ch.toUpperCase()
}

function smallCapsSize(size, ch) {
  if (/\s/.test(ch) || isUpperLetter(ch) || /[0-9]/.test(ch)) return size
  return Math.round(size * 0.72)
}

function measureSmallCaps(ctx, text, size, family) {
  let w = 0
  for (const ch of String(text)) {
    const fs = smallCapsSize(size, ch)
    ctx.font = `bold ${fs}px ${family}`
    w += ctx.measureText(/\s/.test(ch) ? ch : ch.toUpperCase()).width
  }
  return w
}

function drawSmallCaps(ctx, text, x, y, size, family) {
  let cx = x
  for (const ch of String(text)) {
    const fs = smallCapsSize(size, ch)
    const glyph = /\s/.test(ch) ? ch : ch.toUpperCase()
    ctx.font = `bold ${fs}px ${family}`
    ctx.fillText(glyph, cx, y)
    cx += ctx.measureText(glyph).width
  }
  return cx - x
}

function wrapSmallCaps(ctx, text, maxWidth, size, family, maxLines = 3) {
  const raw = String(text || '').replace(/\s+/g, ' ').trim() || '-'
  const words = raw.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (measureSmallCaps(ctx, test, size, family) <= maxWidth) {
      line = test
    } else {
      if (line) lines.push(line)
      line = word
      if (lines.length >= maxLines - 1) break
    }
  }
  if (line && lines.length < maxLines) lines.push(line)
  if (lines.length === maxLines) {
    let last = lines[maxLines - 1]
    if (measureSmallCaps(ctx, last, size, family) > maxWidth) {
      while (last.length > 1 && measureSmallCaps(ctx, last + '…', size, family) > maxWidth) {
        last = last.slice(0, -1)
      }
      lines[maxLines - 1] = last.replace(/[.,\s]+$/, '') + '…'
    }
  }
  return lines
}

function paintSmallCaps(ctx, str, x, y, size, family, color = '#FFFFFF') {
  ctx.save()
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  drawSmallCaps(ctx, str, x + 3, y + 3, size, family)
  ctx.fillStyle = color
  ctx.shadowColor = 'rgba(0,0,0,0.75)'
  ctx.shadowBlur = 10
  drawSmallCaps(ctx, str, x, y, size, family)
  ctx.restore()
}

export async function generateSambutan(opt = {}) {
  ensureFont()
  const type = opt.type === 'leave' || opt.type === 'remove' ? 'leave' : 'join'
  const keys = type === 'leave' ? LEAVE_KEYS : JOIN_KEYS
    const bgKey = keys.includes(opt.bgKey) ? opt.bgKey : pick(keys)
  const bgUrl = BACKGROUNDS[bgKey]

  const canvas = new Canvas(W, H)
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  try {
    const bg = await loadCachedImage(bgKey, bgUrl)
    drawCover(ctx, bg, W, H)
  } catch {
    const g = ctx.createLinearGradient(0, 0, W, H)
    g.addColorStop(0, type === 'join' ? '#0f2a4a' : '#3a0a0a')
    g.addColorStop(1, '#111111')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  ctx.fillStyle = type === 'join'
    ? 'rgba(147, 197, 253, 0.38)'
    : 'rgba(220, 38, 38, 0.42)'
  ctx.fillRect(0, 0, W, H)

  ctx.save()
  roundRect(ctx, 28, 28, 720, H - 56, 28)
  ctx.fillStyle = type === 'join'
    ? 'rgba(186, 230, 253, 0.28)'
    : 'rgba(127, 29, 29, 0.38)'
  ctx.fill()
  ctx.restore()

  const cubeX = 56
  const cubeY = 52
  const cube = 210

  let ppImg = null
  try {
    if (Buffer.isBuffer(opt.pp)) ppImg = await loadImage(opt.pp)
    else if (opt.pp) {
      if (/^https?:\/\//i.test(opt.pp)) ppImg = await loadImage(await fetchBuffer(opt.pp))
      else ppImg = await loadImage(opt.pp)
    }
  } catch {}
  if (!ppImg) {
    try { ppImg = await loadImage(await fetchBuffer(FALLBACK_PP)) } catch {}
  }

  if (ppImg) {
    ctx.save()
    ctx.beginPath()
    ctx.rect(cubeX, cubeY, cube, cube)
    ctx.clip()
    drawCover(ctx, ppImg, cube, cube)
    ctx.restore()
  } else {
    ctx.fillStyle = '#1f1f1f'
    ctx.fillRect(cubeX, cubeY, cube, cube)
  }
  drawGlowCube(ctx, cubeX, cubeY, cube)

  const textX = 56
  const maxW = 660
  let y = cubeY + cube + 62
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  const family = 'SambutanBold, "Liberation Sans", "Roboto", sans-serif'

  const name = String(opt.name || 'Pengguna').slice(0, 40)
  paintSmallCaps(ctx, name, textX, y, 52, family, '#FFFFFF')

  y += 48
  const bioLines = wrapSmallCaps(ctx, opt.bio || 'Tidak ada bio', maxW, 30, family, 2)
  for (const line of bioLines) {
    paintSmallCaps(ctx, line, textX, y, 30, family, '#F8FAFC')
    y += 38
  }

  y += 18
  const greet = type === 'join' ? TEXT.join : TEXT.leave
  const greetLines = wrapSmallCaps(ctx, greet, maxW, 40, family, 2)
  for (const line of greetLines) {
    paintSmallCaps(ctx, line, textX, y, 40, family, type === 'join' ? '#DBEAFE' : '#FEE2E2')
    y += 48
  }

  y += 10
  const groupLines = wrapSmallCaps(ctx, opt.group || 'Grup', maxW, 36, family, 2)
  for (const line of groupLines) {
    paintSmallCaps(ctx, line, textX, y, 36, family, '#FFFFFF')
    y += 44
  }

  y += 6
  const tgl = typeof opt.created === 'string' && opt.created.includes('/')
    ? opt.created
    : formatTanggal(opt.created)
  const creatorLine = `dibuat oleh ${opt.creator || 'Tidak diketahui'} pada ${tgl}`
  const creatorLines = wrapSmallCaps(ctx, creatorLine, maxW, 28, family, 2)
  for (const line of creatorLines) {
    paintSmallCaps(ctx, line, textX, y, 28, family, '#E2E8F0')
    y += 36
  }

  return await canvas.png
}

async function getBio(conn, jid) {
  try {
    if (typeof conn.fetchStatus === 'function') {
      const st = await conn.fetchStatus(jid)
      const bio = typeof st === 'string' ? st : (st?.status || st?.statusText || '')
      if (bio && String(bio).trim()) return String(bio).trim()
    }
  } catch {}
  return 'Tidak ada bio'
}

async function getPp(conn, jid) {
  try {
    return await conn.profilePictureUrl(jid, 'image')
  } catch {
    return FALLBACK_PP
  }
}

function ownerJid(meta) {
  return meta?.owner
    || meta?.participants?.find(p => p.admin === 'superadmin')?.id
    || meta?.participants?.find(p => p.admin)?.id
    || ''
}

function adminList(meta) {
  const list = (meta?.participants || []).filter(p => p.admin)
  const supers = list.filter(p => p.admin === 'superadmin')
  const admins = list.filter(p => p.admin !== 'superadmin')
  return [...supers, ...admins].map(p => p.id || p.jid || p.lid).filter(Boolean)
}

async function getGroupLink(conn, id) {
  try {
    const code = await conn.groupInviteCode(id)
    if (code) return `https://chat.whatsapp.com/${code}`
  } catch {}
  return 'Link tidak tersedia (bot belum jadi admin)'
}

export async function buildJoinText(conn, { id, user, meta } = {}) {
  const data = meta || await conn.groupMetadata(id).catch(() => ({})) || {}
  const desc = String(data.desc || data.descOwner && data.desc || '').trim() || 'Tidak ada deskripsi'
  const admins = adminList(data)
  const link = await getGroupLink(conn, id)
  const total = data.size || data.participants?.length || 0
  const wm = `member ke-${total || '?'}`

  const adminLines = admins.length
    ? admins.map((jid, i) => `${i + 1}. @${String(jid).split('@')[0]}`).join('\n')
    : 'Tidak ada admin'

  const text = `👋 Selamat datang @${String(user).split('@')[0]}

╭─ ❖ Deskripsi Grup
${desc}

╭─ ❖ Admin Grup
${adminLines}

╭─ ❖ Link Grup
${link}

${wm}`

  return { text, mentions: [user, ...admins] }
}

export function buildLeaveText({ user, meta } = {}) {
  const total = meta?.size || meta?.participants?.length || 0
  const text = `ada yang keluar nih min, mau dibujuk apa nggak?
@${String(user).split('@')[0]}

${total || '?'} member`
  return { text, mentions: [user] }
}

export async function sendSambutan(conn, { id, user, action } = {}) {
  const type = action === 'remove' || action === 'leave' || action === 'bye' ? 'leave' : 'join'
  const meta = await conn.groupMetadata(id).catch(() => (conn.chats?.[id] || {}).metadata || {})
  const name = await conn.getName(user).catch(() => user?.split('@')[0] || 'Pengguna')
  const group = meta?.subject || await conn.getName(id).catch(() => 'Grup')
  const owner = ownerJid(meta)
  const creator = owner
    ? await conn.getName(owner).catch(() => owner.split('@')[0])
    : 'Tidak diketahui'
  const [bio, pp] = await Promise.all([getBio(conn, user), getPp(conn, user)])

  const img = await generateSambutan({
    type,
    name,
    bio,
    group,
    creator,
    created: meta?.creation,
    pp
  })

  const caption = type === 'join'
    ? `👋 ${TEXT.join}\n@${String(user).split('@')[0]}`
    : `👋 ${TEXT.leave}\n@${String(user).split('@')[0]}`

  await conn.sendMessage(id, {
    image: img,
    caption,
    mentions: [user]
  })

  if (type === 'join') {
    const info = await buildJoinText(conn, { id, user, meta })
    await conn.sendMessage(id, {
      text: info.text,
      mentions: info.mentions
    })
  } else {
    const info = buildLeaveText({ user, meta })
    await conn.sendMessage(id, {
      text: info.text,
      mentions: info.mentions
    })
  }
  return true
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const mode = String(args[0] || '').toLowerCase()
  const isLeave = /^(leave|bye|out|keluar|remove)$/i.test(mode)
  const who = m.mentionedJid?.[0]
    || (m.quoted ? m.quoted.sender : null)
    || m.sender

  await conn.sendMessage(m.chat, { react: { text: '🎨', key: m.key } }).catch(() => {})

  const meta = m.isGroup
    ? await conn.groupMetadata(m.chat).catch(() => ({}))
    : {}
  const name = await conn.getName(who).catch(() => who.split('@')[0])
  const group = meta?.subject || (m.isGroup ? await conn.getName(m.chat) : 'Preview Grup')
  const owner = ownerJid(meta)
  const creator = owner
    ? await conn.getName(owner).catch(() => 'Ryuuxyz')
    : 'Ryuuxyz'
  const [bio, pp] = await Promise.all([getBio(conn, who), getPp(conn, who)])

  const img = await generateSambutan({
    type: isLeave ? 'leave' : 'join',
    name,
    bio,
    group,
    creator,
    created: meta?.creation || Math.floor(Date.now() / 1000),
    pp
  })

  await conn.sendMessage(m.chat, {

        image: img,
    caption: isLeave ? TEXT.leave : TEXT.join,
    mentions: [who]
  }, { quoted: m })

  if (m.isGroup) {
    const info = isLeave
      ? buildLeaveText({ user: who, meta })
      : await buildJoinText(conn, { id: m.chat, user: who, meta })
    await conn.sendMessage(m.chat, {
      text: info.text,
      mentions: info.mentions
    }, { quoted: m })
  }
}

handler.help = ['sambutan', 'sambutan leave']
handler.tags = ['group']
handler.command = /^(sambutan|welcomecard|leavecard)$/i

export default handler
export { BACKGROUNDS, JOIN_KEYS, LEAVE_KEYS, TEXT }
