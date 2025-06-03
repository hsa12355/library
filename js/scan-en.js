const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

let html5QrCode;
let currentCameraId = null;

// Redirect to the corresponding page upon successful scan
function onScanSuccess(decodedText) {
  console.log(`Scan successful: ${decodedText}`);

  let target;
  if (decodedText.endsWith('.html')) {
    target = decodedText;
  } else {
    target = `free-station-${lang}/${decodedText}.html`;
  }

  window.location.href = target;
}

// Called when scanning fails
function onScanFailure(error) {
  console.warn(`Scan failed: ${error}`);
}

// Start the QR scanner
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
      console.error('Error stopping scanner:', err);
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

// Initialize camera selector
function initCameraSelector() {
  Html5Qrcode.getCameras().then(devices => {
    if (!devices || devices.length === 0) {
      alert('No camera devices found');
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

    //  改用 async 監聽事件：切換前先停止相機
    select.onchange = async (e) => {
      const newCameraId = e.target.value;

      if (html5QrCode && html5QrCode._isScanning) {
        await html5QrCode.stop();
      }

      startScanner(newCameraId);
    };
  }).catch(err => {
    console.error('Failed to get camera list:', err);
    alert('Unable to access camera list. Please check browser permissions.');
  });
}


window.addEventListener('load', () => {
  initCameraSelector();

  // 樓層地圖開啟/關閉
  document.getElementById('floor-map-btn').onclick = () => {
    document.getElementById('floor-map-popup').classList.remove('hidden');
  };

  document.getElementById('close-map').onclick = () => {
    document.getElementById('floor-map-popup').classList.add('hidden');
  };

  // 結束導覽
  document.getElementById('end-tour-btn').onclick = () => {
    window.location.href = 'language.html';
  };

  // 加入樓層地圖切換功能（若存在）
  const tabButtons = document.querySelectorAll('.map-tab-btn');
  const mapSections = document.querySelectorAll('.floor-map-img');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      mapSections.forEach(section => section.classList.add('hidden'));

      button.classList.add('active');
      const targetId = button.dataset.target;
      const targetMap = document.getElementById(targetId);
      if (targetMap) {
        targetMap.classList.remove('hidden');
      }
    });
  });
});
