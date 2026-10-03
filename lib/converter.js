import { spawn } from 'child_process'
import { join } from 'path'
import { tmpdir } from 'os'
import fs from 'fs'

export async function toAudio(source, ext = 'mp3') {
  const tmp = join(tmpdir(), `${Date.now()}.${ext}`)
  const out = join(tmpdir(), `${Date.now()}.${ext}`)
  
  if (Buffer.isBuffer(source)) {
    fs.writeFileSync(tmp, source)
  } else {
    fs.copyFileSync(source, tmp)
  }
  
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-i', tmp, '-vn', '-ab', '128k', '-ar', '44100', '-y', out])
    
    ffmpeg.on('close', (code) => {
      fs.unlinkSync(tmp)
      if (code !== 0) return reject(new Error('FFmpeg error'))
      resolve(out)
    })
    
    ffmpeg.on('error', reject)
  })
}

export async function toPTT(source) {
  const tmp = join(tmpdir(), `${Date.now()}.opus`)
  const out = join(tmpdir(), `${Date.now()}.opus`)
  
  if (Buffer.isBuffer(source)) {
    fs.writeFileSync(tmp, source)
  } else {
    fs.copyFileSync(source, tmp)
  }
  
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-i', tmp, '-vn', '-c:a', 'libopus', '-b:a', '128k', '-vbr', 'on', '-compression_level', '10', out])
    
    ffmpeg.on('close', (code) => {
      fs.unlinkSync(tmp)
      if (code !== 0) return reject(new Error('FFmpeg error'))
      resolve(out)
    })
    
    ffmpeg.on('error', reject)
  })
}
