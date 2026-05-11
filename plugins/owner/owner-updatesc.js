// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!
import { exec as _exec } from 'child_process'
import { promisify } from 'util'
import { readFileSync, writeFileSync } from 'fs'

const exec = promisify(_exec)
const cwd = process.cwd()

let handler = async (m, { conn }) => {
    await m.reply('🔍 Mengecek update dari GitHub...')

    try {
        await exec('git fetch origin', { cwd })
    } catch (e) {
        return m.reply(`❌ Gagal fetch dari GitHub:\n${e.message}`)
    }

    let localHead, remoteHead
    try {
        localHead = (await exec('git rev-parse HEAD', { cwd })).stdout.trim()
        remoteHead = (await exec('git rev-parse origin/master', { cwd })).stdout.trim()
    } catch (e) {
        return m.reply(`❌ Gagal membaca commit:\n${e.message}`)
    }

    if (localHead === remoteHead) return m.reply('✅ Bot sudah versi terbaru, tidak ada update.')

    let changedFiles
    try {
        const { stdout } = await exec('git diff --name-only HEAD origin/master', { cwd })
        changedFiles = stdout.trim().split('\n').filter(f => f && f !== 'config.js')
    } catch (e) {
        return m.reply(`❌ Gagal membaca daftar file:\n${e.message}`)
    }

    await m.reply(`📦 *${changedFiles.length} file akan diupdate:*\n\n${changedFiles.map(f => `• ${f}`).join('\n')}`)

    // Backup config.js
    let configBackup
    try {
        configBackup = readFileSync(`${cwd}/config.js`, 'utf8')
    } catch (e) {
        return m.reply(`❌ Gagal backup config.js:\n${e.message}`)
    }

    // Pull dengan overwrite
    try {
        await exec('git reset --hard origin/master', { cwd })
    } catch (e) {
        return m.reply(`❌ Gagal melakukan git reset:\n${e.message}`)
    }

    // Pulihkan config.js
    try {
        writeFileSync(`${cwd}/config.js`, configBackup, 'utf8')
    } catch (e) {
        return m.reply(`❌ Update berhasil tapi gagal pulihkan config.js:\n${e.message}`)
    }

    await m.reply('✅ *Update berhasil!* Bot akan restart dalam 3 detik...')

    setTimeout(() => {
        if (process.send) process.send('reset')
        else process.exit(0)
    }, 3000)
}

handler.help = ['updatesc']
handler.tags = ['owner']
handler.command = /^(updatesc|update)$/i
handler.owner = true

export default handler
