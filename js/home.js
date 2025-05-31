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
    'B1': ['密集書庫'],
    '1F': ['電子書牆入口', '數位學習區', '新書展示區', '魔法森林', '入口門禁', '活力閱讀區', '禪園'],
    '2F': ['繪本漫畫區', '期刊區'],
  };

  const areaToStationPage = {
    '電子書牆入口': 'free-station-zh/station-1.html',
    '入口門禁': 'free-station-zh/station-2.html',
    '新書展示區': 'free-station-zh/station-3.html',
    '數位學習區': 'free-station-zh/station-4.html',
    '活力閱讀區': 'free-station-zh/station-5.html',
    '期刊區': 'free-station-zh/station-6.html',
    '繪本漫畫區': 'free-station-zh/station-7.html',
    '密集書庫': 'free-station-zh/station-8.html',
    '禪園': 'free-station-zh/station-9.html',
    '魔法森林': 'free-station-zh/station-10.html',
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

         // 👇 補上這段：顯示樓層按鈕
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      }
      else if (mode === 'free') {
        window.location.href = 'scan-zh.html';
      } else if (mode === 'fixed') {
        window.location.href = 'Fixed-route-zh/station-1.html';
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
