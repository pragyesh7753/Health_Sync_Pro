"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Phone,
  Plus,
  Edit,
  Trash2,
  Bell,
  FileText,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2024-02-15",
    time: "2:00 PM",
    location: "Heart Center, Room 301",
    phone: "+1 (555) 123-4567",
    notes: "Follow-up for blood pressure medication",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Practice",
    date: "2024-02-20",
    time: "10:30 AM",
    location: "Main Clinic, Room 105",
    phone: "+1 (555) 987-6543",
    notes: "Annual physical examination",
    status: "pending",
  },
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Endocrinology",
    date: "2024-02-25",
    time: "3:15 PM",
    location: "Diabetes Center, Room 202",
    phone: "+1 (555) 456-7890",
    notes: "Diabetes management review",
    status: "confirmed",
  },
]

const appointmentHistory = [
  {
    id: 4,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2024-01-15",
    time: "2:00 PM",
    notes: "Blood pressure stable, continue current medication",
    testResults: ["ECG - Normal", "Blood work - Pending"],
  },
  {
    id: 5,
    doctor: "Dr. Michael Chen",
    specialty: "General Practice",
    date: "2024-01-08",
    time: "9:00 AM",
    notes: "Routine checkup, all vitals normal",
    testResults: ["Blood panel - Normal", "Cholesterol - 180 mg/dL"],
  },
]

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    phone: "+1 (555) 123-4567",
    email: "s.johnson@heartcenter.com",
    location: "Heart Center",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "General Practice",
    phone: "+1 (555) 987-6543",
    email: "m.chen@mainclinic.com",
    location: "Main Clinic",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Endocrinology",
    phone: "+1 (555) 456-7890",
    email: "e.rodriguez@diabetescenter.com",
    location: "Diabetes Center",
  },
]

export function AppointmentManagement() {
  const [isBooking, setIsBooking] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [visitReason, setVisitReason] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingAppointment, setDeletingAppointment] = useState<any>(null)
  const [appointments, setAppointments] = useState(upcomingAppointments)
  const { toast } = useToast()

  const handleBellClick = (appointmentId: number) => {
    toast({
      title: "Reminder Set",
      description: `Reminder set for appointment #${appointmentId}`,
      duration: 3000,
    })
    // Here you would typically implement actual reminder functionality
  }

  const handleEditClick = (appointment: any) => {
    setEditingAppointment(appointment)
    setIsEditing(true)
  }

  const handleDeleteClick = (appointment: any) => {
    setDeletingAppointment(appointment)
    setIsDeleting(true)
  }

  const confirmDelete = () => {
    if (deletingAppointment) {
      setAppointments(
        appointments.filter((apt) => apt.id !== deletingAppointment.id)
      )
      setIsDeleting(false)
      setDeletingAppointment(null)
      toast({
        title: "Appointment Deleted",
        description: "The appointment has been successfully deleted.",
        duration: 3000,
      })
    }
  }

  const saveEdit = () => {
    if (editingAppointment) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === editingAppointment.id ? editingAppointment : apt
        )
      )
      setIsEditing(false)
      setEditingAppointment(null)
      toast({
        title: "Appointment Updated",
        description: "Your appointment has been successfully updated.",
        duration: 3000,
      })
    }
  }

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !visitReason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const selectedDoctorInfo = doctors.find(doc => doc.name === selectedDoctor)
    if (!selectedDoctorInfo) {
      toast({
        title: "Invalid Selection",
        description: "Please select a valid doctor",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const newAppointment = {
      id: appointments.length + 1,
      doctor: selectedDoctor,
      specialty: selectedDoctorInfo.specialty,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      location: selectedDoctorInfo.location,
      phone: selectedDoctorInfo.phone,
      notes: visitReason,
      status: "pending" as const,
    }

    setAppointments([...appointments, newAppointment])
    
    // Reset form
    setSelectedDoctor("")
    setSelectedDate(undefined)
    setSelectedTime("")
    setVisitReason("")
    setIsBooking(false)
    
    toast({
      title: "Appointment Booked",
      description: "Your appointment has been booked successfully!",
      duration: 3000,
    })
  }

  const handleDoctorBooking = (doctorName: string) => {
    setSelectedDoctor(doctorName)
    setIsBooking(true)
  }

  const handleSnoozeReminder = (doctorName: string) => {
    toast({
      title: "Reminder Snoozed",
      description: `Reminder for ${doctorName} has been snoozed for 1 hour.`,
      duration: 3000,
    })
  }

  const handleSetReminder = (doctorName: string) => {
    toast({
      title: "Reminder Set",
      description: `Reminder has been set for your appointment with ${doctorName}.`,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Appointment Management
          </h1>
          <p className="text-gray-600">
            Schedule and manage your medical appointments
          </p>
        </div>
        <Dialog open={isBooking} onOpenChange={setIsBooking}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>
                Schedule an appointment with your healthcare provider
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor, index) => (
                      <SelectItem key={index} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reason for Visit</Label>
                <Textarea 
                  placeholder="Brief description of your visit reason..." 
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                onClick={handleBookAppointment}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
          <CardDescription>Your scheduled medical appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-3 sm:p-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                      <Badge variant="outline">{appointment.specialty}</Badge>
                      <Badge
                        className={
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">
                          {appointment.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {appointment.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">
                          {appointment.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {appointment.phone}
                        </span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBellClick(appointment.id)}
                      title="Set Reminder"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(appointment)}
                      title="Edit Appointment"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(appointment)}
                      title="Delete Appointment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Doctor Directory
          </CardTitle>
          <CardDescription>
            Your healthcare providers and their contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor, index) => (
              <div key={index} className="border rounded-lg p-3 sm:p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      {doctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {doctor.specialty}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm truncate">
                        {doctor.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm truncate">
                        {doctor.location}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent text-xs sm:text-sm"
                    onClick={() => handleDoctorBooking(doctor.name)}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Appointment History
          </CardTitle>
          <CardDescription>Past appointments and visit notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointmentHistory.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                  <div>
                    <h3 className="font-semibold">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-600">
                      {appointment.specialty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-sm">
                      <strong>Visit Notes:</strong> {appointment.notes}
                    </p>
                  </div>

                  {appointment.testResults.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Test Results:</p>
                      <div className="space-y-1">
                        {appointment.testResults.map((result, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Appointment Reminders
          </CardTitle>
          <CardDescription>Set up notifications for your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">
                  Dr. Sarah Johnson - Tomorrow
                </p>
                <p className="text-sm text-yellow-700">
                  Cardiology appointment at 2:00 PM
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSnoozeReminder("Dr. Sarah Johnson")}
              >
                Snooze
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-blue-800">
                  Dr. Michael Chen - Friday
                </p>
                <p className="text-sm text-blue-700">
                  General Practice appointment at 10:30 AM
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleSetReminder("Dr. Michael Chen")}
              >
                Set Reminder
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Update your appointment details</DialogDescription>
          </DialogHeader>
          {editingAppointment && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Input
                  value={editingAppointment.doctor}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      doctor: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={editingAppointment.date}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  value={editingAppointment.time}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={editingAppointment.notes}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              onClick={saveEdit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
