@echo off
title Pinggy Public Link Launcher
echo ==============================================================
echo   STARTING PINGGY PUBLIC TUNNELS FOR BOTH WEBSITES
echo ==============================================================
echo.
cd /d "%~dp0"
start "Pinggy Public Tunnel - India Site (3000)" cmd /k "ssh -p 443 -R0:localhost:3000 -o StrictHostKeyChecking=no a.pinggy.io"
start "Pinggy Public Tunnel - Australia Site (3001)" cmd /k "ssh -p 443 -R0:localhost:3001 -o StrictHostKeyChecking=no a.pinggy.io"
echo.
echo Both Pinggy tunnels have been launched in separate terminal windows.
echo Copy the https://xxxx.a.pinggy.link URL from each window and share with anyone!
echo.
pause
