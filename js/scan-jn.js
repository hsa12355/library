const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'zh';
const camParam = urlParams.get('cam');

let html5QrCode = null;
let currentCameraId = null;

function onScanSuccess(decodedText) {
  console.log(`スキャン成功: ${decodedText}`);

  let target;
  if (decodedText.endsWith('.html')) {
    target = decodedText;
  } else {
    target = `free-station-${lang}/${decodedText}.html`;
  }

  // 重複遷移を防止
  if (window.location.href !== target) {
    window.location.href = target;
  }
}

function onScanFailure(error) {
  // スキャン失敗時は特に処理なし
}

async function clearScanner() {
  if (html5QrCode) {
    try {
      console.log('スキャナーを停止しています...');
      await html5QrCode.stop();
      html5QrCode.clear();

      const videoElem = document.querySelector("#qr-reader video");
      if (videoElem && videoElem.srcObject) {
        videoElem.srcObject.getTracks().forEach(track => track.stop());
        videoElem.srcObject = null;
      }
    } catch (e) {
      console.error('スキャナー停止中にエラーが発生しました:', e);
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
    console.log('スキャナー起動完了、使用中のカメラID:', cameraId);
  } catch (err) {
    console.error('スキャナー起動エラー:', err);
    alert('スキャナーの起動に失敗しました。カメラの使用許可を確認して、ページを再読み込みしてください。');
  }
}

function initCameraSelector() {
  Html5Qrcode.getCameras().then(devices => {
    if (!devices || devices.length === 0) {
      alert('カメラデバイスが見つかりません');
      return;
    }

    const select = document.getElementById('camera-select');
    select.innerHTML = '';

    devices.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.id;
      option.text = device.label || `カメラ ${index + 1}`;
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
      // 履歴の積み重ねを避けるためreplaceStateを使用
      window.history.replaceState(null, '', `${window.location.pathname}?${newUrlParams.toString()}`);
      startScanner(newCamId);
    };
  }).catch(err => {
    console.error('カメラ一覧取得失敗:', err);
    alert('カメラ一覧を取得できません。カメラの使用許可があるか確認してください。');
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
