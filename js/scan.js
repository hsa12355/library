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

// 掃描失敗時呼叫
function onScanFailure(error) {
  console.warn(`掃描失敗: ${error}`);
}

// 啟動 QR 掃描器
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
      console.error('停止掃描器時發生錯誤:', err);
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
      alert('找不到任何相機裝置');
      return;
    }

    const select = document.getElementById('camera-select');
    select.innerHTML = ''; // 清除選單內容（避免重複）

    devices.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.id;
      option.text = device.label || `Camera ${index + 1}`;
      select.appendChild(option);
    });

    // 預設使用第一支相機
    startScanner(devices[0].id);

    // 改用 async 事件監聽器：切換前先停止掃描器
    select.onchange = async (e) => {
      const newCameraId = e.target.value;

      try {
        if (html5QrCode) {
          await html5QrCode.stop();
        }
      } catch (err) {
        console.warn('停止掃描器時發生錯誤（可忽略）:', err);
      }

      startScanner(newCameraId);
    };

  }).catch(err => {
    console.error('取得相機清單失敗:', err);
    alert('無法取得相機清單，請確認瀏覽器已開啟相機權限。');
  });
}

window.onload = () => {
  initCameraSelector();

  // 顯示樓層地圖
  document.getElementById('floor-map-btn').onclick = () => {
    document.getElementById('floor-map-popup').classList.remove('hidden');
  };

  // 隱藏樓層地圖
  document.getElementById('close-map').onclick = () => {
    document.getElementById('floor-map-popup').classList.add('hidden');
  };

  // 結束導覽按鈕
  document.getElementById('end-tour-btn').onclick = () => {
    window.location.href = 'language.html';
  };
};
