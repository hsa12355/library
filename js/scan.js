const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

let html5QrCode;
let currentCameraId = null;

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

// 啟動掃描器
function startScanner(cameraId) {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        onScanFailure
      );
    }).catch(err => {
      console.error('停止掃描器錯誤:', err);
    });
  } else {
    html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    );
  }
  currentCameraId = cameraId;
}

// 初始化相機選擇器
function initCameraSelector() {
  Html5Qrcode.getCameras().then(devices => {
    if (!devices || devices.length === 0) {
      alert('找不到相機設備');
      return;
    }

    const select = document.getElementById('camera-select');
    devices.forEach(device => {
      const option = document.createElement('option');
      option.value = device.id;
      option.text = device.label || `Camera ${select.length + 1}`;
      select.appendChild(option);
    });

    // 預設選擇第一個相機
    startScanner(devices[0].id);

    // 監聽使用者選擇改變
    select.onchange = (e) => {
      const newCameraId = e.target.value;
      if (newCameraId !== currentCameraId) {
        startScanner(newCameraId);
      }
    };
  }).catch(err => {
    console.error('無法取得相機清單:', err);
    alert('無法取得相機清單，請確認權限是否開啟');
  });
}

window.onload = () => {
  initCameraSelector();

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
