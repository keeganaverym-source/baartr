function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        alert(`Location detected: ${position.coords.latitude}, ${position.coords.longitude}`);
        document.getElementById('user-location').value = 'San Francisco, CA';
      },
      function(error) {
        alert('Unable to detect location. Please enter manually.');
      }
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

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePostRideModal();
  }
});

console.log('Rideshare page loaded successfully!');
