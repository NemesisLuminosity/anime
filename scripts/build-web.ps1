param(
  [string]$ProjectPath = "apps/web"
)

Write-Host "Building Next.js app at $ProjectPath" -ForegroundColor Cyan

if (!(Test-Path $ProjectPath)) {
  Write-Error "Path not found: $ProjectPath"
  exit 1
}

Set-Location $ProjectPath

if (!(Test-Path package.json)) {
  Write-Error "package.json not found in $ProjectPath."
  exit 1
}

npm run build

Write-Host "Build completed." -ForegroundColor Green


