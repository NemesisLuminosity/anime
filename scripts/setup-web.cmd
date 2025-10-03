@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Determine project directory relative to this script
set SCRIPT_DIR=%~dp0
for %%I in ("%SCRIPT_DIR%..\apps\web") do set PROJECT_DIR=%%~fI

echo Setting up Next.js app at %PROJECT_DIR%
if not exist "%PROJECT_DIR%\package.json" (
  echo ERROR: package.json not found in %PROJECT_DIR%
  exit /b 1
)

pushd "%PROJECT_DIR%"
echo Installing dependencies with npm install...
call npm install
if errorlevel 1 (
  echo npm install failed. Ensure Node.js and npm are installed and on PATH.
  popd
  exit /b 1
)

echo Setup complete.
popd
exit /b 0


