/* =========================
   TAB-HANTERING
========================= */
function openTab(i) {
  document.querySelectorAll(".tab").forEach((tab, idx) => {
    tab.classList.toggle("active", idx === i);
  });
  document.querySelectorAll("nav button").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === i);
  });
}

/* =========================
   DIGITAL KLOCKA
========================= */
function updateDigital() {
  digital.textContent = new Date().toLocaleTimeString();
}
setInterval(updateDigital, 1000);
updateDigital();

/* =========================
   ANALOG KLOCKA
========================= */
const canvas = document.getElementById("analog");
const ctx = canvas.getContext("2d");
const r = canvas.width / 2;
ctx.translate(r, r);

function drawHand(pos, len, width, color = "#0f0") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -len);
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawAnalog() {
  ctx.clearRect(-r, -r, canvas.width, canvas.height);
  const now = new Date();

  drawHand(
    ((now.getHours() % 12) + now.getMinutes() / 60) * Math.PI / 6,
    r * 0.5,
    6
  );
  drawHand(
    (now.getMinutes() + now.getSeconds() / 60) * Math.PI / 30,
    r * 0.7,
    4
  );
  drawHand(
    now.getSeconds() * Math.PI / 30,
    r * 0.9,
    2,
    "red"
  );
}
setInterval(drawAnalog, 1000);

/* =========================
   WORLD CLOCK
========================= */
function updateWorldClocks() {
  wc-se.textContent = new Date().toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
  });
  wc-ny.textContent = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
  });
  wc-tokyo.textContent = new Date().toLocaleTimeString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
}
setInterval(updateWorldClocks, 1000);
updateWorldClocks();

/* =========================
   STOPWATCH
========================= */
let swTime = 0;
let swInterval = null;

function startSW() {
  if (swInterval) return;
  swInterval = setInterval(() => {
    swTime++;
    stopwatch.textContent = new Date(swTime * 1000)
      .toISOString()
      .substr(11, 8);
  }, 1000);
}

function stopSW() {
  clearInterval(swInterval);
  swInterval = null;
}

function resetSW() {
  stopSW();
  swTime = 0;
  stopwatch.textContent = "00:00:00";
}

/* =========================
   ALARM + LJUD + SNOOZE
========================= */
let alarm = null;
const alarmSound = document.getElementById("alarmSound");

function setAlarm() {
  alarm = alarmInput.value;
  alarmTime.textContent = alarm;
  alarmStatus.textContent = "⏰ Alarm satt";
}

function clearAlarm() {
  alarm = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmStatus.textContent = "Alarm avstängt";
}

function snooze() {
  alarmSound.pause();
  alarmSound.currentTime = 0;

  const d = new Date();
  d.setMinutes(d.getMinutes() + 5);
  alarm = d.toTimeString().slice(0, 5);

  alarmTime.textContent = alarm;
  alarmStatus.textContent = "😴 Snooze 5 min";
}

setInterval(() => {
  if (!alarm) return;
  if (new Date().toTimeString().slice(0, 5) === alarm) {
    alarmSound.play();
    alarmStatus.textContent = "🔔 VAKNA!";
    alarm = null;
  }
}, 1000);

/* =========================
   DATUM-KLOCKA
========================= */
function updateDate() {
  dateClock.textContent = new Date().toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
setInterval(updateDate, 1000);
updateDate();

/* =========================
   POMODORO
========================= */
let pomoTime = 25 * 60;
let pomoInterval = null;

function startPomo() {
  if (pomoInterval) return;
  pomoInterval = setInterval(() => {
    pomoTime--;
    pomo.textContent =
      Math.floor(pomoTime / 60) +
      ":" +
      String(pomoTime % 60).padStart(2, "0");

    if (pomoTime <= 0) {
      clearInterval(pomoInterval);
      pomoInterval = null;
      alarmSound.play();
    }
  }, 1000);
}

function resetPomo() {
  clearInterval(pomoInterval);
  pomoInterval = null;
  pomoTime = 25 * 60;
  pomo.textContent = "25:00";
}

/* =========================
   UTC / UNIX
========================= */
function updateUTC() {
  utc.textContent = new Date().toUTCString();
  unix.textContent = "UNIX: " + Math.floor(Date.now() / 1000);
}
setInterval(updateUTC, 1000);
updateUTC();

/* =========================
   FLIP CLOCK
========================= */
function updateFlip() {
  flip.textContent = new Date().toLocaleTimeString();
}
setInterval(updateFlip, 1000);
updateFlip();

/* =========================
   NIGHT CLOCK (FULLSCREEN)
========================= */
function toggleFull() {
  document.documentElement.requestFullscreen?.();
}

function updateNight() {
  night.textContent = new Date().toLocaleTimeString();
}
setInterval(updateNight, 1000);
updateNight();
