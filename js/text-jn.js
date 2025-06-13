  const floorAreas = {
  'B1': ['密集書庫', '魔法の森', '禅ガーデン'],
  '1F': ['電子書棚入口', 'デジタル学習エリア', '新刊展示エリア', '入口ゲート', 'アクティブ読書エリア', 'スペースと中庭の植栽'],
  '2F': ['絵本・マンガエリア', '雑誌エリア'],
};

  const areaToStationPage = {
    '電子書棚入口': 'station-1.html',
    '入口ゲート': 'station-2.html',
    '新刊展示エリア': 'station-3.html',
    'デジタル学習エリア': 'station-4.html',
    'スペースと中庭の植栽': 'station-5.html',
    'アクティブ読書エリア': 'station-6.html',
    '雑誌エリア': 'station-7.html',
    '絵本・マンガエリア': 'station-8.html',
    '密集書庫': 'station-9.html',
    '禅ガーデン': 'station-10.html',
    '魔法の森': 'station-11.html',
  };

const areaSelector = document.getElementById('area-selector');
const floorButtons = document.querySelectorAll('.floor-btn');
const floorMapBtn = document.getElementById('floor-map-btn');
const floorMapPopup = document.getElementById('floor-map-popup');
const closeMapBtn = document.getElementById('close-map');
const endTourBtn = document.getElementById('end-tour-btn');

// 初期表示：「フロアを選択してください」
areaSelector.textContent = 'フロアを選択してください';

function createAreaButton(area) {
  const btn = document.createElement('button');
  btn.className = 'area-btn';
  btn.textContent = area;
  btn.addEventListener('click', () => {
    const targetPage = areaToStationPage[area];
    if (targetPage) {
      window.location.href = targetPage;
    } else {
      alert('このエリアにはまだ対応するページがありません');
    }
  });
  return btn;
}

function showAreasForFloor(floor) {
  const areas = floorAreas[floor];
  areaSelector.innerHTML = ''; // クリア

  if (!areas || areas.length === 0) {
    areaSelector.textContent = 'このフロアには案内できるエリアがありません';
    return;
  }

  areas.forEach(area => {
    const btn = createAreaButton(area);
    btn.classList.add('show'); // ボタンを可視化
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
  window.location.href = './language.html';
});

// フロアマップのタブ切替機能
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

// 紹介文のアニメーション表示
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
