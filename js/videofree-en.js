const floorAreas = {
  'B1': ['Compact Storage'],
  '1F': ['E-Book Wall Entrance', 'Digital Learning Zone', 'New Book Display', 'Magic Forest', 'Entrance Gate', 'Energetic Reading Zone', 'Zen Garden'],
  '2F': ['Picture Books & Comics', 'Periodicals Zone'],
};

const areaToStationPage = {
  'E-Book Wall Entrance': 'video-station1.html',
  'Entrance Gate': 'video-station2.html',
  'New Book Display': 'video-station3.html',
  'Digital Learning Zone': 'video-station4.html',
  'Energetic Reading Zone': 'video-station5.html',
  'Periodicals Zone': 'video-station6.html',
  'Picture Books & Comics': 'video-station7.html',
  'Compact Storage': 'video-station8.html',
  'Zen Garden': 'video-station9.html',
  'Magic Forest': 'video-station10.html',
};

// DOM elements
const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');

// Initial instruction display
areaSelector.textContent = 'Please select a floor first';
areaSelector.classList.add('fade-in', 'show');

// Create area button
function createAreaButton(area) {
  const btn = document.createElement('button');
  btn.classList.add('area-btn', 'show');
  btn.textContent = area;

  btn.addEventListener('click', () => {
    // Prevent multiple clicks
    document.querySelectorAll('.area-btn').forEach(b => b.disabled = true);
    const page = areaToStationPage[area];
    if (page) {
      window.location.href = page;
    }
  });

  return btn;
}

// Show areas corresponding to the selected floor
function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // Clear previous content

  if (!areas || areas.length === 0) {
    areaSelector.textContent = 'No available areas to introduce on this floor';
    areaSelector.classList.add('fade-in', 'show');
    return;
  }

  areas.forEach(area => {
    const btn = createAreaButton(area);
    areaSelector.appendChild(btn);
  });
}

// Add animation and click events to floor buttons (run once only)
floorButtons.forEach(btn => {
  btn.classList.add('show');
  btn.addEventListener('click', () => {
    const floor = btn.getAttribute('data-floor');
    showAreasForFloor(floor);
  });
});

// Floor map functionality
floorMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.toggle('hidden');
});

closeMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.add('hidden');
});

// End tour button redirect
endTourBtn.addEventListener('click', () => {
  window.location.href = '../language.html';
});

// Text and button animation
document.addEventListener('DOMContentLoaded', () => {
  const introLines = document.querySelectorAll('.intro-line');

  introLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('show');

      // Show buttons and controls only after the last line
      if (i === introLines.length - 1) {
        const prompt = document.getElementById('choice-prompt');
        if (prompt) {
          prompt.style.opacity = '1';
          const buttons = prompt.querySelectorAll('button');
          buttons.forEach((btn, index) => {
            setTimeout(() => btn.classList.add('show'), 200 * index);
          });
        }

        if (endTourBtn) {
          setTimeout(() => endTourBtn.classList.add('show'), 800);
        }
      }
    }, i * 700);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Show floor buttons
  document.querySelectorAll(".floor-btn").forEach(btn => {
    btn.classList.add("show");
  });

  // Show end tour button
  const endTourBtn = document.getElementById("end-tour-btn");
  if (endTourBtn) endTourBtn.classList.add("show");

  // Show choice prompt
  const choicePrompt = document.getElementById("choice-prompt");
  if (choicePrompt) choicePrompt.style.opacity = "1";
});
