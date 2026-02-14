@echo off
echo Starting Bashify Development Environment...
echo.

REM Verify we're in the correct directory
if not exist "backend\package.json" (
    echo Error: This script must be run from the Bashify project root directory
    echo Expected to find: backend\package.json
    echo Current directory: %CD%
    echo.
    echo Please navigate to the project root and try again
    pause
    exit /b 1
)

if not exist "frontend\package.json" (
    echo Error: This script must be run from the Bashify project root directory
    echo Expected to find: frontend\package.json
    echo Current directory: %CD%
    echo.
    echo Please navigate to the project root and try again
    pause
    exit /b 1
)

echo Project verified. Starting servers...
echo.

REM Start backend server in new window
echo Starting Backend Server on port 3001...
start "Bashify Backend" cmd /k "cd /d %CD%\backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in new window
echo Starting Frontend Server on port 5173...
start "Bashify Frontend" cmd /k "cd /d %CD%\frontend && npm run dev"

echo.
echo Servers started successfully!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173/bashify/
echo.
echo To stop servers, close the terminal windows or press Ctrl+C
echo.
echo Opening browser to frontend application...
start "" "http://localhost:5173/bashify/"

echo.
echo Development environment ready! 🚀
pause