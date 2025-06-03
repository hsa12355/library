const floorAreas = {
  'B1': ['密集書庫', '魔法森林', '禪園'],
  '1F': ['電子書牆入口', '數位學習區', '新書展示區', '入口門禁', '活力閱讀區'],
  '2F': ['繪本漫畫區', '期刊區'],
};

const areaToStationPage = {
    '電子書牆入口': 'station-1.html',
    '入口門禁': 'station-2.html',
    '新書展示區': 'station-3.html',
    '數位學習區': 'station-4.html',
    '活力閱讀區': 'station-5.html',
    '期刊區': 'station-6.html',
    '繪本漫畫區': 'station-7.html',
    '密集書庫': 'station-8.html',
    '禪園': 'station-9.html',
    '魔法森林': 'station-10.html',
  };


const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');

// 先顯示「請先選擇樓層」
areaSelector.textContent = '請先選擇樓層';

function createAreaButton(area) {
  const btn = document.createElement('button');
  btn.className = 'area-btn';
  btn.textContent = area;
  btn.addEventListener('click', () => {
    const targetPage = areaToStationPage[area];
    if (targetPage) {
      window.location.href = targetPage;
    } else {
      alert('此區域尚未對應到頁面');
    }
  });
  return btn;
}

function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // 清空

  if (!areas || areas.length === 0) {
    areaSelector.textContent = '此樓層暫無可介紹區域';
    return;
  }

  areas.forEach(area => {
  const btn = createAreaButton(area);
  btn.classList.add('show'); // 這行必須加，讓按鈕變可見
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
