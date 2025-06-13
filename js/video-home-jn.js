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
    'B1': ['密集書庫', '魔法の森', '禅園'],
    '1F': ['電子書き込み入口', 'デジタル学習エリア', '新刊展示エリア', '入口ゲート', '活気ある読書エリア','スペースと中庭の植栽'],
    '2F': ['絵本・漫画エリア', '定期刊行物エリア'],
  };

  const areaToStationPage = {
    '電子書き込み入口': 'videofree-jn/video-station1.html',
    '入口ゲート': 'videofree-jn/video-station2.html',
    '新刊展示エリア': 'videofree-jn/video-station3.html',
    'デジタル学習エリア': 'videofree-jn/video-station4.html',
    'スペースと中庭の植栽':'videofree-jn/video-station5.html',
    '活気ある読書エリア': 'videofree-jn/video-station6.html',
    '定期刊行物エリア': 'videofree-jn/video-station7.html',
    '絵本・漫画エリア': 'videofree-jn/video-station8.html',
    '密集書庫': 'videofree-jn/video-station9.html',
    '禅園': 'videofree-jn/video-station10.html',
    '魔法の森': 'videofree-jn/video-station11.html',
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

        // フロアボタンを表示
        document.querySelectorAll('.floor-btn').forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), i * 150);
        });
      } else if (mode === 'free') {
        window.location.href = 'scan-jp.html'; // 自由探索モードの日本語版ページ
      } else if (mode === 'fixed') {
        window.location.href = 'video-fixed-jn/video-station1.html'; // 固定ルートモード日本語版
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
        alert('このエリアのページはまだ設計されていません');
      }
    });
    // showクラスを追加してボタンを表示
    setTimeout(() => btn.classList.add('show'), 50);
    return btn;
  }

  function showAreasForFloor(floor) {
    const areas = floorAreas[floor];
    areaSelector.innerHTML = '';
    if (!areas || areas.length === 0) {
      areaSelector.textContent = 'このフロアには紹介できるエリアがありません';
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
      console.log('フロア選択:', floor);
      showAreasForFloor(floor);
    });
  });

  endTourBtn.addEventListener('click', () => {
    window.location.href = './language.html';
  });
});
