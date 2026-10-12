const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'pinggy-raw.log');
const outFile = path.join(__dirname, 'live-urls.txt');

const pinggy = spawn('ssh', [
  '-p', '443',
  '-R0:localhost:3000',
  '-o', 'StrictHostKeyChecking=no',
  '-o', 'ServerAliveInterval=30',
  'a.pinggy.io'
]);

function processChunk(data) {
  const str = data.toString();
  fs.appendFileSync(logFile, str);
  // Find any http or https URLs
  const urls = str.match(/https?:\/\/[^\s]+/g);
  if (urls) {
    for (const u of urls) {
      if (u.includes('pinggy') && !u.includes('dashboard') && !u.includes('docs')) {
        let clean = u.replace(/[\x1b\x07\r\n\t]/g, '').trim();
        fs.writeFileSync(outFile, clean);
      }
    }
  }
}

pinggy.stdout.on('data', processChunk);
pinggy.stderr.on('data', processChunk);
