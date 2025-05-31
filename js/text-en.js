const floorAreas = {
  'B1': ['Compact Stacks'],
  '1F': ['E-Book Wall Entrance', 'Digital Learning Area', 'New Books Display', 'Magic Forest', 'Entrance Access', 'Vibrant Reading Area', 'Zen Garden'],
  '2F': ['Picture Books & Comics', 'Periodicals'],
};

const areaToStationPage = {
  'E-Book Wall Entrance': 'station-1.html',
  'Entrance Access': 'station-2.html',
  'New Books Display': 'station-3.html',
  'Digital Learning Area': 'station-4.html',
  'Vibrant Reading Area': 'station-5.html',
  'Periodicals': 'station-6.html',
  'Picture Books & Comics': 'station-7.html',
  'Compact Stacks': 'station-8.html',
  'Zen Garden': 'station-9.html',
  'Magic Forest': 'station-10.html',
};

const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');

// Initially show "Please select a floor first"
areaSelector.textContent = 'Please select a floor first';

function createAreaButton(area) {
  const btn = document.createElement('button');
  btn.className = 'area-btn';
  btn.textContent = area;
  btn.addEventListener('click', () => {
    const targetPage = areaToStationPage[area];
    if (targetPage) {
      window.location.href = targetPage;
    } else {
      alert('No page mapped for this area yet');
    }
  });
  return btn;
}

function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // Clear existing buttons

  if (!areas || areas.length === 0) {
    areaSelector.textContent = 'No areas available for this floor';
    return;
  }

  areas.forEach(area => {
    const btn = createAreaButton(area);
    btn.classList.add('show'); // Make button visible
    areaSelector.appendChild(btn);
  });
}

floorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const floor = btn.getAttribute('data-floor');
    showAreasForFloor(floor);
  });
});

floorMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.toggle('hidden');
});

closeMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.add('hidden');
});

endTourBtn.addEventListener('click', () => {
  window.location.href = '../language.html';
});

// Text animation logic, can keep as is or refactor into functions
document.addEventListener('DOMContentLoaded', () => {
  const introLines = document.querySelectorAll('.intro-line');

  introLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('show');

      if (i === introLines.length - 1) {
        const prompt = document.getElementById('choice-prompt');
        if (prompt) {
          prompt.style.opacity = '1';
          const buttons = prompt.querySelectorAll('button');
          buttons.forEach((btn, index) => {
            setTimeout(() => btn.classList.add('show'), 200 * index);
          });

          // Show the bottom-right end tour button
          const endTourBtn = document.getElementById('end-tour-btn');
          if (endTourBtn) {
            setTimeout(() => endTourBtn.classList.add('show'), 800);
          }
        }
      }
    }, i * 700);
  });
});
