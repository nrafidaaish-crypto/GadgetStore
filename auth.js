function chooseRole(role) {
  selectedRole = role; 

  // Menyiapkan elemen form login
  const roleTitle = document.getElementById('login-role-title');
  const roleSubtitle = document.getElementById('login-role-subtitle');
  const userLabel = document.getElementById('login-user-label');
  
  const userInput = document.getElementById('login-username');
  const emailInput = document.getElementById('login-email');
  const phoneInput = document.getElementById('login-phone');
  const addressInput = document.getElementById('login-address');
  const passInput = document.getElementById('login-password');

  const emailGroup = document.getElementById('login-email-group');
  const phoneGroup = document.getElementById('login-phone-group');
  const addressGroup = document.getElementById('login-address-group');

  // Kosongkan/reset nilai input setiap kali tombol pilih peran diklik
  if (userInput) userInput.value = "";
  if (emailInput) emailInput.value = "";
  if (phoneInput) phoneInput.value = "";
  if (addressInput) addressInput.value = "";
  if (passInput) passInput.value = "";

  if (role === 'admin') {
    roleTitle.innerText = "Login Admin (Penjual)";
    roleSubtitle.innerText = "Silakan masukkan kredensial Admin Gadget Store";
    userLabel.innerText = "Username Admin";

    // Sembunyikan Email, Phone & Alamat khusus Admin
    if (emailGroup) emailGroup.style.display = 'none';
    if (phoneGroup) phoneGroup.style.display = 'none';
    if (addressGroup) addressGroup.style.display = 'none';

    // Hapus atribut required untuk Admin
    if (emailInput) emailInput.removeAttribute('required');
    if (phoneInput) phoneInput.removeAttribute('required');
    if (addressInput) addressInput.removeAttribute('required');
  } else {
    roleTitle.innerText = "Login Pelanggan";
    roleSubtitle.innerText = "Silakan masukkan data diri Anda";
    userLabel.innerText = "Username Pelanggan";

    // Tampilkan Email, Phone & Alamat untuk Pelanggan
    if (emailGroup) emailGroup.style.display = 'block';
    if (phoneGroup) phoneGroup.style.display = 'block';
    if (addressGroup) addressGroup.style.display = 'block';

    // Wajibkan pengisian untuk Pelanggan
    if (emailInput) emailInput.setAttribute('required', 'true');
    if (phoneInput) phoneInput.setAttribute('required', 'true');
    if (addressInput) addressInput.setAttribute('required', 'true');
  }

  // Tampilkan halaman Login
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('login-page').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  
  const u = document.getElementById('login-username').value.trim();
  const emailInput = document.getElementById('login-email');
  const phoneInput = document.getElementById('login-phone');
  const addressInput = document.getElementById('login-address');
  const p = document.getElementById('login-password').value.trim();

  const email = emailInput ? emailInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';

  if (selectedRole === 'admin') {
    const validUser = u.toLowerCase() === 'hiraya georgienne';
    const validPass = p === 'HG'; 

    if (validUser && validPass) {
      currentUser = { 
        role: 'admin', 
        name: 'Hiraya Georgienne',
        email: 'hirayagienne@gmail.com',
        phone: '082839103746',
        address: 'HQ Jakarta Selatan'
      };
      showWelcomeScreen();
    } else {
      showToast("Kredensial Admin Salah! Periksa kembali Username dan Password Anda.");
    }
  } else {
    // Simpan data login pelanggan termasuk Alamat Lengkap
    currentUser = { 
      role: 'customer', 
      name: u || 'Seraphine Azellie',
      email: email || 'seraphineazellie@gmail.com',
      phone: phone || '08123456789',
      address: address || 'Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan'
    };

    savedCustomer = currentUser;
    localStorage.setItem('saved_customer', JSON.stringify(currentUser));
    showWelcomeScreen();
  }
}

function showWelcomeScreen() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const welcomePage = document.getElementById('welcome-page');
  const heading = document.getElementById('welcome-heading');
  const subtext = document.getElementById('welcome-subtext');

  if (currentUser.role === 'admin') {
    heading.innerText = `Selamat Datang, Admin ${currentUser.name}!`;
    subtext.innerText = "Anda memiliki akses penuh untuk mengelola katalog gadget, memproses pesanan, serta memantau laporan penjualan toko.";
  } else {
    heading.innerText = `Selamat Datang, ${currentUser.name}!`;
    subtext.innerText = "Jelajahi berbagai pilihan gadget premium dengan promo menarik dan garansi resmi.";
  }

  welcomePage.classList.add('active');
}

function proceedToMainApp() {
  setupLayoutForUser();
  if (currentUser.role === 'admin') {
    navigateTo('admin-dashboard-page');
  } else {
    renderCustomerProfile();
    navigateTo('customer-home');
  }
}

function goToRoleSelection() {
  historyStack = [];
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('role-selection-page').classList.add('active');
}

function handleLogout() {
  if (confirm("Apakah Anda yakin ingin keluar dari akun?")) {
    if (currentUser?.role === 'customer') {
      localStorage.removeItem('saved_customer');
      savedCustomer = null;
    }
    currentUser = null;
    goToRoleSelection();
    showToast("Berhasil keluar akun.");
  }
}
