"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Trophy, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import confetti from "canvas-confetti"

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [sunflowers, setSunflowers] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const [highScore, setHighScore] = useState(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const spawnRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize game
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(30)
    setSunflowers([])

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Start spawning sunflowers
    spawnSunflower()
    spawnRef.current = setInterval(spawnSunflower, 1000)
  }

  // End game
  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (spawnRef.current) clearInterval(spawnRef.current)

    setGameOver(true)
    setGameStarted(false)

    if (score > highScore) {
      setHighScore(score)

      // Trigger confetti for new high score
      if (typeof window !== "undefined") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#fcd34d", "#f9a8d4"], // Pink and yellow colors
        })
      }
    }
  }

  // Spawn a new sunflower at random position
  const spawnSunflower = () => {
    if (!gameAreaRef.current) return

    const gameArea = gameAreaRef.current.getBoundingClientRect()
    const size = 40 + Math.random() * 40 // Random size between 40-80px

    // Ensure sunflower is fully within game area
    const maxX = gameArea.width - size
    const maxY = gameArea.height - size

    const newSunflower = {
      id: Date.now(),
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      size,
    }

    setSunflowers((prev) => [...prev, newSunflower])

    // Remove sunflower after 2 seconds if not clicked
    setTimeout(() => {
      setSunflowers((prev) => prev.filter((s) => s.id !== newSunflower.id))
    }, 2000)
  }

  // Handle sunflower click
  const handleSunflowerClick = (id: number) => {
    setScore((prev) => prev + 1)
    setSunflowers((prev) => prev.filter((s) => s.id !== id))
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (spawnRef.current) clearInterval(spawnRef.current)
    }
  }, [])

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-pink-50 to-white dark:from-pink-950 dark:to-pink-900">
      <div className="container px-4">
        <Link
          href="/"
          className="inline-flex items-center text-pink-600 dark:text-pink-300 hover:text-pink-700 dark:hover:text-pink-200 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-300 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Catch the Sunflowers
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-pink-800 rounded-xl shadow-xl overflow-hidden mb-6">
            <div className="p-4 flex justify-between items-center border-b border-pink-100 dark:border-pink-700">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-secondary mr-2" />
                <span className="font-medium text-pink-700 dark:text-pink-300">Score: {score}</span>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-secondary mr-2" />
                <span className="font-medium text-pink-700 dark:text-pink-300">Time: {timeLeft}s</span>
              </div>
            </div>

            <div
              ref={gameAreaRef}
              className="relative h-[400px] md:h-[500px] bg-gradient-to-b from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 overflow-hidden"
              style={{ cursor: gameStarted ? "pointer" : "default" }}
            >
              {/* Game elements */}
              {gameStarted && (
                <>
                  {/* Sun */}
                  <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-secondary shadow-lg" />

                  {/* Ground with grass */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-600 dark:bg-green-800">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-green-500 dark:bg-green-700" />
                  </div>

                  {/* Sunflowers */}
                  <AnimatePresence>
                    {sunflowers.map((sunflower) => (
                      <motion.div
                        key={sunflower.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: sunflower.x,
                          top: sunflower.y,
                          width: sunflower.size,
                          height: sunflower.size,
                        }}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleSunflowerClick(sunflower.id)}
                      >
                        <Image
                          src="/sunflower-icon.svg"
                          alt="Sunflower"
                          width={sunflower.size}
                          height={sunflower.size}
                          className="pointer-events-none"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}

              {/* Game start overlay */}
              {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                  <motion.div
                    className="bg-white dark:bg-pink-800 p-6 rounded-lg shadow-lg max-w-md text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-4">Catch the Sunflowers!</h2>
                    <p className="text-gray-600 dark:text-pink-100 mb-6">
                      Click on the sunflowers as they appear to score points. You have 30 seconds!
                    </p>
                    <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600 text-white">
                      Start Game
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Game over overlay */}
              {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
                  <motion.div
                    className="bg-white dark:bg-pink-800 p-6 rounded-lg shadow-lg max-w-md text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-2">Game Over!</h2>
                    <p className="text-xl text-gray-700 dark:text-pink-200 mb-4">
                      Your score: <span className="font-bold">{score}</span>
                    </p>

                    {score > highScore && (
                      <motion.p
                        className="text-lg text-secondary dark:text-secondary font-medium mb-4"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: 2 }}
                      >
                        New High Score! 🎉
                      </motion.p>
                    )}

                    <Button onClick={startGame} className="bg-pink-500 hover:bg-pink-600 text-white">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Play Again
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* High score card */}
          <Card className="border-pink-200 dark:border-pink-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-pink-700 dark:text-pink-300 mb-2 flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-secondary" />
                High Score
              </h3>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-200">{highScore}</p>
            </CardContent>
          </Card>

          {/* Game instructions */}
          <div className="mt-8 bg-white dark:bg-pink-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-medium text-pink-700 dark:text-pink-300 mb-4">How to Play</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-pink-100">
              <li>Click on sunflowers as they appear on the screen</li>
              <li>Each sunflower you catch gives you 1 point</li>
              <li>Sunflowers will disappear if not caught quickly</li>
              <li>You have 30 seconds to catch as many as possible</li>
              <li>Try to beat your high score!</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

