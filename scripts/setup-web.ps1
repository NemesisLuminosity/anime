param(
  [string]$ProjectPath = "apps/web"
)

Write-Host "Setting up Next.js app at $ProjectPath" -ForegroundColor Cyan

if (!(Test-Path $ProjectPath)) {
  Write-Error "Path not found: $ProjectPath"
  exit 1
}

Set-Location $ProjectPath

if (Test-Path package.json) {
  Write-Host "Installing dependencies with npm install..." -ForegroundColor Cyan
  npm install
} else {
  Write-Error "package.json not found in $ProjectPath. Did the scaffold get created?"
  exit 1
}

Write-Host "Setup complete." -ForegroundColor Green


