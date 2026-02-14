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
    
    // Extended Matrix characters with binary, hex, and symbols
    const matrixChars = '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁｭﾻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁｭﾻﾜｂｄｈｍｐｱｸｳｰﾅｷﾑｻﾜｶﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁｭﾻﾜ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = []
    const speeds = []
    const chars = []
    const colors = ['#00ff41', '#00ff88', '#00ffcc', '#00ffff', '#ffffff']
    
    // Initialize drops with random properties
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height / fontSize
      speeds[i] = 0.5 + Math.random() * 1.5
      chars[i] = []
    }
    
    // Animation loop
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.font = fontSize + 'px monospace'
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        
        // Varying opacity and colors based on position
        const opacity = Math.max(0, 1 - (drops[i] * fontSize) / canvas.height)
        const colorIndex = Math.floor(Math.random() * colors.length)
        
        // Trail effect - brighter at head, dimmer at tail
        if (drops[i] * fontSize < canvas.height) {
          ctx.fillStyle = colors[colorIndex] + Math.floor(opacity * 255).toString(16).padStart(2, '0')
          ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        }
        
        // Move drops with varying speeds
        if (Math.random() > 0.98) {
          drops[i] += speeds[i]
        }
        
        // Reset with more randomness
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = -Math.random() * 20
          speeds[i] = 0.5 + Math.random() * 1.5
        }
      }
    }
    
    // Faster animation for more dynamic effect
    const interval = setInterval(draw, 50)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain