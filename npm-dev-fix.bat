@echo off
echo Fixing npm run dev commands...
echo.

REM Check if we're in the right project directory
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

echo Project structure verified successfully!
echo.

echo Available commands:
echo.
echo 1. Start Backend Server:
echo    cd backend && npm run dev
echo.
echo 2. Start Frontend Server:
echo    cd frontend && npm run dev
echo.
echo 3. Start Both Servers (Recommended):
echo    start cmd /k "cd /d %CD%\backend && npm run dev"
echo    start cmd /k "cd /d %CD%\frontend && npm run dev"
echo.
echo 4. Use Development Scripts:
echo    dev-backend.bat
echo    dev-frontend.bat
echo.
echo 5. Use Startup Scripts:
echo    start-backend.bat
echo    start-frontend.bat
echo.

echo To start both servers automatically, run:
echo start cmd /k "cd /d %CD%\backend && npm run dev" ^& start cmd /k "cd /d %CD%\frontend && npm run dev"
echo.

pause