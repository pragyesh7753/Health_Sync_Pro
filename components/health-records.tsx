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

const medicalDocuments = [
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

const vaccinations = [
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
  copay: "$25",
  deductible: "$1,500",
  outOfPocketMax: "$6,000",
}

export function HealthRecords() {
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredDocuments = medicalDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="docName">Document Name</Label>
                <Input id="docName" placeholder="e.g., Blood Test Results" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="docType">Document Type</Label>
                <select className="w-full p-2 border rounded-md">
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
                <Input id="doctor" placeholder="e.g., Dr. Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File Upload</Label>
                <Input id="file" type="file" accept=".pdf,.jpg,.png,.doc,.docx" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Upload Document
              </Button>
            </DialogFooter>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
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
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
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
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Parameter</th>
                            <th className="text-left py-2">Value</th>
                            <th className="text-left py-2">Unit</th>
                            <th className="text-left py-2">Reference Range</th>
                            <th className="text-left py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lab.results.map((result, resultIndex) => (
                            <tr key={resultIndex} className="border-b">
                              <td className="py-2">{result.parameter}</td>
                              <td className="py-2 font-medium">{result.value}</td>
                              <td className="py-2">{result.unit}</td>
                              <td className="py-2">{result.range}</td>
                              <td className="py-2">
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
                {vaccinations.map((vaccine, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
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
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vaccination Record
                </Button>
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
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Insurance Provider</Label>
                    <p className="text-lg font-semibold">{insuranceInfo.provider}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Policy Number</Label>
                    <p className="font-medium">{insuranceInfo.policyNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Group Number</Label>
                    <p className="font-medium">{insuranceInfo.groupNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Member ID</Label>
                    <p className="font-medium">{insuranceInfo.memberID}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Coverage Period</Label>
                    <p className="font-medium">
                      {insuranceInfo.effectiveDate} - {insuranceInfo.expirationDate}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Copay</Label>
                    <p className="font-medium">{insuranceInfo.copay}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Annual Deductible</Label>
                    <p className="font-medium">{insuranceInfo.deductible}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Out-of-Pocket Maximum</Label>
                    <p className="font-medium">{insuranceInfo.outOfPocketMax}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="mr-4 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download Insurance Card
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Update Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
