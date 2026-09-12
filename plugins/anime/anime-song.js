import fetch from 'node-fetch'

const API = 'https://api.animethemes.moe'
const MAL = 'https://api.jikan.moe/v4'
const MAX_AUDIO = 4

async function getJson(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Yuuki-MD/anime-song',
      Accept: 'application/json'
    },
    timeout: 20000
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return await res.json()
}

function pickCover(images = []) {
  const large = images.find(i => /large/i.test(i.facet || ''))
  const small = images.find(i => /cover/i.test(i.facet || ''))
  return large?.link || small?.link || images[0]?.link || ''
}

function ytLink(title, artist, anime) {
  const q = [title, artist, anime, 'official'].filter(Boolean).join(' ')
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
}

function flattenThemes(animethemes = [], animeName = '', animeSlug = '') {
  const list = []
  for (const theme of animethemes) {
    const type = String(theme.type || '').toUpperCase() === 'ED' ? 'ED' : 'OP'
    const seq = Number(theme.sequence || 1)
    const song = theme.song || {}
    const artists = (song.artists || []).map(a => a.name).filter(Boolean)
    let audio = ''
    let video = ''
    for (const entry of theme.animethemeentries || []) {
      for (const vid of entry.videos || []) {
        if (!video && vid.link) video = vid.link
        if (!audio && vid.audio?.link) audio = vid.audio.link
      }
    }
    const title = song.title || theme.slug || `${type}${seq}`
    list.push({
      type,
      seq,
      slug: theme.slug || `${type}${seq}`,
      title,
      artists,
      composer: artists.join(', ') || 'Tidak diketahui',
      audio,
      video,
      youtube: ytLink(title, artists[0] || '', animeName),
      page: animeSlug ? `https://animethemes.moe/anime/${animeSlug}` : 'https://animethemes.moe'
    })
  }
  const rank = { OP: 0, ED: 1 }
  list.sort((a, b) => (rank[a.type] - rank[b.type]) || (a.seq - b.seq))
  return list
}

function scoreName(name, q) {
  const a = String(name || '').toLowerCase()
  const b = String(q || '').toLowerCase()
  if (a === b) return 100
  if (a.startsWith(b)) return 80
  if (a.includes(b)) return 60
  return 0
}

async function searchAnimeThemes(q) {
  const include = [
    'images',
    'animethemes.song.artists',
    'animethemes.animethemeentries.videos.audio'
  ].join(',')
  const data = await getJson(
    `${API}/anime?q=${encodeURIComponent(q)}&include=${include}&page[size]=8`
  )
  const arr = data.anime || data.data || []
  if (!arr.length) return null
  arr.sort((x, y) => scoreName(y.name, q) - scoreName(x.name, q))
  return arr[0]
}

async function fallbackJikan(q) {
  const search = await getJson(`${MAL}/anime?q=${encodeURIComponent(q)}&limit=1`)
  const anime = search.data?.[0]
  if (!anime) return null
  const themes = await getJson(`${MAL}/anime/${anime.mal_id}/themes`).catch(() => ({ data: {} }))

  const parseLine = (line, type, i) => {
    const raw = String(line)
    const m = raw.match(/^(?:\d+:\s*)?(.+?)(?:\s+by\s+(.+))?$/i)
    const title = (m?.[1] || raw).trim()
    const artists = m?.[2] ? [m[2].trim()] : []
    return {
      type,
      seq: i + 1,
      slug: `${type}${i + 1}`,
      title,
      artists,
      composer: artists.join(', ') || 'Tidak diketahui',
      audio: '',
      video: '',
      youtube: ytLink(title, artists[0] || '', anime.title),
      page: anime.url
    }
  }

  return {
    name: anime.title,
    slug: '',
    year: anime.year,
    mal: anime.url,
    cover: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '',
    themes: [
      ...(themes.data?.openings || []).map((l, i) => parseLine(l, 'OP', i)),
      ...(themes.data?.endings || []).map((l, i) => parseLine(l, 'ED', i))
    ]
  }
}

async function youtubeAudio(title, artist, anime) {
  try {
    const yts = (await import('yt-search')).default
    const r = await yts(`${title} ${artist || ''} ${anime} opening ending official`)
    const vid = r?.videos?.[0]
    if (!vid?.url) return null
    return { url: vid.url, title: vid.title }
  } catch {
    return null
  }
}

function formatCaption(anime, themes) {
  const ops = themes.filter(t => t.type === 'OP')
  const eds = themes.filter(t => t.type === 'ED')
  const block = (arr, label) => {
    if (!arr.length) return `*${label}*\nTidak ada data`
    return `*${label}*\n` + arr.map(t => {
      const link = t.audio || t.video || t.youtube
      return `${t.slug}. ${t.title}\n   Pencipta / artis: ${t.composer}\n   ${link}`
    }).join('\n\n')
  }
  return `🎵 *ANIME SONG*
📚 ${anime.name}${anime.year ? ` (${anime.year})` : ''}

${block(ops, 'Opening')}

${block(eds, 'Ending')}

🔗 ${anime.slug ? `https://animethemes.moe/anime/${anime.slug}` : 'https://animethemes.moe'}
${anime.mal ? `🔗 ${anime.mal}` : ''}`.trim()
}

async function sendAudio(conn, m, theme) {
  if (theme.audio) {
    try {
      await conn.sendMessage(m.chat, {
        audio: { url: theme.audio },
        mimetype: 'audio/ogg',
        fileName: `${theme.slug}-${theme.title}.ogg`,
        ptt: false
      }, { quoted: m })
      return true
    } catch {
      await conn.sendMessage(m.chat, {
        document: { url: theme.audio },
        mimetype: 'audio/ogg',
        fileName: `${theme.slug}-${theme.title}.ogg`,
        caption: `${theme.slug} — ${theme.title}`
      }, { quoted: m }).catch(() => {})
      return true
    }
  }
  return false
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `Masukkan judul anime!\n\nContoh:\n${usedPrefix}animesong Boruto\n${usedPrefix}song One Piece\n${usedPrefix}anms Naruto`
  }

  const query = text.trim()
  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } }).catch(() => {})

  let anime = null
  let themes = []

  try {
    const found = await searchAnimeThemes(query)
    if (found) {
      anime = {
        name: found.name,
        slug: found.slug,
        year: found.year,
        mal: '',
        cover: pickCover(found.images)
      }
      themes = flattenThemes(found.animethemes, found.name, found.slug)
    }
  } catch (e) {
    console.error('animethemes:', e.message)
  }

  if (!anime) {
    const fb = await fallbackJikan(query).catch(() => null)
    if (!fb) throw 'Anime tidak ditemukan. Coba judul yang lebih spesifik.'
    anime = fb
    themes = fb.themes
  }

  const caption = formatCaption(anime, themes)
  if (anime.cover) {
    await conn.sendMessage(m.chat, {
      image: { url: anime.cover },
      caption
    }, { quoted: m })
  } else {
    await conn.reply(m.chat, caption, m)
  }

  const withAudio = themes.filter(t => t.audio)
  const queue = []
  const ops = withAudio.filter(t => t.type === 'OP')
  const eds = withAudio.filter(t => t.type === 'ED')
  queue.push(...ops.slice(0, 2), ...eds.slice(0, 2))
  const unique = []
  const seen = new Set()
  for (const t of queue) {
    const key = t.audio || `${t.type}${t.seq}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(t)
    if (unique.length >= MAX_AUDIO) break
  }

  if (unique.length) {
    for (const t of unique) {
      await sendAudio(conn, m, t)
    }
  } else {
    const first = themes[0]
    if (first) {
      const yt = await youtubeAudio(first.title, first.artists[0], anime.name)
      if (yt) {
        await conn.reply(m.chat, `Audio file resmi tidak tersedia.\nCoba putar lewat YouTube:\n${yt.url}`, m)
      } else {
        await conn.reply(m.chat, 'Audio file tidak tersedia untuk anime ini. Pakai link di atas ya.', m)
      }
    }
  }

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }).catch(() => {})
}

handler.help = ['animesong <judul>', 'song <judul>', 'anms <judul>']
handler.tags = ['anime']
handler.command = /^(animesong|song|anms)$/i
handler.limit = true

export default handler
