// 音波驅蚊 - Ultrasound Repellent
// 使用 Web Audio API 生成高頻音波干擾蚊子

const STORAGE_KEY = 'repellent_settings';

// 多國語言字典
const i18n = {
  'zh-TW': {
    title: '🦟 音波驅蚊實驗室',
    subtitle: '使用超聲波干擾蚊子活動',
    settingsTitle: '設定與說明',
    languageSection: '🌐 語言選擇',
    themeSection: '🌓 佈景模式',
    aboutSection: '❓ 關於音波驅蚊',
    aboutText: '本工具使用 Web Audio API 產生 15-22 kHz 的超聲波，據稱可以干擾蚊子的導航系統或 mating behavior，達到驅蚊效果。這是完全在瀏覽器中執行的輕量級工具，無需安裝任何 App。',
    howToSection: '📖 使用步驟',
    step1: '<b>選擇模式</b>：單頻（固定頻率）、雙頻（交替切換）、掃頻（頻率範圍掃描）',
    step2: '<b>調整頻率參數</b>：根據模式設定目標頻率（15-22 kHz）和切換/掃描速度',
    step3: '<b>設定音量</b>：建議 30-50% 即可，過大可能造成不適',
    step4: '<b>開始驅蚊</b>：點擊 ▶ 開始，將裝置放置在蚊子活動區域',
    step5: '<b>停止</b>：點擊 ⏹ 停止，歷史記錄會自動保存',
    tipsSection: '💡 注意事項',
    tipsText: '效果不保證 100%，因蚊子品種、距離、障礙物而异。避免長時間使用，建議每 30 分鐘休息 10 分鐘。請勿在需要安靜的場所使用（圖書館、會議室等）。可搭配物理防蚊（蚊帳）和化學防蚊（防蚊液）使用，效果更佳。',
    warningSection: '⚠️ 安全警告',
    warningText: '孕婦、耳疾患者應謹慎使用。若出現頭暈、耳鳴、不適，請立即停止。青少年與年輕人可能聽到輕微高頻聲，若聽到尖銳聲請降低音量或停止。在公共場所使用前請確認當地法規，尊重他人，避免擾民。',
    currentTheme: '淺色模式',
    themeDesc: '切換深色/淺色佈景以適應不同光線環境',
    switchTheme: '切換',
    modeNames: {
      single: '單頻',
      dual: '雙頻',
      sweep: '掃頻'
    }
  },
  'en-US': {
    title: '🦟 Ultrasound Mosquito Repellent Lab',
    subtitle: 'Use ultrasonic waves to interfere with mosquito activity',
    settingsTitle: 'Settings & Help',
    languageSection: '🌐 Language',
    themeSection: '🌓 Theme',
    aboutSection: '❓ About This Tool',
    aboutText: 'This tool uses the Web Audio API to generate ultrasonic waves (15-22 kHz) that are said to interfere with mosquito navigation or mating behavior. It is a lightweight, browser-based tool that requires no installation.',
    howToSection: '📖 How to Use',
    step1: '<b>Choose Mode</b>: Single (fixed frequency), Dual (alternating), Sweep (frequency scan)',
    step2: '<b>Adjust frequency parameters</b>: Set target frequency (15-22 kHz) and switching/scan speed',
    step3: '<b>Set volume</b>: 30-50% is recommended; too high may cause discomfort',
    step4: '<b>Start repelling</b>: Click ▶ to start, place device where mosquitoes are active',
    step5: '<b>Stop</b>: Click ⏹ to stop; usage history is saved automatically',
    tipsSection: '💡 Notes',
    tipsText: 'Effectiveness is not guaranteed 100% and varies by mosquito species, distance, and obstacles. Avoid prolonged use; take a 10-minute break every 30 minutes. Do not use in quiet environments (libraries, meetings, etc.). Combining with physical (mosquito net) and chemical (repellent) methods yields better results.',
    warningSection: '⚠️ Safety Warning',
    warningText: 'Pregnant women and those with ear conditions should use with caution. Stop immediately if you experience dizziness, tinnitus, or discomfort. Young people may hear faint high-pitched sounds; if you do, lower the volume or stop. Check local regulations before using in public places, and respect others to avoid nuisance.',
    currentTheme: 'Light Mode',
    themeDesc: 'Switch between dark and light themes to suit your lighting environment',
    switchTheme: 'Switch',
    modeNames: {
      single: 'Single',
      dual: 'Dual',
      sweep: 'Sweep'
    }
  },
  'ja-JP': {
    title: '🦟 超音波蚊除け実験室',
    subtitle: '超音波で蚊の活動を妨害します',
    settingsTitle: '設定と説明',
    languageSection: '🌐 言語選択',
    themeSection: '🌓 テーマ',
    aboutSection: '❓ このツールについて',
    aboutText: 'このツールは Web Audio API を使用して 15-22 kHz の超音波を生成し、蚊のナビゲーションや交尾行動を妨げるとされています。ブラウザ上で動作する軽量なツールで、インストールは不要です。',
    howToSection: '📖 使い方',
    step1: '<b>モード選択</b>：単頻（固定周波数）、双頻（交互切り替え）、掃頻（周波数スキャン）',
    step2: '<b>周波数パラメータ調整</b>：目標周波数（15-22 kHz）と切り替え/スキャン速度を設定',
    step3: '<b>音量設定</b>：30-50% を推奨。高すぎると不快に感じる場合があります',
    step4: '<b>蚊除け開始</b>：▶ をクリックして開始、蚊が活動する場所に装置を配置',
    step5: '<b>停止</b>：⏹ をクリックして停止、使用履歴は自動保存',
    tipsSection: '💡 注意点',
    tipsText: '効果は 100% 保証されず、蚊の種類、距離、障害物によって異なります。長時間の使用は避け、30 分ごとに 10 分間休憩してください。図書館、会議など静かな場所では使用しないでください。物理的（蚊帳）および化学的（虫除けスプレー）な方法と併用すると効果が高まります。',
    warningSection: '⚠️ 安全警告',
    warningText: '妊婦や耳に問題のある方は注意して使用してください。めまい、耳鳴り、不快感が出た場合はすぐに停止してください。若い人の中は高音が聞こえる場合があります。聞こえたら音量を下げるか停止してください。公共の場で使用する前に現地の規制を確認し、他の人への迷惑にならないようにしてください。',
    currentTheme: 'ライトモード',
    themeDesc: '暗色／明色テーマを切り替えて、光環境に合わせます',
    switchTheme: '切り替え',
    modeNames: {
      single: '単頻',
      dual: '双頻',
      sweep: '掃頻'
    }
  },
  'es-ES': {
    title: '🦟 Laboratorio de Repelente de Mosquitos por Ultrasonido',
    subtitle: 'Usa ondas ultrasónicas para interferir en la actividad de los mosquitos',
    settingsTitle: 'Configuración y Ayuda',
    languageSection: '🌐 Idioma',
    themeSection: '🌓 Tema',
    aboutSection: '❓ Acerca de Esta Herramienta',
    aboutText: 'Esta herramienta usa la Web Audio API para generar ondas ultrasónicas (15-22 kHz) que pueden interferir con la navegación o el apareamiento de los mosquitos. Es una herramienta ligera basada en navegador, sin necesidad de instalación.',
    howToSection: '📖 Cómo Usar',
    step1: '<b>Elige Modo</b>: Simple (frecuencia fija), Dual (alternancia), Barrido (escaneo)',
    step2: '<b>Ajusta parámetros de frecuencia</b>: Establece frecuencia objetivo (15-22 kHz) y velocidad de cambio/escaneo',
    step3: '<b>Configura volumen</b>: Se recomienda 30-50%; volumen alto puede causar molestias',
    step4: '<b>Iniciar repulsión</b>: Haz clic en ▶ para comenzar, coloca el dispositivo donde haya mosquitos',
    step5: '<b>Detener</b>: Haz clic en ⏹ para detener; el historial se guarda automáticamente',
    tipsSection: '💡 Notas',
    tipsText: 'La efectividad no está garantizada al 100% y varía según la especie de mosquito, distancia y obstáculos. Evita el uso prolongado; toma un descanso de 10 minutos cada 30 minutos. No usar en entornos silenciosos (bibliotecas, reuniones, etc.). Combinar con métodos físicos (mosquitero) y químicos (repelente) da mejores resultados.',
    warningSection: '⚠️ Advertencia de Seguridad',
    warningText: 'Mujeres embarazadas y personas con problemas auditivos deben tener precaución. Detén inmediatamente si experimentas mareos, tinnitus o molestias. Los jóvenes pueden oír sonidos agudos; si los escuchas, baja el volumen o detén el dispositivo. Antes de usar en espacios públicos, verifica las regulaciones locales y respeta a los demás para evitar molestias.',
    currentTheme: 'Modo Claro',
    themeDesc: 'Alterna entre temas oscuro y claro para adaptarte a tu entorno de iluminación',
    switchTheme: 'Cambiar',
    modeNames: {
      single: 'Simple',
      dual: 'Dual',
      sweep: 'Barrido'
    }
  }
};

// 全域變數
let audioCtx = null;
let oscillator = null;
let gainNode = null;
let sweepInterval = null;
let isPlaying = false;
let currentMode = 'single';
let startTime = null;

let settings = loadSettings();
let currentLang = localStorage.getItem('repellentLang') || 'zh-TW';
let currentTheme = localStorage.getItem('repellentTheme') || 'light';

// 情境快速設定（對應 README 建議參數）
const PRESETS = {
  'indoor-basic': {
    mode: 'single',
    singleFreq: 17.5,
    volume: 0.4
  },
  'multi-species': {
    mode: 'dual',
    dualFreq1: 16,
    dualFreq2: 19,
    dualSpeed: 1000,
    volume: 0.5
  },
  'wide-area': {
    mode: 'sweep',
    sweepLow: 15,
    sweepHigh: 22,
    sweepSpeed: 2,
    volume: 0.6
  },
  'night-bedroom': {
    mode: 'single',
    singleFreq: 18,
    volume: 0.3
  },
  'outdoor-camping': {
    mode: 'sweep',
    sweepLow: 16,
    sweepHigh: 20,
    sweepSpeed: 1,
    volume: 0.7
  }
};

// DOM 元素
const el = {
  statusIndicator: document.getElementById('statusIndicator'),
  statusText: document.getElementById('statusText'),
  currentFreq: document.getElementById('currentFreq'),
  waveType: document.getElementById('waveType'),
  startBtn: document.getElementById('startBtn'),
  stopBtn: document.getElementById('stopBtn'),
  singleFreq: document.getElementById('singleFreq'),
  singleFreqValue: document.getElementById('singleFreqValue'),
  dualFreq1: document.getElementById('dualFreq1'),
  dualFreq2: document.getElementById('dualFreq2'),
  dualSpeed: document.getElementById('dualSpeed'),
  dualSpeedValue: document.getElementById('dualSpeedValue'),
  sweepLow: document.getElementById('sweepLow'),
  sweepHigh: document.getElementById('sweepHigh'),
  sweepSpeed: document.getElementById('sweepSpeed'),
  sweepSpeedValue: document.getElementById('sweepSpeedValue'),
  volumeSlider: document.getElementById('volumeSlider'),
  volumeValue: document.getElementById('volumeValue'),
  historyList: document.getElementById('historyList')
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// ==================== 資料儲存 ====================

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('載入設定失敗', e);
    }
  }
  return {
    mode: 'single',
    singleFreq: 17.5,
    dualFreq1: 16,
    dualFreq2: 19,
    dualSpeed: 1000,
    sweepLow: 15,
    sweepHigh: 22,
    sweepSpeed: 2,
    volume: 0.5,
    history: []
  };
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// ==================== 多國語言與佈景 ====================

function applyLanguage() {
  const dict = i18n[currentLang] || i18n['zh-TW'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  // 更新波形類型顯示
  if (typeof updateWaveTypeLabel === 'function') {
    updateWaveTypeLabel();
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('repellentLang', lang);
  applyLanguage();
  // 更新按鈕狀態
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  closeModalBtn();
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('repellentTheme', currentTheme);
  applyTheme();
  // 更新 Modal 中的顯示
  const dict = i18n[currentLang] || i18n['zh-TW'];
  const themeName = currentTheme === 'dark' ? '深色模式' : '淺色模式';
  const themeInfo = document.getElementById('themeInfo');
  if (themeInfo) {
    themeInfo.innerHTML = `
      <strong>${themeName}</strong>
      <span>${dict.themeDesc}</span>
    `;
  }
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
}

// Modal 控制
function openSettings(tab = 'language') {
  // 更新語言按鈕狀態
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
  // 更新主題顯示
  const dict = i18n[currentLang] || i18n['zh-TW'];
  const themeName = currentTheme === 'dark' ? '深色模式' : '淺色模式';
  const themeInfo = document.getElementById('themeInfo');
  if (themeInfo) {
    themeInfo.innerHTML = `
      <strong>${themeName}</strong>
      <span>${dict.themeDesc}</span>
    `;
  }
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
  
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.add('active');
  // 根據入口按鈕切換到對應分頁
  setActiveModalSection(tab);
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('settingsModal')) return;
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('active');
}

function closeModalBtn() {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('active');
}

// 切換 Modal 分頁（語言 / 佈景 / 說明 / 進階設定）
function setActiveModalSection(section) {
  const groups = document.querySelectorAll('.modal-section-group');
  groups.forEach(g => {
    g.classList.toggle('active', g.getAttribute('data-section') === section);
  });
  const tabs = document.querySelectorAll('.modal-nav-btn');
  tabs.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-section-target') === section);
  });
}

// 初始化應用
function initApp() {
  applyTheme();
  applyLanguage();
  initUIFromSettings();
  setupEventListeners();
  renderHistory();
}

// ==================== 音頻引擎 ====================

function initAudio() {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
}

function startSound() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const volume = parseFloat(el.volumeSlider.value);
  gainNode = audioCtx.createGain();
  gainNode.gain.value = volume;
  gainNode.connect(audioCtx.destination);

  startTime = Date.now();
  isPlaying = true;
  applyMode(); // 根據當前模式開始發聲
  updateStatus(true);
  recordStart();
}

function stopSound() {
  if (oscillator) {
    try {
      oscillator.stop();
      oscillator.disconnect();
    } catch (e) {
      // 忽略已停止的錯誤
    }
    oscillator = null;
  }
  if (sweepInterval) {
    clearInterval(sweepInterval);
    sweepInterval = null;
  }
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }

  isPlaying = false;
  updateStatus(false);
  recordStop();
}

function applyMode() {
  currentMode = settings.mode;

  switch (currentMode) {
    case 'single':
      startSingleFrequency();
      break;
    case 'dual':
      startDualFreq();
      break;
    case 'sweep':
      startSweep();
      break;
  }
}

function startSingleFrequency() {
  const freq = parseFloat(settings.singleFreq) * 1000; // 轉為 Hz
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine'; // 正弦波對蚊子最有效
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  oscillator.connect(gainNode);
  oscillator.start();
  updateDisplay(freq / 1000);
}

function startDualFreq() {
  const f1 = parseFloat(settings.dualFreq1) * 1000;
  const f2 = parseFloat(settings.dualFreq2) * 1000;
  const speed = parseFloat(settings.dualSpeed);

  let useFirst = true;
  function toggle() {
    if (!isPlaying) return;
    if (oscillator) {
      try { oscillator.stop(); oscillator.disconnect(); } catch (e) {}
    }
    const freq = useFirst ? f1 : f2;
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscillator.connect(gainNode);
    oscillator.start();
    updateDisplay(freq / 1000);
    useFirst = !useFirst;
  }

  toggle();
  sweepInterval = setInterval(toggle, speed);
}

function startSweep() {
  const low = parseFloat(settings.sweepLow) * 1000;
  const high = parseFloat(settings.sweepHigh) * 1000;
  const duration = parseFloat(settings.sweepSpeed) * 1000;

  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';

  // 使用 frequency ramp 來掃頻
  oscillator.frequency.setValueAtTime(low, audioCtx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(high, audioCtx.currentTime + duration / 1000);
  oscillator.connect(gainNode);
  oscillator.start();

  // 反向掃描
  function sweep() {
    if (!isPlaying) return;
    const now = audioCtx.currentTime;
    oscillator.frequency.cancelScheduledValues(now);
    oscillator.frequency.setValueAtTime(high, now);
    oscillator.frequency.linearRampToValueAtTime(low, now + duration / 1000);

    // 反向後再正向
    setTimeout(() => {
      if (!isPlaying) return;
      const n = audioCtx.currentTime;
      oscillator.frequency.cancelScheduledValues(n);
      oscillator.frequency.setValueAtTime(low, n);
      oscillator.frequency.linearRampToValueAtTime(high, n + duration / 1000);
      sweep(); // 遞迴
    }, duration);
  }

  // 啟動往返掃頻循環
  sweep();

  // 起始顯示
  const avg = (low + high) / 2;
  updateDisplay(avg / 1000);

  sweepInterval = setInterval(() => {
    // 用于更新顯示頻率（中間值）
    if (isPlaying) {
      const now = Date.now();
      const progress = (now % (duration * 2)) / duration;
      const dir = progress < 1 ? 0 : 1;
      const freq = dir === 0
        ? low + (high - low) * (progress % 1)
        : high - (high - low) * (progress % 1);
      updateDisplay(freq / 1000);
    }
  }, 100);
}

// ==================== UI 更新 ====================

function updateStatus(active) {
  if (active) {
    el.statusIndicator.classList.add('active');
    el.statusText.textContent = '運行中';
    el.startBtn.disabled = true;
    el.stopBtn.disabled = false;
  } else {
    el.statusIndicator.classList.remove('active');
    el.statusText.textContent = '已停止';
    el.startBtn.disabled = false;
    el.stopBtn.disabled = true;
  }
}

function updateDisplay(freqKhz) {
  el.currentFreq.textContent = freqKhz.toFixed(1);

  switch (currentMode) {
    case 'single':
      el.waveType.textContent = '單頻';
      break;
    case 'dual':
      el.waveType.textContent = `雙頻 (${settings.dualFreq1}/${settings.dualFreq2} kHz)`;
      break;
    case 'sweep':
      el.waveType.textContent = `掃頻 (${settings.sweepLow}-${settings.sweepHigh} kHz)`;
      break;
  }
}

// ==================== 歷史記錄 ====================

function recordStart() {
  const record = {
    start: Date.now(),
    mode: settings.mode,
    freq: currentMode === 'single' ? settings.singleFreq : (currentMode === 'dual' ? `${settings.dualFreq1}/${settings.dualFreq2}` : `${settings.sweepLow}-${settings.sweepHigh}`),
    volume: el.volumeSlider.value
  };
  settings.history.unshift(record);
  if (settings.history.length > 50) settings.history.pop();
  saveSettings();
  renderHistory();
}

function recordStop() {
  if (!settings.history[0]) return;
  const last = settings.history[0];
  const duration = Math.floor((Date.now() - last.start) / 1000);
  last.end = Date.now();
  last.duration = duration;
  saveSettings();
  renderHistory();
}

function renderHistory() {
  el.historyList.innerHTML = '';
  settings.history.slice(0, 10).forEach(h => {
    const item = document.createElement('div');
    item.className = 'history-item';
    const date = new Date(h.start);
    const timeStr = date.toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    const durMin = Math.floor(h.duration / 60);
    const durSec = h.duration % 60;
    const durStr = durMin > 0 ? `${durMin}分${durSec}秒` : `${durSec}秒`;
    item.innerHTML = `
      <span class="history-time">${timeStr}</span>
      <span class="history-duration">${h.mode} · ${h.freq} kHz · ${durStr}</span>
    `;
    el.historyList.appendChild(item);
  });
  if (settings.history.length === 0) {
    el.historyList.innerHTML = '<p style="text-align:center;color:#999;">暫無記錄</p>';
  }
}

// ==================== UI 初始化 ====================

function initUIFromSettings() {
  // 設定模式選擇
  const radios = document.querySelectorAll('input[name="freqMode"]');
  radios.forEach(r => {
    r.checked = (r.value === settings.mode);
  });

  // 頻率與參數
  el.singleFreq.value = settings.singleFreq;
  el.singleFreqValue.textContent = settings.singleFreq + ' kHz';

  el.dualFreq1.value = settings.dualFreq1;
  el.dualFreq2.value = settings.dualFreq2;
  el.dualSpeed.value = settings.dualSpeed;
  el.dualSpeedValue.textContent = (settings.dualSpeed / 1000).toFixed(1) + ' 秒';

  el.sweepLow.value = settings.sweepLow;
  el.sweepHigh.value = settings.sweepHigh;
  el.sweepSpeed.value = settings.sweepSpeed;
  el.sweepSpeedValue.textContent = settings.sweepSpeed.toFixed(1) + ' 秒/次';

  el.volumeSlider.value = settings.volume;
  el.volumeValue.textContent = Math.round(settings.volume * 100) + '%';

  updateWaveTypeLabel();
}

function updateWaveTypeLabel() {
  const dict = i18n[currentLang] || i18n['zh-TW'];
  const modeName = dict.modeNames[settings.mode] || settings.mode;
  switch (settings.mode) {
    case 'single':
      el.waveType.textContent = `${modeName} (${settings.singleFreq} kHz)`;
      break;
    case 'dual':
      el.waveType.textContent = `${modeName} (${settings.dualFreq1}/${settings.dualFreq2} kHz)`;
      break;
    case 'sweep':
      el.waveType.textContent = `${modeName} (${settings.sweepLow}-${settings.sweepHigh} kHz)`;
      break;
  }
}

// ==================== 事件綁定 ====================

function setupEventListeners() {
  // 開始/停止
  el.startBtn.addEventListener('click', () => {
    startSound();
  });
  el.stopBtn.addEventListener('click', () => {
    stopSound();
  });

  // 頻率模式切換
  document.querySelectorAll('input[name="freqMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      settings.mode = e.target.value;
      saveSettings();
      updateWaveTypeLabel();

      // 如果正在播放，重新應用
      if (isPlaying) {
        stopSound();
        startSound();
      }
    });
  });

  // 單頻滑桿
  el.singleFreq.addEventListener('input', (e) => {
    settings.singleFreq = parseFloat(e.target.value);
    el.singleFreqValue.textContent = settings.singleFreq + ' kHz';
    saveSettings();
    if (isPlaying && currentMode === 'single') {
      stopSound();
      startSound();
    }
  });

  // 雙頻輸入
  el.dualFreq1.addEventListener('change', updateDual);
  el.dualFreq2.addEventListener('change', updateDual);
  el.dualSpeed.addEventListener('input', (e) => {
    settings.dualSpeed = parseFloat(e.target.value);
    el.dualSpeedValue.textContent = (settings.dualSpeed / 1000).toFixed(1) + ' 秒';
    saveSettings();
    if (isPlaying && currentMode === 'dual') {
      stopSound();
      startSound();
    }
  });

  function updateDual() {
    settings.dualFreq1 = parseFloat(el.dualFreq1.value);
    settings.dualFreq2 = parseFloat(el.dualFreq2.value);
    saveSettings();
    if (isPlaying && currentMode === 'dual') {
      stopSound();
      startSound();
    }
  }

  // 掃頻輸入
  el.sweepLow.addEventListener('change', updateSweep);
  el.sweepHigh.addEventListener('change', updateSweep);
  el.sweepSpeed.addEventListener('input', (e) => {
    settings.sweepSpeed = parseFloat(e.target.value);
    el.sweepSpeedValue.textContent = settings.sweepSpeed.toFixed(1) + ' 秒/次';
    saveSettings();
    if (isPlaying && currentMode === 'sweep') {
      stopSound();
      startSound();
    }
  });

  function updateSweep() {
    settings.sweepLow = parseFloat(el.sweepLow.value);
    settings.sweepHigh = parseFloat(el.sweepHigh.value);
    saveSettings();
    if (isPlaying && currentMode === 'sweep') {
      stopSound();
      startSound();
    }
  }

  // 音量
  el.volumeSlider.addEventListener('input', (e) => {
    settings.volume = parseFloat(e.target.value);
    el.volumeValue.textContent = Math.round(settings.volume * 100) + '%';
    if (gainNode) {
      gainNode.gain.setValueAtTime(settings.volume, audioCtx.currentTime);
    }
    saveSettings();
  });

  // 情境快速設定按鈕
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-preset');
      applyPreset(key);
    });
  });

  // Modal 分頁按鈕
  document.querySelectorAll('.modal-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section-target');
      setActiveModalSection(target);
    });
  });
}

// 一鍵套用情境建議參數
function applyPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return;

  // 套用模式
  if (preset.mode) {
    settings.mode = preset.mode;
  }
  // 套用頻率與速度
  if (typeof preset.singleFreq === 'number') {
    settings.singleFreq = preset.singleFreq;
  }
  if (typeof preset.dualFreq1 === 'number') {
    settings.dualFreq1 = preset.dualFreq1;
  }
  if (typeof preset.dualFreq2 === 'number') {
    settings.dualFreq2 = preset.dualFreq2;
  }
  if (typeof preset.dualSpeed === 'number') {
    settings.dualSpeed = preset.dualSpeed;
  }
  if (typeof preset.sweepLow === 'number') {
    settings.sweepLow = preset.sweepLow;
  }
  if (typeof preset.sweepHigh === 'number') {
    settings.sweepHigh = preset.sweepHigh;
  }
  if (typeof preset.sweepSpeed === 'number') {
    settings.sweepSpeed = preset.sweepSpeed;
  }
  if (typeof preset.volume === 'number') {
    settings.volume = preset.volume;
  }

  saveSettings();
  // 依最新設定更新 UI
  initUIFromSettings();

  // 同步模式選項的 radio
  const modeRadios = document.querySelectorAll('input[name="freqMode"]');
  modeRadios.forEach(radio => {
    radio.checked = (radio.value === settings.mode);
  });

  // 若正在播放，重新套用聲音；若尚未播放，直接啟動
  if (isPlaying) {
    stopSound();
    startSound();
  } else {
    startSound();
  }
}
