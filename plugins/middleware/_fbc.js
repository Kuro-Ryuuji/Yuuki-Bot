let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, {
    text: `*ʙʀᴏᴀᴅᴄᴀsᴛ ʜᴇʀᴇ*\n\n${text}`.trim(),
    contextInfo: {
      forwardingScore: 9,
      isForwarded: true,
      externalAdReply: {
        title: global.namebot,
        body: 'Broadcast',
        thumbnail: global.thumbBuffer,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }, { quoted: m })
}
handler.help = ['bchere <text>']
handler.tags = ['owner']
handler.command = ['bchere']
handler.rowner = true

export default handler
