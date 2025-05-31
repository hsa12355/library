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

// 啟動 QR 掃描器
async function startScanner(cameraId) {
  try {
    // 如果有啟動中的掃描器，先停止並銷毀
    if (html5QrCode) {
      await html5QrCode.stop();
      html5QrCode.clear(); // 清除內部資源（視版本而定）
      html5QrCode = null;
    }

    // 新建掃描器實例
    html5QrCode = new Html5Qrcode("qr-reader");

    // 啟動掃描器
    await html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    );

    currentCameraId = cameraId;

  } catch (err) {
    console.error('啟動掃描器錯誤:', err);
    alert('啟動掃描器時發生錯誤，請確認權限或重新整理頁面');
  }
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

    // 預設啟動第一支相機
    startScanner(devices[0].id);

    // 切換鏡頭時重新啟動掃描器
    select.onchange = async (e) => {
      const newCameraId = e.target.value;

      if (newCameraId !== currentCameraId) {
        await startScanner(newCameraId);
      }
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
