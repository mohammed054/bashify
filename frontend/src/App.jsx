import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [postData, setPostData] = useState('')
  const [response, setResponse] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bashify-backend.up.railway.app'

  useEffect(() => {
    fetchBackendData()
  }, [])

  const fetchBackendData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`)
      setMessage(response.data.message || 'Connected to Railway backend successfully!')
    } catch (error) {
      setMessage('Error connecting to backend. Check console for details.')
      if (import.meta.env.DEV) {
        console.error('Backend connection error:', error)
      }
    }
  }

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/translate`, {
        input: postData || 'list all files in current directory'
      })
      setResponse(`Translated command: ${response.data.command}`)
    } catch (error) {
      setResponse(`Error: ${error.message}`)
      if (import.meta.env.DEV) {
        console.error('POST request error:', error)
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bashify - English to Bash Translator</h1>
        <p>Translate natural language to Bash commands using AI</p>
      </header>

      <main className="app-main">
        <section className="backend-status">
          <h2>Backend Connection Status</h2>
          <div className="status-message">
            <strong>Message from backend:</strong> {message}
          </div>
        </section>

        <section className="api-test">
          <h2>English to Bash Translation</h2>
          <div className="input-group">
            <input
              type="text"
              value={postData}
              onChange={(e) => setPostData(e.target.value)}
              placeholder="Enter English command (e.g., 'list all files')"
              className="text-input"
            />
            <button onClick={handlePostRequest} className="send-button">
              Translate to Bash
            </button>
          </div>
          {response && (
            <div className="response">
              <strong>Generated Bash Command:</strong>
              <pre>{response}</pre>
            </div>
          )}
        </section>

        <section className="info">
          <h2>Deployment Info</h2>
          <ul>
            <li>Frontend: GitHub Pages at http://mohammed054.github.io/bashify</li>
            <li>Backend: Railway at https://bashify-backend.up.railway.app</li>
            <li>Auto-deployment: Triggers on push to main branch</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
