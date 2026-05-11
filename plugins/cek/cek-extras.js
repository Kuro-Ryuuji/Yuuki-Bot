// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD — Jangan Dijual!

function makeCekHandler(label, responses) {
    let h = async (m, { usedPrefix }) => {
        const pct = Math.floor(Math.random() * 101)
        const resp = responses[Math.floor(Math.random() * responses.length)]
        await m.reply(`📊 *${label}*\n\n👤 ${m.pushName || 'Kamu'}\n📈 ${pct}%\n\n${resp}`)
    }
    h.help = [label.toLowerCase().replace(/ /g, '')]
    h.tags = ['cek']
    h.command = new RegExp(`^(${label.toLowerCase().replace(/ /g, '')})$`, 'i')
    return h
}

const cekberat = makeCekHandler('Cek Berat', [
    '⚖️ Berat badanmu ideal banget, jaga terus!',
    '⚖️ Hmm, kayaknya kamu perlu olahraga nih.',
    '⚖️ Berat badanmu pas banget buat dipeluk!',
    '⚖️ Kurang makan atau kebanyakan makan nih?',
    '⚖️ Timbangan bilang kamu perlu diet, tapi hati bilang makan dulu!'
])

const cekfemboy = makeCekHandler('Cek Femboy', [
    '🌸 Kamu femboy sejati! Aesthetic banget!',
    '🌸 Sedikit femboy, tapi tetap keren!',
    '💪 Kamu terlalu macho buat jadi femboy.',
    '🌸 Femboy level dewa! Semua orang iri sama kamu.',
    '🤔 Hmm, kamu di antara femboy dan macho. Unik!'
])

const cekcreative = makeCekHandler('Cek Creative', [
    '🎨 Kreativitasmu luar biasa! Calon seniman besar!',
    '🎨 Lumayan kreatif, tinggal diasah lagi.',
    '💡 Ide-idemu selalu out of the box!',
    '🎨 Kreativitasmu sedang tidur, bangunkan segera!',
    '✨ Kamu kreatif tapi males eksekusi, ayo action!'
])

const cekgacha = makeCekHandler('Cek Gacha', [
    '🎰 Kamu sultan gacha! SSR terus!',
    '🎰 Nasib gachaanmu tragis, selalu dapat N.',
    '🎰 Lumayan, sesekali dapat SR.',
    '🎰 Kamu tipe yang rela skip makan demi gacha.',
    '💸 Dompetmu menangis setiap kali gacha!'
])

// cekjodoh already exists in cek/cek-all.js — skipped

const cekkarma = makeCekHandler('Cek Karma', [
    '☯️ Karmamu baik banget! Kebaikanmu kembali berlipat ganda.',
    '☯️ Karma sedang mengintaimu, hati-hati!',
    '☯️ Kamu punya karma netral, tergantung pilihanmu ke depan.',
    '⚡ Karma burukmu sedang menunggu waktu yang tepat.',
    '🌟 Karmamu sangat positif, rezeki akan datang!'
])

const cekkpopers = makeCekHandler('Cek Kpopers', [
    '🎤 Kamu kpopers sejati! Hafal semua lagu dan member!',
    '🎤 Kpopers level pemula, masih banyak yang harus dipelajari.',
    '💿 Kamu kpopers tapi diam-diam, malu ngaku ya?',
    '🎵 Kpopers hardcore! Rela begadang nonton comeback.',
    '😅 Kamu tau kpop tapi bukan kpopers, tipis banget bedanya!'
])

const ceklapar = makeCekHandler('Cek Lapar', [
    '🍜 Kamu lapar banget! Segera makan sebelum marah-marah!',
    '🍔 Lapar tapi males masak, pesan online aja!',
    '😋 Kamu lapar tapi lagi diet, kuat ya!',
    '🍕 Laparmu sudah level kritis, tolong segera ditangani!',
    '🤤 Kamu lapar tapi dompet kosong, sabar ya!'
])

const cekngantuk = makeCekHandler('Cek Ngantuk', [
    '😴 Kamu ngantuk banget! Tidur dulu sana!',
    '☕ Ngantuk tapi masih kuat, minum kopi dulu!',
    '😪 Matamu sudah 5 watt, segera istirahat!',
    '🛌 Ngantukmu sudah level dewa, kasur memanggilmu!',
    '😅 Ngantuk tapi gabisa tidur, nasib!'
])

const cekoverpower = makeCekHandler('Cek Overpower', [
    '⚡ Kamu overpower banget! Musuh gemetar melihatmu!',
    '💪 Kamu kuat tapi masih ada yang lebih kuat.',
    '🌟 Overpower level dewa! Tidak ada yang bisa mengalahkanmu!',
    '😤 Kamu overpower tapi sering underestimate diri sendiri.',
    '🔥 Potensimu overpower, tinggal di-unlock aja!'
])

const cekowner = makeCekHandler('Cek Owner', [
    '👑 Kamu punya jiwa owner sejati! Pemimpin yang lahir!',
    '💼 Kamu cocok jadi owner, tinggal modal aja yang kurang.',
    '🏆 Owner material banget! Semua orang mau ikut kamu.',
    '😅 Kamu owner tapi sering diatur karyawan sendiri.',
    '💡 Jiwa ownermu ada, tapi masih perlu banyak belajar!'
])

const cekpartner = makeCekHandler('Cek Partner', [
    '💑 Kamu partner yang sempurna! Siapapun beruntung punya kamu.',
    '🤝 Kamu partner yang setia dan bisa diandalkan.',
    '💔 Kamu partner yang baik tapi sering ghosting.',
    '😍 Partner idaman! Pengertian, sabar, dan perhatian.',
    '🤔 Kamu partner yang unik, butuh waktu untuk dimengerti.'
])

const cekpelit = makeCekHandler('Cek Pelit', [
    '💰 Kamu pelit banget! Dompet lebih aman dari brankas bank!',
    '😅 Sedikit pelit, tapi masih bisa ditoleransi.',
    '🤑 Kamu hemat, bukan pelit. Ada bedanya!',
    '💸 Pelitmu sudah level sultan, sayang banget sama uang.',
    '😂 Kamu pelit tapi baik hati, paradoks banget!'
])

const cekprem = makeCekHandler('Cek Prem', [
    '💎 Kamu layak dapat akses premium! VIP sejati!',
    '⭐ Hampir premium, tinggal selangkah lagi!',
    '😅 Kamu masih level gratisan, upgrade dong!',
    '👑 Premium banget! Kelas atas dari ujung rambut sampai kaki.',
    '🎖️ Kamu premium di hati, meski dompet bilang lain.'
])

const cekprocastinator = makeCekHandler('Cek Procrastinator', [
    '⏰ Kamu procrastinator sejati! "Nanti aja" adalah mantramu.',
    '😴 Deadline besok tapi santai aja, itu kamu banget!',
    '📅 Kamu procrastinator tapi selalu selesai tepat waktu, entah bagaimana.',
    '🐢 Lambat tapi pasti, procrastinator level master!',
    '😂 Kamu bilang "5 menit lagi" sudah 3 jam yang lalu!'
])

const cekpsikopat = makeCekHandler('Cek Psikopat', [
    '😈 Kamu punya sisi psikopat yang tersembunyi, hati-hati!',
    '😇 Kamu jauh dari psikopat, malah terlalu baik!',
    '🤔 Ada sedikit sisi gelap dalam dirimu, tapi masih wajar.',
    '😂 Psikopat? Kamu malah terlalu polos untuk itu!',
    '🌚 Senyummu menyimpan misteri yang dalam...'
])

const cekrezeki = makeCekHandler('Cek Rezeki', [
    '💰 Rezekimu sedang deras! Siap-siap dapat kejutan!',
    '🌟 Rezekimu baik, tapi perlu lebih banyak usaha.',
    '🍀 Keberuntunganmu sedang di puncak, manfaatkan!',
    '😅 Rezekimu lagi seret, sabar ya, pasti ada jalan!',
    '✨ Rezekimu datang dari arah yang tidak terduga!'
])

const ceksetia = makeCekHandler('Cek Setia', [
    '💍 Kamu setia banget! Pasanganmu sangat beruntung!',
    '😅 Setia sih, tapi mata suka jelalatan.',
    '💑 Kesetiaan adalah prioritasmu, salut!',
    '🤔 Kamu setia selama tidak ada yang lebih menarik.',
    '❤️ Setia sampai mati! Cinta sejatimu tidak tergoyahkan.'
])

const ceksisaumur = makeCekHandler('Cek Sisa Umur', [
    '⏳ Gunakan waktumu sebaik mungkin, setiap detik berharga!',
    '🌅 Masih banyak hal indah yang menunggumu di depan!',
    '⌛ Jangan buang waktu untuk hal yang tidak berguna!',
    '🕐 Waktu terus berjalan, pastikan hidupmu bermakna!',
    '💫 Sisa umurmu penuh dengan kemungkinan tak terbatas!'
])

const ceksocmed = makeCekHandler('Cek Socmed', [
    '📱 Kamu kecanduan socmed! HP tidak pernah lepas dari tangan.',
    '🤳 Influencer wannabe! Semua momen harus di-post.',
    '😅 Kamu pakai socmed secukupnya, sehat!',
    '📸 Hidup untuk konten! Aesthetic adalah segalanya.',
    '🌐 Kamu lebih aktif di socmed daripada di dunia nyata.'
])

const cektinggi = makeCekHandler('Cek Tinggi', [
    '📏 Tinggimu ideal banget, proporsional!',
    '🦒 Kamu tinggi banget, cocok jadi model!',
    '😅 Pendek itu menggemaskan, jangan minder!',
    '📐 Tinggimu pas-pasan, tapi kepribadianmu yang tinggi!',
    '🌟 Tinggi badan bukan segalanya, yang penting tinggi hati!'
])

const cektsundere = makeCekHandler('Cek Tsundere', [
    '😤 "B-bukan karena aku peduli sama kamu ya!" — itu kamu banget!',
    '🌸 Tsundere level dewa! Keras di luar, lembut di dalam.',
    '😊 Kamu tidak tsundere, kamu terlalu terbuka.',
    '💢 "Baka!" adalah kata favoritmu ke orang yang kamu suka.',
    '😳 Tsundere tapi ketahuan, muka merah mulu!'
])

const cekumur = makeCekHandler('Cek Umur', [
    '🎂 Umurmu muda tapi jiwa tua, bijak banget!',
    '✨ Umurmu hanya angka, semangatmu selalu muda!',
    '😅 Umur bertambah tapi kelakuan masih bocah.',
    '🌟 Semakin tua semakin keren, seperti wine!',
    '🎉 Umurmu pas banget untuk memulai hal-hal baru!'
])

const cekyandere = makeCekHandler('Cek Yandere', [
    '🔪 "Kamu hanya milikku seorang!" — itu kamu banget!',
    '😇 Kamu jauh dari yandere, malah terlalu santai.',
    '💕 Sedikit yandere, tapi masih dalam batas wajar.',
    '😱 Yandere level S! Cintamu sangat... intens.',
    '🌹 Cintamu dalam tapi cara mengekspresikannya agak menakutkan.'
])

export { cekberat, cekfemboy, cekcreative, cekgacha, cekkarma, cekkpopers, ceklapar, cekngantuk, cekoverpower, cekowner, cekpartner, cekpelit, cekprem, cekprocastinator, cekpsikopat, cekrezeki, ceksetia, ceksisaumur, ceksocmed, cektinggi, cektsundere, cekumur, cekyandere }
export default cekberat

// ─── Additional cek handlers ───────────────────────────────
export const cekbaik = makeCekHandler('Cek Baik', [
    '😇 Kamu orang yang sangat baik hati!', '😊 Kebaikanmu tulus dan terpancar dari dalam.', '🌟 Orang-orang suka sama kamu karena kebaikanmu.', '💛 Baik banget, semoga dibalas kebaikan juga!', '🤗 Kamu tipe orang yang selalu ada buat orang lain.'
])
cekbaik.command = /^(cekbaik|baik)$/i

export const cekbucin = makeCekHandler('Cek Bucin', [
    '💘 Kamu bucin parah, tapi itu lucu!', '😍 Bucin level dewa, semua tentang dia.', '🥺 Bucin tapi manis, semoga dibalas ya!', '💕 Bucin? Iya. Tapi kamu bahagia kan?', '😂 Bucin banget, tapi setidaknya jujur!'
])
cekbucin.command = /^(cekbucin)$/i

export const cekcantik = makeCekHandler('Cek Cantik', [
    '👸 Cantik banget kayak bidadari!', '💕 Cantik dan memesona!', '✨ Kecantikanmu alami dan tulus.', '🌸 Cantik luar dalam!', '😍 Cantiknya bikin orang terpesona.'
])
cekcantik.command = /^(cekcantik|cantik)$/i

export const cekcupu = makeCekHandler('Cek Cupu', [
    '🤓 Cupu dikit tapi aslinya keren!', '😅 Cupu? Itu cuma gaya hidupmu.', '🙈 Cupu tapi loveable banget!', '😂 Cupu level tinggi, tapi tetap disayang!', '🤭 Cupu itu bukan aib, itu karakter!'
])
cekcupu.command = /^(cekcupu|cupu)$/i

export const cekgabut = makeCekHandler('Cek Gabut', [
    '😴 Gabut parah, ngapain aja sih?', '🥱 Gabut level dewa, bahkan gabut pun gabut.', '😂 Gabut tapi produktif scroll medsos!', '🛋️ Gabut adalah lifestyle-mu.', '😪 Gabut? Itu artinya kamu butuh hobi baru!'
])
cekgabut.command = /^(cekgabut|gabut)$/i

export const cekgamer = makeCekHandler('Cek Gamer', [
    '🎮 Gamer sejati, hidup untuk game!', '🕹️ Skill gaming-mu di atas rata-rata!', '👾 Gamer hardcore, tidur pun sambil mikirin build.', '🏆 Gamer tapi tetap bisa sosialisasi, keren!', '🎯 Aim-mu tajam, reflek-mu cepat!'
])
cekgamer.command = /^(cekgamer|gamer)$/i

export const cekganteng = makeCekHandler('Cek Ganteng', [
    '😎 Ganteng banget, bikin cewek salting!', '✨ Gantengnya natural dan karismatik.', '💪 Ganteng plus punya kepribadian keren!', '🌟 Ganteng luar dalam!', '😍 Gantengnya bikin orang dua kali lihat.'
])
cekganteng.command = /^(cekganteng|ganteng)$/i

export const cekgila = makeCekHandler('Cek Gila', [
    '🤪 Gila tapi seru banget diajak ngobrol!', '😜 Gila dalam artian unik dan out of the box!', '🤣 Gila? Itu cuma kreativitas yang meluap!', '😂 Gila dikit boleh, asal jangan kebablasan!', '🎭 Gilamu itu yang bikin kamu memorable!'
])
cekgila.command = /^(cekgila|gila)$/i

export const cekhoki = makeCekHandler('Cek Hoki', [
    '🍀 Hoki banget hari ini, manfaatkan!', '🎰 Hoki sedang berpihak padamu!', '⭐ Bintangmu lagi bersinar terang!', '🌈 Keberuntungan selalu mengikutimu.', '🎲 Hoki? Lumayan, tapi tetap usaha ya!'
])
cekhoki.command = /^(cekhoki|hoki)$/i

export const cekimut = makeCekHandler('Cek Imut', [
    '🐱 Imut banget kayak kucing!', '🌸 Imutnya bikin orang gemas!', '😊 Imut dan menggemaskan!', '🍬 Imut kayak permen, bikin orang senyum!', '🐰 Imut level kelinci, adorable banget!'
])
cekimut.command = /^(cekimut|imut)$/i

export const cekintrovert = makeCekHandler('Cek Introvert', [
    '🏠 Introvert sejati, rumah adalah surga.', '📚 Introvert tapi punya inner world yang kaya!', '🎧 Introvert? Kamu lebih suka dengerin daripada ngomong.', '🌙 Introvert dan nyaman dengan kesendirian.', '🤫 Introvert tapi kalau udah kenal, seru banget!'
])
cekintrovert.command = /^(cekintrovert|introvert)$/i

export const cekjahat = makeCekHandler('Cek Jahat', [
    '😈 Jahat dikit boleh, asal jangan keterlaluan!', '😏 Jahat? Itu cuma sisi gelapmu yang tersembunyi.', '🤭 Jahat tapi lucu, orang tetap suka!', '😂 Jahat dalam game doang kan?', '👿 Jahat level rendah, masih bisa diselamatkan!'
])
cekjahat.command = /^(cekjahat|jahat)$/i

export const cekjomblo = makeCekHandler('Cek Jomblo', [
    '💔 Jomblo tapi bahagia!', '😂 Jomblo adalah pilihan, bukan nasib!', '🌟 Jomblo dulu, nanti juga ada yang cocok.', '😎 Jomblo tapi produktif, keren!', '🤷 Jomblo? Setidaknya bebas!'
])
cekjomblo.command = /^(cekjomblo|jomblo)$/i

export const cekkaya = makeCekHandler('Cek Kaya', [
    '💰 Kaya hati dan kaya rezeki!', '💎 Kekayaanmu bukan cuma materi.', '🤑 Kaya? Lumayan, tapi jangan lupa sedekah!', '💵 Rezekimu lagi mengalir deras!', '🏦 Kaya dalam artian cukup dan bersyukur.'
])
cekkaya.command = /^(cekkaya|kaya)$/i

export const cekkece = makeCekHandler('Cek Kece', [
    '😎 Kece banget, style-mu on point!', '✨ Kece luar dalam!', '🔥 Kece dan percaya diri, kombinasi sempurna!', '💫 Kece-nya bikin orang iri!', '🌟 Kece abis, keep it up!'
])
cekkece.command = /^(cekkece|kece)$/i

export const cekkepribadian = makeCekHandler('Cek Kepribadian', [
    '🌟 Kepribadianmu hangat dan menyenangkan!', '💫 Kepribadianmu unik dan menarik!', '😊 Kepribadianmu membuat orang nyaman.', '✨ Kepribadianmu kuat dan berkarakter!', '🎭 Kepribadianmu kompleks tapi menarik!'
])
cekkepribadian.command = /^(cekkepribadian|kepribadian)$/i

export const cekmalas = makeCekHandler('Cek Malas', [
    '😴 Malas level dewa, bahkan malas pun malas!', '🛋️ Malas adalah seni, dan kamu ahlinya!', '😂 Malas tapi kalau ada motivasi, bisa juga!', '🥱 Malas? Itu namanya hemat energi!', '😪 Malas dikit boleh, asal jangan kebablasan!'
])
cekmalas.command = /^(cekmalas|malas)$/i

export const cekmesum = makeCekHandler('Cek Mesum', [
    '😏 Pikiran mesum? Itu manusiawi kok!', '🤭 Mesum dikit boleh, asal jangan keliatan!', '😂 Mesum tapi sopan di depan orang!', '🙈 Mesum? Itu cuma imajinasi yang aktif!', '😅 Mesum level biasa, masih wajar!'
])
cekmesum.command = /^(cekmesum|mesum)$/i

export const cekotaku = makeCekHandler('Cek Otaku', [
    '🎌 Otaku sejati, anime adalah hidupmu!', '📺 Otaku tapi tetap fungsional di dunia nyata!', '🌸 Otaku dan bangga dengan itu!', '⚔️ Otaku level tinggi, hafal semua karakter!', '🎮 Otaku yang juga gamer, double combo!'
])
cekotaku.command = /^(cekotaku|otaku|wibu)$/i

export const ceksabar = makeCekHandler('Cek Sabar', [
    '😌 Sabar banget, kamu tipe orang yang tenang!', '🧘 Kesabaranmu luar biasa!', '💛 Sabar adalah kekuatanmu yang tersembunyi.', '🌊 Tenang seperti air, sabar seperti batu.', '😊 Sabar tapi ada batasnya, jangan diuji!'
])
ceksabar.command = /^(ceksabar|sabar)$/i

export const ceksexy = makeCekHandler('Cek Sexy', [
    '🔥 Sexy banget, bikin orang terpesona!', '💃 Sexy dan percaya diri!', '✨ Sexy itu bukan cuma fisik, tapi aura!', '😍 Sexy-nya natural dan menawan!', '💋 Sexy level tinggi, hati-hati bikin orang jatuh hati!'
])
ceksexy.command = /^(ceksexy|sexy)$/i

export const ceksial = makeCekHandler('Cek Sial', [
    '😅 Sial dikit, tapi masih bisa bangkit!', '🤦 Sial? Itu cuma ujian dari alam semesta.', '😂 Sial tapi tetap semangat, keren!', '🍀 Sial sekarang, hoki nanti!', '😭 Sial level tinggi, tapi kamu kuat!'
])
ceksial.command = /^(ceksial|sial)$/i

export const cekwibu = makeCekHandler('Cek Wibu', [
    '🎌 Wibu sejati, Jepang adalah tanah airmu kedua!', '🌸 Wibu tapi tetap cinta Indonesia!', '⚔️ Wibu level dewa, hafal semua opening!', '📺 Wibu dan bangga!', '🎮 Wibu yang juga otaku, combo sempurna!'
])
cekwibu.command = /^(cekwibu)$/i
