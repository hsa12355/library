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
  // Floor and area definitions
const floorAreas = {
  'B1': ['Compact Shelves', 'Zen Garden', 'Magic Forest'],
  '1F': ['E-Book Wall Entrance', 'Digital Universe', 'New Titles', 'Entrance Access', 'Read and Ride','Space and Courtyard Plants'],
  '2F': ['Illustrated and Comic Books', 'Periodicals'],
};

  // Area to station page mapping
  const areaToStationPage = {
    'E-Book Wall Entrance': 'free-station-en/station-1.html',
    'Entrance Gate': 'free-station-en/station-2.html',
    'New Titles': 'free-station-en/station-3.html',
    'Digital Universe': 'free-station-en/station-4.html',
    'Space and Courtyard Plants': 'free-station-en/station-5.html',
    'Read and Ride': 'free-station-en/station-6.html',
    'Periodicals': 'free-station-en/station-7.html',
    'Illustrated and Comic Books': 'free-station-en/station-8.html',
    'Compact Shelves': 'free-station-en/station-9.html',
    'Zen Garden': 'free-station-en/station-10.html',
    'Magic Forest': 'free-station-en/station-11.html',
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

         
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      }
      else if (mode === 'free') {
        window.location.href = 'scan-en.html';
      } else if (mode === 'fixed') {
        window.location.href = 'Fixed-route-en/station-1.html';
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
      alert('尚未設計該區域頁面');
    }
  });
  // 加入 show class 讓按鈕可見
  setTimeout(() => btn.classList.add('show'), 50); 
  return btn;
}


  function showAreasForFloor(floor) {
    const areas = floorAreas[floor];
    areaSelector.innerHTML = '';
    if (!areas || areas.length === 0) {
      areaSelector.textContent = '此樓層暫無可介紹區域';
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
      console.log('點擊樓層:', floor);
      showAreasForFloor(floor);
    });
  });

  endTourBtn.addEventListener('click', () => {
    window.location.href = '/library/language.html';
  });
});
