import fetch from 'node-fetch'
import { format } from 'util'

let handler = async (m, { text, conn }) => {
    if (!text) throw 'Masukkan URL yang valid'
    if (!/^https?:\/\//.test(text)) throw 'Awali *URL* dengan http:// atau https://'
    
    // Security: Validate URL and prevent SSRF
    try {
        let _url = new URL(text)
        const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '169.254.169.254', '10.', '192.168.', '172.']
        
        if (blockedHosts.some(host => _url.hostname.includes(host))) {
            throw 'Access to local/private networks is not allowed'
        }
        
        let url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
        let res = await fetch(url, { 
            timeout: 15000,
            headers: { 'User-Agent': 'ElainaBot/1.0' }
        })
        
        if (!res.ok) throw `HTTP ${res.status}: ${res.statusText}`
        
        // Fix: Use reasonable file size limit (10MB instead of 100GB)
        if (res.headers.get('content-length') > 10 * 1024 * 1024) {
            throw `File terlalu besar: ${res.headers.get('content-length')} bytes (max 10MB)`
        }
        
        if (!/text|json/.test(res.headers.get('content-type'))) {
            return conn.sendFile(m.chat, url, 'file', text, m)
        }
        
        let txt = Buffer.from(await res.arrayBuffer())
        try {
            txt = format(JSON.parse(txt + ''))
        } catch (e) {
            txt = txt + ''
        } finally {
            m.reply(txt.slice(0, 65536) + '')
        }
    } catch (e) {
        throw `Error: ${e.message || e}`
    }
}
handler.help = ['fetch', 'get'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^(fetch|get)$/i

export default handler
