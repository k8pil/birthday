"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Gallery data with all photos in a unified collection
const galleryImages = [
  {
    id: 1,
    src: "/images/2.png",
    alt: "Standing in the snow with prayer flags",
    caption: "Winter adventures in the mountains",
    objectPosition: "center",
  },
  {
    id: 2,
    src: "/images/5.png",
    alt: "Celebration in a pink traditional outfit",
    caption: "Festival of lights celebration",
    objectPosition: "center",
  },
  {
    id: 3,
    src: "/images/6.png",
    alt: "Birthday celebration with a coffee cookie",
    caption: "Sweet birthday moments",
    objectPosition: "center",
  },
  {
    id: 4,
    src: "/images/7.png",
    alt: "Outdoor portrait in sunlight",
    caption: "Sunny day vibes",
    objectPosition: "center",
  },
  {
    id: 5,
    src: "/images/1.png",
    alt: "Smiling with coffee treats",
    caption: "Coffee shop happiness",
    objectPosition: "center",
  },
  {
    id: 6,
    src: "/images/4.png",
    alt: "Couple on a rooftop",
    caption: "City views with friends",
    objectPosition: "center",
  },
  {
    id: 7,
    src: "/images/best_lina.jpg",
    alt: "Evening with fairy lights",
    caption: "Magical evening lights",
    objectPosition: "center",
  },
  {
    id: 8,
    src: "/images/landing.png",
    alt: "Childhood memory",
    caption: "Precious childhood memories",
    objectPosition: "center",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return

    if (direction === "next") {
      const nextIndex = (selectedImage + 1) % galleryImages.length
      setSelectedImage(nextIndex)
    } else {
      const prevIndex = (selectedImage - 1 + galleryImages.length) % galleryImages.length
      setSelectedImage(prevIndex)
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

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-300 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Photo Gallery
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              layout
            >
              <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: image.objectPosition }}
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="p-4 text-white font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-4xl w-full h-[80vh] flex flex-col"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>

                <div className="relative flex-1 bg-pink-950/50 rounded-lg overflow-hidden">
                  <Image
                    src={galleryImages[selectedImage].src || "/placeholder.svg"}
                    alt={galleryImages[selectedImage].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-100 hover:bg-pink-800/50"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage("prev")
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>

                  <p className="text-white text-center">{galleryImages[selectedImage].caption}</p>

                  <Button
                    variant="outline"
                    className="border-pink-300 text-pink-100 hover:bg-pink-800/50"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage("next")
                    }}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

