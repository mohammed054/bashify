import { useState, useEffect } from 'react'
import axios from 'axios'
import MatrixRain from './MatrixRain'
import FloatingBinary from './FloatingBinary'
import BootSequence from './BootSequence'
import soundManager from './SoundManager'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bashify-backend.up.railway.app'

  useEffect(() => {
    if (!isBooting) {
      checkBackendConnection()
    }
  }, [isBooting])

  const handleBootComplete = () => {
    setIsBooting(false)
    // Initialize sound manager on first user interaction
    soundManager.init()
  }

  const checkBackendConnection = async () => {
    try {
      await axios.get(`${API_BASE_URL}/health`)
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
    }
  }

  const handleTranslate = async () => {
    if (!input.trim()) return

    setIsTyping(true)
    setOutput('Translating...')
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/translate`, {
        input: input.trim()
      })
      
      // Simulate typing effect
      setTimeout(() => {
        setOutput(response.data.command)
        setIsTyping(false)
        soundManager.playSuccessSound()
      }, 500)
      
    } catch (error) {
      setTimeout(() => {
        setOutput(`Error: ${error.message}`)
        setIsTyping(false)
      }, 500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      soundManager.playClickSound()
      handleTranslate()
    } else {
      soundManager.playKeySound()
    }
  }

  if (isBooting) {
    return (
      <>
        <MatrixRain />
        <FloatingBinary />
        <BootSequence onComplete={handleBootComplete} />
      </>
    )
  }

  return (
    <>
      <MatrixRain />
      <FloatingBinary />
      
      {/* Connection Status Popup */}
      <div className="connection-status">
        <div className={`status-dot ${isConnected ? 'online' : 'offline'}`}></div>
        <span>{isConnected ? 'Online' : 'Offline'}</span>
      </div>

      {/* Terminal Window */}
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
          </div>
          <div className="terminal-title">bashify — English to Bash Translator</div>
        </div>

        <div className="terminal-prompt">
          <span className="prompt-symbol">user@bashify:~$</span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter English command to translate..."
            autoFocus
          />
          {isTyping && <span className="cursor"></span>}
        </div>

        {output && (
          <div className="terminal-output">
            <div className="output-label">BASH COMMAND:</div>
            <div className="output-content">{output}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default App