"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Welcome back! Here's your health overview for today.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Quick Entry
        </Button>
      </div>

      {/* Health Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-800">Health Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700">Blood pressure reading overdue</span>
              <Badge variant="outline" className="border-orange-300 text-orange-700">
                2 days
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700">Prescription refill needed</span>
              <Badge variant="outline" className="border-orange-300 text-orange-700">
                3 days
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,847</div>
            <p className="text-xs text-blue-100">+12% from yesterday</p>
            <Progress value={78} className="mt-2 bg-blue-400" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74 BPM</div>
            <p className="text-xs text-red-100">Normal range</p>
            <div className="mt-2 text-xs">Resting: 68 BPM</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69.6 kg</div>
            <p className="text-xs text-green-100">-0.6 kg this week</p>
            <div className="mt-2 text-xs">BMI: 22.4</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7h 32m</div>
            <p className="text-xs text-purple-100">Good quality</p>
            <div className="mt-2 text-xs">Deep: 2h 15m</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your daily steps and heart rate trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={2} name="Steps" />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate (BPM)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
            <CardDescription>Weekly weight tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[69, 71]} />
                <Tooltip />
                <Bar dataKey="weight" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Items */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Today's Medications
              </CardTitle>
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Set Reminders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMedications.map((med, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-gray-50 gap-2 sm:gap-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-center">
                    {med.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{apt.doctor}</p>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{apt.date}</p>
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
