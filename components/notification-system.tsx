"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  duration?: number
}

interface NotificationSystemProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id)
        }, notification.duration || 5000)
        
        return () => clearTimeout(timer)
      }
    })
  }, [notifications, onRemove])

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-50 to-emerald-50 border-green-200'
      case 'error':
        return 'from-red-50 to-pink-50 border-red-200'
      case 'info':
        return 'from-blue-50 to-indigo-50 border-blue-200'
      default:
        return 'from-blue-50 to-indigo-50 border-blue-200'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`glass-card p-4 rounded-lg shadow-lg hover-lift animate-slide-up bg-gradient-to-r ${getColors(notification.type)} border relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
          
          <div className="flex items-start gap-3 relative z-10">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600">
                {notification.message}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 h-6 w-6 p-0 hover:bg-white/50"
              onClick={() => onRemove(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress bar for timed notifications */}
          {notification.duration && notification.duration > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
                style={{
                  animation: `shrink ${notification.duration}ms linear forwards`
                }}
              ></div>
            </div>
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const showSuccess = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration })
  }

  const showError = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration })
  }

  const showInfo = (title: string, message: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo
  }
}