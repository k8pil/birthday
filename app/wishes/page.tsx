"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Send, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

// Animation variants for wishes
const wishAnimations = [
  {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  },
  {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0, transition: { duration: 0.5 } },
  },
  {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
]

// Sample wishes data - replace with actual data storage
const initialWishes = [
  {
    id: 1,
    name: "Kapil",
    message:
      "Happy birthday! Wishing you all the joy your heart can hold! May your day be filled with sunflowers and cat cuddles!",
    timestamp: "2 hours ago",
    animation: 0,
  },
  {
    id: 2,
    name: "Manvi",
    message:
      "Have an amazing birthday celebration! You deserve all the happiness in the world. Hope your cats give you extra purrs today!",
    timestamp: "5 hours ago",
    animation: 1,
  },
  {
    id: 3,
    name: "Adi",
    message:
      "Cheers to another trip around the sun! May this year bring you endless blessings and fields of sunflowers to brighten your days.",
    timestamp: "1 day ago",
    animation: 2,
  },
]

export default function WishesPage() {
  const [wishes, setWishes] = useState(initialWishes)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (name && message) {
      const animationIndex = Math.floor(Math.random() * wishAnimations.length)

      const newWish = {
        id: wishes.length + 1,
        name,
        message,
        timestamp: "Just now",
        animation: animationIndex,
      }

      setWishes([newWish, ...wishes])
      setName("")
      setMessage("")
      setIsSubmitted(true)
      setShowConfetti(true)

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)

      // Reset confetti after 2 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 2000)
    }
  }

  // Generate confetti elements
  const renderConfetti = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = 5 + Math.random() * 10
      const left = Math.random() * 100
      const animationDuration = 1 + Math.random() * 2
      const delay = Math.random() * 0.5
      const color = i % 3 === 0 ? "#fcd34d" : i % 3 === 1 ? "#ec4899" : "#f9a8d4"

      return (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{ opacity: 1, y: 0, x: 0 }}
          animate={{
            opacity: [1, 0],
            y: -100 - Math.random() * 100,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: animationDuration,
            delay: delay,
            ease: "easeOut",
          }}
          style={{
            left: `${left}%`,
            bottom: 0,
            width: size,
            height: size,
            backgroundColor: color,
          }}
        />
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
          Birthday Wishes
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
                <Heart className="mr-2 h-5 w-5" fill="currentColor" />
                Leave Your Birthday Wish
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
                  <Label htmlFor="message">Your Birthday Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your birthday wishes here..."
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

              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">{renderConfetti()}</div>
              )}

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    className="mt-4 p-3 bg-pink-100 dark:bg-pink-700/50 rounded-md flex items-center text-pink-700 dark:text-pink-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Thank you for your birthday wish!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-300 mb-6">
              All Birthday Wishes
            </h2>

            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                variants={wishAnimations[wish.animation]}
                initial="initial"
                animate="animate"
                transition={{ delay: index === 0 ? 0 : 0.1 * Math.min(index, 5) }}
              >
                <Card className="overflow-hidden border-pink-200 dark:border-pink-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border-2 border-pink-200 dark:border-pink-600">
                        <AvatarFallback className="bg-pink-100 text-pink-700 dark:bg-pink-800 dark:text-pink-200">
                          {wish.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-pink-700 dark:text-pink-200">{wish.name}</h3>
                          <span className="text-xs text-gray-500 dark:text-pink-400">{wish.timestamp}</span>
                        </div>
                        <p className="text-gray-700 dark:text-pink-100">{wish.message}</p>

                        {/* Decorative elements */}
                        <div className="flex justify-end mt-2 space-x-2">
                          {wish.animation === 0 && (
                            <Image
                              src="/sunflower-icon.svg"
                              alt="Sunflower"
                              width={20}
                              height={20}
                              className="opacity-70"
                            />
                          )}
                          {wish.animation === 1 && (
                            <Image src="/cat-icon.svg" alt="Cat" width={20} height={20} className="opacity-70" />
                          )}
                          {wish.animation === 2 && <Sparkles className="h-5 w-5 text-secondary opacity-70" />}
                          {wish.animation === 3 && (
                            <Heart className="h-5 w-5 text-pink-500 opacity-70" fill="currentColor" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

