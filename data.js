let selectedRole = 'customer';
let currentUser = null;
let savedCustomer = JSON.parse(localStorage.getItem('saved_customer')) || null;
let historyStack = [];

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
    desc: "iPhone 16 Pro Max dibekali layar Super Retina XDR OLED 6,9 inci, chip Apple A18 Pro yang mendukung kecerdasan buatan, serta sistem kamera pro 48 MP.",
    reviews: [
      { name: "Audrey Tampi", rating: 5, date: "29 Jul 2026", variant: "Warna: GRAY", comment: "Sangat cocok untuk ilustrasi digital dan editing video on-the-go." }
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
  }
];

let cart = [];
let selectedDetailProduct = null;
let selectedColor = '';
let selectedQuantity = 1;
let sheetTargetIndex = null;
let sheetActionMode = 'buy_now';
