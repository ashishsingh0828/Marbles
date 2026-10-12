@echo off
title Pinggy Tunnel - KSD Homes Australia (Port 3001)
echo ==============================================================
echo   STARTING PINGGY TUNNEL FOR KSD HOMES AUSTRALIA (PORT 3001)
echo   Keep this window OPEN to keep the public website link alive!
echo ==============================================================
echo.
ssh -p 443 -R0:localhost:3001 -o StrictHostKeyChecking=no a.pinggy.io
pause
