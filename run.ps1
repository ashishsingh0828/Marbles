Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   IE MARBLES - STARTING DIRECTLY IN CHROME   " -ForegroundColor Yellow
Write-Host "==============================================" -ForegroundColor Cyan

$root = $PSScriptRoot
Start-Process powershell -ArgumentList "-NoExit -Command Set-Location '$root\server'; npm start" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit -Command Set-Location '$root\India'; npm run dev" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit -Command Set-Location '$root\admin'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "Opening http://localhost:3000 in Google Chrome..." -ForegroundColor Green
try {
    Start-Process chrome.exe "http://localhost:3000"
} catch {
    Start-Process "http://localhost:3000"
}
