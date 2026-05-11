// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh: ${usedPrefix}${command} torvalds`

  const username = args[0]
  const headers = { 'User-Agent': 'ElainaBot/4.0', 'Accept': 'application/vnd.github.v3+json' }

  const [userRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, { headers })
  ])

  if (!userRes.ok) throw `User GitHub "${username}" tidak ditemukan!`

  const user = await userRes.json()
  const repos = repoRes.ok ? await repoRes.json() : []

  const topRepos = repos.filter(r => !r.fork).slice(0, 3)
    .map(r => `   • *${r.name}* — ⭐ ${r.stargazers_count} | ${r.language || 'N/A'}`)
    .join('\n')

  const joinDate = new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })

  const info = `🐙 *GITHUB PROFILE*\n\n` +
    `👤 *Username:* ${user.login}\n` +
    `📛 *Nama:* ${user.name || '-'}\n` +
    `📝 *Bio:* ${user.bio || '-'}\n` +
    `📍 *Lokasi:* ${user.location || '-'}\n\n` +
    `📦 Repo: ${user.public_repos} | 👥 Followers: ${user.followers} | 👣 Following: ${user.following}\n\n` +
    (topRepos ? `📂 *Repo Terbaru:*\n${topRepos}\n\n` : '') +
    `📅 *Bergabung:* ${joinDate}\n🔗 ${user.html_url}\n\n${global.wm}`

  if (user.avatar_url) {
    await conn.sendMessage(m.chat, { image: { url: user.avatar_url }, caption: info }, { quoted: m })
  } else {
    m.reply(info)
  }
}

handler.help = ['github <username>']
handler.tags = ['tools']
handler.command = /^(github|ghuser|gituser)$/i
export default handler
