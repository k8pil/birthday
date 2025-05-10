import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Sparkles, GamepadIcon } from "lucide-react"
import AnimatedGreeting from "@/components/animated-greeting"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero section with animated greeting */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            >
              {i % 2 === 0 ? (
                <div className="w-8 h-8 text-secondary opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 128c-8.8 0-16-7.2-16-16V16c0-8.8 7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16zm0 384c-8.8 0-16-7.2-16-16v-96c0-8.8 7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16zm144-144c0 8.8-7.2 16-16 16H288c-8.8 0-16-7.2-16-16s7.2-16 16-16h96c8.8 0 16 7.2 16 16zM16 256c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H16zm366.6-101.7c-6.2 6.2-16.4 6.2-22.6 0l-67.9-67.9c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l67.9 67.9c6.3 6.2 6.3 16.4 0 22.6zM129.4 357.7c-6.2 6.2-16.4 6.2-22.6 0l-67.9-67.9c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l67.9 67.9c6.3 6.2 6.3 16.4 0 22.6zm0-203.4c6.2 6.2 6.2 16.4 0 22.6L61.5 244.8c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l67.9-67.9c6.2-6.2 16.4-6.2 22.6 0zm203.4 203.4c6.2 6.2 6.2 16.4 0 22.6l-67.9 67.9c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l67.9-67.9c6.2-6.3 16.4-6.3 22.6 0z" />
                    <circle cx="256" cy="256" r="80" fill="#8B4513" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 text-secondary opacity-60">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="container px-4 text-center z-10">
          <AnimatedGreeting name="Lina" />
          <p className="mt-6 text-xl text-pink-700 dark:text-pink-300 max-w-md mx-auto">
          "May this birthday mark the beginning of a new chapter filled with endless possibilities"
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
              <Link href="/make-a-wish">
                Make a Wish <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-pink-300 text-pink-700 hover:bg-pink-100 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-800"
            >
              <Link href="/gallery">
                View Photo Gallery <Camera className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ArrowRight className="rotate-90 text-pink-500 dark:text-pink-300" />
        </div>
      </section>

      {/* About section */}
      <section className="py-20 bg-white dark:bg-pink-950">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300">Our Princess with Sword</h2>
              <p className="mt-4 text-gray-600 dark:text-pink-100">I just want to say thank you for being such a great friend to me. From day one, you’ve been the one who taught me the game and stood by my side. But more than that, I’m truly grateful for the friendship we’ve built. Now that you're 25, we still want you to stay the same fun-loving, genuine person you’ve always been—both in the game and in our lives. No matter what anyone says, we don’t care—because to us, you are the best.  "im sorry but i stalked your instagram really hard to get some picture you will see ahead hehe"
              </p>
              <Button asChild className="mt-6 bg-pink-500 hover:bg-pink-600 text-white">
                <Link href="/wishes">
                  Leave a Birthday Wish <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/best_lina.jpg"
                alt="Friends celebrating together with colorful flowers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16 bg-pink-50 dark:bg-pink-900">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center text-pink-700 dark:text-pink-300 mb-12">Celebrate With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/make-a-wish" className="group">
              <div className="bg-white dark:bg-pink-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Sparkles className="h-12 w-12 text-secondary dark:text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-200">Make a Wish</h3>
                <p className="mt-2 text-gray-600 dark:text-pink-100">
                  Make a birthday wish for her and see it come to life with animations
                </p>
                <span className="mt-4 inline-flex items-center text-pink-500 dark:text-pink-300 group-hover:translate-x-1 transition-transform">
                  Make a wish <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link href="/gallery" className="group">
              <div className="bg-white dark:bg-pink-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Camera className="h-12 w-12 text-secondary dark:text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-200">Photo Gallery</h3>
                <p className="mt-2 text-gray-600 dark:text-pink-100">Browse through memories and special moments</p>
                <span className="mt-4 inline-flex items-center text-pink-500 dark:text-pink-300 group-hover:translate-x-1 transition-transform">
                  View photos <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link href="/game" className="group">
              <div className="bg-white dark:bg-pink-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <GamepadIcon className="h-12 w-12 text-secondary dark:text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-200">Birthday Game</h3>
                <p className="mt-2 text-gray-600 dark:text-pink-100">
                  Play a fun interactive game to celebrate her special day
                </p>
                <span className="mt-4 inline-flex items-center text-pink-500 dark:text-pink-300 group-hover:translate-x-1 transition-transform">
                  Play now <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

