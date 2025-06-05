const floorAreas = {
  'B1': ['密集書庫', '禪園', '魔法森林'],
  '1F': ['電子書牆入口', '數位宇宙', '新書展示區', '入口門禁', '活力閱讀區', '空間與中庭植栽'],
  '2F': ['繪本漫畫區', '期刊區'],
};

// 對應每個區域名稱與頁面路徑
const areaToStationPage = {
  '電子書牆入口': 'station-1.html',
  '入口門禁': 'station-2.html',
  '新書展示區': 'station-3.html',
  '數位宇宙': 'station-4.html',
  '空間與中庭植栽': 'station-5.html',
  '活力閱讀區': 'station-6.html',
  '期刊區': 'station-7.html',
  '繪本漫畫區': 'station-8.html',
  '密集書庫': 'station-9.html',
  '禪園': 'station-10.html',
  '魔法森林': 'station-11.html',
};

const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');

// 初始提示文字
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
      alert('尚未設計該區域頁面');
    }
  });
  return btn;
}

function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // 清除原有按鈕

  if (!areas || areas.length === 0) {
    areaSelector.textContent = '此樓層暫無可介紹區域';
    return;
  }

  areas.forEach(area => {
    const btn = createAreaButton(area);
    btn.classList.add('show'); // 顯示按鈕
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

// 樓層地圖切換邏輯
const tabButtons = document.querySelectorAll('.map-tab-btn');
const mapImages = document.querySelectorAll('.floor-map-img');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mapImages.forEach(img => img.classList.add('hidden'));
    const targetId = btn.getAttribute('data-target');
    const targetMap = document.getElementById(targetId);
    if (targetMap) {
      targetMap.classList.remove('hidden');
    }
  });
});

// 介紹文字動畫
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

          const endTourBtn = document.getElementById('end-tour-btn');
          if (endTourBtn) {
            setTimeout(() => endTourBtn.classList.add('show'), 800);
          }
        }
      }
    }, i * 700);
  });
});

// 幻燈片播放動畫（圖片輪播）
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
      }, 600); // 時間與 CSS 過渡一致
    }, 3000);
  }
});
