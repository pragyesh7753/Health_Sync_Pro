"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("healthapp_user")
    const savedToken = localStorage.getItem("healthapp_token")

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("healthapp_users") || "[]")
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userWithoutPassword = { ...foundUser }
        delete userWithoutPassword.password

        setUser(userWithoutPassword)
        localStorage.setItem("healthapp_user", JSON.stringify(userWithoutPassword))
        localStorage.setItem("healthapp_token", "fake-jwt-token")
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing users
      const users = JSON.parse(localStorage.getItem("healthapp_users") || "[]")

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      users.push(newUser)
      localStorage.setItem("healthapp_users", JSON.stringify(users))

      // Auto login after registration
      const userWithoutPassword = { ...newUser }
      delete userWithoutPassword.password

      setUser(userWithoutPassword)
      localStorage.setItem("healthapp_user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("healthapp_token", "fake-jwt-token")

      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthapp_user")
    localStorage.removeItem("healthapp_token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
