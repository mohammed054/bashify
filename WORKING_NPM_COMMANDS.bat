@echo off
echo Bashify - Working npm run dev Commands
echo ======================================
echo.
echo The npm run dev commands work correctly when used properly:
echo.
echo 1. Open TWO separate Command Prompt windows
echo.
echo 2. In Terminal 1 (Backend):
echo    cd backend
echo    npm run dev
echo.
echo 3. In Terminal 2 (Frontend):
echo    cd frontend
echo    npm run dev
echo.
echo 4. OR use these working scripts:
echo    dev-backend.bat
echo    dev-frontend.bat
echo.
echo 5. OR use these startup scripts:
echo    start-backend.bat
echo    start-frontend.bat
echo.
echo IMPORTANT: npm run dev MUST be run from the directory that contains
echo the package.json file. You cannot run "cd backend && npm run dev"
echo in a single command line in Windows - you must change directories
echo first, then run npm run dev.
echo.
echo Your servers will be available at:
echo - Backend: http://localhost:3001
echo - Frontend: http://localhost:5173/bashify/
echo.
echo Project is ready! 🎉
pause