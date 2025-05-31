const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

// 掃描成功時導向對應頁面
function onScanSuccess(decodedText) {
  console.log(`掃描成功: ${decodedText}`);

  let target;
  if (decodedText.endsWith('.html')) {
    target = decodedText;
  } else {
    target = `free-station-${lang}/${decodedText}.html`;
  }

  window.location.href = target;
}

// 掃描失敗
function onScanFailure(error) {
  console.warn(`掃描失敗: ${error}`);
}

// 初始化 QR 掃描器
function initScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        onScanFailure
      );
    }
  }).catch(err => {
    console.error("無法存取相機: ", err);
    alert("無法開啟相機，請確認瀏覽器權限已開啟。");
  });
}

window.onload = () => {
  initScanner();

  // 樓層地圖開啟
  document.getElementById('floor-map-btn').onclick = () => {
    document.getElementById('floor-map-popup').classList.remove('hidden');
  };

  // 樓層地圖關閉
  document.getElementById('close-map').onclick = () => {
    document.getElementById('floor-map-popup').classList.add('hidden');
  };

  // 結束導覽按鈕
  document.getElementById('end-tour-btn').onclick = () => {
    window.location.href = 'language.html';
  };
};
