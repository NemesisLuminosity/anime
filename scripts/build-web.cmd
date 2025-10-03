@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Determine project directory relative to this script
set SCRIPT_DIR=%~dp0
for %%I in ("%SCRIPT_DIR%..\apps\web") do set PROJECT_DIR=%%~fI

echo Building Next.js app at %PROJECT_DIR%
if not exist "%PROJECT_DIR%\package.json" (
  echo ERROR: package.json not found in %PROJECT_DIR%
  exit /b 1
)

pushd "%PROJECT_DIR%"
call npm run build
if errorlevel 1 (
  echo Build failed.
  popd
  exit /b 1
)

echo Build completed.
popd
exit /b 0


