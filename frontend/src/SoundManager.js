class SoundManager {
  constructor() {
    this.audioContext = null
    this.initialized = false
  }

  init() {
    if (this.initialized) return
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  playKeySound() {
    if (!this.initialized) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.value = 800 + Math.random() * 400
    oscillator.type = 'square'
    
    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  playClickSound() {
    if (!this.initialized) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.value = 1200
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.2)
  }

  playSuccessSound() {
    if (!this.initialized) return
    
    const notes = [523, 659, 784] // C, E, G
    
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator()
        const gainNode = this.audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(this.audioContext.destination)
        
        oscillator.frequency.value = freq
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)
        
        oscillator.start(this.audioContext.currentTime)
        oscillator.stop(this.audioContext.currentTime + 0.3)
      }, index * 100)
    })
  }
}

const soundManager = new SoundManager()
export default soundManager