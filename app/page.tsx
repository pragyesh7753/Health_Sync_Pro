"use client"
import { AuthProvider, useAuth } from "@/components/auth-context"
import { LoginRegister } from "@/components/login-register"
import { HealthApp } from "@/components/health-app"
import { LoadingScreen } from "@/components/loading"
import { useState, useEffect } from "react"

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()
  const [showAppLoading, setShowAppLoading] = useState(true)
  
  // Add an additional loading state for testing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAppLoading(false)
    }, 3000) // Show loading for 3 seconds
    
    return () => clearTimeout(timer)
  }, [])

  // Show loading if either auth is loading or app is loading
  if (isLoading || showAppLoading) {
    return <LoadingScreen message="Loading HealthSync Pro" submessage="Initializing your health dashboard..." />
  }

  return isAuthenticated ? <HealthApp /> : <LoginRegister />
}

export default function HealthManagementSystem() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
