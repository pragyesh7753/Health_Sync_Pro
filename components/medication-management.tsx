"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Pill, Clock, AlertTriangle, Plus, Bell, Calendar, Edit, Trash2, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    time: "8:00 AM",
    remaining: 25,
    total: 30,
    refillDate: "2024-02-15",
    sideEffects: ["Dry cough", "Dizziness"],
    reminders: true,
    taken: true,
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    time: "8:00 AM, 8:00 PM",
    remaining: 45,
    total: 60,
    refillDate: "2024-02-20",
    sideEffects: ["Nausea", "Stomach upset"],
    reminders: true,
    taken: false,
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: "1000 IU",
    frequency: "Once daily",
    time: "6:00 PM",
    remaining: 15,
    total: 90,
    refillDate: "2024-03-01",
    sideEffects: [],
    reminders: false,
    taken: true,
  },
]

const todaySchedule = [
  { medication: "Lisinopril", time: "8:00 AM", taken: true },
  { medication: "Metformin", time: "8:00 AM", taken: true },
  { medication: "Metformin", time: "8:00 PM", taken: false },
  { medication: "Vitamin D", time: "6:00 PM", taken: false },
]

export function MedicationManagement() {
  const [isAddingMedication, setIsAddingMedication] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<any>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medication Management</h1>
          <p className="text-gray-600">Track your medications, set reminders, and monitor side effects</p>
        </div>
        <Dialog open={isAddingMedication} onOpenChange={setIsAddingMedication}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription>Enter the details of your new medication</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="medName">Medication Name</Label>
                <Input id="medName" placeholder="e.g., Aspirin" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" placeholder="e.g., 100mg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once daily</SelectItem>
                      <SelectItem value="twice">Twice daily</SelectItem>
                      <SelectItem value="three">Three times daily</SelectItem>
                      <SelectItem value="four">Four times daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time(s)</Label>
                <Input id="time" placeholder="e.g., 8:00 AM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any special instructions..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Medication
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Your medication schedule for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.taken ? "bg-green-500" : "bg-gray-300"}`} />
                  <div>
                    <p className="font-medium">{item.medication}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.taken ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Taken
                    </Badge>
                  ) : (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Mark as Taken
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medication List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Current Medications
          </CardTitle>
          <CardDescription>Manage your active medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{med.name}</h3>
                      <Badge variant="outline">{med.dosage}</Badge>
                      <Badge variant="secondary">{med.frequency}</Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Schedule</p>
                        <p className="font-medium">{med.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Remaining</p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {med.remaining}/{med.total}
                          </p>
                          <Progress value={(med.remaining / med.total) * 100} className="w-16" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Refill Date</p>
                        <p className="font-medium">{med.refillDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reminders</p>
                        <div className="flex items-center gap-2">
                          <Switch checked={med.reminders} />
                          <Bell className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {med.sideEffects.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Reported Side Effects</p>
                        <div className="flex flex-wrap gap-2">
                          {med.sideEffects.map((effect, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {med.remaining <= 5 && (
                      <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-md">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <p className="text-sm text-orange-800">Low stock - refill needed soon</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drug Interaction Checker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Drug Interaction Checker
          </CardTitle>
          <CardDescription>Check for potential interactions between your medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Run Interaction Check</Button>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800 font-medium">No interactions found</p>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your current medications appear to be safe to take together.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refill Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Refill Reminders
          </CardTitle>
          <CardDescription>Upcoming prescription refills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">Vitamin D</p>
                <p className="text-sm text-yellow-700">Refill needed in 3 days</p>
              </div>
              <Button size="sm" variant="outline">
                Set Reminder
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Lisinopril</p>
                <p className="text-sm text-gray-600">Refill needed in 8 days</p>
              </div>
              <Button size="sm" variant="outline">
                Set Reminder
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
