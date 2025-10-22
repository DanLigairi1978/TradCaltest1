document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

let xDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
}

function handleTouchEnd(evt) {
  if (!xDown) return;

  let xUp = evt.changedTouches[0].clientX;
  let xDiff = xDown - xUp;

  if (Math.abs(xDiff) > 50) {
    // Swipe detected — you can expand this later
    console.log(xDiff > 0 ? 'Swipe left' : 'Swipe right');
  }

  xDown = null;
}


let calendarContent = {};

fetch('calendarData.json')
  .then(response => response.json())
  .then(data => {
    calendarContent = data;
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

function activateMonth(monthName) {
  const cards = calendarContent[monthName] || [];
  const panel = document.querySelector('.flip-card-panel');
  panel.innerHTML = '';
panel.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.querySelector('.flip-card-inner').classList.toggle('flipped');
  });
});

  cards.forEach(card => {
    const cardHTML = `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front" style="background-image: url('${card.imageUrl}');" loading="lazy">

            ${card.title}
          </div>
          <div class="flip-card-back">${card.backText}</div>
        </div>
      </div>
    `;
    panel.innerHTML += cardHTML;
  });

  document.querySelector('.calendar-grid').style.display = 'none';
  document.querySelector('.month-detail').classList.remove('hidden');
  document.getElementById('monthTitle').textContent = monthName;
}

function goBackToGrid() {
  document.querySelector('.month-detail').classList.add('hidden');
  document.querySelector('.calendar-grid').style.display = 'grid';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

