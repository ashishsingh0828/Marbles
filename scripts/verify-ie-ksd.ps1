$ErrorActionPreference = "Continue"
function PostLogin($url, $jsonPath, $label) {
  try {
    $r = curl.exe -sS -m 120 -X POST "$url/api/auth/login" -H "Content-Type: application/json" --data-binary "@$jsonPath"
    if ($r -match '"token"') { Write-Host "$label LOGIN: OK" } else { Write-Host "$label LOGIN: FAIL $r" }
  } catch { Write-Host "$label LOGIN: ERROR $($_.Exception.Message)" }
}
function Health($url, $label) {
  try {
    $r = curl.exe -sS -m 150 "$url/api/health"
    Write-Host "$label HEALTH: $r"
  } catch { Write-Host "$label HEALTH: ERROR $($_.Exception.Message)" }
}
function Projects($url, $site, $label) {
  try {
    $r = curl.exe -sS -m 120 "$url/api/$site/projects"
    $n = ([regex]::Matches($r, '"slug"')).Count
    Write-Host "$label PROJECTS: $n items"
  } catch { Write-Host "$label PROJECTS: ERROR" }
}

Write-Host "=== LIVE RENDER ==="
Health "https://india-backend-api.onrender.com" "IE"
Health "https://ksd-backend-api.onrender.com" "KSD"
PostLogin "https://india-backend-api.onrender.com" "India-server/scripts/test-login-ie.json" "IE"
PostLogin "https://ksd-backend-api.onrender.com" "Australia-server/scripts/test-login-ksd.json" "KSD"
Projects "https://india-backend-api.onrender.com" "india" "IE"
Projects "https://ksd-backend-api.onrender.com" "australia" "KSD"

Write-Host "=== LOCAL DB CONNECT ==="
Push-Location India-server
node -e "const m=require('mongoose');(async()=>{for (const [n,u] of [['indiaDB',process.env.I],['ksdDB',process.env.K]]){try{await m.connect(u,{serverSelectionTimeoutMS:15000});console.log(n+': OK');await m.disconnect()}catch(e){console.log(n+': FAIL '+e.message);try{await m.disconnect()}catch{}}}})()" 
Pop-Location
