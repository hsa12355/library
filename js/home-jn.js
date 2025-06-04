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
  'B1': ['密集書庫', '魔法の森', '禅ガーデン'],
  '1F': ['電子書棚入口', 'デジタル学習エリア', '新刊展示エリア', '入口ゲート', 'アクティブ読書エリア', 'スペースと中庭の植栽'],
  '2F': ['絵本・マンガエリア', '雑誌エリア'],
};

  const areaToStationPage = {
    '電子書棚入口': 'free-station-jn/station-1.html',
    '入口ゲート': 'free-station-jn/station-2.html',
    '新刊展示エリア': 'free-station-jn/station-3.html',
    'デジタル学習エリア': 'free-station-jn/station-4.html',
    'スペースと中庭の植栽': 'free-station-jn/station-5.html',
    'アクティブ読書エリア': 'free-station-jn/station-6.html',
    '雑誌エリア': 'free-station-jn/station-7.html',
    '絵本・マンガエリア': 'free-station-jn/station-8.html',
    '密集書庫': 'free-station-jn/station-9.html',
    '禅ガーデン': 'free-station-jn/station-10.html',
    '魔法の森': 'free-station-jn/station-11.html',
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

         // 階層ボタンを表示
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      }
      else if (mode === 'free') {
        window.location.href = 'scan-jn.html';
      } else if (mode === 'fixed') {
        window.location.href = 'Fixed-route-jn/station-1.html';
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
        alert('まだそのエリアのページは設計されていません');
      }
    });
    // show クラスを追加してボタンを表示可能にする
    setTimeout(() => btn.classList.add('show'), 50); 
    return btn;
  }


  function showAreasForFloor(floor) {
    const areas = floorAreas[floor];
    areaSelector.innerHTML = '';
    if (!areas || areas.length === 0) {
      areaSelector.textContent = 'この階には紹介できるエリアがありません';
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
      console.log('階をクリック:', floor);
      showAreasForFloor(floor);
    });
  });

  endTourBtn.addEventListener('click', () => {
    window.location.href = '../language.html';
  });
});
