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

const initialTodaySchedule = [
  { id: 1, medication: "Lisinopril", time: "8:00 AM", taken: true },
  { id: 2, medication: "Metformin", time: "8:00 AM", taken: true },
  { id: 3, medication: "Metformin", time: "8:00 PM", taken: false },
  { id: 4, medication: "Vitamin D", time: "6:00 PM", taken: false },
]

export function MedicationManagement() {
  const [medications, setMedications] = useState(initialMedications)
  const [isAddingMedication, setIsAddingMedication] = useState(false)
  const [isEditingMedication, setIsEditingMedication] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [medicationToDelete, setMedicationToDelete] = useState<number | null>(null)
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [todaySchedule, setTodaySchedule] = useState(initialTodaySchedule)
  const [isRunningInteractionCheck, setIsRunningInteractionCheck] = useState(false)
  const [interactionCheckResult, setInteractionCheckResult] = useState<any>(null)
  const [refillReminders, setRefillReminders] = useState([
    { id: 1, medication: "Vitamin D", daysUntilRefill: 3, reminderSet: false },
    { id: 2, medication: "Lisinopril", daysUntilRefill: 8, reminderSet: false },
  ])

  const handleMarkAsTaken = (id: number) => {
    setTodaySchedule((prev) =>
      prev.map((item) => (item.id === id ? { ...item, taken: true } : item))
    )
  }

  const handleEditMedication = (medication: any) => {
    setSelectedMedication(medication)
    setIsEditingMedication(true)
  }

  const handleDeleteMedication = (id: number) => {
    setMedicationToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteMedication = () => {
    if (medicationToDelete) {
      setMedications((prev) => prev.filter((med) => med.id !== medicationToDelete))
      setIsDeleteDialogOpen(false)
      setMedicationToDelete(null)
    }
  }

  const handleSaveEdit = () => {
    if (selectedMedication) {
      setMedications((prev) =>
        prev.map((med) =>
          med.id === selectedMedication.id ? selectedMedication : med
        )
      )
      setIsEditingMedication(false)
      setSelectedMedication(null)
    }
  }

  const handleToggleReminders = (id: number) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, reminders: !med.reminders } : med
      )
    )
  }

  const handleRunInteractionCheck = async () => {
    setIsRunningInteractionCheck(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Deterministic interaction check logic based on current medications
      const currentMedNames = medications.map(med => med.name.toLowerCase())
      const hasLisinoprilAndMetformin = currentMedNames.includes('lisinopril') && currentMedNames.includes('metformin')
      
      if (hasLisinoprilAndMetformin) {
        setInteractionCheckResult({
          hasInteractions: true,
          interactions: [
            {
              medications: ["Lisinopril", "Metformin"],
              severity: "Moderate",
              description: "May increase risk of hypoglycemia when used together. Monitor blood glucose levels closely."
            }
          ]
        })
      } else {
        setInteractionCheckResult({
          hasInteractions: false,
          message: "No interactions found"
        })
      }
      
      setIsRunningInteractionCheck(false)
    }, 2000)
  }

  const handleSetReminder = (id: number) => {
    setRefillReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, reminderSet: true } : reminder
      )
    )
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

      {/* Edit Medication Dialog */}
      <Dialog open={isEditingMedication} onOpenChange={setIsEditingMedication}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Medication</DialogTitle>
            <DialogDescription>Update the medication details</DialogDescription>
          </DialogHeader>
          {selectedMedication && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editMedName">Medication Name</Label>
                <Input
                  id="editMedName"
                  value={selectedMedication.name}
                  onChange={(e) =>
                    setSelectedMedication({ ...selectedMedication, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editDosage">Dosage</Label>
                  <Input
                    id="editDosage"
                    value={selectedMedication.dosage}
                    onChange={(e) =>
                      setSelectedMedication({ ...selectedMedication, dosage: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editFrequency">Frequency</Label>
                  <Input
                    id="editFrequency"
                    value={selectedMedication.frequency}
                    onChange={(e) =>
                      setSelectedMedication({ ...selectedMedication, frequency: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editTime">Time(s)</Label>
                <Input
                  id="editTime"
                  value={selectedMedication.time}
                  onChange={(e) =>
                    setSelectedMedication({ ...selectedMedication, time: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editRemaining">Remaining</Label>
                  <Input
                    id="editRemaining"
                    type="number"
                    value={selectedMedication.remaining || ''}
                    onChange={(e) =>
                      setSelectedMedication({ 
                        ...selectedMedication, 
                        remaining: e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editTotal">Total</Label>
                  <Input
                    id="editTotal"
                    type="number"
                    value={selectedMedication.total || ''}
                    onChange={(e) =>
                      setSelectedMedication({ 
                        ...selectedMedication, 
                        total: e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editRefillDate">Refill Date</Label>
                <Input
                  id="editRefillDate"
                  type="date"
                  value={selectedMedication.refillDate}
                  onChange={(e) =>
                    setSelectedMedication({ ...selectedMedication, refillDate: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingMedication(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Medication</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this medication? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteMedication}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            {todaySchedule.map((item) => (
              <div
                key={item.id}
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
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleMarkAsTaken(item.id)}
                    >
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
                          <Switch 
                            checked={med.reminders} 
                            onCheckedChange={() => handleToggleReminders(med.id)}
                          />
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="p-2"
                      onClick={() => handleEditMedication(med)}
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="p-2"
                      onClick={() => handleDeleteMedication(med.id)}
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleRunInteractionCheck}
              disabled={isRunningInteractionCheck}
            >
              {isRunningInteractionCheck ? "Checking..." : "Run Interaction Check"}
            </Button>
            
            {interactionCheckResult && !interactionCheckResult.hasInteractions && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800 font-medium">No interactions found</p>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your current medications appear to be safe to take together.
                </p>
              </div>
            )}

            {interactionCheckResult && interactionCheckResult.hasInteractions && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <p className="text-red-800 font-medium">Potential interactions found</p>
                </div>
                <div className="space-y-3">
                  {interactionCheckResult.interactions.map((interaction: any, index: number) => (
                    <div key={index} className="p-3 bg-white rounded border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive" className="text-xs">
                          {interaction.severity}
                        </Badge>
                        <p className="text-sm font-medium">
                          {interaction.medications.join(" + ")}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700">{interaction.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-red-700 mt-3">
                  Please consult with your healthcare provider about these potential interactions.
                </p>
              </div>
            )}

            {!interactionCheckResult && !isRunningInteractionCheck && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-sm">
                  Click "Run Interaction Check" to analyze your current medications for potential interactions.
                </p>
              </div>
            )}
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
            {refillReminders.map((reminder) => (
              <div 
                key={reminder.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  reminder.daysUntilRefill <= 3 
                    ? "bg-yellow-50 border-yellow-200" 
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div>
                  <p className={`font-medium ${
                    reminder.daysUntilRefill <= 3 ? "text-yellow-800" : "text-gray-900"
                  }`}>
                    {reminder.medication}
                  </p>
                  <p className={`text-sm ${
                    reminder.daysUntilRefill <= 3 ? "text-yellow-700" : "text-gray-600"
                  }`}>
                    Refill needed in {reminder.daysUntilRefill} days
                  </p>
                </div>
                {reminder.reminderSet ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Bell className="mr-1 h-3 w-3" />
                    Reminder Set
                  </Badge>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSetReminder(reminder.id)}
                  >
                    Set Reminder
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
