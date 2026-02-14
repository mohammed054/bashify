# Bashify - English to Bash Translation

A full-stack web application that translates English text to Bash commands using AI.

## 🚀 Project Overview

Bashify is a React frontend application connected to a Node.js/Express backend that uses Hugging Face's AI models to translate natural language English text into executable Bash commands.

## 📁 Project Structure

```
Bashify/
├── backend/              # Node.js backend server
│   ├── src/
│   │   ├── server.js     # Main server file
│   │   ├── routes/
│   │   │   └── translate.js  # Translation API endpoint
│   │   └── services/
│   │       └── huggingface.js  # AI model integration
│   ├── package.json
│   └── .env             # Environment variables
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── App.jsx       # Main application component
│   │   ├── App.css       # Application styles
│   │   └── components/   # React components
│   ├── package.json
│   └── .env.development  # Development environment variables
├── start-backend.bat     # Backend startup script
├── start-frontend.bat    # Frontend startup script
└── README.md            # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Hugging Face API token (for AI model access)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   # Copy the example .env file and add your Hugging Face API token
   # Edit backend/.env and replace 'your_huggingface_api_token_here' with your actual token
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   Or use the development script:
   ```bash
   dev-backend.bat
   ```
   Or use the startup script:
   ```bash
   start-backend.bat
   ```

   The server will start on `http://localhost:3001`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Or use the development script:
   ```bash
   dev-frontend.bat
   ```
   Or use the startup script:
   ```bash
   start-frontend.bat
   ```

   The frontend will start on `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=3001
HF_API_TOKEN=your_huggingface_api_token_here
NODE_ENV=development
```

**Frontend (.env.development):**
```env
VITE_API_BASE_URL=http://localhost:3001
```

### Hugging Face API Token

To get a Hugging Face API token:
1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account or log in
3. Go to Settings → Access Tokens
4. Create a new token with read access
5. Add it to your backend `.env` file

## 🚀 Usage

### Quick Start (Recommended)
1. **Start both servers:**
   - Run `dev-backend.bat` in one terminal
   - Run `dev-frontend.bat` in another terminal

2. **Open the application:**
   - Navigate to `http://localhost:5173/bashify/` in your browser

3. **Translate English to Bash:**
   - Enter English text in the input field
   - Click "Translate to Bash"
   - View the generated Bash command

### Alternative Methods
- **Manual Start**: Use `npm run dev` in each directory
- **Startup Scripts**: Use `start-backend.bat` and `start-frontend.bat`

## 🌐 API Endpoints

### Backend API

- `GET /` - Health check and basic info
- `GET /health` - Health check endpoint
- `POST /api/translate` - Translate English to Bash

**Translation Request:**
```json
{
  "input": "List all files in the current directory"
}
```

**Translation Response:**
```json
{
  "command": "ls"
}
```

## 🚢 Deployment

### Frontend Deployment (GitHub Pages)

The frontend is configured to deploy to GitHub Pages automatically when pushing to the main branch.

1. Ensure your GitHub repository is set up correctly
2. The GitHub Actions workflow will automatically build and deploy
3. The site will be available at `https://yourusername.github.io/bashify`

### Backend Deployment (Railway)

1. Connect your GitHub repository to Railway
2. Railway will automatically deploy when changes are pushed
3. Set environment variables in Railway dashboard
4. The backend will be available at your Railway URL

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start:**
   - Check that you're in the `backend` directory
   - Verify Node.js and npm are installed
   - Check that the `.env` file has the correct API token

2. **Frontend can't connect to backend:**
   - Ensure the backend server is running
   - Check the API URL in `.env.development`
   - Verify CORS settings in the backend

3. **Translation not working:**
   - Check your Hugging Face API token
   - Verify the API token has the correct permissions
   - Check the backend logs for errors

### Error Messages

- **"Backend is offline":** The backend server is not running
- **"Network Error":** Cannot connect to the backend server
- **"Invalid API token":** Check your Hugging Face API token
- **"API quota exceeded":** You've reached your Hugging Face API limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for the AI models
- [React](https://react.dev/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

If you have any questions or issues, please:
1. Check this README for solutions
2. Review the error messages carefully
3. Check the browser and server console logs
4. Create an issue on GitHub with detailed information

---

**Note:** This project requires a Hugging Face API token to function. Without it, the translation feature will not work.