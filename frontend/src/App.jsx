import { useState, useEffect } from 'react'
import axios from 'axios'
import MatrixRain from './MatrixRain'
import './App.css'

function App() {
  const [message, setMessage] = useState('Initializing terminal...')
  const [postData, setPostData] = useState('')
  const [response, setResponse] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bashify-backend.up.railway.app'

  useEffect(() => {
    fetchBackendData()
    createBinaryFloaters()
  }, [])

  const createBinaryFloaters = () => {
    const container = document.createElement('div')
    container.className = 'binary-floaters'
    
    for (let i = 0; i < 20; i++) {
      const binary = document.createElement('div')
      binary.className = 'binary'
      binary.textContent = Math.random() > 0.5 ? '1' : '0'
      binary.style.left = Math.random() * 100 + '%'
      binary.style.animationDelay = Math.random() * 10 + 's'
      binary.style.animationDuration = (10 + Math.random() * 10) + 's'
      container.appendChild(binary)
    }
    
    document.body.appendChild(container)
  }

  const fetchBackendData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`)
      setMessage('✓ Backend connection established')
      setIsConnected(true)
    } catch (error) {
      setMessage('✗ Backend connection failed')
      setIsConnected(false)
      if (import.meta.env.DEV) {
        console.error('Backend connection error:', error)
      }
    }
  }

  const handlePostRequest = async () => {
    try {
      setResponse('Translating command...')
      const response = await axios.post(`${API_BASE_URL}/api/translate`, {
        input: postData || 'list all files in current directory'
      })
      setResponse(response.data.command)
    } catch (error) {
      setResponse(`Error: ${error.message}`)
      if (import.meta.env.DEV) {
        console.error('POST request error:', error)
      }
    }
  }

  return (
    <>
      <MatrixRain />
      <div className="scan-line"></div>
      <div className="app terminal-flicker">
        <header className="app-header">
          <div className="terminal-dots">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
          </div>
          <h1>BASHIFY</h1>
          <p>English to Bash Command Translator</p>
          <div className="terminal-prompt">Ready to translate your commands...</div>
        </header>

        <main className="app-main">
          <section className="backend-status">
            <h2>System Status</h2>
            <div className="status-message">
              <strong>Backend:</strong> {message}
              <div style={{ marginTop: '10px', color: isConnected ? '#00ff00' : '#ff5555' }}>
                {isConnected ? '● ONLINE' : '● OFFLINE'}
              </div>
            </div>
          </section>

          <section className="api-test">
            <h2>Command Terminal</h2>
            <div className="input-group">
              <input
                type="text"
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
                placeholder="Enter English command (e.g., 'list all files')"
                className="text-input"
                onKeyPress={(e) => e.key === 'Enter' && handlePostRequest()}
              />
              <button onClick={handlePostRequest} className="send-button">
                Execute
              </button>
            </div>
            {response && (
              <div className="response">
                <strong>Generated Command:</strong>
                <pre>{response}</pre>
              </div>
            )}
          </section>

          <section className="info">
            <h2>Deployment Information</h2>
            <ul>
              <li>Frontend: GitHub Pages</li>
              <li>Backend: Railway Cloud Platform</li>
              <li>Auto-deployment: Git push to main branch</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}

export default App