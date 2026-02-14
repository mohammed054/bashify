import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [postData, setPostData] = useState('')
  const [response, setResponse] = useState('')
  const [isBackendOnline, setIsBackendOnline] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('checking')
  
  // Use environment variable for API URL, fallback to production URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bashify-backend.up.railway.app'
  
  // Example prompts for users
  const examplePrompts = [
    "List all files in the current directory",
    "Create a new directory called 'test'",
    "Search for files containing 'hello' in the current directory",
    "Show the contents of a file named 'example.txt'",
    "Count the number of lines in a file"
  ]

  useEffect(() => {
    fetchBackendData()
  }, [])

  const fetchBackendData = async () => {
    try {
      setConnectionStatus('checking')
      setIsLoading(true)
      const response = await axios.get(`${API_BASE_URL}/`)
      setMessage(response.data.message || 'Connected to backend successfully!')
      setIsBackendOnline(true)
      setConnectionStatus('online')
    } catch (error) {
      console.error('Backend connection error:', error)
      if (error.code === 'ERR_NETWORK') {
        setMessage('Backend is offline. Please start the backend server on port 3001.')
        setIsBackendOnline(false)
        setConnectionStatus('offline')
      } else {
        setMessage(`Error connecting to backend: ${error.message}`)
        setIsBackendOnline(false)
        setConnectionStatus('error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleExamplePrompt = (prompt) => {
    setPostData(prompt)
  }

  const handlePostRequest = async () => {
    if (!isBackendOnline) {
      setResponse('Error: Backend is not available. Please start the backend server.')
      return
    }

    const trimmedInput = postData.trim()
    if (!trimmedInput) {
      setResponse('Error: Please enter some text to translate.')
      return
    }

    // Basic input validation
    if (trimmedInput.length > 1000) {
      setResponse('Error: Input too long. Please keep it under 1000 characters.')
      return
    }

    try {
      setIsLoading(true)
      setResponse('Translating...')
      const response = await axios.post(`${API_BASE_URL}/api/translate`, {
        input: trimmedInput
      })
      
      if (response.data && response.data.command) {
        setResponse(`Generated Bash Command:\n\n${response.data.command}`)
      } else {
        setResponse('Success: Translation completed, but no command was generated.')
      }
    } catch (error) {
      console.error('Translation error:', error)
      if (error.response) {
        if (error.response.status === 400) {
          setResponse(`Input Error: ${error.response.data.error || 'Invalid input'}`)
        } else if (error.response.status === 500) {
          setResponse('Server Error: Translation service is temporarily unavailable.')
        } else {
          setResponse(`Server Error (${error.response.status}): ${error.response.data.error || error.message}`)
        }
      } else if (error.code === 'ERR_NETWORK') {
        setResponse('Network Error: Unable to connect to backend server. Please check if the backend is running.')
      } else if (error.code === 'ECONNABORTED') {
        setResponse('Timeout Error: The request took too long to complete. Please try again.')
      } else {
        setResponse(`Error: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearResponse = () => {
    setResponse('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bashify - GitHub Pages Demo</h1>
        <p>React frontend connected to Railway backend</p>
      </header>

      <main className="app-main">
        <section className="backend-status">
          <h2>Backend Connection Status</h2>
          <div className={`status-message ${connectionStatus}`}>
            <div className="status-indicator">
              <span className={`status-dot ${connectionStatus}`}></span>
              <strong>{connectionStatus === 'online' ? 'Online' : connectionStatus === 'offline' ? 'Offline' : 'Error'}</strong>
            </div>
            <div className="status-details">
              <p><strong>Message:</strong> {message}</p>
              <p><strong>API URL:</strong> {API_BASE_URL}</p>
              {connectionStatus === 'online' && (
                <p className="success-text">✅ Backend is ready for translations!</p>
              )}
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={fetchBackendData} className="send-button" disabled={isLoading}>
              {isLoading ? 'Checking...' : 'Check Connection'}
            </button>
            <button onClick={() => window.open(`${API_BASE_URL}/api`, '_blank')} className="send-button secondary">
              View API Info
            </button>
          </div>
        </section>

        <section className="api-test">
          <h2>English to Bash Translation</h2>
          
          <div className="example-prompts">
            <h3>Try these examples:</h3>
            <div className="prompt-grid">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="example-button"
                  onClick={() => handleExamplePrompt(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={postData}
              onChange={(e) => setPostData(e.target.value)}
              placeholder="Enter English text to translate to Bash (e.g., 'List all files in current directory')"
              className="text-input"
              disabled={!isBackendOnline || isLoading}
            />
            <button 
              onClick={handlePostRequest} 
              className="send-button primary" 
              disabled={isLoading || !isBackendOnline}
            >
              {isLoading ? 'Translating...' : 'Translate to Bash'}
            </button>
          </div>
          
          {response && (
            <div className="response">
              <div className="response-header">
                <strong>Translation Result:</strong>
                <button onClick={clearResponse} className="clear-button">Clear</button>
              </div>
              <pre>{response}</pre>
            </div>
          )}
        </section>

        <section className="info">
          <h2>How to Use</h2>
          <div className="usage-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Start Backend Server</h3>
                <p>Run <code>cd backend && npm run dev</code> or double-click <code>start-backend.bat</code></p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Start Frontend Server</h3>
                <p>Run <code>cd frontend && npm run dev</code> or double-click <code>start-frontend.bat</code></p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Use the Application</h3>
                <p>Open <a href="http://localhost:5173" target="_blank">http://localhost:5173</a> and start translating!</p>
              </div>
            </div>
          </div>
          
          <h3>Tips for Best Results:</h3>
          <ul>
            <li>Use clear, specific English descriptions</li>
            <li>Keep requests under 1000 characters</li>
            <li>Use the example prompts to get started</li>
            <li>Always review generated commands before running them</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
