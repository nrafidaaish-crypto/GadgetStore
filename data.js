let currentUser = null;
let selectedRole = 'customer';
let historyStack = [];

let products = [
  {
    id: 1,
    name: "Iphone 16 256GB",
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
    video: "ip16.mp4",
    desc: "iPhone 16 hadir dengan layar Super Retina XDR OLED 6,1 inci, ditenagai chip A18 (3 nm) yang kencang, RAM 8 GB, serta kamera utama Fusion 48 MP dengan susunan vertikal. Ponsel ini dilengkapi tombol baru Camera Control dan Action Button, serta pilihan warna: Hitam, Putih, Pink, Hijau Kebiruan, dan Ultramarine",
    reviews: [
      { name: "Seraphine Azellie", rating: 5, date: "02 Ags 2026", variant: "Warna: TITANIUM", comment: "Layar OLED-nya super tajam, kamera malamnya jernih banget tanpa noise! ❤️❤️" },
      { name: "Rylee Karlanna", rating: 5, date: "28 Jul 2026", variant: "Warna: HITAM", comment: "Performa gaming tanpa lag dan daya tahan baterai seharian penuhh." }
    ]
  },
  {
    id: 2,
    name: "Apple Iphone 13 32GB",
    price: 8990000,
    stock: 15,
    rating: 5.0,
    sold: 142,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "ip13.jpg",
      "SILVER": " ip13.jpg"
    },
    img: "ip13.jpg",
    video: "ip13.mp4",
    desc: "Apple iPhone 13 (dirilis 2021) dibekali layar Super Retina XDR OLED 6,1 inci, chipset Apple A15 Bionic (5 nm), RAM 4 GB, penyimpanan 128GB/256GB/512GB, kamera ganda belakang 12 MP (utama dan ultra-wide), kamera depan 12 MP, serta baterai 3.240 mAh dengan port Lightning.",
    reviews: [
      { name: "Vathea Anasya", rating: 5, date: "03 Ags 2026", variant: "Warna: HITAM", comment: "Game AAA rata kanan dapet 120+ FPS! System pendinginnya sangat adem." }
    ]
  },
  {
    id: 3,
    name: "Iphone 17 air dengan kamera depan 18 MP dengan fitur Center Stage.",
    price: 2490000,
    stock: 50,
    rating: 4.8,
    sold: 230,
    colors: ["HITAM", "SILVER", "PINK"],
    colorMap: {
      "HITAM": "ip17air.jpg",
      "SILVER": "ip17air.jpg",
      "PINK": "ip17air.jpg"
    },
    img: "ip17air.jpg",
    video: "ip17air.mp4",
    desc: "iPhone Air (sering disebut iPhone 17 Air) hadir sebagai lini iPhone tertipis dari Apple dengan ketebalan hanya sekitar 5,6 mm dan bobot ringan 145 gram. Ponsel ini mengusung layar Super Retina XDR OLED 6,5 inci (120 Hz ProMotion, 3000 nits), ditenagai chip Apple A19 Pro, RAM 12 GB, kamera utama tunggal Fusion 48 MP, kamera depan 18 MP, serta dukungan khusus eSIM",
    reviews: [
      { name: "Yesava Maureen", rating: 5, date: "04 Ags 2026", variant: "Warna: SILVR", comment: "Sensor detak jantung dan pelacak tidurnya sangat akurat. Tampilan layarnya jernih!" }
    ]
  },
  {
    id: 4,
    name: "Iphone 18 Pro dengan ukuran layar 6,3 inci dengan panel OLED ProMotion 120Hz.",
    price: 1850000,
    stock: 40,
    rating: 4.7,
    sold: 195,
    colors: ["PUTIH", "HITAM", "PINK"],
    colorMap: {
      "PUTIH": "ip18pro.jpg",
      "HITAM": "ip18pro.jpg",
      "PINK": "ip18pro.jpg"
    },
    img: "ip18pro.jpg",
    video: "ip18pro.mp4",
    desc: "iPhone 18 Pro adalah calon ponsel pintar flagship dari Apple yang dirumorkan rilis pada September 2026. Perangkat ini kabarnya dibekali layar 6,3 inci dengan Dynamic Island lebih kecil, ditenagai cip Apple A20 Pro berfabrikasi 2nm, RAM 12GB, serta inovasi kamera dengan fitur variable aperture.",
    reviews: [
      { name: "Clarissa Devi", rating: 5, date: "01 Ags 2026", variant: "Warna: PUTIH", comment: "ANC-nya kedap banget, suara bass mantap dan treble sangat bening!" }
    ]
  },
  {
    id: 5,
    name: "Iphone 16 Pro Max Super Retina XDR OLED 6,9 inci, resolusi 2868 x 1320 piksel, refresh rate 120 Hz (ProMotion)",
    price: 8990000,
    stock: 30,
    rating: 4.9,
    sold: 160,
    colors: ["GRAY", "SILVER"],
    colorMap: {
      "GRAY": "ip16promax.jpg",
      "SILVER": "ip16promax.jpg"
    },
    img: "ip16promax.jpg",
    video: "ip16promax.mp4",
    desc: "iPhone 16 Pro Max adalah ponsel flagship terbesar dari Apple yang dirilis pada September 2024. Ponsel ini dibekali layar Super Retina XDR OLED 6,9 inci, chip Apple A18 Pro yang mendukung kecerdasan buatan, sistem kamera pro 48 MP dengan tombol Camera Control baru, serta baterai berkapasitas 4.685 mAh yang tahan lama",
    reviews: [
      { name: "Audrey Tampi", rating: 5, date: "29 Jul 2026", variant: "Warna: GRAY", comment: "Sangat cocok untuk ilustrasi digital dan editing video on-the-go." }
    ]
  },
  {
    id: 6,
    name: "Iphone 14 Pro dengan kamera ultra-wide 12 MP dan lensa telephoto 3x 12 MP.",
    price: 11200000,
    stock: 12,
    rating: 5.0,
    sold: 88,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "ip14pro.jpg",
      "SILVER": "ip14pro.jpg"
    },
    img: "ip14pro.jpg",
    video: "ip14pro.mp4",
    desc: "iPhone 14 Pro adalah ponsel pintar kelas atas dari Apple yang dirilis pada September 2022. Ponsel ini hadir dengan layar Super Retina XDR 6,1 inci, fitur interaktif Dynamic Island, kamera utama 48 MP, serta ditenagai oleh cip cepat Apple A16 Bionic.",
    reviews: [
      { name: "Nadia Vanessa", rating: 5, date: "25 Jul 2026", variant: "Warna: HITAM", comment: "Autofokus kilat dan Kualitas warna videonya sangat natural!" }
    ]
  },
  {
    id: 7,
    name: "Iphone 17 dengan kapasitas penyimpanan 256 GB dan 512 GB",
    price: 7490000,
    stock: 20,
    rating: 4.9,
    sold: 76,
    colors: ["HITAM", "PUTIH"],
    colorMap: {
      "HITAM": "ip17.jpg",
      "PUTIH": "ip17.jpg"
    },
    img: "ip17.jpg",
    video: "ip17.mp4",
    desc: "iPhone 17 hadir dengan layar Super Retina XDR OLED 6,3 inci berteknologi ProMotion 120Hz, ditenagai chip Apple A19, serta dibekali kamera utama Fusion 48 MP dan kamera depan berfitur Center Stage. Ponsel ini menawarkan performa lebih tangguh dan efisiensi daya yang optimal.",
    reviews: [
      { name: "Gisca Amelia", rating: 5, date: "05 Ags 2026", variant: "Warna: HITAM", comment: "Sensasi main game PC berat di mana aja lancar jaya!" }
    ]
  },
  {
    id: 8,
    name: "Iphone 16 Pro dengan Kapasitas Batera 3582 mAh dengan pengisian daya cepat dan MagSafe.",
    price: 1250000,
    stock: 45,
    rating: 4.8,
    sold: 110,
    colors: ["HITAM", "PUTIH"],
    colorMap: {
      "HITAM": "ip16pro.jpg",
      "PUTIH": "ip16pro.jpg"
    },
    img: "ip16pro.jpg",
    video: "ip16pro.mp4",
    desc: "iPhone 16 Pro memiliki layar Super Retina XDR 6,3 inci, ditenagai chip Apple A18 Pro dengan RAM 8GB, serta dibekali kamera utama 48MP, ultrawide 48MP, dan telefoto 5x zoom. Ponsel ini menggunakan bodi titanium dengan berat 199 gram dan mendukung fitur tombol Kamera Control.",
    reviews: [
      { name: "Lianna Felicia", rating: 5, date: "04 Ags 2026", variant: "Warna: HITAM", comment: "Typing feel empuk dan suara ketukannya thocky banget!" }
    ]
  },
  {
    id: 9,
    name: "Iphone 17 Pro dengan Kapasitas RAM besar 12 GB untuk multitasking mulus.",
    price: 3450000,
    stock: 25,
    rating: 4.7,
    sold: 198,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "ip17pro.jpg",
      "SILVER": "ip17pro.jpg"
    },
    img: "ip17pro.jpg",
    video: "ip17pro.mp4",
    desc: "iPhone 17 Pro adalah ponsel pintar andal dari Apple yang rilis pada September 2025. Ponsel ini mengusung layar OLED 6,3 inci, bodi unibody aluminium, chip A19 Pro, RAM 12 GB, sistem tiga kamera belakang 48 MP, serta daya tahan baterai yang lebih kuat.",
    reviews: [
      { name: "Shafira Aris", rating: 5, date: "06 Ags 2026", variant: "Warna: HITAM", comment: "Bantalan telinga empuk tidak bikin sakit meski dipakai bekerja seharian." }
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
