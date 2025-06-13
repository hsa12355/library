  const floorAreas = {
    'B1': ['密集書庫', '魔法の森', '禅園'],
    '1F': ['電子書き込み入口', 'デジタル学習エリア', '新刊展示エリア', '入口ゲート', '活気ある読書エリア','スペースと中庭の植栽'],
    '2F': ['絵本・漫画エリア', '定期刊行物エリア'],
  };

const areaToStationPage = {
  '電子書き込み入口': 'video-station1.html',
  '入口ゲート': 'video-station2.html',
  '新刊展示エリア': 'video-station3.html',
  'デジタル学習エリア': 'video-station4.html',
  'スペースと中庭の植栽':'video-station5.html',
  '活気ある読書エリア': 'video-station6.html',
  '定期刊行物エリア': 'video-station7.html',
  '絵本・漫画エリア': 'video-station8.html',
  '密集書庫': 'video-station9.html',
  '禅園': 'video-station10.html',
  '魔法の森': 'video-station11.html',
};

// DOM 要素
const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');

// 初期表示メッセージ
areaSelector.textContent = 'まずフロアを選択してください';
areaSelector.classList.add('fade-in', 'show');

// エリアボタン作成関数
function createAreaButton(area) {
  const btn = document.createElement('button');
  btn.classList.add('area-btn', 'show');
  btn.textContent = area;

  btn.addEventListener('click', () => {
    // 多重クリック防止
    document.querySelectorAll('.area-btn').forEach(b => b.disabled = true);
    const page = areaToStationPage[area];
    if (page) {
      window.location.href = page;
    }
  });

  return btn;
}

// フロアに対応するエリアを表示
function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // 初期化

  if (!areas || areas.length === 0) {
    areaSelector.textContent = 'このフロアには紹介できるエリアがありません';
    areaSelector.classList.add('fade-in', 'show');
    return;
  }

  areas.forEach(area => {
    const btn = createAreaButton(area);
    areaSelector.appendChild(btn);
  });
}

// フロアボタンのアニメーション＆クリックイベント（１度だけ実行）
floorButtons.forEach(btn => {
  btn.classList.add('show');
  btn.addEventListener('click', () => {
    const floor = btn.getAttribute('data-floor');
    showAreasForFloor(floor);
  });
});

// フロアマップ表示切替機能
floorMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.toggle('hidden');
});

closeMapBtn.addEventListener('click', () => {
  floorMapPopup.classList.add('hidden');
});

// ツアー終了ボタンのページ遷移
endTourBtn.addEventListener('click', () => {
  window.location.href = './language.html';
});

// テキストアニメーションとボタン表示
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
        }

        if (endTourBtn) {
          setTimeout(() => endTourBtn.classList.add('show'), 800);
        }
      }
    }, i * 700);
  });
});

// ページロード後にフロアボタンと終了ボタンを表示
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".floor-btn").forEach(btn => {
    btn.classList.add("show");
  });

  if (endTourBtn) endTourBtn.classList.add("show");

  const choicePrompt = document.getElementById("choice-prompt");
  if (choicePrompt) choicePrompt.style.opacity = "1";
});
