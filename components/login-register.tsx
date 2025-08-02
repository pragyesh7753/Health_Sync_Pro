"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stethoscope, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-context"

export function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    mobileNumber: "",
  })

  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password)
        if (!success) {
          setError("Invalid email or password")
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }

        const success = await register(formData.email, formData.password, formData.firstName, formData.lastName, formData.mobileNumber)
        if (!success) {
          setError("Email already exists or registration failed")
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="mobile-viewport flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 no-horizontal-scroll relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative">
              <Stethoscope className="h-6 w-6 sm:h-7 sm:w-7 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
            </div>
            <div className="animate-slide-up">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HealthSync Pro
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">Personal Health Manager</p>
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 animate-bounce-subtle">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {isLogin ? "Sign in to access your health dashboard" : "Join us to start managing your health"}
          </p>
        </div>

        {/* Auth Form */}
        <Card className="shadow-2xl border-0 glass-card hover-lift animate-scale-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="space-y-1 pb-4 relative z-10">
            <CardTitle className="text-xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isLogin ? "Sign In" : "Sign Up"}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Fill in your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">


              {/* Name fields for registration */}
              {!isLogin && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Enter First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 text-base glass border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Enter Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="pl-10 text-base glass border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-sm font-medium">Mobile Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                      <Input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        placeholder="Enter Your Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="pl-10 text-base glass border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 text-base glass border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 glass border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors duration-200 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password for registration */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Your Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 glass border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-lg animate-scale-in">
                  <AlertCircle className="h-4 w-4 text-red-600 animate-bounce-subtle" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    <span className="animate-pulse">{isLogin ? "Signing in..." : "Creating account..."}</span>
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Toggle between login/register */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError("")
                    setFormData({
                      email: "",
                      password: "",
                      firstName: "",
                      lastName: "",
                      confirmPassword: "",
                      mobileNumber: "",
                    })
                  }}
                  className="ml-1 text-blue-600 hover:text-purple-600 font-semibold transition-all duration-200 hover:scale-105"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            {/* Demo credentials */}
            {isLogin && (
              <div className="mt-4 p-3 glass rounded-lg animate-fade-in">
                <p className="text-xs text-gray-600 text-center">
                  <strong className="text-blue-600">Demo:</strong> Create an account or use any email/password combination
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
