"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import SignatureCanvas from "@/components/signature-canvas"

export default function BirthdayCardPage() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [signatures, setSignatures] = useState<Array<{ name: string; message: string; signature: string }>>([])
  const [currentSignature, setCurrentSignature] = useState<string | null>(null)
  const [isCardSigned, setIsCardSigned] = useState(false)

  const handleSignatureChange = (dataUrl: string) => {
    setCurrentSignature(dataUrl)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (name && message && currentSignature) {
      setSignatures([
        ...signatures,
        {
          name,
          message,
          signature: currentSignature,
        },
      ])
      setName("")
      setMessage("")
      setCurrentSignature(null)
      setIsCardSigned(true)
    }
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

        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-300 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Virtual Birthday Card
          </motion.h1>

          <motion.div
            className="bg-white dark:bg-pink-800 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-8 bg-gradient-to-r from-pink-200 to-pink-100 dark:from-pink-700 dark:to-pink-600">
              <h2 className="text-2xl font-bold text-pink-800 dark:text-pink-100 text-center">Happy Birthday!</h2>
              <p className="text-center text-pink-700 dark:text-pink-200 mt-2">
                Wishing you a wonderful day filled with joy and happiness
              </p>
            </div>

            <div className="p-8">
              {isCardSigned ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-medium text-pink-600 dark:text-pink-300">
                    Thank you for signing the card!
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-pink-100">
                    Your message has been added to the birthday card.
                  </p>
                  <Button
                    onClick={() => setIsCardSigned(false)}
                    className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Sign Again
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="space-y-2">
                    <Label>Your Signature</Label>
                    <SignatureCanvas onChange={handleSignatureChange} />
                  </div>

                  <Button
                    type="submit"
                    disabled={!name || !message || !currentSignature}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Sign the Card <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {signatures.length > 0 && (
            <motion.div
              className="mt-12 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-300 mb-6">
                Signatures & Wishes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {signatures.map((sig, index) => (
                  <Card key={index} className="overflow-hidden border-pink-200 dark:border-pink-700">
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-4">
                        <p className="text-gray-700 dark:text-pink-100 italic">"{sig.message}"</p>
                        <div className="h-16 relative">
                          <img
                            src={sig.signature || "/placeholder.svg"}
                            alt={`${sig.name}'s signature`}
                            className="h-full object-contain object-left"
                          />
                        </div>
                        <p className="text-right text-pink-600 dark:text-pink-300 font-medium">- {sig.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

