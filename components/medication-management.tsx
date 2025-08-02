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

const initialMedications = [
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
  const [medications, setMedications] = useState(initialMedications)
  const [todayScheduleState, setTodayScheduleState] = useState(todaySchedule)
  const [isAddingMedication, setIsAddingMedication] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [isEditingMedication, setIsEditingMedication] = useState(false)
  const [refillReminders, setRefillReminders] = useState<{ [key: string]: boolean }>({})
  
  // Form state for adding new medication
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    notes: "",
    total: 30, // default
    remaining: 30, // default
  })

  // Mark medication as taken in today's schedule
  const markAsTaken = (index: number) => {
    const updatedSchedule = [...todayScheduleState]
    updatedSchedule[index].taken = true
    setTodayScheduleState(updatedSchedule)
  }

  // Toggle reminder for a medication
  const toggleReminder = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, reminders: !med.reminders } : med
    ))
  }

  // Delete medication
  const deleteMedication = (id: number) => {
    if (confirm("Are you sure you want to delete this medication?")) {
      setMedications(medications.filter(med => med.id !== id))
    }
  }

  // Edit medication (placeholder for now)
  const editMedication = (medication: any) => {
    setSelectedMedication(medication)
    setNewMedication({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      time: medication.time.includes('AM') || medication.time.includes('PM') 
        ? convertTo24Hour(medication.time) 
        : medication.time,
      notes: "",
      total: medication.total,
      remaining: medication.remaining,
    })
    setIsEditingMedication(true)
  }

  // Convert 12-hour time to 24-hour for editing
  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12'
    } else if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString()
    }
    return `${hours.padStart(2, '0')}:${minutes}`
  }

  // Set reminder (placeholder functionality)
  const setRefillReminder = (medicationName: string) => {
    setRefillReminders(prev => ({
      ...prev,
      [medicationName]: true
    }))
  }

  const handleAddMedication = () => {
    console.log("handleAddMedication called", { newMedication, isEditingMedication })
    
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency || !newMedication.time) {
      alert("Please fill in all required fields")
      return
    }

    const today = new Date()
    const refillDate = new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0]

    // Convert 24-hour time to 12-hour format with AM/PM
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      return `${displayHour}:${minutes} ${ampm}`
    }

    if (isEditingMedication && selectedMedication) {
      // Update existing medication
      setMedications(medications.map(med => 
        med.id === selectedMedication.id 
          ? {
              ...med,
              name: newMedication.name,
              dosage: newMedication.dosage,
              frequency: newMedication.frequency,
              time: formatTime(newMedication.time),
              total: newMedication.total,
              remaining: newMedication.remaining,
            }
          : med
      ))
      setIsEditingMedication(false)
      setSelectedMedication(null)
    } else {
      // Add new medication
      const medication = {
        id: Math.max(...medications.map(m => m.id), 0) + 1,
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency,
        time: formatTime(newMedication.time),
        remaining: newMedication.remaining,
        total: newMedication.total,
        refillDate: refillDate,
        sideEffects: [],
        reminders: true,
        taken: false,
      }
      setMedications([...medications, medication])
    }
    
    // Reset form
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      time: "",
      notes: "",
      total: 30,
      remaining: 30,
    })
    
    setIsAddingMedication(false)
    setIsEditingMedication(false)
    setSelectedMedication(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Medication Management</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track your medications, set reminders, and monitor side effects
          </p>
        </div>
        <Dialog open={isAddingMedication || isEditingMedication} onOpenChange={(open) => {
          if (!open) {
            setIsAddingMedication(false)
            setIsEditingMedication(false)
            setSelectedMedication(null)
            setNewMedication({
              name: "",
              dosage: "",
              frequency: "",
              time: "",
              notes: "",
              total: 30,
              remaining: 30,
            })
          }
        }}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAddingMedication(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditingMedication ? 'Edit Medication' : 'Add New Medication'}</DialogTitle>
              <DialogDescription>
                {isEditingMedication ? 'Update the details of your medication' : 'Enter the details of your new medication'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="medName">Medication Name *</Label>
                <Input 
                  id="medName" 
                  placeholder="e.g., Aspirin" 
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage *</Label>
                  <Input 
                    id="dosage" 
                    placeholder="e.g., 100mg" 
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency *</Label>
                  <Select value={newMedication.frequency} onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">Once daily</SelectItem>
                      <SelectItem value="Twice daily">Twice daily</SelectItem>
                      <SelectItem value="Three times daily">Three times daily</SelectItem>
                      <SelectItem value="Four times daily">Four times daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time(s) *</Label>
                  <Input 
                    id="time" 
                    type="time"
                    value={newMedication.time}
                    onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total">Total Pills</Label>
                  <Input 
                    id="total" 
                    type="number"
                    placeholder="30" 
                    value={newMedication.total}
                    onChange={(e) => {
                      const total = parseInt(e.target.value) || 30
                      setNewMedication({...newMedication, total, remaining: total})
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any special instructions..." 
                  value={newMedication.notes}
                  onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddingMedication(false)
                setIsEditingMedication(false)
                setSelectedMedication(null)
                setNewMedication({
                  name: "",
                  dosage: "",
                  frequency: "",
                  time: "",
                  notes: "",
                  total: 30,
                  remaining: 30,
                })
              }}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" onClick={handleAddMedication}>
                {isEditingMedication ? 'Update Medication' : 'Add Medication'}
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
            Today&apos;s Schedule
          </CardTitle>
          <CardDescription>Your medication schedule for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayScheduleState.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg border gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-3 h-3 rounded-full ${item.taken ? "bg-green-500" : "bg-gray-300"}`} />
                  <div>
                    <p className="font-medium">{item.medication}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {item.taken ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Taken
                    </Badge>
                  ) : (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => markAsTaken(index)}>
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
              <div key={med.id} className="border rounded-lg p-3 sm:p-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold">{med.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {med.dosage}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {med.frequency}
                      </Badge>
                    </div>

                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
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
                          <Switch checked={med.reminders} onCheckedChange={() => toggleReminder(med.id)} />
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

                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" className="p-2" onClick={() => editMedication(med)}>
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2" onClick={() => deleteMedication(med.id)}>
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
              {refillReminders["Vitamin D"] ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Reminder Set
                </Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setRefillReminder("Vitamin D")}>
                  Set Reminder
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Lisinopril</p>
                <p className="text-sm text-gray-600">Refill needed in 8 days</p>
              </div>
              {refillReminders["Lisinopril"] ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Reminder Set
                </Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setRefillReminder("Lisinopril")}>
                  Set Reminder
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
