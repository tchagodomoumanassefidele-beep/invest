const authView = document.getElementById('authView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function initials(first, last) {
  return ((first.trim()[0] || '') + (last.trim()[0] || '')).toUpperCase() || 'NI';
}

function enterDemo(first, last) {
  first = first.trim();
  last = last.trim();
  if (!first || !last) {
    showToast('Veuillez renseigner votre prénom et votre nom.');
    return;
  }
  document.getElementById('sideName').textContent = `${first} ${last}`;
  document.getElementById('greeting').textContent = `Bonjour, ${first} 👋`;
  document.getElementById('profileFullName').textContent = `${first} ${last}`;
  const mark = initials(first, last);
  ['avatarInitials', 'topAvatar', 'profileAvatar'].forEach(id => {
    document.getElementById(id).textContent = mark;
  });
  authView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  showSection('overview');
  const now = new Date();
  document.getElementById('todayDate').textContent = now.toLocaleDateString('fr-FR', {day:'numeric', month:'short', year:'numeric'});
  window.scrollTo({top: 0, behavior: 'smooth'});
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  enterDemo(document.getElementById('firstName').value, document.getElementById('lastName').value);
});

document.getElementById('googleDemo').addEventListener('click', () => {
  showToast('Connexion Google simulée : entrez votre nom et votre prénom.');
});

function showSection(section) {
  const sections = ['overview', 'investments', 'activity', 'profile'];
  sections.forEach(name => {
    const sectionEl = document.getElementById(`${name}Section`);
    if (sectionEl) sectionEl.classList.toggle('hidden', name !== section);
  });
  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.toggle('active', link.dataset.section === section);
  });
  closeMenu();
}

document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showSection(link.dataset.section);
  });
});

document.querySelectorAll('[data-section-link]').forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.sectionLink));
});

document.querySelectorAll('[data-demo-action]').forEach(button => {
  button.addEventListener('click', () => showToast(`${button.dataset.demoAction} : fonction de démonstration uniquement.`));
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  dashboardView.classList.add('hidden');
  authView.classList.remove('hidden');
  loginForm.reset();
  closeMenu();
  window.scrollTo({top: 0, behavior: 'smooth'});
  showToast('Vous avez quitté la maquette.');
});

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('mobileOverlay');
function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}
document.getElementById('menuToggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', closeMenu);
