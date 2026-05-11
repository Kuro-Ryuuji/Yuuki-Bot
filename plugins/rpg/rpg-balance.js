let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    let txt = `💰 *Balance*

👤 Name: ${conn.getName(m.sender)}
💵 Money: ${user.money || 0}
💳 Bank: ${user.bank || 0}
✨ Exp: ${user.exp || 0}
🎯 Level: ${user.level || 1}
🏆 Limit: ${user.limit || 0}

📦 *Inventory*
🐔 Ayam: ${user.ayam || 0}
🐰 Kelinci: ${user.kelinci || 0}
🐑 Domba: ${user.domba || 0}
🐄 Sapi: ${user.sapi || 0}
🐘 Gajah: ${user.gajah || 0}
🐟 Ikan: ${user.ikan || 0}
🦀 Kepiting: ${user.kepiting || 0}
🦐 Udang: ${user.udang || 0}
🪵 Kayu: ${user.kayu || 0}
🧵 String: ${user.string || 0}`;

    m.reply(txt);
};

handler.help = ['balance', 'bal'];
handler.tags = ['rpg'];
handler.command = /^(balance|bal|wallet|dompet)$/i;
handler.register = true;

export default handler;