@echo off
echo Starting Bashify backend server...
echo Current directory: %CD%

REM Change to backend directory
cd /d "%~dp0backend"

echo Changed to directory: %CD%

REM Check if server.js exists
if not exist "src\server.js" (
    echo Error: server.js not found in %CD%\src
    echo Please make sure you're running this script from the correct directory
    pause
    exit /b 1
)

echo Starting backend server...
echo Server will be available at: http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

REM Start the server
node src/server.js
