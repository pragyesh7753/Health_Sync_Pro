"use client"

import { Activity, Calendar, FileText, Home, Pill, User, Stethoscope, LogOut } from "lucide-react"
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
    <Sidebar className="border-r border-blue-200 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="border-b border-blue-200 p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600 flex-shrink-0">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">HealthSync Pro</h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Welcome, {user?.firstName}</p>
          </div>
        </div>
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-blue-100">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-medium px-3">Health Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start gap-2 sm:gap-3 px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                  >
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate text-xs sm:text-sm">{item.title}</span>
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
