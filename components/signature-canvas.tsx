"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eraser } from "lucide-react"

interface SignatureCanvasProps {
  onChange: (dataUrl: string) => void
}

export default function SignatureCanvas({ onChange }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set up context
    context.lineWidth = 3
    context.lineCap = "round"
    context.strokeStyle = "#ec4899" // Pink-500

    setCtx(context)

    // Handle resize
    const handleResize = () => {
      const currentDrawing = canvas.toDataURL()
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Restore context settings
      context.lineWidth = 3
      context.lineCap = "round"
      context.strokeStyle = "#ec4899"

      // Restore drawing
      const img = new Image()
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = currentDrawing
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return

    setIsDrawing(true)
    ctx.beginPath()

    // Get position
    const canvas = canvasRef.current
    if (!canvas) return

    let x, y

    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    // Get position
    const canvas = canvasRef.current
    if (!canvas) return

    let x, y

    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.lineTo(x, y)
    ctx.stroke()

    // Update parent component with current drawing
    onChange(canvas.toDataURL())
  }

  const endDrawing = () => {
    if (!isDrawing || !ctx) return

    ctx.closePath()
    setIsDrawing(false)

    // Update parent component with final drawing
    const canvas = canvasRef.current
    if (canvas) {
      onChange(canvas.toDataURL())
    }
  }

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    onChange("")
  }

  return (
    <div className="space-y-2">
      <div
        className="border-2 border-pink-200 dark:border-pink-700 rounded-md bg-white dark:bg-pink-950 relative"
        style={{ height: "150px" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          className="absolute bottom-2 right-2 bg-white dark:bg-pink-800 border-pink-200 dark:border-pink-700"
        >
          <Eraser className="h-4 w-4 text-pink-500 dark:text-pink-300" />
          <span className="sr-only">Clear signature</span>
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-pink-400">Sign using your mouse or finger (on touch devices)</p>
    </div>
  )
}

