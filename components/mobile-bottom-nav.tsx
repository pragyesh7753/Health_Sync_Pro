"use client"

import { Activity, Calendar, FileText, Home, Pill, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const navItems = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Profile", icon: User, id: "profile" },
  { title: "Medications", icon: Pill, id: "medications" },
  { title: "Metrics", icon: Activity, id: "metrics" },
  { title: "Appointments", icon: Calendar, id: "appointments" },
  { title: "Records", icon: FileText, id: "records" },
]

interface MobileBottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MobileBottomNav({ activeTab, setActiveTab }: MobileBottomNavProps) {
  const isMobile = useIsMobile()

  if (!isMobile) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
              activeTab === item.id
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className={`h-5 w-5 mb-1 ${activeTab === item.id ? "text-blue-600" : ""}`} />
            <span className="text-xs font-medium truncate">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}