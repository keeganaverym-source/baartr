function scrollToCategories() {
  document.getElementById('categories').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

window.openProfileModalMain = function() {
  document.getElementById('profile-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openProfileModal() {
  window.openProfileModalMain();
}

function closeProfileModal() {
  document.getElementById('profile-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openTradeModal(itemTitle) {
  document.getElementById('trade-item-title').textContent = itemTitle;
  closeRandomMatchModal();
  document.getElementById('trade-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTradeModal() {
  document.getElementById('trade-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openRandomMatchModal() {
  document.getElementById('random-match-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRandomMatchModal() {
  document.getElementById('random-match-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openVerificationModal() {
  document.getElementById('verification-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVerificationModal() {
  document.getElementById('verification-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function startVerification() {
  alert('Verification process starting! In production, this would redirect to ID verification flow.');
  closeVerificationModal();
}

let scrollPosition = 0;
window.addEventListener('scroll', function() {
  const mobileCTA = document.querySelector('.mobile-sticky-cta');
  if (mobileCTA) {
    if (window.scrollY > 500) {
      mobileCTA.style.transform = 'translateY(0)';
    } else {
      mobileCTA.style.transform = 'translateY(100%)';
    }
  }
});

function triggerRandomMatch() {
  const button = event.target.closest('button');
  button.innerHTML = '<svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Finding Match...</span>';
  
  setTimeout(() => {
    button.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Find My Random Match</span>';
    openRandomMatchModal();
  }, 1500);
}

function addFriend(userName) {
  const toast = document.getElementById('friend-toast');
  document.getElementById('friend-name-toast').textContent = `You and ${userName} are now connected!`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function addSkill() {
  const input = document.getElementById('skill-input');
  const skill = input.value.trim();
  
  if (skill) {
    alert(`Skill "${skill}" added!`);
    input.value = '';
  }
}

function saveProfile() {
  alert('Profile saved successfully!');
  closeProfileModal();
}

function submitOffer() {
  alert('Your offer has been sent! The trader will be notified.');
  closeTradeModal();
}

document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    alert(`Browsing ${category} category...`);
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProfileModal();
    closeTradeModal();
    closeRandomMatchModal();
  }
  
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.querySelector('.search-bar-modern input').focus();
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.trade-card-modern').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

document.querySelectorAll('.category-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  card.style.transitionDelay = `${index * 0.05}s`;
  observer.observe(card);
});

// Load shared functionality
if (typeof toggleMenu !== 'function') {
  const script = document.createElement('script');
  script.src = 'shared.js';
  document.head.appendChild(script);
}

console.log('Bartr - Modern Trading Platform Loaded Successfully! 🚀');

