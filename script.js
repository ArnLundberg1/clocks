body {
  margin: 0;
  background: #000;
  color: #0f0;
  font-family: Arial, sans-serif;
}

nav {
  display: flex;
  background: #111;
  border-bottom: 2px solid #0f0;
}

nav button {
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  color: #0a0;
  cursor: pointer;
}

nav button.active {
  background: #020;
  color: #0f0;
  box-shadow: inset 0 -3px 0 #0f0;
}

.tab {
  display: none;
  padding: 40px;
  text-align: center;
}

.tab.active {
  display: block;
}

.clock {
  font-family: "Courier New", monospace;
  font-size: 96px;
  letter-spacing: 8px;
  color: #0f0;
  text-shadow:
    0 0 5px #0f0,
    0 0 15px #0f0,
    0 0 30px #0f0;
}

.digital-frame {
  display: inline-block;
  padding: 30px 40px;
  border: 4px solid #0f0;
  border-radius: 12px;
  background: radial-gradient(circle at top, #020, #000);
  box-shadow:
    0 0 20px #0f0,
    inset 0 0 20px #0a0;
}

canvas {
  background: #000;
  border-radius: 50%;
  box-shadow: 0 0 20px #0f0;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background: #020;
  color: #0f0;
  border: 2px solid #0f0;
  cursor: pointer;
  font-family: "Courier New", monospace;
}

button:hover {
  background: #040;
}

input[type="time"] {
  background: #000;
  color: #0f0;
  border: 2px solid #0f0;
  padding: 10px;
  font-size: 18px;
}
