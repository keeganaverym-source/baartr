// Hamburger Menu Toggle
function toggleMenu() {
  let menu = document.getElementById('hamburger-menu');
  
  if (!menu) {
    // Create menu if it doesn't exist
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
            <a href="index.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Home</span>
            </a>
            <a href="browse.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Trade</span>
            </a>
            <a href="rideshare.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Rideshare</span>
            </a>
            <a href="community.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Community</span>
            </a>
            <div class="border-t border-gray-200 my-4"></div>
            <a href="how-it-works.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>How It Works</span>
            </a>
            <a href="about.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span>About</span>
            </a>
            <a href="contact.html" class="hamburger-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Contact</span>
            </a>
          </nav>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    document.body.style.overflow = 'hidden';
  } else {
    // Toggle existing menu
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

// Notifications Toggle
function toggleNotifications() {
  let panel = document.getElementById('notifications-panel');
  
  if (!panel) {
    // Create panel if it doesn't exist
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
            <div class="notification-icon bg-blue-100 text-blue-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">New trade offer received</p>
              <p class="text-xs text-gray-600">Sarah Kim wants to trade for your MacBook Pro</p>
              <p class="text-xs text-gray-500 mt-1">5 minutes ago</p>
            </div>
          </div>
          
          <div class="notification-item unread" onclick="handleNotificationClick(this)">
            <div class="notification-icon bg-green-100 text-green-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">New friend request</p>
              <p class="text-xs text-gray-600">Alex Chen sent you a friend request</p>
              <p class="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>
          </div>
          
          <div class="notification-item" onclick="handleNotificationClick(this)">
            <div class="notification-icon bg-purple-100 text-purple-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">New message</p>
              <p class="text-xs text-gray-600">Mike Johnson: "Is the camera still available?"</p>
              <p class="text-xs text-gray-500 mt-1">3 hours ago</p>
            </div>
          </div>
          
          <div class="notification-item" onclick="handleNotificationClick(this)">
            <div class="notification-icon bg-yellow-100 text-yellow-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-900">Random match found!</p>
              <p class="text-xs text-gray-600">We found a perfect match for your vintage camera</p>
              <p class="text-xs text-gray-500 mt-1">Yesterday</p>
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
    // Toggle existing panel
    panel.classList.toggle('active');
  }
}

// Handle notification click
function handleNotificationClick(element) {
  element.classList.remove('unread');
  updateNotificationBadge();
}

// Mark all notifications as read
function markAllRead() {
  document.querySelectorAll('.notification-item.unread').forEach(item => {
    item.classList.remove('unread');
  });
  updateNotificationBadge();
}

// Update notification badge count
function updateNotificationBadge() {
  const unreadCount = document.querySelectorAll('.notification-item.unread').length;
  const badges = document.querySelectorAll('.notification-badge');
  
  badges.forEach(badge => {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

// Profile Modal
function openProfileModal() {
  if (typeof window.openProfileModalMain === 'function') {
    window.openProfileModalMain();
  } else {
    if (typeof openVerificationModal === 'function') {
      openVerificationModal();
    } else {
      alert('Join Bartr to start trading!');
    }
  }
}

// Friend Request
function addFriend(userName) {
  const toast = document.getElementById('friend-toast');
  if (toast) {
    const nameElement = document.getElementById('friend-name-toast');
    if (nameElement) {
      nameElement.textContent = `You and ${userName} are now connected!`;
    }
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  } else {
    alert(`Friend request sent to ${userName}!`);
  }
}

// Trade Modal
function openTradeModal(itemTitle) {
  alert(`Opening trade modal for: ${itemTitle}`);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const menu = document.getElementById('hamburger-menu');
    const notifications = document.getElementById('notifications-panel');
    
    if (menu && menu.classList.contains('active')) {
      toggleMenu();
    }
    if (notifications && notifications.classList.contains('active')) {
      toggleNotifications();
    }
  }
});

// Click outside to close notifications
document.addEventListener('click', function(e) {
  const notifications = document.getElementById('notifications-panel');
  const notificationBtn = e.target.closest('[onclick*="toggleNotifications"]');
  
  if (notifications && notifications.classList.contains('active') && !notificationBtn && !notifications.contains(e.target)) {
    toggleNotifications();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Bartr shared scripts loaded successfully!');
  updateNotificationBadge();
});
