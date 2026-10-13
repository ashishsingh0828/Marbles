const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const liveUrlsPath = path.join(__dirname, "live-urls.txt");
const logIndiaPath = path.join(__dirname, "pinggy-india.log");
const logAusPath = path.join(__dirname, "pinggy-australia.log");

const state = {
  india: null,
  australia: null,
};

function cleanUrl(raw) {
  return raw.replace(/[\x1b\x07\r\n\t]/g, "").trim();
}

function extractPinggyUrls(chunk) {
  const text = chunk.toString();
  const found = [];
  const matches = text.match(/https?:\/\/[^\s\x1b\x07"'<>]+/g) || [];
  for (const m of matches) {
    const clean = cleanUrl(m);
    if (clean.includes("pinggy") && !clean.includes("dashboard") && !clean.includes("docs")) {
      found.push(clean);
    }
  }
  return found;
}

function saveSummary() {
  const content = [
    "=================================================================",
    "       IE MARBLES & KSD HOMES - LIVE PINGGY PUBLIC URLS          ",
    "=================================================================",
    "",
    "INDIA WEBSITE (IE MARBLES - Port 3000):",
    state.india ? state.india : "Connecting...",
    "",
    "AUSTRALIA WEBSITE (KSD HOMES - Port 3001):",
    state.australia ? state.australia : "Connecting...",
    "",
    `Status updated: ${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}`,
    "=================================================================",
  ].join("\r\n");

  fs.writeFileSync(liveUrlsPath, content, "utf-8");
}

function launchTunnel(site, port, logFile) {
  console.log(`[Pinggy] Starting tunnel for ${site.toUpperCase()} (Port ${port})...`);
  
  const child = spawn(
    "ssh",
    ["-p", "443", `-R0:localhost:${port}`, "-o", "StrictHostKeyChecking=no", "-o", "ServerAliveInterval=30", "a.pinggy.io"],
    { shell: true }
  );

  const handle = (data) => {
    const str = data.toString();
    try { fs.appendFileSync(logFile, str); } catch (e) {}

    const urls = extractPinggyUrls(str);
    if (urls.length > 0) {
      // Pick https url
      const chosen = urls.find((u) => u.startsWith("https://")) || urls[0];
      if (chosen && state[site] !== chosen) {
        state[site] = chosen;
        console.log(`\n======================================================`);
        console.log(`>>> [${site.toUpperCase()} LIVE URL] Port ${port} -> ${chosen}`);
        console.log(`======================================================\n`);
        saveSummary();
      }
    }
  };

  child.stdout.on("data", handle);
  child.stderr.on("data", handle);

  child.on("close", (code) => {
    console.log(`[Pinggy] ${site} tunnel exited with code ${code}. Reconnecting in 3s...`);
    setTimeout(() => launchTunnel(site, port, logFile), 3000);
  });

  return child;
}

// Reset log files
fs.writeFileSync(logIndiaPath, "", "utf-8");
fs.writeFileSync(logAusPath, "", "utf-8");
saveSummary();

const ind = launchTunnel("india", 3000, logIndiaPath);
const aus = launchTunnel("australia", 3001, logAusPath);

process.on("SIGINT", () => {
  try { ind.kill(); } catch (e) {}
  try { aus.kill(); } catch (e) {}
  process.exit(0);
});
