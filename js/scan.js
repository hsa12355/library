const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

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

  window.location.href = target;
}

function onScanFailure(error) {
  // 可以不用每次錯誤都印出，避免淩亂
  // console.warn(`掃描失敗: ${error}`);
}

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
        console.log('媒體流停止成功');
      }
    } catch (e) {
      console.error('停止掃描器發生錯誤:', e);
    }
    html5QrCode = null;
  }
}

async function startScanner(cameraId) {
  try {
    if (cameraId === currentCameraId && html5QrCode) {
      console.log('已是目前相機，無需重啟');
      return;
    }

    await clearScanner();

    html5QrCode = new Html5Qrcode("qr-reader");

    await html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    );

    currentCameraId = cameraId;
    console.log('掃描器啟動完成，使用相機ID:', cameraId);
  } catch (err) {
    console.error('啟動掃描器錯誤:', err);
    alert('啟動掃描器失敗，請確認相機權限並重試。');
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
      console.log('切換相機到: ', newCameraId);
      await startScanner(newCameraId);
    };
  }).catch(err => {
    console.error('取得相機清單失敗:', err);
    alert('無法取得相機清單，請確認瀏覽器已開啟相機權限。');
  });
}

window.addEventListener('load', () => {
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
});
