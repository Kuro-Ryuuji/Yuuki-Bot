import { cpus as _cpus, totalmem, freemem, loadavg } from 'os'
import os from 'os'
import { performance } from 'perf_hooks'

function format(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) { bytes /= 1024; i++ }
  return `${bytes.toFixed(1)} ${units[i]}`
}

function formatGB(bytes) {
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function makeProgressBar(percent, length = 24) {
  const filled = Math.round(percent / 100 * length)
  const empty = length - filled
  return '━'.repeat(filled) + '─'.repeat(empty)
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
  
  const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false })
  
  let old = performance.now()
  await m.reply('Testing...')
  let neww = performance.now()
  let speed = (neww - old).toFixed(0)
  
  const text = `
≡ SYSTEM STATUS
▸ Speed  : ${speed} ms
▸ Uptime : ${muptime}
▸ RSS    : ${formatGB(used.rss)} · Ext ${formatMB(used.external)}
▸ CPU    : ${cpuModel}
▸ Cores  : ${cpuCores} · Load ${loads[0].toFixed(2)} / ${loads[1].toFixed(2)} / ${loads[2].toFixed(2)}
▸ OS     : ${os.platform().toUpperCase()} ${os.arch()} · ${timeStr}
▸ Node   : v${process.versions.node} · PID ${process.pid}

CPU · ${cpuPercent.toFixed(1)}%
${makeProgressBar(cpuPercent)}

LOAD · ${loadPercent.toFixed(1)}% of ${cpuCores} core
${makeProgressBar(loadPercent)}

RAM · ${formatGB(usedMem)} / ${formatGB(totalMem)}
${makeProgressBar(ramPercent)}

HEAP · ${formatMB(heapUsed)} / ${formatMB(heapTotal)}
${makeProgressBar(heapPercent)}
`.trim()

  await m.reply(text)
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
