const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'zh';
const camParam = urlParams.get('cam');

let html5QrCode = null;
let currentCameraId = null;

function onScanSuccess(decodedText) {
  console.log(`掃描成功: ${decodedText}`);

  let target;
  if (decodedText.endsWith('.html')) {
    target = decodedText;
  } else {
    target = `free-station-${lang}/${decodedText}.html`;
  }

  if (window.location.href !== target) {
    window.location.href = target;
  }
}

function onScanFailure(error) {}

async function clearScanner() {
  if (html5QrCode) {
    try {
      console.log('停止掃描器...');
      await html5QrCode.stop();
      html5QrCode.clear();

      const videoElem = document.querySelector("#qr-reader video");
      if (videoElem && videoElem.srcObject) {
        videoElem.srcObject.getTracks().forEach(track => track.stop());
        videoElem.srcObject = null;
      }
    } catch (e) {
      console.error('停止掃描器發生錯誤:', e);
    }
    html5QrCode = null;
  }
}

async function startScanner(cameraId) {
  try {
    await clearScanner();

    html5QrCode = new Html5Qrcode("qr-reader");

    const config = {
      fps: 10,
      qrbox: { width: 300, height: 300 },
      aspectRatio: 1.333,
      videoConstraints: {
        deviceId: cameraId ? { exact: cameraId } : undefined,
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    await html5QrCode.start(cameraId, config, onScanSuccess, onScanFailure);
    currentCameraId = cameraId;
    console.log('掃描器啟動完成，使用相機ID:', cameraId);
  } catch (err) {
    console.error('啟動掃描器錯誤:', err);
    alert('啟動掃描器失敗，請確認相機權限已開啟，並重新載入。');
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
      if (device.id === camParam) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    const defaultCamId = camParam || devices[0].id;
    startScanner(defaultCamId);

    select.onchange = (e) => {
      const newCamId = e.target.value;
      const newUrlParams = new URLSearchParams(window.location.search);
      newUrlParams.set('cam', newCamId);
      window.history.replaceState(null, '', `${window.location.pathname}?${newUrlParams.toString()}`);
      startScanner(newCamId);
    };
  }).catch(err => {
    console.error('取得相機清單失敗:', err);
    alert('無法取得相機清單，請確認已允許使用相機。');
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
