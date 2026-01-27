import { useState, useEffect } from 'react'

const BootSequence = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const bootLines = [
    'Initializing bashify terminal...',
    'Loading kernel modules... [OK]',
    'Mounting file systems... [OK]',
    'Starting network services... [OK]',
    'Checking system integrity... [OK]',
    'Loading command interpreter... [OK]',
    'Establishing secure connection... [OK]',
    'System ready.'
  ]

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1)
      }, 300 + Math.random() * 200)
      
      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }, [currentLine, isComplete, onComplete])

  return (
    <div className="boot-sequence">
      <div className="boot-content">
        {bootLines.slice(0, currentLine).map((line, index) => (
          <div key={index} className="boot-line">
            <span className="boot-prompt">></span>
            <span className="boot-text">{line}</span>
            {line.includes('[OK]') && <span className="boot-ok">[OK]</span>}
          </div>
        ))}
        {currentLine < bootLines.length && (
          <div className="boot-line">
            <span className="boot-prompt">></span>
            <span className="cursor-blink"></span>
          </div>
        )}
      </div>
      {isComplete && <div className="boot-flash"></div>}
    </div>
  )
}

export default BootSequence