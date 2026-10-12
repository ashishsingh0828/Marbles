@echo off
title Pinggy Tunnel - IE Marbles India (Port 3000)
echo ==============================================================
echo   STARTING PINGGY TUNNEL FOR IE MARBLES INDIA (PORT 3000)
echo   Keep this window OPEN to keep the public website link alive!
echo ==============================================================
echo.
ssh -p 443 -R0:localhost:3000 -o StrictHostKeyChecking=no a.pinggy.io
pause
