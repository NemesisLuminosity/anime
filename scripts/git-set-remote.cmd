@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Usage: scripts\git-set-remote.cmd https://github.com/USER/REPO.git

set REPO_URL=%1
if "%REPO_URL%"=="" (
  echo ERROR: Provide a GitHub repo URL, e.g. https://github.com/USER/REPO.git
  exit /b 1
)

git remote remove origin >NUL 2>&1
git remote add origin %REPO_URL%
git branch -M main
echo Remote set to %REPO_URL% (branch main)
exit /b 0


