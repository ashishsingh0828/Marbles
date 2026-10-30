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

  $tmp = Join-Path $root (".push-" + $Name)
  if (Test-Path $tmp) {
    Get-ChildItem $tmp -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force
  } else {
    New-Item $tmp -ItemType Directory | Out-Null
  }

  robocopy $Frontend $tmp /E /XD node_modules dist .git /XF images.zip /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  if ($LASTEXITCODE -ge 8) { throw ("robocopy frontend failed for " + $Name) }
  robocopy $Admin (Join-Path $tmp "admin") /E /XD node_modules dist .git /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  if ($LASTEXITCODE -ge 8) { throw ("robocopy admin failed for " + $Name) }
  robocopy $Server (Join-Path $tmp "server") /E /XD node_modules .git uploads .data /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  if ($LASTEXITCODE -ge 8) { throw ("robocopy server failed for " + $Name) }
  Copy-Item (Join-Path $Server "render.yaml") (Join-Path $tmp "render.yaml") -Force

  Get-ChildItem $tmp -Recurse -File -Filter ".env" | Remove-Item -Force -ErrorAction SilentlyContinue
  $uploads = Join-Path $tmp "server\uploads"
  if (-not (Test-Path $uploads)) { New-Item $uploads -ItemType Directory | Out-Null }
  $keep = Join-Path $uploads ".gitkeep"
  if (-not (Test-Path $keep)) { New-Item $keep -ItemType File | Out-Null }

  Push-Location $tmp
  try {
    if (-not (Test-Path ".git")) {
      git init -b main | Out-Null
      git remote add origin $Remote
    } else {
      git remote set-url origin $Remote
    }
    git add -A
    $pending = git status --porcelain
    if (-not $pending) {
      Write-Host ("No changes for " + $Name + " - already up to date.")
      return
    }
    $msg = "Publish " + $Name + " site, admin and backend"
    git -c user.email="cursoragent@cursor.com" -c user.name="Cursor" commit -m $msg | Out-Null
    git push -u origin HEAD:main --force
    Write-Host ("Pushed " + $Name + " -> " + $Remote)
  } finally {
    Pop-Location
  }
}

Publish-SiteRepo -Name "australia" `
  -Frontend (Join-Path $root "Australia") `
  -Admin (Join-Path $root "Australia-admin") `
  -Server (Join-Path $root "Australia-server") `
  -Remote "https://github.com/ashishsingh0828/Australia.git"

Publish-SiteRepo -Name "india" `
  -Frontend (Join-Path $root "India") `
  -Admin (Join-Path $root "India-admin") `
  -Server (Join-Path $root "India-server") `
  -Remote "https://github.com/ashishsingh0828/India.git"
