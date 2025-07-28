"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 rounded-full"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-9 h-9 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-500 animate-bounce-subtle relative z-10" />
      ) : (
        <Moon className="h-4 w-4 text-blue-600 animate-pulse relative z-10" />
      )}
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}