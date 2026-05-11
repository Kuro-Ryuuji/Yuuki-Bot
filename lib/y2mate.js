import ytdl from '@distube/ytdl-core'

export const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:shorts\/)?(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

async function yt(url, type = 'mp4') {
    if (!ytdl.validateURL(url)) throw 'URL YouTube tidak valid'

    const info = await ytdl.getInfo(url)
    const title = info.videoDetails.title
    const thumbnail = info.videoDetails.thumbnails.slice(-1)[0].url

    if (type === 'mp4') {
        const format = ytdl.chooseFormat(info.formats, {
            quality: 'highestvideo',
            filter: f => f.container === 'mp4' && f.hasVideo && f.hasAudio
        }) || ytdl.chooseFormat(info.formats, { quality: '360p' })
        return {
            dl_link: format.url,
            thumb: thumbnail,
            title,
            filesizeF: format.contentLength ? (format.contentLength / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown',
            filesize: parseInt(format.contentLength || 0)
        }
    } else if (type === 'mp3') {
        const format = ytdl.chooseFormat(info.formats, {
            quality: 'highestaudio',
            filter: 'audioonly'
        })
        return {
            dl_link: format.url,
            thumb: thumbnail,
            title,
            filesizeF: format.contentLength ? (format.contentLength / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown',
            filesize: parseInt(format.contentLength || 0)
        }
    }
    throw 'Type tidak valid, gunakan mp4 atau mp3'
}

export default {
    yt,
    ytIdRegex,
    yta: (url) => yt(url, 'mp3'),
    ytv: (url) => yt(url, 'mp4')
}
