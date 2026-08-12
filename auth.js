// 1. PASTIKAN DEKLARASI VARIABEL GLOBAL INI ADA DI PALING ATAS FILE JS
let selectedRole = '';
let currentUser = null;
let savedCustomer = JSON.parse(localStorage.getItem('saved_customer')) || null;

function chooseRole(role) {
  selectedRole = role; // Simpan peran yang dipilih
  
  if (role === 'customer' && savedCustomer) {
    currentUser = savedCustomer;
    showWelcomeScreen();
    return;
  }

  const roleTitle = document.getElementById('login-role-title');
  const roleSubtitle = document.getElementById('login-role-subtitle');
  const userLabel = document.getElementById('login-user-label');
  
  const userInput = document.getElementById('login-username');
  const emailInput = document.getElementById('login-email');
  const phoneInput = document.getElementById('login-phone');
  const passInput = document.getElementById('login-password');

  // Kosongkan form setiap kali memilih peran
  userInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  passInput.value = "";

  if (role === 'admin') {
    roleTitle.innerText = "Login Admin (Penjual)";
    roleSubtitle.innerText = "Silakan masukkan kredensial Admin Gadget Store";
    userLabel.innerText = "Username Admin";
  } else {
    roleTitle.innerText = "Login Pelanggan";
    roleSubtitle.innerText = "Silakan masukkan data diri Anda";
    userLabel.innerText = "Username Pelanggan";
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('login-page').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  
  // Ambil input dan bersihkan spasi di awal/akhir
  const u = document.getElementById('login-username').value.trim();
  const email = document.getElementById('login-email').value.trim();
  const phone = document.getElementById('login-phone').value.trim();
  const p = document.getElementById('login-password').value.trim();

  if (selectedRole === 'admin') {
    // Pengubahan ke .toLowerCase() agar tidak masalah jika mengetik huruf besar/kecil
    const validUser = u.toLowerCase() === 'hiraya georgienne';
    const validPass = p === 'HG'; // Password tetap kapital
    const validEmail = email.toLowerCase() === 'hirayagienne@gmail.com' || email === ''; 
    const validPhone = phone === '0828' || phone === '';

    // Mengecek Username & Password (Email & Phone opsional jika tidak diisi di form)
    if (validUser && validPass && validEmail && validPhone) {
      currentUser = { 
        role: 'admin', 
        name: 'Hiraya Georgienne',
        email: 'hirayagienne@gmail.com',
        phone: '0828'
      };
      showWelcomeScreen();
    } else {
      showToast("Kredensial Admin Salah! Periksa kembali Username dan Password Anda.");
    }
  } else {
    // Login Pelanggan (Otomatis Simpan ke LocalStorage)
    currentUser = { 
      role: 'customer', 
      name: u || 'Seraphine azellie',
      email: email || 'seraphineazellie@gmail.com',
      phone: phone || '0812'
    };

    savedCustomer = currentUser;
    localStorage.setItem('saved_customer', JSON.stringify(currentUser));

    showWelcomeScreen();
  }
}
