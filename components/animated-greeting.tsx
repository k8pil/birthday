"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedGreetingProps {
  name: string
}

export default function AnimatedGreeting({ name }: AnimatedGreetingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <h1 className="text-4xl md:text-6xl font-bold text-pink-600 dark:text-pink-300">Loading...</h1>

  return (
    <div className="overflow-hidden">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-pink-600 dark:text-pink-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
          Happy Birthday,{" "}
        </motion.span>
        <motion.span
          className="text-secondary dark:text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          {name}!
        </motion.span>
      </motion.h1>

      <motion.div
        className="mt-4 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="h-1 w-40 bg-gradient-to-r from-pink-300 to-secondary rounded-full" />
      </motion.div>
    </div>
  )
}

