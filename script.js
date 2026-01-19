/* Tabs */
function openTab(i) {
  document.querySelectorAll(".tab").forEach((t, idx) => {
    t.classList.toggle("active", idx === i);
  });
  document.querySelectorAll("nav button").forEach((b, idx) => {
    b.classList.toggle("active", idx === i);
  });
}

/* Digital */
function updateDigital() {
  document.getElementById("digital").textContent =
    new Date().toLocaleTimeString();
}
setInterval(updateDigital, 1000);
updateDigital();

/* Binary */
function updateBinary() {
  const d = new Date();
  const h = d.getHours().toString(2).padStart(6, "0");
  const m = d.getMinutes().toString(2).padStart(6, "0");
  const s = d.getSeconds().toString(2).padStart(6, "0");
  document.getElementById("binary").innerHTML = `${h}<br>${m}<br>${s}`;
}
setInterval(updateBinary, 1000);
updateBinary();

/* Analog */
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
  drawHand(((now.getHours() % 12) + now.getMinutes() / 60) * Math.PI / 6, r * 0.5, 6);
  drawHand((now.getMinutes() + now.getSeconds() / 60) * Math.PI / 30, r * 0.7, 4);
  drawHand(now.getSeconds() * Math.PI / 30, r * 0.9, 2, "red");
}
setInterval(drawAnalog, 1000);

/* Stopwatch */
let sw = 0, swInt;
function startSW() {
  if (!swInt) swInt = setInterval(() => {
    sw++;
    document.getElementById("stopwatch").textContent =
      new Date(sw * 1000).toISOString().substr(11, 8);
  }, 1000);
}
function stopSW() { clearInterval(swInt); swInt = null; }
function resetSW() { stopSW(); sw = 0; document.getElementById("stopwatch").textContent = "00:00:00"; }

/* Alarm */
let alarm = null;

function setAlarm() {
  alarm = document.getElementById("alarmInput").value;
  document.getElementById("alarmTime").textContent = alarm;
  document.getElementById("alarmStatus").textContent = "⏰ Alarm satt";
}

function clearAlarm() {
  alarm = null;
  document.getElementById("alarmStatus").textContent = "Alarm avstängt";
}

setInterval(() => {
  if (!alarm) return;
  const now = new Date().toTimeString().slice(0, 5);
  if (now === alarm) {
    alert("⏰ VAKNA!");
    alarm = null;
  }
}, 1000);
