"use client"

import { cn } from "@/lib/utils"

interface EnhancedProgressProps {
  value: number
  max?: number
  className?: string
  showValue?: boolean
  animated?: boolean
  gradient?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange'
}

export function EnhancedProgress({
  value,
  max = 100,
  className,
  showValue = false,
  animated = true,
  gradient = true,
  size = 'md',
  color = 'blue'
}: EnhancedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const colorClasses = {
    blue: gradient 
      ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
      : 'bg-blue-500',
    green: gradient 
      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
      : 'bg-green-500',
    red: gradient 
      ? 'bg-gradient-to-r from-red-500 to-pink-600' 
      : 'bg-red-500',
    purple: gradient 
      ? 'bg-gradient-to-r from-purple-500 to-indigo-600' 
      : 'bg-purple-500',
    orange: gradient 
      ? 'bg-gradient-to-r from-orange-500 to-amber-600' 
      : 'bg-orange-500'
  }

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
            colorClasses[color],
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      {showValue && (
        <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}