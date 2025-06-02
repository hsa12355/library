const floorAreas = {
  'B1': ['密集書庫'],
  '1F': ['電子書牆入口', '數位學習區', '新書展示區', '魔法森林', '入口門禁', '活力閱讀區', '禪園'],
  '2F': ['繪本漫畫區', '期刊區'],
};

const areaToStationPage = {
  '電子書牆入口': 'video-station1.html',
  '入口門禁': 'video-station2.html',
  '新書展示區': 'video-station3.html',
  '數位學習區': 'video-station4.html',
  '活力閱讀區': 'video-station5.html',
  '期刊區': 'video-station6.html',
  '繪本漫畫區': 'video-station7.html',
  '密集書庫': 'video-station8.html',
  '禪園': 'video-station9.html',
  '魔法森林': 'video-station10.html',
};

// DOM 元素
const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');


// 初始顯示提示
areaSelector.textContent = '請先選擇樓層';
areaSelector.classList.add('fade-in', 'show');

// 建立區域按鈕
function createAreaButton(area) {
  const btn = document.createElement('button');
  btn.classList.add('area-btn', 'show');
  btn.textContent = area;

  btn.addEventListener('click', () => {
    // 防止重複點擊
    document.querySelectorAll('.area-btn').forEach(b => b.disabled = true);
    const page = areaToStationPage[area];
    if (page) {
      window.location.href = page;
    }
  });

  return btn;
}

// 顯示樓層對應區域
function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // 清空

  if (!areas || areas.length === 0) {
    areaSelector.textContent = '此樓層暫無可介紹區域';
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

// 樓層地圖功能
floorMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.toggle('hidden');
});

closeMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.add('hidden');
});

// 結束導覽按鈕跳轉
endTourBtn.addEventListener('click', () => {
  window.location.href = '../language.html';
});

// 文字動畫與按鈕動畫出現
document.addEventListener('DOMContentLoaded', () => {
  const introLines = document.querySelectorAll('.intro-line');

  introLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('show');

      // 最後一行文字顯示後才出現選擇按鈕與導覽控制
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
  // 顯示樓層按鈕
  document.querySelectorAll(".floor-btn").forEach(btn => {
    btn.classList.add("show");
  });

  // 顯示結束導覽按鈕
  const endTourBtn = document.getElementById("end-tour-btn");
  if (endTourBtn) endTourBtn.classList.add("show");

  // 顯示 #choice-prompt
  const choicePrompt = document.getElementById("choice-prompt");
  if (choicePrompt) choicePrompt.style.opacity = "1";
});

