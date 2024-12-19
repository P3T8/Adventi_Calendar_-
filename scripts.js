const colors = ['#FF0000', '#00FF00', '#FFD700', '#FFFFFF', '#1E90FF']; // Piros, Zöld, Arany, Fehér, Kék
const lastTwoColors = []; // Az utolsó 2 szín nyomon követésére
const gifts = {
  1: '🎉 Karácsonyi gif!',
  5: '🎄 Ünnepi játék link!',
  10: '🎮 Mini puzzle játék',
  15: '🎁 Különleges karácsonyi képeslap',
  20: '🎥 Film: Grincs',
  21: '🎥 Film: Polar Expressz',
  22: '🎥 Film: Karácsonyi ének',
  23: '🎥 Film: Télapu',
  24: '🎥 Film: Reszkessetek betörők!',
};

const days = document.querySelectorAll('.day');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const giftContent = document.getElementById('gift-content');

// Az aktuális nap dátumának beállítása
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

// Ha nem december van, az összes ajtót zárjuk
const isDecember = currentMonth === 12;

function getRandomColor(excludeColors) {
  let color;
  do {
    color = colors[Math.floor(Math.random() * colors.length)];
  } while (excludeColors.includes(color));
  return color;
}

function updateLastColors(color) {
  lastTwoColors.push(color);
  if (lastTwoColors.length > 2) {
    lastTwoColors.shift();
  }
}

function generateUniquePosition() {
  let x, y;
  do {
    x = Math.random() * 90;
    y = Math.random() * 70;
  } while (isOverlapping(x, y, 10));
  return { x, y };
}

function isOverlapping(x, y, size) {
  for (const pos of positions) {
    const distance = Math.hypot(pos.x - x, pos.y - y);
    if (distance < size) return true;
  }
  return false;
}

const positions = [];
days.forEach(day => {
  const dayNumber = parseInt(day.getAttribute('data-day'));

  // Szín generálás az utolsó 2 színt figyelembe véve
  const color = getRandomColor(lastTwoColors);
  updateLastColors(color);
  day.style.backgroundColor = color;

  // Véletlen pozíció generálása
  const { x, y } = generateUniquePosition();
  positions.push({ x, y });

  day.style.left = `${x}%`;
  day.style.top = `${y}%`;

  if (!isDecember || (currentDay < dayNumber && currentDay !== 24)) {
    day.classList.add('locked');
  }

  day.addEventListener('click', function() {
    if (day.classList.contains('locked')) return;

    const gift = gifts[dayNumber] || '🎉 Kellemes Ünnepeket!';
    giftContent.textContent = gift;
    modal.style.display = 'block';
  });
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target === modal) modal.style.display = 'none';
});
