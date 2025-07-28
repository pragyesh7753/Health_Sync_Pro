"use client"

import { useState } from "react"
import { Plus, Heart, Pill, Activity, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: Heart, label: "Log Vitals", color: "from-red-500 to-pink-500" },
    { icon: Pill, label: "Add Medication", color: "from-purple-500 to-indigo-500" },
    { icon: Activity, label: "Record Activity", color: "from-blue-500 to-cyan-500" },
    { icon: Calendar, label: "Book Appointment", color: "from-green-500 to-emerald-500" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col-reverse gap-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center gap-3 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-gray-700 shadow-lg whitespace-nowrap">
              {action.label}
            </span>
            <Button
              size="sm"
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl`}
              onClick={() => {
                // Handle action
                setIsOpen(false)
              }}
            >
              <action.icon className="h-5 w-5 text-white" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative overflow-hidden ${isOpen ? 'rotate-45' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        {isOpen ? (
          <X className="h-6 w-6 text-white relative z-10" />
        ) : (
          <Plus className="h-6 w-6 text-white relative z-10" />
        )}
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
      </Button>
    </div>
  )
}