@echo off
title IE Marbles (India) & KSD Homes (Australia) Launcher
echo =============================================================
echo   STARTING IE MARBLES (INDIA) & KSD HOMES (AUSTRALIA) IN CHROME
echo =============================================================

cd /d "%~dp0"
start "IE Marbles - Server (5050)" cmd /k "cd /d "%~dp0server" && npm start"
start "IE Marbles - India Site (3000)" cmd /k "cd /d "%~dp0India" && npm run dev"
start "KSD Homes - Australia Site (3001)" cmd /k "cd /d "%~dp0Australia" && npm run dev"
start "IE Marbles - Admin Panel (3002)" cmd /k "cd /d "%~dp0admin" && npm run dev"

echo Waiting 3 seconds for Vite and Express to initialise...
timeout /t 3 /nobreak >nul

echo Opening sites in Google Chrome...
start chrome "http://localhost:3000" "http://localhost:3001"
if errorlevel 1 (
  start "" "http://localhost:3000"
  start "" "http://localhost:3001"
)

echo All services launched!
