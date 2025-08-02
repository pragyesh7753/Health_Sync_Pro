"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bell, Clock, Pill, Plus, X, Volume2, Vibrate, Mail, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MedicationReminderModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface Medication {
    id: number
    name: string
    dosage: string
    times: string[]
    reminderEnabled: boolean
}

interface ReminderSettings {
    sound: boolean
    vibration: boolean
    email: boolean
    sms: boolean
    advanceNotice: number // minutes before
}

const defaultMedications: Medication[] = [
    { id: 1, name: "Lisinopril", dosage: "10mg", times: ["8:00 AM"], reminderEnabled: true },
    { id: 2, name: "Metformin", dosage: "500mg", times: ["12:00 PM"], reminderEnabled: true },
    { id: 3, name: "Vitamin D", dosage: "1000 IU", times: ["6:00 PM"], reminderEnabled: false },
]

export function MedicationReminderModal({ open, onOpenChange }: MedicationReminderModalProps) {
    const [medications, setMedications] = useState<Medication[]>(defaultMedications)
    const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
        sound: true,
        vibration: true,
        email: false,
        sms: false,
        advanceNotice: 15
    })
    const [activeTab, setActiveTab] = useState<'medications' | 'settings'>('medications')
    const { toast } = useToast()

    const handleMedicationToggle = (id: number) => {
        setMedications(prev =>
            prev.map(med =>
                med.id === id ? { ...med, reminderEnabled: !med.reminderEnabled } : med
            )
        )
    }

    const handleTimeChange = (medId: number, timeIndex: number, newTime: string) => {
        setMedications(prev =>
            prev.map(med =>
                med.id === medId
                    ? {
                        ...med,
                        times: med.times.map((time, index) =>
                            index === timeIndex ? newTime : time
                        )
                    }
                    : med
            )
        )
    }

    const addTimeSlot = (medId: number) => {
        setMedications(prev =>
            prev.map(med =>
                med.id === medId
                    ? { ...med, times: [...med.times, "12:00 PM"] }
                    : med
            )
        )
    }

    const removeTimeSlot = (medId: number, timeIndex: number) => {
        setMedications(prev =>
            prev.map(med =>
                med.id === medId
                    ? { ...med, times: med.times.filter((_, index) => index !== timeIndex) }
                    : med
            )
        )
    }

    const handleSaveReminders = () => {
        // Here you would typically save to a backend or local storage
        const enabledMedications = medications.filter(med => med.reminderEnabled)
        console.log("Saving medication reminders:", {
            medications: enabledMedications,
            settings: reminderSettings
        })

        // Show success toast notification
        toast({
            title: "✅ Reminders Set Successfully!",
            description: `Reminders configured for ${enabledMedications.length} medication${enabledMedications.length !== 1 ? 's' : ''}. You'll receive notifications based on your settings.`,
            duration: 5000,
        })
        
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-purple-600" />
                        Set Medication Reminders
                    </DialogTitle>
                    <DialogDescription>
                        Configure reminders for your medications to help you stay on track with your treatment plan.
                    </DialogDescription>
                </DialogHeader>

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('medications')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'medications'
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Pill className="h-4 w-4 inline mr-2" />
                        Medications
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'settings'
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Bell className="h-4 w-4 inline mr-2" />
                        Settings
                    </button>
                </div>

                <div className="space-y-4">
                    {activeTab === 'medications' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Your Medications</h3>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                    {medications.filter(med => med.reminderEnabled).length} active
                                </Badge>
                            </div>

                            {medications.map((medication) => (
                                <Card key={medication.id} className={`transition-all duration-200 ${medication.reminderEnabled
                                    ? 'ring-2 ring-purple-200 bg-purple-50/50'
                                    : 'bg-gray-50/50'
                                    }`}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <Switch
                                                        checked={medication.reminderEnabled}
                                                        onCheckedChange={() => handleMedicationToggle(medication.id)}
                                                        className="data-[state=checked]:bg-purple-600"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                                                        <p className="text-sm text-gray-600">{medication.dosage}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {medication.reminderEnabled && (
                                            <div className="space-y-3 mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Clock className="h-4 w-4 text-purple-600" />
                                                    <Label className="text-sm font-medium">Reminder Times</Label>
                                                </div>

                                                {medication.times.map((time, timeIndex) => (
                                                    <div key={timeIndex} className="flex items-center gap-2">
                                                        <Input
                                                            type="time"
                                                            value={time.includes('AM') || time.includes('PM')
                                                                ? convertTo24Hour(time)
                                                                : time}
                                                            onChange={(e) => handleTimeChange(medication.id, timeIndex, e.target.value)}
                                                            className="w-32"
                                                        />
                                                        {medication.times.length > 1 && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => removeTimeSlot(medication.id, timeIndex)}
                                                                className="p-2 hover:bg-red-50 hover:border-red-300"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => addTimeSlot(medication.id)}
                                                    className="mt-2 hover:bg-purple-50 hover:border-purple-300"
                                                >
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    Add Time
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-4">Notification Methods</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Volume2 className="h-5 w-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium">Sound Alert</p>
                                                <p className="text-sm text-gray-600">Play notification sound</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={reminderSettings.sound}
                                            onCheckedChange={(checked) =>
                                                setReminderSettings(prev => ({ ...prev, sound: checked }))
                                            }
                                            className="data-[state=checked]:bg-purple-700"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Vibrate className="h-5 w-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium">Vibration</p>
                                                <p className="text-sm text-gray-600">Vibrate device</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={reminderSettings.vibration}
                                            onCheckedChange={(checked) =>
                                                setReminderSettings(prev => ({ ...prev, vibration: checked }))
                                            }
                                            className="data-[state=checked]:bg-purple-700"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-sm text-gray-600">Send email reminders</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={reminderSettings.email}
                                            onCheckedChange={(checked) =>
                                                setReminderSettings(prev => ({ ...prev, email: checked }))
                                            }
                                            className="data-[state=checked]:bg-purple-700"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="h-5 w-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium">SMS Notifications</p>
                                                <p className="text-sm text-gray-600">Send text message reminders</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={reminderSettings.sms}
                                            onCheckedChange={(checked) =>
                                                setReminderSettings(prev => ({ ...prev, sms: checked }))
                                            }
                                            className="data-[state=checked]:bg-purple-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-medium mb-4">Timing Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="advance-notice" className="text-sm font-medium">
                                            Advance Notice
                                        </Label>
                                        <p className="text-sm text-gray-600 mb-2">
                                            How many minutes before medication time to send reminder
                                        </p>
                                        <Select
                                            value={reminderSettings.advanceNotice.toString()}
                                            onValueChange={(value) =>
                                                setReminderSettings(prev => ({ ...prev, advanceNotice: parseInt(value) }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">At medication time</SelectItem>
                                                <SelectItem value="5">5 minutes before</SelectItem>
                                                <SelectItem value="10">10 minutes before</SelectItem>
                                                <SelectItem value="15">15 minutes before</SelectItem>
                                                <SelectItem value="30">30 minutes before</SelectItem>
                                                <SelectItem value="60">1 hour before</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveReminders}
                        className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                        disabled={medications.filter(med => med.reminderEnabled).length === 0}
                    >
                        <Bell className="mr-2 h-4 w-4" />
                        Save Reminders
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Helper function to convert 12-hour to 24-hour format
function convertTo24Hour(time12h: string): string {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    if (hours === '12') {
        hours = '00'
    }
    if (modifier === 'PM') {
        hours = (parseInt(hours, 10) + 12).toString()
    }
    return `${hours.padStart(2, '0')}:${minutes}`
}
