// Mengambil data pelanggan yang tersimpan dari localStorage (jika ada)
let savedCustomer = JSON.parse(localStorage.getItem('saved_customer')) || null;

function chooseRole(role) {
  selectedRole = role;
  
  // JIKA PELANGGAN & SUDAH ADA DATA TERSIMPAN -> LANGSUNG LOGIN
  if (role === 'customer' && savedCustomer) {
    currentUser = savedCustomer;
    showWelcomeScreen();
    return; // Hentikan fungsi agar tidak perlu membuka form login
  }

  const roleTitle = document.getElementById('login-role-title');
  const roleSubtitle = document.getElementById('login-role-subtitle');
  const userLabel = document.getElementById('login-user-label');
  
  const userInput = document.getElementById('login-username');
  const emailInput = document.getElementById('login-email');
  const phoneInput = document.getElementById('login-phone');
  const passInput = document.getElementById('login-password');

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
    roleSubtitle.innerText = "Silakan masukkan data diri Anda (Pertama Kali)";
    userLabel.innerText = "Username Pelanggan";
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('login-page').classList.add('active');
}

function goToRoleSelection() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('role-selection-page').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  const u = document.getElementById('login-username').value.trim();
  const email = document.getElementById('login-email').value.trim();
  const phone = document.getElementById('login-phone').value.trim();
  const p = document.getElementById('login-password').value.trim();

  if (selectedRole === 'admin') {
    if (u === 'Hiraya Georgienne' && p === 'HG' && email === 'hirayagienne@gmail.com' && phone === '0828') {
      currentUser = { 
        role: 'admin', 
        name: 'Hiraya Georgienne',
        email: 'hirayagienne@gmail.com',
        phone: '0828'
      };
      showWelcomeScreen();
    } else {
      showToast("Kredensial Admin Salah! Periksa kembali data Anda.");
    }
  } else {
    // JIKA PELANGGAN BARU PERTAMA KALI LOGIN
    // Ambil input user atau gunakan nilai default jika kosong
    currentUser = { 
      role: 'customer', 
      name: u || 'Seraphine Azellie',
      email: email || 'seraphineazellie@gmail.com',
      phone: phone || '08123456789'
    };

    // SIMPAN DATA PELANGGAN KE LOCALSTORAGE AGAR TIDAK PERLU INPUT LAGI
    savedCustomer = currentUser;
    localStorage.setItem('saved_customer', JSON.stringify(currentUser));

    showWelcomeScreen();
  }
}

function showWelcomeScreen() {
  historyStack = [];
  const heading = document.getElementById('welcome-heading');
  const subtext = document.getElementById('welcome-subtext');

  if (currentUser.role === 'admin') {
    heading.innerText = "Selamat Datang, Admin!";
    subtext.innerHTML = `Selamat bertugas di Gadget Store, <br><strong style="font-size:18px; color:var(--primary);">${currentUser.name}</strong>`;
  } else {
    heading.innerText = "Selamat Datang!";
    subtext.innerHTML = `Selamat datang di Gadget Store, <br><strong style="font-size:18px; color:var(--primary);">${currentUser.name}</strong>`;
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('welcome-page').classList.add('active');
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
}

function proceedToMainApp() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('show');

  if (currentUser.role === 'admin') {
    completeLogin('admin-dashboard-page', "Selamat bertugas Admin!");
  } else {
    completeLogin('customer-home', `Selamat berbelanja, ${currentUser.name}!`);
  }
}

function completeLogin(targetPage, message) {
  historyStack = [];
  setupLayoutForUser();
  showToast(message);
  navigateTo(targetPage);
}

function handleLogout() {
  currentUser = null;
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
  
  goToRoleSelection();
  historyStack = [];
  showToast("Anda telah keluar dari akun");
}

// OPTIONAL: Panggil fungsi ini jika ingin menghapus data pelanggan terdaftar (Reset Akun Pelanggan)
function clearSavedCustomer() {
  localStorage.removeItem('saved_customer');
  savedCustomer = null;
  showToast("Data identitas pelanggan telah dihapus.");
}
