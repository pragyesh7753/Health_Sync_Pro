"use client"

import { Activity, Calendar, FileText, Home, Pill, User, Stethoscope, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Health Profile",
    icon: User,
    id: "profile",
  },
  {
    title: "Medications",
    icon: Pill,
    id: "medications",
  },
  {
    title: "Health Metrics",
    icon: Activity,
    id: "metrics",
  },
  {
    title: "Appointments",
    icon: Calendar,
    id: "appointments",
  },
  {
    title: "Health Records",
    icon: FileText,
    id: "records",
  },
]

interface AppSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  const { user, logout } = useAuth()

  return (
    <Sidebar className="border-r border-blue-200/50 glass-card animate-slide-up">
      <SidebarHeader className="border-b border-blue-200/50 p-3 sm:p-4 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthSync Pro
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate animate-fade-in">Welcome, {user?.firstName}</p>
          </div>
        </div>
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-blue-100/50 relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-all duration-300 hover:bg-red-50 p-2 rounded-lg group flex-1"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 group-hover:animate-bounce-subtle" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-purple-50/20 pointer-events-none"></div>
        <SidebarGroup className="relative z-10">
          <SidebarGroupLabel className="text-gray-700 font-semibold px-3 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start gap-2 sm:gap-3 px-2 sm:px-3 py-3 text-xs sm:text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-100 data-[active=true]:to-purple-100 data-[active=true]:text-blue-700 transition-all duration-300 rounded-lg mx-2 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 relative z-10 group-hover:animate-bounce-subtle" />
                    <span className="truncate text-xs sm:text-sm relative z-10 font-medium">{item.title}</span>
                    {activeTab === item.id && (
                      <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
