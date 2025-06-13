const floorAreas = {
  'B1': ['Compact Shelves', 'Zen Garden', 'Magic Forest'],
  '1F': ['E-Book Wall Entrance', 'Digital Universe', 'New Titles', 'Entrance Access', 'Read and Ride','Space and Courtyard Plants'],
  '2F': ['Illustrated and Comic Books', 'Periodicals'],
};

  const areaToStationPage = {
    'E-book Wall Entrance': 'video-station1.html',
    'Entrance Gate': 'video-station2.html',
    'New Titles': 'video-station3.html',
    'Digital Universe': 'video-station4.html',
    'Space and Courtyard Plants':'video-station5.html',
    'Read and Ride': 'video-station6.html',
    'Periodicals': 'video-station7.html',
    'Illustrated and Comic Books': 'video-station8.html',
    'Compact Shelves': 'video-station9.html',
    'Zen Garden': 'video-station10.html',
    'Magic Forest': 'video-station11.html',
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

// 加入樓層按鈕動畫與點擊事件（僅執行一次）
floorButtons.forEach(btn => {
  btn.classList.add('show');
  btn.addEventListener('click', () => {
    const floor = btn.getAttribute('data-floor');
    showAreasForFloor(floor);
  });
});


floorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const floor = btn.getAttribute('data-floor');
    showAreasForFloor(floor);
  });
});

if (floorMapBtn && floorMapPopup && closeMapBtn) {
    floorMapBtn.addEventListener('click', () => {
      floorMapPopup.classList.remove('hidden');
    });

    closeMapBtn.addEventListener('click', () => {
      floorMapPopup.classList.add('hidden');
    });
  }

endTourBtn.addEventListener('click', () => {
  window.location.href = './language.html';
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

 // 🔄 加入樓層地圖切換邏輯
  const tabButtons = document.querySelectorAll('.map-tab-btn');
  const mapImages = document.querySelectorAll('.floor-map-img');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 移除所有按鈕的 active 樣式
      tabButtons.forEach(b => b.classList.remove('active'));

      // 加上當前按鈕的 active 樣式
      btn.classList.add('active');

      // 隱藏所有圖片
      mapImages.forEach(img => img.classList.add('hidden'));

      // 顯示目標圖片
      const targetId = btn.getAttribute('data-target');
      const targetMap = document.getElementById(targetId);
      if (targetMap) {
        targetMap.classList.remove('hidden');
      }
    });
  });