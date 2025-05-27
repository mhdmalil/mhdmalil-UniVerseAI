"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

const testimonials = [
  {
    name: "Sarah Chen",
    text: "UniVerseAI transformed my study routine. The AI summaries save me hours!",
    major: "Computer Science",
  },
  {
    name: "Marcus Johnson",
    text: "The task scheduler keeps me organized and the GPA tracker motivates me daily.",
    major: "Business Administration",
  },
  {
    name: "Elena Rodriguez",
    text: "Campus Connect helped me find study groups and amazing tutors. Love it!",
    major: "Psychology",
  },
]

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b bg-card">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UV</span>
          </div>
          <span className="text-xl font-bold text-foreground">UniVerseAI</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="transition-all duration-200 hover:scale-105"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="ml-2">Dark Mode</span>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Your Student Platform
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Learn, Organize, Connect with AI - Your all-in-one solution for academic success
        </p>
        <Link href="/features">
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
          >
            Get Started
          </Button>
        </Link>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Students Say</h2>
          <div className="relative">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-lg mb-4 italic text-foreground">"{testimonials[currentTestimonial].text}"</p>
                <div className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</div>
                <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].major}</div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="transition-all duration-200 hover:scale-105"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? "bg-blue-500" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 text-center text-muted-foreground bg-card">
        <div className="flex justify-center space-x-6">
          <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
        </div>
        <p className="mt-4">© 2024 UniVerseAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
