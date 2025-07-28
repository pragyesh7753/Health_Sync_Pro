"use client"
import { AuthProvider, useAuth } from "@/components/auth-context"
import { LoginRegister } from "@/components/login-register"
import { HealthApp } from "@/components/health-app"

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
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
