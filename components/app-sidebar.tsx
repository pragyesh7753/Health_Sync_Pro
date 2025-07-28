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
      <SidebarHeader className="border-b border-blue-200 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">HealthSync</h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Welcome, {user?.firstName}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-blue-100">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
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
                    className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.title}</span>
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
