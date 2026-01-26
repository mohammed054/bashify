import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Matrix characters - simpler set
    const matrixChars = '01'
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = []
    
    // Initialize drops with random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height / fontSize
    }
    
    // Animation loop - slower and more subtle
    const draw = () => {
      // Very subtle fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Dim green text
      ctx.fillStyle = 'rgba(0, 255, 65, 0.8)'
      ctx.font = fontSize + 'px monospace'
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        // Reset drop when it goes off screen - less frequent
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0
        }
        
        // Slower movement
        if (Math.random() > 0.98) {
          drops[i]++
        }
      }
    }
    
    // Slower animation for background effect
    const interval = setInterval(draw, 100)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain