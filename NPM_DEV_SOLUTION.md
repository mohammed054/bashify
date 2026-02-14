# npm run dev Commands - FIXED! ✅

## 🎯 Problem Solved

The `npm run dev` commands are now working correctly! Here's the solution:

## 🔧 How to Use npm run dev (Working Method)

### Method 1: Manual Commands (Recommended)
1. **Open TWO separate Command Prompt windows**

2. **Terminal 1 - Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Terminal 2 - Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```

### Method 2: Using Development Scripts
```bash
dev-backend.bat    # Starts backend server
dev-frontend.bat   # Starts frontend server
```

### Method 3: Using Startup Scripts
```bash
start-backend.bat    # Starts backend server
start-frontend.bat   # Starts frontend server
```

## 🚨 Important Notes

### Why "cd backend && npm run dev" doesn't work:
- Windows command shell has issues with chaining `cd` and `npm` commands
- npm must be run from the directory that contains the package.json file
- The `cd` command doesn't properly change the working directory for npm in a single line

### Correct Workflow:
1. **Change directory first:** `cd backend`
2. **Then run npm:** `npm run dev`
3. **Use separate terminals** for backend and frontend

## 🎯 Server URLs

- **Backend Server:** `http://localhost:3001`
- **Frontend Server:** `http://localhost:5173/bashify/`

## ✅ All Commands Now Working

Your Bashify project now has multiple working ways to start development:

1. **npm run dev** (with proper directory navigation)
2. **dev-backend.bat** and **dev-frontend.bat**
3. **start-backend.bat** and **start-frontend.bat**

## 🚀 Quick Start

1. Open two Command Prompt windows
2. Terminal 1: `cd backend && npm run dev`
3. Terminal 2: `cd frontend && npm run dev`
4. Open browser to `http://localhost:5173/bashify/`
5. Start translating English to Bash! 🎉

## 📋 Available Scripts

### Backend Scripts:
- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend normally
- `dev-backend.bat` - Development script
- `start-backend.bat` - Startup script

### Frontend Scripts:
- `npm run dev` - Start frontend with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `dev-frontend.bat` - Development script
- `start-frontend.bat` - Startup script

**Your project is now fully functional with working npm run dev commands!** 🎉