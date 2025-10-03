@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Commits all changes and pushes to origin main (or the branch you pass)

set BRANCH=%1
if "%BRANCH%"=="" set BRANCH=main

echo Committing and pushing to %BRANCH% ...
git add -A
git commit -m "chore: scaffold Next.js + Supabase backend and CI"
if errorlevel 1 (
  echo Note: commit may have failed if there are no changes. Continuing...
)
git pull --rebase origin %BRANCH%
git push origin %BRANCH%

if errorlevel 1 (
  echo Push failed. Ensure remote is set and you are authenticated.
  echo If remote isn't set, run scripts\git-set-remote.cmd ^<repo-url^>
  exit /b 1
)

echo Pushed successfully.
exit /b 0


