import { cpus as _cpus, totalmem, freemem, loadavg } from 'os'
import os from 'os'
import { performance } from 'perf_hooks'

function formatGB(bytes) {
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function getCpuUsagePercent() {
  const cpus = _cpus()
  let totalIdle = 0, totalTick = 0
  cpus.forEach(cpu => {
    for (let type in cpu.times) totalTick += cpu.times[type]
    totalIdle += cpu.times.idle
  })
  return 100 - ~~(100 * (totalIdle / cpus.length) / (totalTick / cpus.length))
}

let handler = async (m, { conn }) => {
  let _muptime
  if (process.send) {
    process.send('uptime')
    _muptime = await new Promise(resolve => {
      process.once('message', resolve)
      setTimeout(resolve, 1000)
    }) * 1000
  }
  let muptime = clockString(_muptime)

  const used = process.memoryUsage()
  const cpus = _cpus()
  const cpuModel = cpus[0]?.model?.trim() || 'Unknown'
  const cpuCores = cpus.length
  const cpuPercent = getCpuUsagePercent()

  const totalMem = totalmem()
  const usedMem = totalMem - freemem()
  const ramPercent = (usedMem / totalMem) * 100

  const heapUsed = used.heapUsed
  const heapTotal = used.heapTotal
  const heapPercent = (heapUsed / heapTotal) * 100

  const loads = loadavg()
  const loadPercent = Math.min((loads[0] / cpuCores) * 100, 100)

  let old = performance.now()
  let neww = performance.now()
  let speed = (neww - old).toFixed(0)

  const captionHeader = `≡ **SYSTEM STATUS**
▸ **Speed** : ${speed} ms
▸ **Uptime** : ${muptime}
▸ **RSS** : ${formatGB(used.rss)} · Ext ${formatMB(used.external)}
▸ **CPU** : ${cpuModel}
▸ **Cores** : ${cpuCores} · Load ${loads[0].toFixed(2)} / ${loads[1].toFixed(2)} / ${loads[2].toFixed(2)}
▸ **OS** : ${os.type()} ${os.arch()} · ${clockString(os.uptime() * 1000)}
▸ **Node** : ${process.version} · PID ${process.pid}`

  // Data opsi polling palsu beserta jumlah 'suara' untuk menghasilkan progress bar
  const pollOptions = [
    { name: `CPU · ${cpuPercent.toFixed(1)}%`, voteCount: Math.round(cpuPercent) },
    { name: `LOAD · ${loadPercent.toFixed(1)}% of ${cpuCores} core`, voteCount: Math.round(loadPercent) },
    { name: `RAM · ${formatGB(usedMem)} / ${formatGB(totalMem)}`, voteCount: Math.round(ramPercent) },
    { name: `HEAP · ${formatMB(heapUsed)} / ${formatMB(heapTotal)}`, voteCount: Math.round(heapPercent) }
  ]

  // Kirim struktur relayMessage dengan pollResultSnapshot
  await conn.relayMessage(
    m.chat,
    {
      pollCreationMessageV3: {
        name: captionHeader,
        options: pollOptions.map(opt => ({ optionName: opt.name })),
        selectableOptionsCount: 0
      },
      pollResultSnapshot: {
        pollVotes: pollOptions.map(opt => ({
          optionName: opt.name,
          voteCount: opt.voteCount
        }))
      }
    },
    { quoted: m }
  )
}

handler.help = ['ping', 'speed']
handler.tags = ['tools']
handler.command = /^(ping|speed|info)$/i
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
      }
