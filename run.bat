@echo off
title IE Marbles (India) and KSD Homes (Australia) Launcher
echo =============================================================
echo   STARTING IE MARBLES (INDIA), KSD HOMES (AUSTRALIA) and ADMIN
echo =============================================================

cd /d "%~dp0"
start "IE Marbles - Server (5050)" cmd /k "cd /d "%~dp0server" && npm start"
start "IE Marbles - India Site (3000)" cmd /k "cd /d "%~dp0India" && npm run dev"
start "KSD Homes - Australia Site (3001)" cmd /k "cd /d "%~dp0Australia" && npm run dev"
start "IE Marbles - Admin Panel (3002)" cmd /k "cd /d "%~dp0admin" && npm run dev"
start "Pinggy Public Tunnels (Both Sites)" cmd /k "cd /d "%~dp0" && node run-pinggy-both.js"

echo Waiting 3 seconds for Vite and Express to initialise...
ping -n 4 127.0.0.1 >nul

echo Opening sites in Google Chrome...
start chrome "http://localhost:3000" "http://localhost:3001" "http://localhost:3002"
if errorlevel 1 (
  start "" "http://localhost:3000"
  start "" "http://localhost:3001"
  start "" "http://localhost:3002"
)

echo All services launched!
