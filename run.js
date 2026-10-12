const { spawn, exec } = require("child_process");
const path = require("path");

console.log("\n=======================================================");
console.log("   IE MARBLES (INDIA) & KSD HOMES (AUSTRALIA) LAUNCHER ");
console.log("=======================================================\n");

function run(cmd, args, cwd, name) {
  const p = spawn(cmd, args, {
    cwd: path.resolve(__dirname, cwd),
    shell: true,
    stdio: "inherit",
  });
  p.on("error", (err) => console.error(`[${name} ERROR]`, err.message));
  return p;
}

// 1. Start Server API (Port 5050)
console.log("-> Starting Server API (Port 5050)...");
const server = run("npm", ["start"], "server", "SERVER");

// 2. Start India Website (Port 3000)
console.log("-> Starting India Site - IE Marbles (Port 3000)...");
const india = run("npm", ["run", "dev"], "India", "INDIA");

// 3. Start Australia Website (Port 3001)
console.log("-> Starting Australia Site - KSD Homes (Port 3001)...");
const australia = run("npm", ["run", "dev"], "Australia", "AUSTRALIA");

// 4. Start Admin Panel (Port 3002)
console.log("-> Starting Admin Panel (Port 3002)...");
const admin = run("npm", ["run", "dev"], "admin", "ADMIN");

// 5. Open in Chrome after a brief delay
setTimeout(() => {
  console.log("\n-> Opening Chrome for India (http://localhost:3000) and Australia (http://localhost:3001) ...\n");
  exec('start chrome "http://localhost:3000" "http://localhost:3001"', (err) => {
    if (err) {
      exec('start "" "http://localhost:3000"');
      exec('start "" "http://localhost:3001"');
    }
  });
}, 3500);

process.on("SIGINT", () => {
  server.kill();
  india.kill();
  australia.kill();
  admin.kill();
  process.exit();
});
