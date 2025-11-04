/* shared.js — Bartr core shared behaviors
   - Active nav highlighting
   - Notifications panel
   - Hamburger
   - Friend mock profiles modal
   - Escape/Click-away handling
*/

// ========= Active Nav =========
(function activateNav() {
  try {
    const here = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header .nav-link, .hamburger-nav .hamburger-link');
    navLinks.forEach(a => {
      // strip any prior state
      a.classList.remove('active', 'nav-link-featured');
      // normalize href target
      const href = (a.getAttribute('href') || '').split('/').pop();
      if (href && href === here) {
        a.classList.add('active', 'nav-link-featured');
      }
    });
  } catch (_) {}
})();

// ========= Hamburger =========
function toggleMenu() {
  let menu = document.getElementById('hamburger-menu');
  if (!menu) {
    const menuHTML = `
      <div id="hamburger-menu" class="hamburger-menu active">
        <div class="hamburger-overlay" onclick="toggleMenu()"></div>
        <div class="hamburger-content">
          <div class="hamburger-header">
            <h3 class="text-xl font-black text-gray-900">Menu</h3>
            <button onclick="toggleMenu()" class="close-btn">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav class="hamburger-nav">
            <a href="index.html" class="hamburger-link">Home</a>
            <a href="browse.html" class="hamburger-link">Trade</a>
            <a href="rideshare.html" class="hamburger-link">Rideshare</a>
            <a href="community.html" class="hamburger-link">Community</a>
            <div class="border-t border-gray-200 my-4"></div>
            <a href="how-it-works.html" class="hamburger-link">How It Works</a>
            <a href="about.html" class="hamburger-link">About</a>
            <a href="contact.html" class="hamburger-link">Contact</a>
          </nav>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    document.body.style.overflow = 'hidden';
    // run highlighter again for the menu
    (function rehighlight() {
      const here = location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('#hamburger-menu .hamburger-link').forEach(a => {
        a.classList.remove('active', 'nav-link-featured');
        const href = (a.getAttribute('href') || '').split('/').pop();
        if (href === here) a.classList.add('active', 'nav-link-featured');
      });
    })();
  } else {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      document.body.style.overflow = 'auto';
      setTimeout(() => menu.remove(), 300);
    } else {
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
}

// ========= Notifications =========
function toggleNotifications() {
  let panel = document.getElementById('notifications-panel');
  if (!panel) {
    const panelHTML = `
      <div id="notifications-panel" class="notifications-panel active">
        <div class="notifications-header">
          <h3 class="text-lg font-bold text-gray-900">Notifications</h3>
          <button onclick="toggleNotifications()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="notifications-body">
          <div class="notification-item unread" onclick="handleNotificationClick(this)">
            <div class="notification-icon bg-blue-100 text-blue-600">🔁</div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">New trade offer received</p>
              <p class="text-xs text-gray-600">Sarah Kim wants to trade for your MacBook Pro</p>
              <p class="text-xs text-gray-500 mt-1">5 minutes ago</p>
            </div>
          </div>
          <div class="notification-item unread" onclick="handleNotificationClick(this)">
            <div class="notification-icon bg-green-100 text-green-600">👥</div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">New friend request</p>
              <p class="text-xs text-gray-600">Alex Chen sent you a friend request</p>
              <p class="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>
          </div>
        </div>
        <div class="notifications-footer">
          <button onclick="markAllRead()" class="text-sm font-semibold text-[#1A8B8B] hover:text-[#157070]">Mark all as read</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
  } else {
    panel.classList.toggle('active');
  }
}
function handleNotificationClick(el){ el.classList.remove('unread'); updateNotificationBadge(); }
function markAllRead(){ document.querySelectorAll('.notification-item.unread').forEach(n=>n.classList.remove('unread')); updateNotificationBadge(); }
function updateNotificationBadge(){
  const unread = document.querySelectorAll('.notification-item.unread').length;
  document.querySelectorAll('.notification-badge').forEach(b=>{
    if (unread>0){ b.textContent = unread; b.style.display='flex'; } else { b.style.display='none'; }
  });
}

// ========= Friend Profiles (mock) =========
const MOCK_PROFILES = {
  "Alex Chen": {
    avatar: "https://i.pravatar.cc/150?img=33",
    bio: "Photographer & cyclist. Trading lenses, camera bags, and bike tune-ups.",
    skills: ["Photography", "Editing", "Road Bike Maintenance"],
    rating: 4.8,
    items: ["Sony 50mm f/1.8", "Peak Design Sling", "Giro Helmet (M)"]
  },
  "Sarah Kim": {
    avatar: "https://i.pravatar.cc/150?img=45",
    bio: "Designer & weekend guitarist. Trading poster design and pedals.",
    skills: ["Graphic Design", "Illustration", "Figma"],
    rating: 4.9,
    items: ["MXR Carbon Copy", "Fender Strap", "Custom Posters (A2)"]
  },
  "Mike Johnson": {
    avatar: "https://i.pravatar.cc/150?img=22",
    bio: "Barista + hobby coder. Trading latte art workshops and RasPi kits.",
    skills: ["Latte Art", "Node.js", "Raspberry Pi"],
    rating: 4.7,
    items: ["RasPi 4 Kit", "Arduino Nano", "Coffee Workshop (1hr)"]
  }
};

function openMockProfile(name){
  const data = MOCK_PROFILES[name]; if (!data) return alert("Profile not found.");
  const html = `
    <div id="mock-profile-modal" class="modal-modern active">
      <div class="modal-overlay" onclick="closeMockProfile()"></div>
      <div class="modal-container">
        <div class="modal-header-modern">
          <div class="flex items-center gap-3">
            <img src="${data.avatar}" alt="${name}" class="w-12 h-12 rounded-xl border-2 border-gray-100 object-cover"/>
            <div>
              <h3 class="text-2xl font-black text-gray-900">${name}</h3>
              <div class="text-sm text-gray-600">⭐ ${data.rating.toFixed(1)} • Verified</div>
            </div>
          </div>
          <button onclick="closeMockProfile()" class="close-btn">✕</button>
        </div>
        <div class="modal-body-modern">
          <p class="text-gray-700 mb-4">${data.bio}</p>
          <div class="mb-6">
            <h4 class="font-bold text-gray-900 mb-2">Skills</h4>
            <div class="flex flex-wrap gap-2">
              ${data.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-2">Items</h4>
            <ul class="list-disc ml-6 text-gray-700">
              ${data.items.map(i=>`<li>${i}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  document.body.style.overflow = 'hidden';
}

function closeMockProfile(){
  const m = document.getElementById('mock-profile-modal');
  if (m) { m.remove(); document.body.style.overflow = 'auto'; }
}

// make any .friend-avatar-grid clickable (index/profile modal grids)
document.addEventListener('click', (e)=>{
  const tile = e.target.closest('.friend-avatar-grid');
  if (!tile) return;
  const name = tile.getAttribute('data-name') || tile.getAttribute('title') || tile.alt || tile.innerText || "Alex Chen";
  if (MOCK_PROFILES[name]) openMockProfile(name);
});

// ========= Global ESC/Click-away =========
document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') {
    const menu = document.getElementById('hamburger-menu');
    const notif = document.getElementById('notifications-panel');
    if (menu?.classList.contains('active')) toggleMenu();
    if (notif?.classList.contains('active')) toggleNotifications();
    closeMockProfile();
  }
});

document.addEventListener('click', (e)=>{
  const notif = document.getElementById('notifications-panel');
  const btn = e.target.closest('[onclick*="toggleNotifications"]');
  if (notif && notif.classList.contains('active') && !btn && !notif.contains(e.target)) {
    toggleNotifications();
  }
});

// Init
document.addEventListener('DOMContentLoaded', ()=> {
  updateNotificationBadge();
  // attach names to demo avatars if none present
  document.querySelectorAll('.friend-avatar-grid').forEach((el,i)=>{
    if (!el.getAttribute('data-name')) {
      const candidates = Object.keys(MOCK_PROFILES);
      el.setAttribute('data-name', candidates[i % candidates.length]);
    }
  });
});

// expose for inline handlers used in HTML
window.toggleMenu = toggleMenu;
window.toggleNotifications = toggleNotifications;
window.handleNotificationClick = handleNotificationClick;
window.markAllRead = markAllRead;