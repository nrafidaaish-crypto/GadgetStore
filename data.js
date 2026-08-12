let currentUser = null;
let selectedRole = 'customer';
let historyStack = [];

let products = [
  {
    id: 1,
    name: "Ultra Phone 15 Pro Max 256GB",
    price: 18500000,
    stock: 25,
    rating: 4.9,
    sold: 184,
    colors: ["TITANIUM", "HITAM", "SILVER", "BIRU"],
    colorMap: {
      "TITANIUM": "ip16.jpg",
      "HITAM": "ip16.jpg",
      "SILVER": "ip16.jps",
      "BIRU": "ip16.jpg"
    },
    img: "ip16.jpg",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41532-large.mp4",
    desc: "Iphone 16 dengan chipset tercepat, kamera kelas profesional 108MP, dan bodi berbahan Titanium ultra tahan lama.",
    reviews: [
      { name: "Seraphine Azellie", rating: 5, date: "02 Ags 2026", variant: "Warna: TITANIUM", comment: "Layar OLED-nya super tajam, kamera malamnya jernih banget tanpa noise! ❤️❤️" },
      { name: "Rylee Karlanna", rating: 5, date: "28 Jul 2026", variant: "Warna: HITAM", comment: "Performa gaming tanpa lag dan daya tahan baterai seharian penuhh." }
    ]
  },
  {
    id: 2,
    name: "AeroBlade RGB Gaming Laptop i9 32GB",
    price: 24990000,
    stock: 15,
    rating: 5.0,
    sold: 142,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80",
      "SILVER": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-41528-large.mp4",
    desc: "Laptop gaming performa tinggi dengan prosesor i9 generasi terbaru, kartu grafis RTX, serta layar 240Hz untuk pengalaman gaming dan render maksimal.",
    reviews: [
      { name: "Vathea Anasya", rating: 5, date: "03 Ags 2026", variant: "Warna: HITAM", comment: "Game AAA rata kanan dapet 120+ FPS! System pendinginnya sangat adem." }
    ]
  },
  {
    id: 3,
    name: "Pulse Watch Pro Series 8 AMOLED",
    price: 2490000,
    stock: 50,
    rating: 4.8,
    sold: 230,
    colors: ["HITAM", "SILVER", "PINK"],
    colorMap: {
      "HITAM": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80",
      "SILVER": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      "PINK": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-using-a-smartwatch-41530-large.mp4",
    desc: "Smartwatch canggih dengan pemantau kesehatan 24/7, sensor EKG, GPS presisi tinggi, dan ketahanan air hingga 50 meter.",
    reviews: [
      { name: "Yesava Maureen", rating: 5, date: "04 Ags 2026", variant: "Warna: SILVR", comment: "Sensor detak jantung dan pelacak tidurnya sangat akurat. Tampilan layarnya jernih!" }
    ]
  },
  {
    id: 4,
    name: "SonicPods Pro Wireless ANC Earbuds",
    price: 1850000,
    stock: 40,
    rating: 4.7,
    sold: 195,
    colors: ["PUTIH", "HITAM", "PINK"],
    colorMap: {
      "PUTIH": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80",
      "HITAM": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=500&q=80",
      "PINK": "https://images.unsplash.com/photo-1631867675167-90a456a90863?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-putting-on-wireless-headphones-41531-large.mp4",
    desc: "Earbuds nirkabel dengan Active Noise Cancelling (ANC) tingkat lanjut, audio resolusi tinggi, serta audio spasial 360 derajat.",
    reviews: [
      { name: "Clarissa Devi", rating: 5, date: "01 Ags 2026", variant: "Warna: PUTIH", comment: "ANC-nya kedap banget, suara bass mantap dan treble sangat bening!" }
    ]
  },
  {
    id: 5,
    name: "Pad Ultra 11 Inch M2 128GB",
    price: 8990000,
    stock: 30,
    rating: 4.9,
    sold: 160,
    colors: ["GRAY", "SILVER"],
    colorMap: {
      "GRAY": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80",
      "SILVER": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-41528-large.mp4",
    desc: "Tablet serbaguna dengan layar Liquid Retina, kompatibel dengan Stylus Pen dan Magnetic Keyboard untuk produktivitas tinggi.",
    reviews: [
      { name: "Audrey Tampi", rating: 5, date: "29 Jul 2026", variant: "Warna: GRAY", comment: "Sangat cocok untuk ilustrasi digital dan editing video on-the-go." }
    ]
  },
  {
    id: 6,
    name: "Lumix Lens 4K Mirrorless Vlog Camera",
    price: 11200000,
    stock: 12,
    rating: 5.0,
    sold: 88,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
      "SILVER": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41532-large.mp4",
    desc: "Kamera mirrorless ringkas dengan perekaman video 4K 60fps, autofocus deteksi mata instan, ideal untuk vlogger dan pembuat konten.",
    reviews: [
      { name: "Nadia Vanessa", rating: 5, date: "25 Jul 2026", variant: "Warna: HITAM", comment: "Autofokus kilat dan Kualitas warna videonya sangat natural!" }
    ]
  },
  {
    id: 7,
    name: "PocketStation Handheld Gaming Console 512GB",
    price: 7490000,
    stock: 20,
    rating: 4.9,
    sold: 76,
    colors: ["HITAM", "PUTIH"],
    colorMap: {
      "HITAM": "https://images.unsplash.com/photo-1531525645387-7f14be1bbea5?auto=format&fit=crop&w=500&q=80",
      "PUTIH": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1531525645387-7f14be1bbea5?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-41528-large.mp4",
    desc: "Konsol game genggam portabel yang mampu menjalankan game PC kelas atas kapan saja dan di mana saja dengan sistem pendingin ganda.",
    reviews: [
      { name: "Gisca Amelia", rating: 5, date: "05 Ags 2026", variant: "Warna: HITAM", comment: "Sensasi main game PC berat di mana aja lancar jaya!" }
    ]
  },
  {
    id: 8,
    name: "KeyMaster Wireless Mechanical Keyboard RGB",
    price: 1250000,
    stock: 45,
    rating: 4.8,
    sold: 110,
    colors: ["HITAM", "PUTIH"],
    colorMap: {
      "HITAM": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80",
      "PUTIH": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-41528-large.mp4",
    desc: "Keyboard mekanikal kustom dengan koneksi tri-mode (Bluetooth, 2.4G, Kabel), RGB per-key, dan hotswappable switch.",
    reviews: [
      { name: "Lianna Felicia", rating: 5, date: "04 Ags 2026", variant: "Warna: HITAM", comment: "Typing feel empuk dan suara ketukannya thocky banget!" }
    ]
  },
  {
    id: 9,
    name: "AuraSound Studio Wireless ANC Headphones",
    price: 3450000,
    stock: 25,
    rating: 4.7,
    sold: 198,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
      "SILVER": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-putting-on-wireless-headphones-41531-large.mp4",
    desc: "Headphone over-ear dengan kenyamanan busa memory foam, resolusi audio Hi-Res, Noise Cancelling aktif, dan baterai hingga 50 jam.",
    reviews: [
      { name: "Shafira Aris", rating: 5, date: "06 Ags 2026", variant: "Warna: HITAM", comment: "Bantalan telinga empuk tidak bikin sakit meski dipakai bekerja seharian." }
    ]
  },
  {
    id: 10,
    name: "EchoSphere AI Smart Home Speaker",
    price: 890000,
    stock: 60,
    rating: 4.9,
    sold: 140,
    colors: ["BLACK", "WHITE"],
    colorMap: {
      "BLACK": "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=500&q=80",
      "WHITE": "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-using-a-smartwatch-41530-large.mp4",
    desc: "Speaker pintar dengan asisten AI suara terintegrasi untuk mengontrol seluruh perangkat smart home Anda serta audio 360-derajat.",
    reviews: [
      { name: "Aurelia Cinta", rating: 5, date: "03 Ags 2026", variant: "Warna: BLACK", comment: "Respon perintah suara cepat dan suaranya lantang menggelegar." }
    ]
  },
  {
    id: 11,
    name: "SkyHawk 4K Mini GPS Drone Combo",
    price: 6800000,
    stock: 18,
    rating: 5.0,
    sold: 64,
    colors: ["GRAY", "WHITE"],
    colorMap: {
      "GRAY": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80",
      "WHITE": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41532-large.mp4",
    desc: "Drone lipat berukuran ringkas dengan transmisi video 4K HDR, gimbal 3-axis stabil, dan waktu terbang hingga 31 menit.",
    reviews: [
      { name: "Kania Putri", rating: 5, date: "01 Ags 2026", variant: "Warna: GRAY", comment: "Stabilizer kameranya tenang banget walau diterpa angin kencang!" }
    ]
  }
];

let orders = [
  {
    id: 'PHS-882910',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Seraphine Azellie',
    items: [{ product: products[0], color: 'TITANIUM', qty: 2 }],
    total: 37015000,
    payment: 'Transfer Bank (BCA)',
    status: 'Diproses'
  },
  {
    id: 'PHS-882911',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Rylee Karlanna',
    items: [{ product: products[1], color: 'HITAM', qty: 1 }],
    total: 25005000,
    payment: 'E-Wallet (Gopay)',
    status: 'Selesai'
  },
  {
    id: 'PHS-882890',
    date: '02 Ags 2026',
    category: 'bulanan',
    customer: 'Vathea Anasya',
    items: [{ product: products[2], color: 'HITAM', qty: 2 }],
    total: 4995000,
    payment: 'Transfer Bank (Mandiri)',
    status: 'Selesai'
  },
  {
    id: 'PHS-882855',
    date: '28 Jul 2026',
    category: 'bulanan',
    customer: 'Clarissa Devi',
    items: [{ product: products[3], color: 'PUTIH', qty: 1 }],
    total: 1865000,
    payment: 'COD (Bayar di Tempat)',
    status: 'Selesai'
  },
  {
    id: 'PHS-881200',
    date: '15 Mei 2026',
    category: 'tahunan',
    customer: 'Audrey Tampi',
    items: [{ product: products[4], color: 'GRAY', qty: 3 }],
    total: 26985000,
    payment: 'E-Wallet (ShopeePay)',
    status: 'Selesai'
  },
  {
    id: 'PHS-880512',
    date: '10 Jan 2026',
    category: 'tahunan',
    customer: 'Nadia Vanessa',
    items: [{ product: products[5], color: 'HITAM', qty: 1 }],
    total: 11215000,
    payment: 'Transfer Bank (BCA)',
    status: 'Selesai'
  }
];

let cart = [];
let selectedDetailProduct = null;
let selectedColor = '';
let selectedQuantity = 1;
let sheetTargetIndex = null;
let sheetActionMode = 'buy_now';
