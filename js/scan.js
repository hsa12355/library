const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

let html5QrCode = null;
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

async function stopScanner() {
  if (html5QrCode && html5QrCode._isScanning) {
    try {
      console.log('嘗試停止掃描器...');
      await html5QrCode.stop();
      console.log('掃描器停止成功');
    } catch (err) {
      console.error('停止掃描器錯誤:', err);
    }
  }
}

async function startScanner(cameraId) {
  try {
    // 先停止現有掃描器（確保沒在掃描）
    await stopScanner();

    if (html5QrCode) {
      try {
        html5QrCode.clear(); // 清除畫面及資源（若支援）
      } catch (err) {
        console.warn('clear() 方法不可用:', err);
      }
      html5QrCode = null;
    }

    // 新建掃描器
    html5QrCode = new Html5Qrcode("qr-reader");

    console.log(`啟動相機: ${cameraId}`);
    await html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    );

    currentCameraId = cameraId;
    console.log('掃描器啟動完成');
  } catch (err) {
    console.error('啟動掃描器錯誤:', err);
    alert('啟動掃描器時發生錯誤，請檢查相機權限或重新整理頁面');
  }
}

function initCameraSelector() {
  Html5Qrcode.getCameras().then(devices => {
    if (!devices || devices.length === 0) {
      alert('找不到任何相機裝置');
      return;
    }

    const select = document.getElementById('camera-select');
    select.innerHTML = '';

    devices.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.id;
      option.text = device.label || `Camera ${index + 1}`;
      select.appendChild(option);
    });

    // 預設啟動第一支相機
    startScanner(devices[0].id);

    select.onchange = async (e) => {
      const newCameraId = e.target.value;

      if (newCameraId === currentCameraId) {
        console.log('已是目前相機，無需切換');
        return;
      }

      console.log(`切換相機到: ${newCameraId}`);
      await startScanner(newCameraId);
    };
  }).catch(err => {
    console.error('取得相機清單失敗:', err);
    alert('無法取得相機清單，請確認瀏覽器已開啟相機權限。');
  });
}

window.onload = () => {
  initCameraSelector();

  document.getElementById('floor-map-btn').onclick = () => {
    document.getElementById('floor-map-popup').classList.remove('hidden');
  };

  document.getElementById('close-map').onclick = () => {
    document.getElementById('floor-map-popup').classList.add('hidden');
  };

  document.getElementById('end-tour-btn').onclick = () => {
    window.location.href = 'language.html';
  };
};
