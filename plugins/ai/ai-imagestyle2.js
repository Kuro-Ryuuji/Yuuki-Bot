// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
// AI Image Style — seaart/nanobanana based
import { live3d } from '../../lib/scraper/seaart.js'
import nanoBanana from '../../lib/scraper/nanobanana.js'

const STYLES = {
    toblack: {
        fn: 'live3d',
        prompt: 'Transform skin tone to a darker complexion, maintain facial features, realistic shadows, high detail, natural skin texture, no distortion',
        emoji: '🖤', label: 'BLACK STYLE'
    },
    tocermin: {
        fn: 'live3d',
        prompt: 'Create a mirror reflection effect of this image. Add a realistic reflection as if the subject is in front of a mirror or reflective surface. Ensure symmetry, smooth reflection blending, realistic lighting and shadows. Keep the original identity and details, high quality, photorealistic.',
        emoji: '🪞', label: 'CERMIN'
    },
    tomanga: {
        fn: 'live3d',
        prompt: 'Transform this image into Japanese manga style illustration. Apply black and white manga aesthetics with dramatic shading, speed lines, expressive eyes, and detailed screentones. Keep the original composition but convert it to look like a page from a Japanese manga with bold ink lines, dynamic poses, and that distinctive manga art style.',
        emoji: '📖', label: 'MANGA STYLE'
    },
    tooilpainting: {
        fn: 'nanobanana',
        prompt: 'Transform this image into a classical oil painting style. Apply thick brushstrokes, rich colors, and the texture of traditional oil paint on canvas. Keep the original composition but make it look like a masterpiece painting with visible brushwork, artistic color blending, and that timeless gallery-quality aesthetic.',
        emoji: '🖼️', label: 'OIL PAINTING'
    },
    to3d: {
        fn: 'live3d',
        prompt: 'Transform this image into a high-quality 3D rendered style like Pixar or DreamWorks CGI. Apply realistic lighting, smooth textures, and that polished 3D animated movie look. Keep the original composition but make it look like a frame from a modern 3D animated film with subsurface scattering on skin, detailed hair, and cinematic lighting.',
        emoji: '🎮', label: '3D STYLE'
    },
    toisland: {
        fn: 'live3d',
        prompt: 'Transform this image into a tropical island scene. Place the subject in a beautiful island environment with clear blue ocean, palm trees, and warm sunlight. Add realistic lighting, shadows, and vibrant tropical colors. Keep the original identity, high detail, cinematic, photorealistic.',
        emoji: '🏝️', label: 'ISLAND STYLE'
    },
    tofigurine: {
        fn: 'nanobanana',
        prompt: 'Using the model, create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base.',
        emoji: '🎎', label: 'FIGURINE'
    },
}

let handler = async (m, { conn, command }) => {
    const cfg = STYLES[command.toLowerCase()]
    if (!cfg) return
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    if (!/image/.test(mime)) return m.reply(`${cfg.emoji} *${cfg.label}*\n\n> Reply/kirim gambar untuk diubah\n\n\`${m.prefix}${command}\``)
    await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } })
    try {
        const buffer = await q.download()
        let result
        if (cfg.fn === 'live3d') {
            const res = await live3d(buffer, cfg.prompt)
            result = res.image
        } else {
            result = await nanoBanana(buffer, cfg.prompt)
        }
        await conn.sendFile(m.chat, result, `${command}.jpg`, '', m)
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
        conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        m.reply('Gagal: ' + (e?.message || e))
    }
}
handler.help = Object.keys(STYLES)
handler.tags = ['ai']
handler.command = /^(toblack|tocermin|tomanga|tooilpainting|to3d|toisland|tofigurine)$/i
export default handler
