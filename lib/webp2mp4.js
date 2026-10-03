import { spawn } from 'child_process'
import { join } from 'path'
import { tmpdir } from 'os'
import fs from 'fs'

export async function webp2png(source) {
  const tmp = join(tmpdir(), `${Date.now()}.png`)
  const out = join(tmpdir(), `${Date.now()}.png`)
  
  if (Buffer.isBuffer(source)) {
    fs.writeFileSync(tmp, source)
  } else {
    fs.copyFileSync(source, tmp)
  }
  
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-i', tmp, out])
    
    ffmpeg.on('close', (code) => {
      fs.unlinkSync(tmp)
      if (code !== 0) return reject(new Error('FFmpeg error'))
      resolve(out)
    })
    
    ffmpeg.on('error', reject)
  })
}

export async function webp2mp4(source) {
  const tmp = join(tmpdir(), `${Date.now()}.webp`)
  const out = join(tmpdir(), `${Date.now()}.mp4`)
  
  if (Buffer.isBuffer(source)) {
    fs.writeFileSync(tmp, source)
  } else {
    fs.copyFileSync(source, tmp)
  }
  
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', ['-i', tmp, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', out])
    
    ffmpeg.on('close', (code) => {
      fs.unlinkSync(tmp)
      if (code !== 0) return reject(new Error('FFmpeg error'))
      resolve(out)
    })
    
    ffmpeg.on('error', reject)
  })
}
