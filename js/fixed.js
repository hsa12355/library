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

  // 結束導覽按鈕跳回首頁（或你指定頁面）
  const endTourBtn = document.getElementById('end-tour-btn');
  if (endTourBtn) {
    endTourBtn.addEventListener('click', () => {
      window.location.href = '../language.html'; 
    });
  }
});
