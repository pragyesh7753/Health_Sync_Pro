"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { HealthProfile } from "@/components/health-profile"
import { MedicationManagement } from "@/components/medication-management"
import { HealthMetrics } from "@/components/health-metrics"
import { AppointmentManagement } from "@/components/appointment-management"
import { HealthRecords } from "@/components/health-records"
import { NotificationSystem, useNotifications } from "@/components/notification-system"
import { useIsMobile } from "@/hooks/use-mobile"


export function HealthApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { notifications, removeNotification, showSuccess } = useNotifications()
  const isMobile = useIsMobile()
  
  // Show welcome notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      showSuccess("Welcome back!", "Your health dashboard is ready.", 4000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <HealthProfile />
      case "medications":
        return <MedicationManagement />
      case "metrics":
        return <HealthMetrics />
      case "appointments":
        return <AppointmentManagement />
      case "records":
        return <HealthRecords />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex mobile-viewport w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 no-horizontal-scroll relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full animate-pulse-slow"></div>
        </div>
        
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarInset>
          <main className="flex-1 p-2 sm:p-4 lg:p-6 overflow-x-hidden w-full min-w-0 relative z-10">
            <div className="w-full animate-fade-in">{renderContent()}</div>
          </main>
        </SidebarInset>
        
        <NotificationSystem 
          notifications={notifications} 
          onRemove={removeNotification} 
        />
      </div>
    </SidebarProvider>
  )
}
