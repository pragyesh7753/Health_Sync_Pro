
"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EnhancedProgress } from "@/components/enhanced-progress"
import { QuickEntryModal } from "@/components/quick-entry-modal"
import { Activity, Heart, Pill, Calendar, TrendingUp, AlertCircle, Plus, Bell } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const healthData = [
  { date: "Mon", steps: 8500, heartRate: 72, weight: 70.2 },
  { date: "Tue", steps: 9200, heartRate: 75, weight: 70.1 },
  { date: "Wed", steps: 7800, heartRate: 73, weight: 70.0 },
  { date: "Thu", steps: 10500, heartRate: 78, weight: 69.9 },
  { date: "Fri", steps: 9800, heartRate: 74, weight: 69.8 },
  { date: "Sat", steps: 12000, heartRate: 76, weight: 69.7 },
  { date: "Sun", steps: 8900, heartRate: 71, weight: 69.6 },
]

const upcomingMedications = [
  { name: "Lisinopril", time: "8:00 AM", dosage: "10mg" },
  { name: "Metformin", time: "12:00 PM", dosage: "500mg" },
  { name: "Vitamin D", time: "6:00 PM", dosage: "1000 IU" },
]

const upcomingAppointments = [
  { doctor: "Dr. Smith", specialty: "Cardiology", date: "Tomorrow", time: "2:00 PM" },
  { doctor: "Dr. Johnson", specialty: "General Practice", date: "Friday", time: "10:30 AM" },
]

export function Dashboard() {
  const [quickEntryOpen, setQuickEntryOpen] = React.useState(false);
  return (
    <div className="space-y-6 animate-slide-up">
      <QuickEntryModal open={quickEntryOpen} onOpenChange={setQuickEntryOpen} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">Welcome back! Here's your health overview for today.</p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => setQuickEntryOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Quick Entry
        </Button>
      </div>

      {/* Health Alerts */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 hover-lift glass-card animate-scale-in relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <AlertCircle className="h-5 w-5 text-orange-600 animate-bounce-subtle" />
              <div className="absolute inset-0 h-5 w-5 bg-orange-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <CardTitle className="text-orange-800 font-semibold">Health Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200">
              <span className="text-sm text-orange-700 font-medium">Blood pressure reading overdue</span>
              <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-100/50">
                2 days
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200">
              <span className="text-sm text-orange-700 font-medium">Prescription refill needed</span>
              <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-100/50">
                3 days
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="health-gradient text-white hover-lift hover-glow relative overflow-hidden group animate-scale-in" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
            <div className="relative">
              <Activity className="h-4 w-4 animate-bounce-subtle" />
              <div className="absolute inset-0 h-4 w-4 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold mb-1">9,847</div>
            <p className="text-xs text-blue-100 mb-2">+12% from yesterday</p>
            <EnhancedProgress value={78} className="mt-2" color="blue" size="sm" animated />
          </CardContent>
        </Card>

        <Card className="wellness-gradient text-white hover-lift hover-glow relative overflow-hidden group animate-scale-in" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <div className="relative">
              <Heart className="h-4 w-4 animate-pulse" fill="currentColor" />
              <div className="absolute inset-0 h-4 w-4 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold mb-1">74 BPM</div>
            <p className="text-xs text-red-100 mb-1">Normal range</p>
            <div className="text-xs opacity-90">Resting: 68 BPM</div>
          </CardContent>
        </Card>

        <Card className="energy-gradient text-white hover-lift hover-glow relative overflow-hidden group animate-scale-in" style={{animationDelay: '0.3s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <div className="relative">
              <TrendingUp className="h-4 w-4 animate-bounce-subtle" />
              <div className="absolute inset-0 h-4 w-4 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold mb-1">69.6 kg</div>
            <p className="text-xs text-green-100 mb-1">-0.6 kg this week</p>
            <div className="text-xs opacity-90">BMI: 22.4</div>
          </CardContent>
        </Card>

        <Card className="vitality-gradient text-white hover-lift hover-glow relative overflow-hidden group animate-scale-in" style={{animationDelay: '0.4s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <div className="relative">
              <Activity className="h-4 w-4 animate-pulse" />
              <div className="absolute inset-0 h-4 w-4 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold mb-1">7h 32m</div>
            <p className="text-xs text-purple-100 mb-1">Good quality</p>
            <div className="text-xs opacity-90">Deep: 2h 15m</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="glass-card hover-lift relative overflow-hidden animate-slide-up" style={{animationDelay: '0.5s'}}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-12 translate-x-12"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your daily steps and heart rate trends</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={3} name="Steps" dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={3} name="Heart Rate (BPM)" dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift relative overflow-hidden animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-12 translate-x-12"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Weight Progress
            </CardTitle>
            <CardDescription>Weekly weight tracking</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <BarChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis domain={[69, 71]} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="weight" fill="url(#weightGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Items */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <Card className="glass-card hover-lift relative overflow-hidden animate-slide-up" style={{animationDelay: '0.7s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <Pill className="h-5 w-5 text-purple-600" />
                  <div className="absolute inset-0 h-5 w-5 bg-purple-400 rounded-full animate-ping opacity-20"></div>
                </div>
                Today's Medications
              </CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
                <Bell className="mr-2 h-4 w-4" />
                Set Reminders
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              {upcomingMedications.map((med, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 gap-2 sm:gap-0 interactive-card"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-center bg-purple-50 border-purple-200 text-purple-700">
                    {med.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift relative overflow-hidden animate-slide-up" style={{animationDelay: '0.8s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div className="absolute inset-0 h-5 w-5 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                </div>
                Upcoming Appointments
              </CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              {upcomingAppointments.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 interactive-card">
                  <div>
                    <p className="font-semibold text-gray-900">{apt.doctor}</p>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">{apt.date}</p>
                    <p className="text-sm text-gray-600">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

}