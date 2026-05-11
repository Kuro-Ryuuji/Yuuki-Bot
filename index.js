console.log('🚀 Starting...')

import yargs from 'yargs'
import cfonts from 'cfonts'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { createRequire } from 'module'
import { createInterface } from 'readline'
import { spawn } from 'child_process'
import { watchFile, unwatchFile } from 'fs'

// https://stackoverflow.com/a/50052194
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { name, author, description } = require(join(__dirname, './package.json'))

// Import config untuk nama bot
let config
try {
  config = (await import('./config.js')).default || await import('./config.js')
} catch (e) {
  config = {}
}

const botName = config.namebot || 'Elaina BOT'
const ownerName = config.nameown || 'OmmniDevv'

// Banner
say(name.toUpperCase().replace(/-/g, ' '), { 
  font: 'chrome', 
  align: 'center', 
  gradient: ['cyan', 'magenta'] 
})
say(`${botName} - Multi Device`, { 
  font: 'console', 
  align: 'center', 
  gradient: ['blue', 'green'] 
})
console.log(chalk.cyan.bold('╔═══════════════════════════════════════════════════╗'))
console.log(chalk.cyan('║') + chalk.white(`  📦 Project  : ${chalk.yellow(name.toUpperCase())}`.padEnd(58)) + chalk.cyan('║'))
console.log(chalk.cyan('║') + chalk.white(`  👤 Author   : ${chalk.yellow(author.name || author)}`.padEnd(58)) + chalk.cyan('║'))
console.log(chalk.cyan('║') + chalk.white(`  🤖 Bot Name : ${chalk.yellow(botName)}`.padEnd(58)) + chalk.cyan('║'))
console.log(chalk.cyan('║') + chalk.white(`  📝 Desc     : ${chalk.gray((description || 'WhatsApp Bot').slice(0, 33))}`.padEnd(58)) + chalk.cyan('║'))
console.log(chalk.cyan.bold('╚═══════════════════════════════════════════════════╝'))
console.log()

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), { font: 'console', align: 'center', gradient: ['red', 'magenta'] })
  let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
  p.on('message', data => {
    console.log('[✅RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('[❗]Exited with code:', code)
    if (code !== 0 && code !== null) return start(file)
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('main.js')