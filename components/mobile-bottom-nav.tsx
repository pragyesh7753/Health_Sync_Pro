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
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center safe-area-pb">
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-full px-3 py-2 shadow-lg">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
                activeTab === item.id
                  ? "text-white bg-blue-600 shadow-md scale-110"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              
              {/* Active indicator dot */}
              {activeTab === item.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}