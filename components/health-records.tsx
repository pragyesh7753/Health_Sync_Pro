"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, Search, Eye, Trash2, Plus, Shield, Calendar, Activity, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface MedicalDocument {
  id: number
  name: string
  type: string
  date: string
  doctor: string
  size: string
  category: string
}

interface Vaccination {
  vaccine: string
  date: string
  nextDue: string
  status: string
}

const medicalDocuments: MedicalDocument[] = [
  {
    id: 1,
    name: "Blood Test Results - January 2024",
    type: "Lab Results",
    date: "2024-01-15",
    doctor: "Dr. Michael Chen",
    size: "2.3 MB",
    category: "lab",
  },
  {
    id: 2,
    name: "Chest X-Ray Report",
    type: "Imaging",
    date: "2024-01-10",
    doctor: "Dr. Sarah Johnson",
    size: "5.1 MB",
    category: "imaging",
  },
  {
    id: 3,
    name: "Prescription - Lisinopril",
    type: "Prescription",
    date: "2024-01-08",
    doctor: "Dr. Sarah Johnson",
    size: "0.8 MB",
    category: "prescription",
  },
  {
    id: 4,
    name: "Annual Physical Exam Report",
    type: "Medical Report",
    date: "2024-01-05",
    doctor: "Dr. Michael Chen",
    size: "1.5 MB",
    category: "report",
  },
]

const labResults = [
  {
    test: "Complete Blood Count",
    date: "2024-01-15",
    results: [
      { parameter: "White Blood Cells", value: "7.2", unit: "K/uL", range: "4.0-11.0", status: "normal" },
      { parameter: "Red Blood Cells", value: "4.8", unit: "M/uL", range: "4.2-5.4", status: "normal" },
      { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", range: "12.0-16.0", status: "normal" },
      { parameter: "Platelets", value: "285", unit: "K/uL", range: "150-450", status: "normal" },
    ],
  },
  {
    test: "Lipid Panel",
    date: "2024-01-15",
    results: [
      { parameter: "Total Cholesterol", value: "185", unit: "mg/dL", range: "<200", status: "normal" },
      { parameter: "LDL Cholesterol", value: "110", unit: "mg/dL", range: "<100", status: "high" },
      { parameter: "HDL Cholesterol", value: "55", unit: "mg/dL", range: ">40", status: "normal" },
      { parameter: "Triglycerides", value: "95", unit: "mg/dL", range: "<150", status: "normal" },
    ],
  },
]

const vaccinations: Vaccination[] = [
  {
    vaccine: "COVID-19 (Pfizer)",
    date: "2023-10-15",
    nextDue: "2024-10-15",
    status: "current",
  },
  {
    vaccine: "Influenza",
    date: "2023-09-20",
    nextDue: "2024-09-20",
    status: "current",
  },
  {
    vaccine: "Tetanus/Diphtheria",
    date: "2021-03-10",
    nextDue: "2031-03-10",
    status: "current",
  },
  {
    vaccine: "Hepatitis B",
    date: "2020-05-15",
    nextDue: "Lifetime",
    status: "current",
  },
]

const insuranceInfo = {
  provider: "Blue Cross Blue Shield",
  policyNumber: "BCBS123456789",
  groupNumber: "GRP001",
  memberID: "MB987654321",
  effectiveDate: "2024-01-01",
  expirationDate: "2024-12-31",
  copay: "₹25",
  deductible: "₹1,500",
  outOfPocketMax: "₹6,000",
}

export function HealthRecords() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [documents, setDocuments] = useState<MedicalDocument[]>(medicalDocuments)
  const [vaccineList, setVaccineList] = useState<Vaccination[]>(vaccinations)
  const [isAddingVaccine, setIsAddingVaccine] = useState(false)
  const [isUpdatingInsurance, setIsUpdatingInsurance] = useState(false)
  const [isViewingDoc, setIsViewingDoc] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Handler functions
  const handleUploadDocument = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDoc: MedicalDocument = {
      id: documents.length + 1,
      name: (formData.get('docName') as string) || 'Untitled Document',
      type: (formData.get('docType') as string) || 'Medical Report',
      date: new Date().toISOString().split('T')[0],
      doctor: (formData.get('doctor') as string) || 'Unknown',
      size: '1.0 MB',
      category: (formData.get('docType') as string) || 'report',
    }
    setDocuments([...documents, newDoc])
    setIsUploading(false)
    toast({
      title: "Document Uploaded",
      description: "Your medical document has been uploaded successfully.",
    })
  }

  const handleViewDocument = (doc: MedicalDocument) => {
    setSelectedDoc(doc)
    setIsViewingDoc(true)
  }

  const handleDownloadDocument = (doc: MedicalDocument) => {
    // Simulate download
    const link = document.createElement('a')
    link.href = `data:text/plain;charset=utf-8,Document: ${doc.name}\nType: ${doc.type}\nDoctor: ${doc.doctor}\nDate: ${doc.date}`
    link.download = `${doc.name}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({
      title: "Download Started",
      description: `${doc.name} is being downloaded.`,
    })
  }

  const handleDeleteDocument = (docId: number) => {
    setDocuments(documents.filter(doc => doc.id !== docId))
    toast({
      title: "Document Deleted",
      description: "The document has been removed from your records.",
      variant: "destructive",
    })
  }

  const handleAddVaccination = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newVaccine: Vaccination = {
      vaccine: (formData.get('vaccineName') as string) || '',
      date: (formData.get('vaccineDate') as string) || '',
      nextDue: (formData.get('nextDue') as string) || 'To be determined',
      status: 'current',
    }
    setVaccineList([...vaccineList, newVaccine])
    setIsAddingVaccine(false)
    toast({
      title: "Vaccination Added",
      description: "Your vaccination record has been added successfully.",
    })
  }

  const handleDownloadInsuranceCard = () => {
    const cardInfo = `
Insurance Card
Provider: ${insuranceInfo.provider}
Policy Number: ${insuranceInfo.policyNumber}
Member ID: ${insuranceInfo.memberID}
Group Number: ${insuranceInfo.groupNumber}
Coverage: ${insuranceInfo.effectiveDate} - ${insuranceInfo.expirationDate}
    `
    const link = document.createElement('a')
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(cardInfo)}`
    link.download = 'insurance-card.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({
      title: "Insurance Card Downloaded",
      description: "Your insurance card has been downloaded successfully.",
    })
  }

  const handleUpdateInsurance = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would update the insurance info
    setIsUpdatingInsurance(false)
    toast({
      title: "Insurance Updated",
      description: "Your insurance information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600">Securely store and manage your medical documents</p>
        </div>
        <Dialog open={isUploading} onOpenChange={setIsUploading}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Medical Document</DialogTitle>
              <DialogDescription>Add a new document to your health records</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUploadDocument}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="docName">Document Name</Label>
                  <Input id="docName" name="docName" placeholder="e.g., Blood Test Results" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docType">Document Type</Label>
                  <select name="docType" className="w-full p-2 border rounded-md" required>
                    <option value="">Select type</option>
                    <option value="lab">Lab Results</option>
                    <option value="imaging">Imaging</option>
                    <option value="prescription">Prescription</option>
                    <option value="report">Medical Report</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor/Provider</Label>
                  <Input id="doctor" name="doctor" placeholder="e.g., Dr. Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File Upload</Label>
                  <Input id="file" name="file" type="file" accept=".pdf,.jpg,.png,.doc,.docx" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Upload Document
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-800">Data Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700">
            Your health records are encrypted and stored securely. Only you have access to your personal medical
            information. All documents are backed up and comply with HIPAA privacy regulations.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="documents" className="text-xs sm:text-sm px-2 py-2">Documents</TabsTrigger>
          <TabsTrigger value="lab-results" className="text-xs sm:text-sm px-2 py-2">Lab Results</TabsTrigger>
          <TabsTrigger value="vaccinations" className="text-xs sm:text-sm px-2 py-2">Vaccinations</TabsTrigger>
          <TabsTrigger value="insurance" className="text-xs sm:text-sm px-2 py-2">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  className="px-3 py-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="lab">Lab Results</option>
                  <option value="imaging">Imaging</option>
                  <option value="prescription">Prescriptions</option>
                  <option value="report">Medical Reports</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Document List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Medical Documents
              </CardTitle>
              <CardDescription>Your uploaded health documents and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{doc.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.doctor}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Document</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{doc.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Laboratory Results
              </CardTitle>
              <CardDescription>Your recent lab test results and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {labResults.map((lab, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{lab.test}</h3>
                      <Badge variant="outline">{lab.date}</Badge>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[500px]">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-1">Parameter</th>
                              <th className="text-left py-2 px-1">Value</th>
                              <th className="text-left py-2 px-1">Unit</th>
                              <th className="text-left py-2 px-1">Reference Range</th>
                              <th className="text-left py-2 px-1">Status</th>
                            </tr>
                          </thead>
                        <tbody>
                          {lab.results.map((result, resultIndex) => (
                            <tr key={resultIndex} className="border-b">
                              <td className="py-2 px-1">{result.parameter}</td>
                              <td className="py-2 px-1 font-medium">{result.value}</td>
                              <td className="py-2 px-1">{result.unit}</td>
                              <td className="py-2 px-1">{result.range}</td>
                              <td className="py-2 px-1">
                                <Badge
                                  className={
                                    result.status === "normal"
                                      ? "bg-green-100 text-green-800"
                                      : result.status === "high"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {result.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Vaccination Records
              </CardTitle>
              <CardDescription>Track your immunization history and upcoming vaccines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccineList.map((vaccine, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-0"
                  >
                    <div>
                      <h3 className="font-medium">{vaccine.vaccine}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Last: {vaccine.date}</span>
                        </div>
                        <span>•</span>
                        <span>Next: {vaccine.nextDue}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{vaccine.status}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Dialog open={isAddingVaccine} onOpenChange={setIsAddingVaccine}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Vaccination Record
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Vaccination Record</DialogTitle>
                      <DialogDescription>Add a new vaccination to your records</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddVaccination}>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="vaccineName">Vaccine Name</Label>
                          <Input id="vaccineName" name="vaccineName" placeholder="e.g., COVID-19 (Pfizer)" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vaccineDate">Date Administered</Label>
                          <Input id="vaccineDate" name="vaccineDate" type="date" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nextDue">Next Due (Optional)</Label>
                          <Input id="nextDue" name="nextDue" type="date" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Add Vaccination
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Information
              </CardTitle>
              <CardDescription>Your health insurance details and coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Insurance Provider</Label>
                    <p className="text-base sm:text-lg font-semibold break-words">{insuranceInfo.provider}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Policy Number</Label>
                    <p className="font-medium text-sm sm:text-base break-all">{insuranceInfo.policyNumber}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Group Number</Label>
                    <p className="font-medium text-sm sm:text-base">{insuranceInfo.groupNumber}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Member ID</Label>
                    <p className="font-medium text-sm sm:text-base break-all">{insuranceInfo.memberID}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Coverage Period</Label>
                    <p className="font-medium text-sm sm:text-base">
                      {insuranceInfo.effectiveDate} - {insuranceInfo.expirationDate}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Copay</Label>
                    <p className="font-medium text-sm sm:text-base">{insuranceInfo.copay}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Annual Deductible</Label>
                    <p className="font-medium text-sm sm:text-base">{insuranceInfo.deductible}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Out-of-Pocket Maximum</Label>
                    <p className="font-medium text-sm sm:text-base">{insuranceInfo.outOfPocketMax}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="bg-transparent text-xs sm:text-sm" onClick={handleDownloadInsuranceCard}>
                    <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Download Insurance Card
                  </Button>
                  <Dialog open={isUpdatingInsurance} onOpenChange={setIsUpdatingInsurance}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-xs sm:text-sm">
                        <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Update Information
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Insurance Information</DialogTitle>
                        <DialogDescription>Update your health insurance details</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateInsurance}>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="provider">Insurance Provider</Label>
                            <Input id="provider" name="provider" defaultValue={insuranceInfo.provider} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="policyNumber">Policy Number</Label>
                            <Input id="policyNumber" name="policyNumber" defaultValue={insuranceInfo.policyNumber} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="memberID">Member ID</Label>
                            <Input id="memberID" name="memberID" defaultValue={insuranceInfo.memberID} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupNumber">Group Number</Label>
                            <Input id="groupNumber" name="groupNumber" defaultValue={insuranceInfo.groupNumber} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Update Information
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document View Dialog */}
      <Dialog open={isViewingDoc} onOpenChange={setIsViewingDoc}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Document Viewer</DialogTitle>
            <DialogDescription>
              {selectedDoc ? `Viewing: ${selectedDoc.name}` : 'No document selected'}
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Document Name</Label>
                    <p className="font-medium">{selectedDoc.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Type</Label>
                    <p className="font-medium">{selectedDoc.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Date</Label>
                    <p className="font-medium">{selectedDoc.date}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Doctor</Label>
                    <p className="font-medium">{selectedDoc.doctor}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">File Size</Label>
                    <p className="font-medium">{selectedDoc.size}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white border rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    Document preview would be displayed here. In a real application, this would show the actual file content.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => selectedDoc && handleDownloadDocument(selectedDoc)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={() => setIsViewingDoc(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
