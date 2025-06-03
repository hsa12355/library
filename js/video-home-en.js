document.addEventListener('DOMContentLoaded', () => {
  const introLines = document.querySelectorAll('.intro-line');
  introLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('show');
      if (i === introLines.length - 1) {
        const choicePrompt = document.getElementById('choice-prompt');
        choicePrompt.style.opacity = '1';
        const buttons = choicePrompt.querySelectorAll('button');
        buttons.forEach((btn, index) => {
          setTimeout(() => btn.classList.add('show'), 200 * index);
        });
      }
    }, i * 900);
  });

const floorAreas = {
  'B1': ['Compact Shelves', 'Zen Garden', 'Magic Forest'],
  '1F': ['E-Book Wall Entrance', 'Digital Learning Area', 'New Books Display', 'Entrance Access', 'Vibrant Reading Area'],
  '2F': ['Picture Books & Comics', 'Periodicals'],
};

  const areaToStationPage = {
    'E-book Wall Entrance': 'videofree-en/video-station1.html',
    'Entrance Gate': 'videofree-en/video-station2.html',
    'New Titles': 'videofree-en/video-station3.html',
    'Digital Universe': 'videofree-en/video-station4.html',
    'Read and Ride': 'videofree-en/video-station5.html',
    'Periodicals': 'videofree-en/video-station6.html',
    'Illustrated and Comic Books': 'videofree-en/video-station7.html',
    'Compact Shelves': 'videofree-en/video-station8.html',
    'Zen Garden': 'videofree-en/video-station9.html',
    'Magic Forest': 'videofree-en/video-station10.html',
  };

  const optionMode = document.getElementById('option-mode');
  const areaSelector = document.getElementById('area-selector');
  const endTourBtn = document.getElementById('end-tour-btn');

  document.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-show');
      if (mode === 'option') {
        optionMode.classList.remove('hidden');
        optionMode.classList.add('show');
        endTourBtn.classList.remove('hidden');
        endTourBtn.classList.add('show');

        // Show floor buttons
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      } else if (mode === 'free') {
        window.location.href = 'scan-en.html';
      } else if (mode === 'fixed') {
        window.location.href = 'video-fixed-en/video-station1.html';
      }
    });
  });

  function createAreaButton(area) {
    const btn = document.createElement('button');
    btn.className = 'area-btn';
    btn.textContent = area;
    btn.addEventListener('click', () => {
      const targetPage = areaToStationPage[area];
      if (targetPage) {
        window.location.href = targetPage;
      } else {
        alert('This area page is not yet available.');
      }
    });
    // Add "show" class to make the button visible
    setTimeout(() => btn.classList.add('show'), 50);
    return btn;
  }

  function showAreasForFloor(floor) {
    const areas = floorAreas[floor];
    areaSelector.innerHTML = '';
    if (!areas || areas.length === 0) {
      areaSelector.textContent = 'No available areas for this floor at the moment.';
      return;
    }
    areas.forEach(area => {
      const btn = createAreaButton(area);
      areaSelector.appendChild(btn);
    });
  }

  document.querySelectorAll('.floor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const floor = btn.getAttribute('data-floor');
      console.log('Floor selected:', floor);
      showAreasForFloor(floor);
    });
  });

  endTourBtn.addEventListener('click', () => {
    window.location.href = '../language.html';
  });
});
