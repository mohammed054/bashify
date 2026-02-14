@echo off
echo Fixing npm run dev commands...
echo.

REM Check if we're in the correct project directory
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

echo The correct commands to use are:
echo.
echo 1. For Backend Server:
echo    cd backend
echo    npm run dev
echo.
echo 2. For Frontend Server:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Or use these scripts:
echo    dev-backend.bat
echo    dev-frontend.bat
echo.
echo 4. Or use these startup scripts:
echo    start-backend.bat
echo    start-frontend.bat
echo.

echo To start both servers manually:
echo.
echo Terminal 1:
echo    cd backend
echo    npm run dev
echo.
echo Terminal 2:
echo    cd frontend
echo    npm run dev
echo.

echo The npm run dev commands work correctly when you:
echo 1. Navigate to the correct directory first (cd backend OR cd frontend)
echo 2. Then run: npm run dev
echo.
echo This is the standard way npm works - you must be in the directory
echo that contains the package.json file you want to run.
echo.

echo Your project is ready! 🎉
pause