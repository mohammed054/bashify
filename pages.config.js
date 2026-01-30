{
  "name": "bashify",
  "version": "1.0.0",
  "scripts": {
    "build": "cd frontend && npm run build",
    "deploy": "cd frontend && npm run build && cp -r dist/* ."
  }
}