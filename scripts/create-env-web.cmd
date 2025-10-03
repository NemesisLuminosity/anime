@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Determine project directory relative to this script
set SCRIPT_DIR=%~dp0
for %%I in ("%SCRIPT_DIR%..\apps\web") do set PROJECT_DIR=%%~fI

set ENV_FILE=%PROJECT_DIR%\.env.local

if exist "%ENV_FILE%" (
  echo .env.local already exists at %ENV_FILE%
  exit /b 0
)

echo Creating %ENV_FILE%
(
  echo NEXT_PUBLIC_SUPABASE_URL=
  echo NEXT_PUBLIC_SUPABASE_ANON_KEY=
  echo SUPABASE_SERVICE_ROLE_KEY=
) > "%ENV_FILE%"

echo Created .env.local with placeholders. Please fill in your Supabase values.
exit /b 0


