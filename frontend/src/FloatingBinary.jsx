import { useEffect, useRef } from 'react'

const FloatingBinary = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    class BinaryParticle {
      constructor() {
        this.reset()
      }
      
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.binary = Math.random() > 0.5 ? '1' : '0'
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += this.pulseSpeed
        
        // Wrap around edges
        if (this.x < -10) this.x = canvas.width + 10
        if (this.x > canvas.width + 10) this.x = -10
        if (this.y < -10) this.y = canvas.height + 10
        if (this.y > canvas.height + 10) this.y = -10
        
        // Randomly change binary
        if (Math.random() > 0.98) {
          this.binary = this.binary === '1' ? '0' : '1'
        }
      }
      
      draw() {
        const pulsingOpacity = this.opacity + Math.sin(this.pulse) * 0.2
        ctx.fillStyle = `rgba(0, 255, 65, ${Math.max(0, Math.min(1, pulsingOpacity))})`
        ctx.font = `${this.size * 4}px monospace`
        ctx.fillText(this.binary, this.x, this.y)
      }
    }
    
    // Create particles
    const particles = []
    const particleCount = 50
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new BinaryParticle())
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="floating-binary" />
}

export default FloatingBinary