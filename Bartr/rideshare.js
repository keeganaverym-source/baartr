/* rideshare.js — Rideshare page enhancements
   - Location detect
   - Post modal open/close
   - Add “Need a Ride” CTA
   - Ensure “looking” posts section exists
*/

function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        alert(`Location detected: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        document.getElementById('user-location').value = 'Your current area';
      },
      _err => alert('Unable to detect location. Please enter manually.')
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

function openPostRideModal() {
  document.getElementById('post-ride-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePostRideModal() {
  document.getElementById('post-ride-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}
function submitRide() {
  alert('Your ride has been posted successfully!');
  closePostRideModal();
}

document.addEventListener('keydown', e=>{
  if (e.key === 'Escape') closePostRideModal();
});

// ===== Inject "Need a Ride" CTA next to Post a Ride if missing =====
document.addEventListener('DOMContentLoaded', ()=>{
  // Secondary CTA
  const heroCard = document.querySelector('.max-w-2xl.mx-auto.bg-white.rounded-2xl.p-6.shadow-xl');
  if (heroCard && !heroCard.querySelector('#btn-need-ride')) {
    const cta = document.createElement('button');
    cta.id = 'btn-need-ride';
    cta.className = 'btn-secondary-modern w-full mt-3';
    cta.innerHTML = '🙋 Need a Ride';
    cta.addEventListener('click', openPostRideModal);
    heroCard.appendChild(cta);
  }

  // Ensure a “looking for ride” block exists
  const feed = document.querySelector('.lg\\:col-span-2.space-y-4');
  if (feed && !feed.querySelector('[data-auto-looking]')) {
    const html = `
      <div class="rideshare-post" data-auto-looking>
        <div class="flex items-start gap-4">
          <img src="https://i.pravatar.cc/150?img=68" alt="User" class="w-12 h-12 rounded-full">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="font-bold text-gray-900">Jordan Lee</h3>
              <span class="ride-badge looking">Looking for Ride</span>
              <span class="text-sm text-gray-500">• just now</span>
            </div>
            <div class="mb-4">
              <div class="flex items-center gap-3 mb-2">
                <div class="flex items-center gap-2 text-gray-700">
                  <span class="font-semibold">Berkeley</span>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
                <div class="flex items-center gap-2 text-gray-700">
                  <span class="font-semibold">San Francisco</span>
                </div>
              </div>
              <p class="text-gray-700 mb-3">Commute help needed tomorrow 7:30 AM. Can split gas or trade coffee beans ☕.</p>
              <div class="flex flex-wrap gap-2">
                <span class="ride-tag">Tomorrow 7:30 AM</span>
                <span class="ride-tag">1 person</span>
                <span class="ride-tag">Can trade</span>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button class="ride-action-btn"><span>Message</span></button>
              <button class="ride-action-btn"><span>Save</span></button>
              <button class="ride-action-btn ml-auto"><span>Share</span></button>
            </div>
          </div>
        </div>
      </div>`;
    feed.insertAdjacentHTML('afterbegin', html);
  }
});

console.log('Rideshare page enhanced.');