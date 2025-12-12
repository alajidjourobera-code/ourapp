// app.js - simple client-side mock login using data.json
let users = [];

const loginSection = document.getElementById('login-section');
const protectedSection = document.getElementById('protected-section');
const usersList = document.getElementById('users-list');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const loginMsg = document.getElementById('login-msg');
const userNameSpan = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

async function loadData() {
  try {
    const res = await fetch('data.json', {cache: "no-store"});
    users = await res.json();
    renderUsersList();
  } catch (err) {
    console.error('Failed to load data.json', err);
    loginMsg.textContent = 'Cannot load data.json — check file or run via a local server.';
  }
}

function renderUsersList() {
  usersList.innerHTML = users.map(u => `<li>${u.name} — ${u.email}</li>`).join('');
}

loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  loginMsg.textContent = '';
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();

  // Find user in the exported DB (data.json)
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    loginMsg.textContent = 'User not found.';
    return;
  }

  // Mock password check (INSECURE — only for Week 6 demo)
  if (user.password !== pass) {
    loginMsg.textContent = 'Incorrect password.';
    return;
  }

  // login success
  userNameSpan.textContent = user.name;
  loginSection.classList.add('hidden');
  protectedSection.classList.remove('hidden');
});

logoutBtn.addEventListener('click', function(){
  loginSection.classList.remove('hidden');
  protectedSection.classList.add('hidden');
  emailInput.value = '';
  passInput.value = '';
  loginMsg.textContent = '';
});

// initialize
loadData();
