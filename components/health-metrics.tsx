"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, Weight, Moon, Zap, Plus, TrendingUp, TrendingDown, Calculator } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const bloodPressureData = [
  { date: "Jan 1", systolic: 120, diastolic: 80 },
  { date: "Jan 8", systolic: 125, diastolic: 82 },
  { date: "Jan 15", systolic: 118, diastolic: 78 },
  { date: "Jan 22", systolic: 122, diastolic: 81 },
  { date: "Jan 29", systolic: 119, diastolic: 79 },
  { date: "Feb 5", systolic: 121, diastolic: 80 },
  { date: "Feb 12", systolic: 117, diastolic: 77 },
]

const weightData = [
  { date: "Week 1", weight: 72.5, bmi: 23.8 },
  { date: "Week 2", weight: 72.2, bmi: 23.7 },
  { date: "Week 3", weight: 71.8, bmi: 23.6 },
  { date: "Week 4", weight: 71.5, bmi: 23.5 },
  { date: "Week 5", weight: 71.2, bmi: 23.4 },
  { date: "Week 6", weight: 70.9, bmi: 23.3 },
  { date: "Week 7", weight: 70.6, bmi: 23.2 },
]

const sleepData = [
  { date: "Mon", hours: 7.5, quality: 85 },
  { date: "Tue", hours: 8.2, quality: 92 },
  { date: "Wed", hours: 6.8, quality: 78 },
  { date: "Thu", hours: 7.9, quality: 88 },
  { date: "Fri", hours: 7.2, quality: 82 },
  { date: "Sat", hours: 8.5, quality: 95 },
  { date: "Sun", hours: 8.0, quality: 90 },
]

const exerciseData = [
  { date: "Mon", steps: 8500, calories: 320, duration: 45 },
  { date: "Tue", steps: 9200, calories: 380, duration: 52 },
  { date: "Wed", steps: 7800, calories: 290, duration: 38 },
  { date: "Thu", steps: 10500, calories: 420, duration: 58 },
  { date: "Fri", steps: 9800, calories: 390, duration: 50 },
  { date: "Sat", steps: 12000, calories: 480, duration: 65 },
  { date: "Sun", steps: 8900, calories: 350, duration: 42 },
]

export function HealthMetrics() {
  const [isAddingMetric, setIsAddingMetric] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("")
  const [bmiHeight, setBmiHeight] = useState("")
  const [bmiWeight, setBmiWeight] = useState("")
  const [calculatedBMI, setCalculatedBMI] = useState<number | null>(null)

  const calculateBMI = () => {
    const height = Number.parseFloat(bmiHeight) / 100 // convert cm to m
    const weight = Number.parseFloat(bmiWeight)
    if (height && weight) {
      const bmi = weight / (height * height)
      setCalculatedBMI(Math.round(bmi * 10) / 10)
    }
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" }
    if (bmi < 25) return { category: "Normal", color: "text-green-600" }
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" }
    return { category: "Obese", color: "text-red-600" }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Metrics</h1>
          <p className="text-gray-600">Track and monitor your vital health indicators</p>
        </div>
        <Dialog open={isAddingMetric} onOpenChange={setIsAddingMetric}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Reading
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Health Reading</DialogTitle>
              <DialogDescription>Record a new health metric reading</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Metric Type</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  <option value="">Select metric</option>
                  <option value="blood-pressure">Blood Pressure</option>
                  <option value="weight">Weight</option>
                  <option value="blood-sugar">Blood Sugar</option>
                  <option value="temperature">Temperature</option>
                  <option value="heart-rate">Heart Rate</option>
                </select>
              </div>
              {selectedMetric === "blood-pressure" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Systolic</Label>
                    <Input placeholder="120" />
                  </div>
                  <div className="space-y-2">
                    <Label>Diastolic</Label>
                    <Input placeholder="80" />
                  </div>
                </div>
              )}
              {selectedMetric === "weight" && (
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input placeholder="70.5" />
                </div>
              )}
              {selectedMetric === "blood-sugar" && (
                <div className="space-y-2">
                  <Label>Blood Sugar (mg/dL)</Label>
                  <Input placeholder="95" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Reading
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <Heart className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120/80</div>
            <p className="text-xs text-red-100">Normal range</p>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span className="text-xs">-2 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <Weight className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70.6 kg</div>
            <p className="text-xs text-green-100">BMI: 23.2</p>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span className="text-xs">-1.9 kg this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-blue-100">Resting rate</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-xs">+3 from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Moon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8h 0m</div>
            <p className="text-xs text-purple-100">Quality: 90%</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span className="text-xs">+30min from avg</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BMI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            BMI Calculator
          </CardTitle>
          <CardDescription>Calculate your Body Mass Index</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" placeholder="175" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" placeholder="70" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button onClick={calculateBMI} className="w-full bg-blue-600 hover:bg-blue-700">
                Calculate BMI
              </Button>
            </div>
          </div>
          {calculatedBMI && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{calculatedBMI}</p>
                  <p className={`text-sm font-medium ${getBMICategory(calculatedBMI).color}`}>
                    {getBMICategory(calculatedBMI).category}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Normal range: 18.5 - 24.9</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Charts */}
      <Tabs defaultValue="vitals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="weight">Weight & BMI</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure Trends</CardTitle>
              <CardDescription>Your blood pressure readings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[60, 140]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight & BMI Progress</CardTitle>
              <CardDescription>Track your weight loss/gain journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    name="Weight (kg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Patterns</CardTitle>
              <CardDescription>Your sleep duration and quality over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8b5cf6" name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exercise & Activity</CardTitle>
              <CardDescription>Your daily steps and exercise metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={exerciseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#3b82f6" name="Steps" />
                  <Bar dataKey="calories" fill="#10b981" name="Calories" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Blood Sugar Tracking (for diabetics) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Blood Sugar Levels
          </CardTitle>
          <CardDescription>Track glucose levels throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Fasting</p>
                  <p className="text-2xl font-bold text-green-800">95 mg/dL</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Normal</Badge>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Post-meal</p>
                  <p className="text-2xl font-bold text-blue-800">140 mg/dL</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">HbA1c</p>
                  <p className="text-2xl font-bold text-purple-800">6.2%</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Good</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
