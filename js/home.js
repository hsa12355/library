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

  // 🔽 樓層與對應區域定義
  const floorAreas = {
    'B1': ['密集書庫', '靜心庭園', '魔法森林'],
    '1F': ['電子書牆入口', '數位宇宙', '新書展示', '入口門禁', '腳踏車閱讀區','宇宙與中庭植物'],
    '2F': ['圖像與漫畫書區', '期刊區'],
  };

  // 🔽 區域對應導覽頁面（自由探索模式）
  const areaToStationPage = {
    '電子書牆入口': 'free-station-en/station-1.html',
    '入口門禁': 'free-station-en/station-2.html',
    '新書展示': 'free-station-en/station-3.html',
    '數位宇宙': 'free-station-en/station-4.html',
    '宇宙與中庭植物': 'free-station-en/station-5.html',
    '腳踏車閱讀區': 'free-station-en/station-6.html',
    '期刊區': 'free-station-en/station-7.html',
    '圖像與漫畫書區': 'free-station-en/station-8.html',
    '密集書庫': 'free-station-en/station-9.html',
    '靜心庭園': 'free-station-en/station-10.html',
    '魔法森林': 'free-station-en/station-11.html',
  };

  const optionMode = document.getElementById('option-mode');
  const areaSelector = document.getElementById('area-selector');
  const endTourBtn = document.getElementById('end-tour-btn');

  // 🔽 模式選擇按鈕事件（選擇導覽方式）
  document.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-show');
      if (mode === 'option') {
        optionMode.classList.remove('hidden');
        optionMode.classList.add('show');
        endTourBtn.classList.remove('hidden');
        endTourBtn.classList.add('show');

        // 顯示樓層按鈕動畫
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      } else if (mode === 'free') {
        window.location.href = 'scan-en.html';
      } else if (mode === 'fixed') {
        window.location.href = 'Fixed-route-en/station-1.html';
      }
    });
  });

  // 🔽 產生單一區域按鈕
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
    // 延遲顯示動畫
    setTimeout(() => btn.classList.add('show'), 50); 
    return btn;
  }

  // 🔽 顯示指定樓層的所有區域按鈕
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

  // 🔽 樓層按鈕點擊事件
  document.querySelectorAll('.floor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const floor = btn.getAttribute('data-floor');
      console.log('點擊樓層:', floor);
      showAreasForFloor(floor);
    });
  });

  // 🔽 結束導覽按鈕
  endTourBtn.addEventListener('click', () => {
    window.location.href = '../language.html';
  });
});
