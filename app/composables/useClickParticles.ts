// directory: app/composables/useClickParticles.ts
export function useClickParticles() {
  // this will be called in layout onMounted
  const handleClick = (e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    // create the element
    const particle = document.createElement('div')

    // base styles
    particle.style.position = 'fixed'
    particle.style.left = x + 'px'
    particle.style.top = y + 'px'
    particle.style.width = '12px'
    particle.style.height = '12px'
    particle.style.borderRadius = '9999px' // full
    particle.style.pointerEvents = 'none'
    particle.style.zIndex = '9999'

    // purple glow look
    particle.style.background = 'radial-gradient(circle, rgba(116,34,108,1) 0%, rgba(116,34,108,0) 70%)'
    particle.style.boxShadow = '0 0 30px rgba(116,34,108,0.8)'
    particle.style.opacity = '0.9'
    particle.style.filter = 'blur(1px)'

    // start slightly small
    particle.style.transform = 'translate(-50%, -50%) scale(1)'

    document.body.appendChild(particle)

    // animate it out
    requestAnimationFrame(() => {
      particle.style.transition = 'all 300ms ease-in-out'
      particle.style.opacity = '0'
      particle.style.transform = 'translate(-50%, -50%) scale(2.5)'
      particle.style.filter = 'blur(8px)'
    })

    // remove after animation ends
    setTimeout(() => {
      particle.remove()
    }, 320)
  }

  const enable = () => {
    window.addEventListener('click', handleClick)
  }

  const disable = () => {
    window.removeEventListener('click', handleClick)
  }

  return {
    enable,
    disable,
  }
}
