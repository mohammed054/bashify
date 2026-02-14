# Railway Environment Variables Setup

## Required Environment Variables for bashify-backend

1. **HF_API_TOKEN**: Your Hugging Face API token
   - Get from: https://huggingface.co/settings/tokens
   - Required for translation functionality

2. **ALLOWED_ORIGINS**: Comma-separated list of allowed frontend domains
   - Value: `https://mohammed054.github.io,https://mohammed054.github.io/bashify`

## Setup Steps

1. Go to your Railway dashboard
2. Select the bashify-backend project
3. Go to "Variables" tab
4. Add the environment variables above
5. Redeploy the project

## Railway Deployment Configuration

The backend is configured to deploy from the `/backend` directory with:
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`
- Port: `3001`