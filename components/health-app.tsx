"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { HealthProfile } from "@/components/health-profile"
import { MedicationManagement } from "@/components/medication-management"
import { HealthMetrics } from "@/components/health-metrics"
import { AppointmentManagement } from "@/components/appointment-management"
import { HealthRecords } from "@/components/health-records"

export function HealthApp() {
  const [activeTab, setActiveTab] = useState("dashboard")

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-3 sm:p-6">
          <div className="mx-auto max-w-7xl">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
