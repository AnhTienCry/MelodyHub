Write-Host "Running MelodyHub local smoke tests: backend build + frontend build"

# Change to repo root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir\..\

Write-Host "--> Testing Backend"
Set-Location Backend
if (Test-Path package-lock.json -PathType Leaf) { Write-Host "Installing backend deps..."; npm ci } else { npm install }
npm run build
if (-not $?) { Write-Error "Backend build failed"; exit 1 }

Write-Host "--> Testing Frontend"
Set-Location ..\Frontend
if (Test-Path package-lock.json -PathType Leaf) { Write-Host "Installing frontend deps..."; npm ci } else { npm install }
npm run build
if (-not $?) { Write-Error "Frontend build failed"; exit 1 }

Write-Host "All builds succeeded"
