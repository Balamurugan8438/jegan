import { useEffect, useRef } from 'react'
import '../styles/SketchAnimation.css'

const SketchAnimation = ({ imageSrc, animationDuration = 3000 }) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      // Set canvas dimensions
      const maxWidth = 400
      const maxHeight = 600
      let width = image.width
      let height = image.height

      // Scale down if too large
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      // Convert image to sketch
      const sketched = convertToSketch(image, width, height)

      // Animate the drawing from top to bottom
      animateSketch(canvas, ctx, sketched, width, height, animationDuration)
    }

    image.src = imageSrc
  }, [imageSrc, animationDuration])

  const convertToSketch = (image, width, height) => {
    const offCanvas = document.createElement('canvas')
    offCanvas.width = width
    offCanvas.height = height
    const offCtx = offCanvas.getContext('2d')

    // Draw original image
    offCtx.drawImage(image, 0, 0, width, height)

    // Get image data
    const imageData = offCtx.getImageData(0, 0, width, height)
    const data = imageData.data

    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      data[i] = gray
      data[i + 1] = gray
      data[i + 2] = gray
    }

    // Apply edge detection (Sobel filter)
    const edgeData = sobelFilter(offCtx.getImageData(0, 0, width, height))

    // Invert to get black on white
    for (let i = 0; i < edgeData.data.length; i += 4) {
      const val = 255 - edgeData.data[i]
      edgeData.data[i] = val
      edgeData.data[i + 1] = val
      edgeData.data[i + 2] = val
    }

    return edgeData
  }

  const sobelFilter = (imageData) => {
    const width = imageData.width
    const height = imageData.height
    const data = imageData.data
    const outputData = new Uint8ClampedArray(data.length)

    const sobelKernelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    const sobelKernelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let pixelX = 0
        let pixelY = 0

        const index = (y * width + x) * 4

        // Apply kernels
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4
            const pixel = data[pixelIndex]

            pixelX += pixel * sobelKernelX[(ky + 1) * 3 + (kx + 1)]
            pixelY += pixel * sobelKernelY[(ky + 1) * 3 + (kx + 1)]
          }
        }

        const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY)
        const value = Math.min(255, Math.floor(magnitude))

        outputData[index] = value
        outputData[index + 1] = value
        outputData[index + 2] = value
        outputData[index + 3] = 255
      }
    }

    imageData.data.set(outputData)
    return imageData
  }

  const animateSketch = (canvas, ctx, sketched, width, height, duration) => {
    const startTime = Date.now()

    const draw = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Clear canvas
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, height)

      // Draw only up to the current progress height
      const revealHeight = height * progress

      // Create clipping region for top-to-bottom reveal
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, width, revealHeight)
      ctx.clip()

      // Draw the sketch
      ctx.putImageData(sketched, 0, 0)

      ctx.restore()

      // Add a subtle line at the reveal boundary
      if (progress < 1) {
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, revealHeight)
        ctx.lineTo(width, revealHeight)
        ctx.stroke()
      }

      if (progress < 1) {
        requestAnimationFrame(draw)
      }
    }

    draw()
  }

  return (
    <div ref={containerRef} className="sketch-animation-container">
      <canvas ref={canvasRef} className="sketch-canvas"></canvas>
    </div>
  )
}

export default SketchAnimation
