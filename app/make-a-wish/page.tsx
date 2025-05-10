"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Wish = {
  id: number
  name: string
  message: string
  timestamp: string
  animation: "sparkle" | "float" | "spin" | "bounce"
}

const animations = {
  sparkle: {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: [0.8, 1.05, 1],
      transition: { duration: 0.5 },
    },
  },
  float: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: [20, -10, 0],
      transition: { duration: 0.8 },
    },
  },
  spin: {
    initial: { opacity: 0, rotate: -10, scale: 0.8 },
    animate: {
      opacity: 1,
      rotate: [0, 10, 0],
      scale: 1,
      transition: { duration: 0.6 },
    },
  },
  bounce: {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: [50, -20, 10, -5, 0],
      transition: { duration: 0.8 },
    },
  },
}

// Sample wishes data
const initialWishes: Wish[] = [
  {
    id: 1,
    name: "Kapil",
    message: "Many Many happy returns of the Day Lina! May god make your all wishes come true",
    timestamp: "Just now",
    animation: "sparkle",
  },
]

export default function MakeAWishPage() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showWishAnimation, setShowWishAnimation] = useState(false)
  const wishContainerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (name && message) {
      const animations = ["sparkle", "float", "spin", "bounce"] as const
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]

      const newWish: Wish = {
        id: wishes.length + 1,
        name,
        message,
        timestamp: "Just now",
        animation: randomAnimation,
      }

      setWishes([newWish, ...wishes])
      setName("")
      setMessage("")
      setIsSubmitted(true)
      setShowWishAnimation(true)

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)

      // Reset wish animation after 5 seconds
      setTimeout(() => {
        setShowWishAnimation(false)
      }, 5000)
    }
  }

  // Create stars for the wish animation
  const createStars = () => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = 5 + Math.random() * 15
      const left = Math.random() * 100
      const animationDuration = 1 + Math.random() * 2
      const delay = Math.random() * 0.5

      return (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: -100 - Math.random() * 100,
            x: (Math.random() - 0.5) * 50,
          }}
          transition={{
            duration: animationDuration,
            delay: delay,
            ease: "easeOut",
          }}
          style={{ left: `${left}%`, bottom: 0 }}
        >
          <Star className="text-secondary" style={{ width: size, height: size }} fill="currentColor" />
        </motion.div>
      )
    })
  }

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
          Make a Birthday Wish
        </motion.h1>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white dark:bg-pink-800 rounded-xl shadow-xl overflow-hidden mb-12 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-pink-700 dark:text-pink-200 mb-4 flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Send Your Birthday Wish
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="border-pink-200 focus:border-pink-500 dark:border-pink-700 dark:focus:border-pink-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Birthday Wish</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your birthday wish here..."
                    required
                    className="min-h-[100px] border-pink-200 focus:border-pink-500 dark:border-pink-700 dark:focus:border-pink-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!name || !message}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Send Wish <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {showWishAnimation && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">{createStars()}</div>
              )}

              {isSubmitted && (
                <motion.div
                  className="mt-4 p-3 bg-pink-100 dark:bg-pink-700/50 rounded-md flex items-center text-pink-700 dark:text-pink-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Your wish has been sent! May it come true!
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            ref={wishContainerRef}
          >
            <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-300 mb-6">Birthday Wishes</h2>

            <div className="grid gap-6">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  variants={animations[wish.animation]}
                  initial="initial"
                  animate="animate"
                  className={cn(
                    "transform transition-all duration-500",
                    index === 0 && showWishAnimation ? "ring-2 ring-secondary ring-opacity-50" : "",
                  )}
                >
                  <Card className="overflow-hidden border-pink-200 dark:border-pink-700">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-secondary dark:from-pink-500 dark:to-secondary flex items-center justify-center text-white font-medium">
                          {wish.name.charAt(0)}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-pink-700 dark:text-pink-200">{wish.name}</h3>
                            <span className="text-xs text-gray-500 dark:text-pink-400">{wish.timestamp}</span>
                          </div>
                          <p className="text-gray-700 dark:text-pink-100">{wish.message}</p>

                          {/* Decorative elements based on animation type */}
                          {wish.animation === "sparkle" && (
                            <div className="flex justify-end mt-2">
                              <Sparkles className="h-4 w-4 text-secondary" />
                            </div>
                          )}
                          {wish.animation === "float" && (
                            <div className="flex justify-end mt-2">
                              <div className="w-5 h-5 text-secondary opacity-70">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                                  <path d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z" />
                                </svg>
                              </div>
                            </div>
                          )}
                          {wish.animation === "spin" && (
                            <div className="flex justify-end mt-2">
                              <div className="w-5 h-5 text-secondary opacity-70">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                                  <path d="M256 128c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16zm0 384c-8.8 0-16-7.2-16-16v-96c0-8.8 7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16zm144-144c0 8.8-7.2 16-16 16H288c-8.8 0-16-7.2-16-16s7.2-16 16-16h96c8.8 0 16 7.2 16 16zM16 256c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H16zm366.6-101.7c-6.2 6.2-16.4 6.2-22.6 0l-67.9-67.9c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l67.9 67.9c6.3 6.2 6.3 16.4 0 22.6zM129.4 357.7c-6.2 6.2-16.4 6.2-22.6 0l-67.9-67.9c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l67.9 67.9c6.3 6.2 6.3 16.4 0 22.6zm0-203.4c6.2 6.2 6.2 16.4 0 22.6L61.5 244.8c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l67.9-67.9c6.2-6.2 16.4-6.2 22.6 0zm203.4 203.4c6.2 6.2 6.2 16.4 0 22.6l-67.9 67.9c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l67.9-67.9c6.2-6.3 16.4-6.3 22.6 0z" />
                                  <circle cx="256" cy="256" r="80" fill="#8B4513" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

