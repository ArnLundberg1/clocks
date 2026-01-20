/* Tabs */
function openTab(i) {
  document.querySelectorAll(".tab").forEach((t, idx) =>
    t.classList.toggle("active", idx === i)
  );
  document.querySelectorAll("nav button").forEach((b, idx) =>
    b.classList.toggle("active", idx === i)
  );
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
  document.getElementById("binary").innerHTML =
    `${d.getHours().toString(2).padStart(6, "0")}<br>` +
    `${d.getMinutes().toString(2).padStart(6, "0")}<br>` +
    `${d.getSeconds().toString(2).padStart(6, "0")}`;
}
setInterval(updateBinary, 1000);
updateBinary();

/* Analog */
const canvas = document.getElementById("analog");
const ctx = canvas.getContext("2d");
const r = canvas.width / 2;
ctx.translate(r, r);

function drawHand(pos, len, width, color="#0f0") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0,-len);
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawAnalog() {
  ctx.clearRect(-r, -r, canvas.width, canvas.height);
  const n = new Date();
  drawHand(((n.getHours()%12)+n.getMinutes()/60)*Math.PI/6, r*0.5, 6);
  drawHand((n.getMinutes()+n.getSeconds()/60)*Math.PI/30, r*0.7, 4);
  drawHand(n.getSeconds()*Math.PI/30, r*0.9, 2, "red");
}
setInterval(drawAnalog, 1000);

/* Stopwatch */
let sw=0, swInt;
function startSW(){
  if(!swInt) swInt=setInterval(()=>{
    sw++;
    document.getElementById("stopwatch").textContent =
      new Date(sw*1000).toISOString().substr(11,8);
  },1000);
}
function stopSW(){ clearInterval(swInt); swInt=null; }
function resetSW(){ stopSW(); sw=0; document.getElementById("stopwatch").textContent="00:00:00"; }

/* Alarm + Snooze */
let alarm = null;
const alarmSound = document.getElementById("alarmSound");

function setAlarm() {
  alarm = document.getElementById("alarmInput").value;
  document.getElementById("alarmTime").textContent = alarm;
  document.getElementById("alarmStatus").textContent = "⏰ Alarm satt";
}

function clearAlarm() {
  alarm = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  document.getElementById("alarmStatus").textContent = "Alarm avstängt";
}

function snooze() {
  if (!alarmSound.paused) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
  const d = new Date();
  d.setMinutes(d.getMinutes() + 5);
  alarm = d.toTimeString().slice(0,5);
  document.getElementById("alarmTime").textContent = alarm;
  document.getElementById("alarmStatus").textContent = "😴 Snooze 5 min";
}

setInterval(() => {
  if (!alarm) return;
  if (new Date().toTimeString().slice(0,5) === alarm) {
    alarmSound.play();
    document.getElementById("alarmStatus").textContent = "🔔 VAKNA!";
    alarm = null;
  }
}, 1000);
