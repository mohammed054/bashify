@echo off
echo Starting Bashify Backend Development Server...
echo.

REM Change to backend directory
cd /d "%~dp0backend"

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found in %CD%
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo Current directory: %CD%
echo.

REM Start the backend development server
echo Starting backend server...
echo Server will be available at: http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

npm run dev