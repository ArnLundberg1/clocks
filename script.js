/* =========================
   TABBAR
========================= */
function openTab(i) {
  document.querySelectorAll(".tab").forEach((t, idx) => {
    t.classList.toggle("active", idx === i);
  });
  document.querySelectorAll("nav button").forEach((b, idx) => {
    b.classList.toggle("active", idx === i);
  });
}

/* =========================
   DIGITAL
========================= */
const digital = document.getElementById("digital");
function updateDigital() {
  digital.textContent = new Date().toLocaleTimeString();
}
setInterval(updateDigital, 1000);
updateDigital();

/* =========================
   ANALOG
========================= */
const canvas = document.getElementById("analog");
const ctx = canvas.getContext("2d");
const r = canvas.width / 2;
ctx.translate(r, r);

function drawHand(angle, length, width, color = "#0f0") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(angle);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-angle);
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
const wcSE = document.getElementById("wc-se");
const wcNY = document.getElementById("wc-ny");
const wcTokyo = document.getElementById("wc-tokyo");

function updateWorld() {
  wcSE.textContent = "Stockholm: " + new Date().toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm"
  });
  wcNY.textContent = "New York: " + new Date().toLocaleTimeString("en-US", {
    timeZone: "America/New_York"
  });
  wcTokyo.textContent = "Tokyo: " + new Date().toLocaleTimeString("ja-JP", {
    timeZone: "Asia/Tokyo"
  });
}
setInterval(updateWorld, 1000);
updateWorld();

/* =========================
   STOPWATCH
========================= */
const stopwatch = document.getElementById("stopwatch");
let sw = 0, swInt = null;

function startSW() {
  if (swInt) return;
  swInt = setInterval(() => {
    sw++;
    stopwatch.textContent = new Date(sw * 1000).toISOString().substr(11, 8);
  }, 1000);
}
function stopSW() {
  clearInterval(swInt);
  swInt = null;
}
function resetSW() {
  stopSW();
  sw = 0;
  stopwatch.textContent = "00:00:00";
}

/* =========================
   ALARM + LJUD + SNOOZE
========================= */
const alarmSound = document.getElementById("alarmSound");
const alarmInput = document.getElementById("alarmInput");
const alarmStatus = document.getElementById("alarmStatus");
const alarmTime = document.getElementById("alarmTime");
let alarm = null;

function setAlarm() {
  alarm = alarmInput.value;
  alarmTime.textContent = alarm;
  alarmStatus.textContent = "⏰ Alarm satt";
}

function clearAlarm() {
  alarm = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmStatus.textContent = "Alarm av";
}

function snooze() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  const d = new Date();
  d.setMinutes(d.getMinutes() + 5);
  alarm = d.toTimeString().slice(0,5);
  alarmTime.textContent = alarm;
  alarmStatus.textContent = "😴 Snooze 5 min";
}

setInterval(() => {
  if (!alarm) return;
  if (new Date().toTimeString().slice(0,5) === alarm) {
    alarmSound.play();
    alarmStatus.textContent = "🔔 VAKNA!";
    alarm = null;
  }
}, 1000);

/* =========================
   DATUM
========================= */
const dateClock = document.getElementById("dateClock");
function updateDate() {
  dateClock.textContent = new Date().toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
setInterval(updateDate, 1000);
updateDate();

/* =========================
   POMODORO
========================= */
const pomo = document.getElementById("pomo");
let pomoTime = 25 * 60, pomoInt = null;

function startPomo() {
  if (pomoInt) return;
  pomoInt = setInterval(() => {
    pomoTime--;
    pomo.textContent =
      Math.floor(pomoTime / 60) + ":" +
      String(pomoTime % 60).padStart(2, "0");
    if (pomoTime <= 0) {
      clearInterval(pomoInt);
      alarmSound.play();
    }
  }, 1000);
}
function resetPomo() {
  clearInterval(pomoInt);
  pomoInt = null;
  pomoTime = 25 * 60;
  pomo.textContent = "25:00";
}

/* =========================
   UTC / UNIX
========================= */
const utc = document.getElementById("utc");
const unix = document.getElementById("unix");
function updateUTC() {
  utc.textContent = new Date().toUTCString();
  unix.textContent = "UNIX: " + Math.floor(Date.now() / 1000);
}
setInterval(updateUTC, 1000);
updateUTC();

/* =========================
   FLIP
========================= */
const flip = document.getElementById("flip");
setInterval(() => {
  flip.textContent = new Date().toLocaleTimeString();
}, 1000);

/* =========================
   NIGHT
========================= */
const night = document.getElementById("night");
setInterval(() => {
  night.textContent = new Date().toLocaleTimeString();
}, 1000);
