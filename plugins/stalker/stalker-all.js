import axios from 'axios'

function shortNum(n) {
  n = parseInt(n) || 0
  if (n >= 1e9) return (n/1e9).toFixed(1).replace('.0','') + 'B'
  if (n >= 1e6) return (n/1e6).toFixed(1).replace('.0','') + 'M'
  if (n >= 1e3) return (n/1e3).toFixed(1).replace('.0','') + 'K'
  return n.toString()
}

// ─── Instagram Stalk ───────────────────────────────────────
let handler = async (m, { conn, args, usedPrefix, command }) => {
  const username = args[0]?.replace('@','')
  if (!username) throw `📸 *ɪɢ sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} cristiano`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const res = await axios.post('https://api.boostfluence.com/api/instagram-profile-v2',
    { username },
    { headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }
  )
  const d = res.data
  if (!d?.username) throw `❌ Akun *@${username}* ga ketemu nih`
  const caption = `📸 *ɪɴsᴛᴀɢʀᴀᴍ sᴛᴀʟᴋ*\n\n👤 *Username:* ${d.username}\n📛 *Nama:* ${d.full_name||'-'}\n✅ *Verified:* ${d.is_verified?'Ya':'Tidak'}\n🔒 *Private:* ${d.is_private?'Ya':'Tidak'}\n\n👥 *Pengikut:* ${shortNum(d.follower_count)}\n👤 *Mengikuti:* ${shortNum(d.following_count)}\n📷 *Postingan:* ${shortNum(d.media_count)}\n\n📝 *Bio:*\n${d.biography||'-'}\n\n🔗 https://instagram.com/${d.username}`
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  const pp = d.profile_pic_url_hd || d.profile_pic_url
  if (pp) await conn.sendMessage(m.chat, { image: { url: pp }, caption }, { quoted: m })
  else m.reply(caption)
}
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk|instagramstalk|stalking)$/i
export default handler

// ─── TikTok Stalk ──────────────────────────────────────────
export const tiktokStalkHandler = async (m, { conn, args, usedPrefix, command }) => {
  const username = args[0]?.replace('@','')
  if (!username) throw `🎵 *ᴛᴛ sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} mrbeast`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const res = await axios.get(`https://api.baguss.xyz/api/stalker/tiktok?username=${encodeURIComponent(username)}`, { timeout: 30000 })
  if (!res.data?.status || !res.data?.user?.user) throw `❌ Username *@${username}* ga ketemu nih`
  const u = res.data.user.user, s = res.data.user.stats
  const caption = `🎵 *ᴛɪᴋᴛᴏᴋ sᴛᴀʟᴋ*\n\n👤 *Username:* @${u.uniqueId}\n📛 *Nama:* ${u.nickname}\n✅ *Verified:* ${u.verified?'Ya':'Tidak'}\n🔒 *Private:* ${u.privateAccount?'Ya':'Tidak'}\n\n👥 *Followers:* ${shortNum(s.followerCount)}\n👤 *Following:* ${shortNum(s.followingCount)}\n❤️ *Likes:* ${shortNum(s.heartCount)}\n🎬 *Videos:* ${shortNum(s.videoCount)}\n\n📝 *Bio:*\n${u.signature||'-'}\n\n🔗 https://tiktok.com/@${u.uniqueId}`
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  await conn.sendMessage(m.chat, { image: { url: u.avatarLarger||u.avatarMedium }, caption }, { quoted: m })
}
tiktokStalkHandler.help = ['tiktokstalk <username>']
tiktokStalkHandler.tags = ['stalker']
tiktokStalkHandler.command = /^(tiktokstalk|ttstalk|stalktt)$/i

// ─── GitHub Stalk ──────────────────────────────────────────
export const githubStalkHandler = async (m, { conn, args, usedPrefix, command }) => {
  const username = args[0]?.replace('@','')
  if (!username) throw `🐙 *ɢɪᴛʜᴜʙ sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} torvalds`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const { data: d } = await axios.get(`https://api.github.com/users/${username}`, { timeout: 15000 })
  if (!d?.login) throw `❌ User *${username}* ga ketemu nih`
  const caption = `🐙 *ɢɪᴛʜᴜʙ sᴛᴀʟᴋ*\n\n👤 *Username:* ${d.login}\n📛 *Nama:* ${d.name||'-'}\n🏢 *Company:* ${d.company||'-'}\n📍 *Lokasi:* ${d.location||'-'}\n🔗 *Blog:* ${d.blog||'-'}\n\n👥 *Followers:* ${shortNum(d.followers)}\n👤 *Following:* ${shortNum(d.following)}\n📦 *Repos:* ${shortNum(d.public_repos)}\n⭐ *Gists:* ${shortNum(d.public_gists)}\n\n📝 *Bio:*\n${d.bio||'-'}\n\n🔗 ${d.html_url}`
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  if (d.avatar_url) await conn.sendMessage(m.chat, { image: { url: d.avatar_url }, caption }, { quoted: m })
  else m.reply(caption)
}
githubStalkHandler.help = ['githubstalk <username>']
githubStalkHandler.tags = ['stalker']
githubStalkHandler.command = /^(githubstalk|ghstalk)$/i

// ─── YouTube Stalk ─────────────────────────────────────────
export const ytStalkHandler = async (m, { conn, args, usedPrefix, command }) => {
  const query = args.join(' ')
  if (!query) throw `▶️ *ʏᴛ sᴛᴀʟᴋ*\n\nContoh: ${usedPrefix}${command} MrBeast`
  conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })
  const apiKey = global.APIKeys?.google || global.tenorKey
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=1`, { timeout: 15000 })
  const item = res.data?.items?.[0]
  if (!item) throw `❌ Channel ga ketemu nih`
  const ch = item.snippet
  const chId = item.id?.channelId
  const statsRes = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${chId}&key=${apiKey}`, { timeout: 15000 })
  const stats = statsRes.data?.items?.[0]?.statistics || {}
  const caption = `▶️ *ʏᴏᴜᴛᴜʙᴇ sᴛᴀʟᴋ*\n\n📛 *Nama:* ${ch.channelTitle}\n📝 *Deskripsi:* ${(ch.description||'-').slice(0,100)}\n\n👥 *Subscribers:* ${shortNum(stats.subscriberCount)}\n🎬 *Videos:* ${shortNum(stats.videoCount)}\n👁️ *Views:* ${shortNum(stats.viewCount)}\n\n🔗 https://youtube.com/channel/${chId}`
  conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  const thumb = ch.thumbnails?.high?.url || ch.thumbnails?.default?.url
  if (thumb) await conn.sendMessage(m.chat, { image: { url: thumb }, caption }, { quoted: m })
  else m.reply(caption)
}
ytStalkHandler.help = ['ytstalk <channel>']
ytStalkHandler.tags = ['stalker']
ytStalkHandler.command = /^(ytstalk|youtubestalk)$/i
