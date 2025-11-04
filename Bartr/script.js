/* script.js — homepage & global UI glue
   - Smooth scroll
   - Profile modal open/close
   - Trade modal
   - Random match + Match-by-Value (AI valuation aware)
*/

function scrollToCategories() {
  const el = document.getElementById('categories');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.openProfileModalMain = function() {
  const modal = document.getElementById('profile-modal');
  if (modal){ modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
};
function openProfileModal(){ window.openProfileModalMain(); }
function closeProfileModal(){
  const m = document.getElementById('profile-modal');
  if (m){ m.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

function openTradeModal(itemTitle) {
  const t = document.getElementById('trade-item-title');
  if (t) t.textContent = itemTitle || 'Selected Item';
  closeRandomMatchModal();
  const m = document.getElementById('trade-modal');
  if (m){ m.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeTradeModal(){
  const m = document.getElementById('trade-modal');
  if (m){ m.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

// ===== Random Match: UI + valuation =====
function ensureRandomMatchUI() {
  const wrap = document.getElementById('random-match-modal');
  if (!wrap) return;
  const body = wrap.querySelector('.modal-body-modern');
  if (!body) return;

  // Inject only once
  if (body.querySelector('[data-random-match-ui]')) return;

  body.setAttribute('data-random-match-ui','1');
  body.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white border-2 border-gray-100 rounded-xl p-4">
        <h4 class="font-bold text-gray-900 mb-1">Pure Random</h4>
        <p class="text-gray-600 mb-3">Spin the wheel and discover something unexpected.</p>
        <button id="btn-random-any" class="btn-primary-modern w-full">🎲 Find My Random Match</button>
      </div>

      <div class="bg-white border-2 border-gray-100 rounded-xl p-4">
        <h4 class="font-bold text-gray-900 mb-1">Match by Value</h4>
        <p class="text-gray-600 mb-3">Pick one of your items; we’ll match to similar value.</p>
        <div class="grid gap-3">
          <select id="match-item" class="profile-input">
            <option value="Fender Telecaster (used)">Fender Telecaster (used)</option>
            <option value="iPad Pro 11” 2018">iPad Pro 11” 2018</option>
            <option value="Canon M50 Body">Canon M50 Body</option>
          </select>
          <button id="btn-match-by-value" class="btn-secondary-modern w-full">💰 Match Based on Value</button>
          <div id="valuation-result" class="text-sm text-gray-700 hidden"></div>
        </div>
      </div>
    </div>
  `;

  // Wire actions
  document.getElementById('btn-random-any')?.addEventListener('click', async ()=>{
    await new Promise(r=>setTimeout(r,600));
    alert("Found a quirky match: “Analog Synth Zine Bundle” — want to open?");
  });

  document.getElementById('btn-match-by-value')?.addEventListener('click', async ()=>{
    const name = document.getElementById('match-item').value;
    const el = document.getElementById('valuation-result');
    el.classList.remove('hidden');
    el.textContent = 'Estimating value…';
    try {
      const val = await estimateValue(name);
      el.innerHTML = `Estimated value: <b>$${val.estimate.toFixed(0)}</b> (confidence ${Math.round(val.confidence*100)}%)<br>Suggested matches: ${val.suggestions.join(', ')}`;
    } catch (err) {
      el.textContent = 'Could not estimate right now. Try again later.';
    }
  });
}

async function estimateValue(query){
  // Prefer serverless on Vercel
  try {
    const res = await fetch('/api/valuation?query=' + encodeURIComponent(query), { method: 'GET' });
    if (res.ok) return await res.json();
  } catch(_) {}
  // Fallback: local heuristic
  const base = {
    'Fender Telecaster (used)': 650,
    'iPad Pro 11” 2018': 380,
    'Canon M50 Body': 320
  };
  const estimate = base[query] ?? (200 + Math.random()*600);
  const pool = [
    "Studio Headphones", "GoPro Hero 9", "Analog Mixer", "DJ Controller (entry)", 
    "Gaming Monitor 1080p", "Camp Gear Set", "Bike Tune-Up + Parts"
  ];
  return {
    estimate,
    confidence: 0.62,
    suggestions: pool.sort(()=>0.5-Math.random()).slice(0,3)
  };
}

function openRandomMatchModal() {
  const m = document.getElementById('random-match-modal');
  if (m){ 
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
    ensureRandomMatchUI();
  }
}
function closeRandomMatchModal(){
  const m = document.getElementById('random-match-modal');
  if (m){ m.classList.remove('active'); document.body.style.overflow = 'auto'; }
}

// ===== Misc existing UI =====
function startVerification(){ alert('Verification flow would launch here.'); closeVerificationModal(); }
function closeVerificationModal(){ document.getElementById('verification-modal')?.classList.remove('active'); document.body.style.overflow='auto'; }

window.addEventListener('scroll', ()=>{
  const mobileCTA = document.querySelector('.mobile-sticky-cta');
  if (!mobileCTA) return;
  mobileCTA.style.transform = window.scrollY > 500 ? 'translateY(0)' : 'translateY(100%)';
});

function addFriend(userName){
  const toast = document.getElementById('friend-toast');
  const msg = document.getElementById('friend-name-toast');
  if (toast && msg) {
    msg.textContent = `You and ${userName} are now connected!`;
    toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 3000);
  } else {
    alert(`Friend request sent to ${userName}!`);
  }
}

function addSkill(){
  const input = document.getElementById('skill-input');
  const skill = (input?.value || '').trim();
  if (skill) { alert(`Skill "${skill}" added!`); input.value = ''; }
}

function saveProfile(){ alert('Profile saved successfully!'); closeProfileModal(); }
function submitOffer(){ alert('Your offer has been sent!'); closeTradeModal(); }

// Category cards click
document.querySelectorAll('.category-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const cat = card.getAttribute('data-category') || 'Trades';
    alert(`Browsing ${cat}…`);
  });
});

// Keyboard
document.addEventListener('keydown', e=>{
  if (e.key === 'Escape'){ closeProfileModal(); closeTradeModal(); closeRandomMatchModal(); }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){
    e.preventDefault();
    document.querySelector('.search-bar-modern input')?.focus();
  }
});

// Reveal cards on view
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:0.1, rootMargin:'0px 0px -50px 0px'});

document.querySelectorAll('.trade-card-modern').forEach(card=>{
  card.style.opacity='0'; card.style.transform='translateY(30px)'; card.style.transition='all .6s ease';
  observer.observe(card);
});
document.querySelectorAll('.category-card').forEach((card,i)=>{
  card.style.opacity='0'; card.style.transform='translateY(30px)'; card.style.transition='all .6s ease'; card.style.transitionDelay=`${i*0.05}s`;
  observer.observe(card);
});

// Ensure random match UI built if modal exists at load
document.addEventListener('DOMContentLoaded', ensureRandomMatchUI);

// expose for inline
window.openProfileModal = openProfileModal;
window.openTradeModal = openTradeModal;
window.openRandomMatchModal = openRandomMatchModal;