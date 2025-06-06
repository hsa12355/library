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
    'B1': ['密集書庫', '魔法森林', '禪園'],
    '1F': ['電子書牆入口', '數位學習區', '新書展示區', '入口門禁', '活力閱讀區','空間與中庭植栽'],
    '2F': ['繪本漫畫區', '期刊區'],
  };

  const areaToStationPage = {
    '電子書牆入口': 'videofree-zh/video-station1.html',
    '入口門禁': 'videofree-zh/video-station2.html',
    '新書展示區': 'videofree-zh/video-station3.html',
    '數位學習區': 'videofree-zh/video-station4.html',
    '空間與中庭植栽':'videofree-zh/video-station5.html',
    '活力閱讀區': 'videofree-zh/video-station6.html',
    '期刊區': 'videofree-zh/video-station7.html',
    '繪本漫畫區': 'videofree-zh/video-station8.html',
    '密集書庫': 'videofree-zh/video-station9.html',
    '禪園': 'videofree-zh/video-station10.html',
    '魔法森林': 'videofree-zh/video-station11.html',
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

         // 顯示樓層按鈕
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      }
      else if (mode === 'free') {
        window.location.href = 'scan-zh.html';
      } else if (mode === 'fixed') {
        window.location.href = 'video-fixed-zh/video-station1.html';
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
    window.location.href = '../language.html';
  });
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