document.addEventListener('DOMContentLoaded', () => {
  // 確認是固定路線頁面
  if (document.body.id !== 'fixed-route') return;

  // 文字動畫浮現
  const introLines = document.querySelectorAll('.intro-line');
  introLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('show');

      if (i === introLines.length - 1) {
        // 顯示上一站、下一站按鈕
        const stationBtns = document.querySelectorAll('.next-station-btn');
        stationBtns.forEach((btn, index) => {
          setTimeout(() => btn.classList.add('show'), 200 * index);
        });

        // 顯示結束導覽按鈕
        const endTourBtn = document.getElementById('end-tour-btn');
        if (endTourBtn) {
          setTimeout(() => endTourBtn.classList.add('show'), 500);
        }
      }
    }, i * 700);
  });

  // 樓層地圖彈窗開關
  const floorMapBtn = document.getElementById('floor-map-btn');
  const floorMapPopup = document.getElementById('floor-map-popup');
  const closeMapBtn = document.getElementById('close-map');

  if (floorMapBtn && floorMapPopup && closeMapBtn) {
    floorMapBtn.addEventListener('click', () => {
      floorMapPopup.classList.remove('hidden');
    });

    closeMapBtn.addEventListener('click', () => {
      floorMapPopup.classList.add('hidden');
    });
  }

  // 🔄 加入樓層地圖切換邏輯
  const tabButtons = document.querySelectorAll('.map-tab-btn');
  const mapImages = document.querySelectorAll('.floor-map-image');

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

  // 結束導覽按鈕跳回首頁（或你指定頁面）
  const endTourBtn = document.getElementById('end-tour-btn');
  if (endTourBtn) {
    endTourBtn.addEventListener('click', () => {
      window.location.href = '../language.html';
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const imgEl = document.getElementById("slideshow-image");
  const imgList = window.slideshowImages;  // 從每頁取圖片清單

  if (imgEl && Array.isArray(imgList) && imgList.length > 1) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % imgList.length;
      imgEl.src = imgList[index];
    }, 3000);
  }
});
