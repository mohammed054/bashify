@echo off
echo Starting Bashify Frontend Development Server...
echo.

REM Change to frontend directory
cd /d "%~dp0frontend"

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found in %CD%
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo Current directory: %CD%
echo.

REM Start the frontend development server
echo Starting frontend server...
echo Server will be available at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.

npm run dev