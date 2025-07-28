"use client"
import { AuthProvider, useAuth } from "@/components/auth-context"
import { LoginRegister } from "@/components/login-register"
import { HealthApp } from "@/components/health-app"
import { EnhancedLoading } from "@/components/enhanced-loading"
import { useEffect, useState } from "react"

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <EnhancedLoading />
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
