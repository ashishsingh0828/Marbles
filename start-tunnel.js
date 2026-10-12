const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const urlFile = path.join(__dirname, 'tunnel-url.txt');
try { fs.unlinkSync(urlFile); } catch (e) {}

// 1. Launch Pinggy
try {
  const pinggy = spawn('ssh', [
    '-p', '443',
    '-R0:localhost:3000',
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'ServerAliveInterval=30',
    'a.pinggy.io'
  ]);

  const handleData = (buf) => {
    const text = buf.toString();
    const match = text.match(/https:\/\/[a-z0-9-]+\.(?:free\.)?pinggy\.(?:link|net|io)/i) ||
                  text.match(/https:\/\/[a-z0-9-]+\.run\.pinggy-free\.link/i);
    if (match) {
      console.log('FOUND PINGGY URL:', match[0]);
      let current = '';
      try { current = fs.readFileSync(urlFile, 'utf8'); } catch (e) {}
      if (!current.includes(match[0])) {
        fs.writeFileSync(urlFile, (current ? current + '\n' : '') + match[0], 'utf8');
      }
    }
  };

  pinggy.stdout.on('data', handleData);
  pinggy.stderr.on('data', handleData);
} catch (e) {
  console.log('Pinggy launch error:', e.message);
}

// 2. Launch Localtunnel as backup
try {
  const lt = spawn('cmd.exe', ['/c', 'npx', '-y', 'localtunnel', '--port', '3000']);
  lt.stdout.on('data', (buf) => {
    const text = buf.toString();
    const match = text.match(/https:\/\/[a-z0-9-]+\.loca\.lt/i);
    if (match) {
      console.log('FOUND LOCALTUNNEL URL:', match[0]);
      let current = '';
      try { current = fs.readFileSync(urlFile, 'utf8'); } catch (e) {}
      if (!current.includes(match[0])) {
        fs.writeFileSync(urlFile, (current ? current + '\n' : '') + match[0], 'utf8');
      }
    }
  });
} catch (e) {
  console.log('Localtunnel launch error:', e.message);
}
