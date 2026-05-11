// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) throw `*Masukan Judul Anime Yang Ingin Kamu Cari!*`

    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`)
    if (!res.ok) throw 'Tidak ditemukan'

    const json = await res.json()
    const anime = json.data?.[0]
    if (!anime) throw 'Anime tidak ditemukan'

    const { title, episodes, type, rating, score, members, synopsis, url, images } = anime

    const animeinfo = `📚 ᴛɪᴛʟᴇ: ${title}
🎆 ᴇᴘɪsᴏᴅᴇ: ${episodes || 'N/A'}
✉️ ᴛʀᴀɴsᴍɪsɪ: ${type || 'N/A'}
🌟 ʀᴀᴛɪɴɢ: ${rating || 'N/A'}
🧮 sᴄᴏʀᴇ: ${score || 'N/A'}
👥 ᴍᴇᴍʙᴇʀs: ${members?.toLocaleString() || 'N/A'}
💬 sɪɴᴏᴘsɪs: ${synopsis?.slice(0, 300) || 'N/A'}...`

    const image_url = images?.jpg?.large_image_url || images?.jpg?.image_url

    await conn.sendMessage(m.chat, {
        image: { url: image_url },
        caption: `*${htki} ANIME INFO ${htka}*\n\n${animeinfo}\n\n🔗 ${url}`
    }, { quoted: m })
}

handler.help = ['animeinfo <anime>']
handler.tags = ['anime']
handler.command = /^(animeinfo)$/i

export default handler
