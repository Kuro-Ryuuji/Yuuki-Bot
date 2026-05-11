// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD
let stdouts = []
let _isModified = false

export let isModified = false

export function logs() { return Buffer.concat(stdouts) }

export default (maxLength = 200) => {
  let oldWrite = process.stdout.write.bind(process.stdout)
  const disable = () => {
    _isModified = false
    isModified = false
    return process.stdout.write = oldWrite
  }
  process.stdout.write = (chunk, encoding, callback) => {
    stdouts.push(Buffer.from(chunk, encoding))
    oldWrite(chunk, encoding, callback)
    if (stdouts.length > maxLength) stdouts.shift()
  }
  _isModified = true
  isModified = true
  return { disable, isModified: true, logs }
}
