const floorAreas = {
  'B1': ['Compact Shelves', 'Zen Garden', 'Magic Forest'],
  '1F': ['E-Book Wall Entrance', 'Digital Universe', 'New Titles', 'Entrance Access', 'Read and Ride','Space and Courtyard Plants'],
  '2F': ['Illustrated and Comic Books', 'Periodicals'],
};

  // Area to station page mapping
  const areaToStationPage = {
    'E-Book Wall Entrance': 'station-1.html',
    'Entrance Gate': 'station-2.html',
    'New Titles': 'station-3.html',
    'Digital Universe': 'station-4.html',
    'Space and Courtyard Plants': 'station-5.html',
    'Read and Ride': 'station-6.html',
    'Periodicals': 'station-7.html',
    'Illustrated and Comic Books': 'station-8.html',
    'Compact Shelves': 'station-9.html',
    'Zen Garden': 'station-10.html',
    'Magic Forest': 'station-11.html',
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

if (floorMapBtn && floorMapPopup && closeMapBtn) {
    floorMapBtn.addEventListener('click', () => {
      floorMapPopup.classList.remove('hidden');
    });

    closeMapBtn.addEventListener('click', () => {
      floorMapPopup.classList.add('hidden');
    });
  }

endTourBtn.addEventListener('click', () => {
  window.location.href = '../language.html';
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

// 文字動畫可以保持不動，或改寫為函式分離
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

        // 顯示右下角的結束導覽按鈕
        const endTourBtn = document.getElementById('end-tour-btn');
        if (endTourBtn) {
          setTimeout(() => endTourBtn.classList.add('show'), 800);
        }
        }
      }
    }, i * 700);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const imgEl = document.getElementById("slideshow-image");
  const imgList = window.slideshowImages;

  if (imgEl && Array.isArray(imgList) && imgList.length > 1) {
    let index = 0;

    setInterval(() => {
      imgEl.classList.add("fade-out");

      setTimeout(() => {
        index = (index + 1) % imgList.length;
        imgEl.src = imgList[index];
        imgEl.classList.remove("fade-out");
      }, 600); // 換圖 timing 要跟 CSS transition 時間對齊
    }, 3000);
  }
});