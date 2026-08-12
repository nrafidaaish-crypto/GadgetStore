let selectedRole = 'customer';
let currentUser = null;
let savedCustomer = JSON.parse(localStorage.getItem('saved_customer')) || null;
let historyStack = [];

// TAMPUNG NOTIFIKASI KHUSUS UNTUK ADMIN (TIDAK MUNCUL DI PELANGGAN)
let adminNotificationsQueue = [];

let products = [
  {
    id: 1,
    name: "Iphone 16 256GB",
    price: 15499000,
    stock: 25,
    rating: 4.9,
    sold: 184,
    colors: ["TITANIUM", "HITAM", "SILVER", "BIRU"],
    colorMap: {
      "TITANIUM": "ip16.jpg",
      "HITAM": "ip16.jpg",
      "SILVER": "ip16.jpg",
      "BIRU": "ip16.jpg"
    },
    img: "ip16.jpg",
    video: "ip16.mp4",
    officialUrl: "https://www.apple.com/id/iphone-16/",
    desc: "iPhone 16 hadir dengan layar Super Retina XDR OLED 6,1 inci, ditenagai chip A18 (3 nm) yang kencang, RAM 8 GB, serta kamera utama Fusion 48 MP dengan susunan vertikal.",
    reviews: [
      { name: "Seraphine Azellie", rating: 5, date: "02 Ags 2026", variant: "Warna: TITANIUM", comment: "Layar OLED-nya super tajam, kamera malamnya jernih banget tanpa noise! ❤️❤️" },
      { name: "Rylee Karlanna", rating: 5, date: "28 Jul 2026", variant: "Warna: HITAM", comment: "Performa gaming tanpa lag dan daya tahan baterai seharian penuhh." }
    ]
  },
  {
    id: 2,
    name: "Apple Iphone 13 32GB",
    price: 8249000,
    stock: 15,
    rating: 5.0,
    sold: 142,
    colors: ["HITAM", "SILVER"],
    colorMap: {
      "HITAM": "ip13.jpg",
      "SILVER": "ip13.jpg"
    },
    img: "ip13.jpg",
    video: "ip13.mp4",
    officialUrl: "https://www.apple.com/id/iphone-13/",
    desc: "Apple iPhone 13 dibekali layar Super Retina XDR OLED 6,1 inci, chipset Apple A15 Bionic (5 nm), RAM 4 GB, penyimpanan 128GB/256GB/512GB, kamera ganda belakang 12 MP.",
    reviews: [
      { name: "Vathea Anasya", rating: 5, date: "03 Ags 2026", variant: "Warna: HITAM", comment: "Game AAA rata kanan dapet 120+ FPS! System pendinginnya sangat adem." }
    ]
  },
  {
    id: 3,
    name: "Iphone 17 air dengan kamera depan 18 MP dengan fitur Center Stage.",
    price: 16999000,
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
    officialUrl: "https://www.apple.com/id/iphone/",
    desc: "iPhone Air hadir sebagai lini iPhone tertipis dari Apple dengan ketebalan hanya sekitar 5,6 mm dan bobot ringan 145 gram. Ponsel ini mengusung layar Super Retina XDR OLED 6,5 inci.",
    reviews: [
      { name: "Yesava Maureen", rating: 5, date: "04 Ags 2026", variant: "Warna: SILVER", comment: "Sensor detak jantung dan pelacak tidurnya sangat akurat. Tampilan layarnya jernih!" }
    ]
  },
  {
    id: 4,
    name: "Iphone 18 Pro dengan ukuran layar 6,3 inci dengan panel OLED ProMotion 120Hz.",
    price: 24999000,
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
    officialUrl: "https://www.apple.com/id/iphone-pro/",
    desc: "iPhone 18 Pro dibekali layar 6,3 inci dengan Dynamic Island lebih kecil, ditenagai cip Apple A20 Pro berfabrikasi 2nm, RAM 12GB, serta inovasi kamera dengan fitur variable aperture.",
    reviews: [
      { name: "Clarissa Devi", rating: 5, date: "01 Ags 2026", variant: "Warna: PUTIH", comment: "ANC-nya kedap banget, suara bass mantap dan treble sangat bening!" }
    ]
  },
  {
    id: 5,
    name: "Iphone 16 Pro Max Super Retina XDR OLED 6,9 inci",
    price: 20499000, 
    stock: 30,
    rating: 4.9,
    sold: 160,
    colors: ["GRAY", "SILVER"],
    colorMap: {
      "GRAY": "ip16prmx.jpg",
      "SILVER": "ip16prmx.jpg"
    },
    img: "ip16prmx.jpg",
    video: "ip16promax.mp4",
    officialUrl: "https://www.apple.com/id/iphone-16-pro/",
    desc: "iPhone 16 Pro Max dibekali layar Super Retina XDR OLED 6,9 inci, chip Apple A18 Pro yang mendukung kecerdasan buatan, serta sistem kamera pro 48 MP.",
    reviews: [
      { name: "Audrey Tampi", rating: 5, date: "29 Jul 2026", variant: "Warna: GRAY", comment: "Sangat cocok untuk ilustrasi digital dan editing video on-the-go." }
    ]
  },
  {
    id: 6,
    name: "Iphone 14 Pro dengan kamera ultra-wide 12 MP dan lensa telephoto 3x 12 MP.",
    price: 11500000,
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
    officialUrl: "https://www.apple.com/id/iphone/",
    desc: "iPhone 14 Pro adalah ponsel pintar kelas atas dari Apple dengan layar Super Retina XDR 6,1 inci, Dynamic Island, dan kamera utama 48 MP.",
    reviews: [
      { name: "Nadia Vanessa", rating: 5, date: "25 Jul 2026", variant: "Warna: HITAM", comment: "Autofokus kilat dan Kualitas warna videonya sangat natural!" }
    ]
  },
  {
    id: 7,
    name: "Iphone 17 dengan kapasitas penyimpanan 256 GB dan 512 GB",
    price: 17749000,
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
    officialUrl: "https://www.apple.com/id/iphone/",
    desc: "iPhone 17 hadir dengan layar Super Retina XDR OLED 6,3 inci berteknologi ProMotion 120Hz, ditenagai chip Apple A19.",
    reviews: [
      { name: "Gisca Amelia", rating: 5, date: "05 Ags 2026", variant: "Warna: HITAM", comment: "Sensasi main game PC berat di mana aja lancar jaya!" }
    ]
  },
  {
    id: 8,
    name: "Iphone 16 Pro dengan Kapasitas Baterai 3582 mAh dengan pengisian daya cepat",
    price: 17499000,
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
    officialUrl: "https://www.apple.com/id/iphone-16-pro/",
    desc: "iPhone 16 Pro memiliki layar Super Retina XDR 6,3 inci, ditenagai chip Apple A18 Pro dengan bodi titanium tahan lama.",
    reviews: [
      { name: "Lianna Felicia", rating: 5, date: "04 Ags 2026", variant: "Warna: HITAM", comment: "Typing feel empuk dan suara ketukannya thocky banget!" }
    ]
  },
  {
    id: 9,
    name: "Iphone 17 Pro dengan Kapasitas RAM besar 12 GB",
    price: 22999000,
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
    officialUrl: "https://www.apple.com/id/iphone/",
    desc: "iPhone 17 Pro mengusung layar OLED 6,3 inci, bodi unibody aluminium, chip A19 Pro, RAM 12 GB, serta sistem tiga kamera.",
    reviews: [
      { name: "Shafira Aris", rating: 5, date: "06 Ags 2026", variant: "Warna: HITAM", comment: "Bantalan telinga empuk tidak bikin sakit meski dipakai bekerja seharian." }
    ]
  }
];

let orders = [
  {
    id: 'AZR-247715',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Azana',
    phone: '085633252483',
    email: 'aza@gmail.com',
    address: 'Jl. mangkang kulon SMK Texmaco Semarang Jawa Tengah Indonesia',
    items: [{ product: products[4], color: 'GRAY', qty: 1 }],
    shippingFee: 5000,
    total: 22004000,
    payment: 'COD',
    status: 'Dikemas'
  },
  {
    id: 'AZR-882910',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Seraphine Azellie',
    phone: '08123456789',
    email: 'seraphineazellie@gmail.com',
    address: 'Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan',
    items: [{ product: products[0], color: 'TITANIUM', qty: 2 }],
    shippingFee: 15000,
    total: 31013000,
    payment: 'Transfer Bank (BCA)',
    status: 'Diproses'
  }
];

let cart = [];
let selectedDetailProduct = null;
let selectedColor = '';
let selectedQuantity = 1;
let sheetTargetIndex = null;
let sheetActionMode = 'buy_now';
