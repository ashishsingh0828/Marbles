$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

function Publish-SiteRepo {
  param(
    [string]$Name,
    [string]$Frontend,
    [string]$Admin,
    [string]$Server,
    [string]$Remote
  )

  $tmp = Join-Path $root ".push-$Name"
  if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
  New-Item $tmp -ItemType Directory | Out-Null

  robocopy $Frontend $tmp /E /XD node_modules dist .git /XF images.zip /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  robocopy $Admin (Join-Path $tmp "admin") /E /XD node_modules dist .git /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  robocopy $Server (Join-Path $tmp "server") /E /XD node_modules .git uploads /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  Copy-Item (Join-Path $Server "render.yaml") (Join-Path $tmp "render.yaml") -Force

  Get-ChildItem $tmp -Recurse -File -Filter ".env" | Remove-Item -Force
  if (-not (Test-Path (Join-Path $tmp "server\uploads"))) {
    New-Item (Join-Path $tmp "server\uploads") -ItemType Directory | Out-Null
  }

  Push-Location $tmp
  git init -b main | Out-Null
  git add .
  git -c user.email="cursoragent@cursor.com" -c user.name="Cursor" commit -m "Publish $Name site, admin and backend" | Out-Null
  git remote add origin $Remote
  git push -u origin main
  Pop-Location
}

Publish-SiteRepo -Name "australia" -Frontend (Join-Path $root "Australia") -Admin (Join-Path $root "Australia-admin") -Server (Join-Path $root "Australia-server") -Remote "https://github.com/ashishsingh0828/Australia.git"
Publish-SiteRepo -Name "india" -Frontend (Join-Path $root "India") -Admin (Join-Path $root "India-admin") -Server (Join-Path $root "India-server") -Remote "https://github.com/ashishsingh0828/India.git"
