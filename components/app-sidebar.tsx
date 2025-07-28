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
  SidebarTrigger,
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
    <Sidebar className="border-r border-blue-200/50 glass-card animate-slide-up" collapsible="icon">
      {/* Always show the trigger button */}
      <div className="p-2">
        <SidebarTrigger className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200" />
      </div>
      <SidebarHeader className="border-b border-blue-200/50 p-3 sm:p-4 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="flex items-center gap-2 sm:gap-3 relative z-10 group-data-[state=collapsed]:justify-center">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative">
            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          </div>
          <div className="flex-1 min-w-0 group-data-[state=collapsed]:hidden">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthSync Pro
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate animate-fade-in">Welcome, {user?.firstName}</p>
          </div>
        </div>

      </SidebarHeader>
      <SidebarContent className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-purple-50/20 pointer-events-none"></div>
        <SidebarGroup className="relative z-10">
          <SidebarGroupLabel className="text-gray-700 font-semibold px-3 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-data-[state=collapsed]:hidden">
            Health Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.title}
                    className={`w-full justify-start gap-2 sm:gap-3 px-2 sm:px-3 py-3 text-xs sm:text-sm transition-all duration-300 rounded-lg mx-2 group relative overflow-hidden group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-2 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-transparent'
                    }`}
                  >
                    {activeTab === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                    )}
                    <item.icon className={`h-4 w-4 flex-shrink-0 relative z-10 ${activeTab === item.id ? 'text-blue-700' : ''}`} />
                    <span className={`truncate text-xs sm:text-sm relative z-10 font-medium group-data-[state=collapsed]:hidden ${activeTab === item.id ? 'text-blue-700 font-semibold' : ''}`}>{item.title}</span>
                    {activeTab === item.id && (
                      <>
                        {/* Active indicator for expanded state */}
                        <div className="absolute right-2 w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse group-data-[state=collapsed]:hidden"></div>
                        {/* Active indicator for collapsed state */}
                        <div className="absolute -right-1 top-1 w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse group-data-[state=expanded]:hidden"></div>
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Sign Out Button at Bottom */}
        <div className="mt-auto p-3 border-t border-blue-200/50 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
          {/* Expanded state logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-all duration-300 w-full hover:bg-red-50 p-2 rounded-lg group relative z-10 group-data-[state=collapsed]:hidden"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 group-hover:animate-bounce-subtle" />
            <span>Sign Out</span>
          </button>
          {/* Collapsed state logout */}
          <button
            onClick={logout}
            className="flex items-center justify-center text-gray-600 hover:text-red-600 transition-all duration-300 hover:bg-red-50 p-2 rounded-lg group relative z-10 w-full group-data-[state=expanded]:hidden"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4 group-hover:animate-bounce-subtle" />
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}