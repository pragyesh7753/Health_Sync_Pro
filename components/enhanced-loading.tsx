"use client"

import { Stethoscope, Heart, Activity } from "lucide-react"

interface EnhancedLoadingProps {
  message?: string
  submessage?: string
}

export function EnhancedLoading({ 
  message = "Loading HealthSync Pro", 
  submessage = "Preparing your health dashboard..." 
}: EnhancedLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full animate-pulse-slow"></div>
      </div>
      
      <div className="text-center relative z-10 animate-fade-in">
        {/* Multi-layered spinner */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 mx-auto"></div>
          {/* Inner spinning ring */}
          <div 
            className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 mx-auto absolute inset-0" 
            style={{animationDirection: 'reverse', animationDuration: '1.5s'}}
          ></div>
          {/* Pulsing background */}
          <div className="absolute inset-0 rounded-full h-20 w-20 bg-blue-100/30 animate-ping mx-auto"></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-800 animate-bounce-subtle bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {message}
          </h2>
          <p className="text-gray-600 text-sm animate-fade-in" style={{animationDelay: '0.5s'}}>
            {submessage}
          </p>
        </div>
        
        {/* Health icons animation */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center animate-bounce-subtle">
            <Heart className="h-4 w-4 text-red-600" fill="currentColor" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center animate-bounce-subtle" style={{animationDelay: '0.2s'}}>
            <Activity className="h-4 w-4 text-blue-600" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-bounce-subtle" style={{animationDelay: '0.4s'}}>
            <Stethoscope className="h-4 w-4 text-green-600" />
          </div>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}