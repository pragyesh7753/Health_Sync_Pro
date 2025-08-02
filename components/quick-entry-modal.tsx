import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuickEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickEntryModal({ open, onOpenChange }: QuickEntryModalProps) {
  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onOpenChange(false);
      setSteps("");
      setWeight("");
      setHeartRate("");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Health Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="steps" className="text-sm font-medium">Steps</Label>
            <Input
              id="steps"
              type="number"
              value={steps}
              onChange={e => setSteps(e.target.value)}
              placeholder="Enter steps"
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="Enter weight"
              min={0}
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heartRate" className="text-sm font-medium">Heart Rate (BPM)</Label>
            <Input
              id="heartRate"
              type="number"
              value={heartRate}
              onChange={e => setHeartRate(e.target.value)}
              placeholder="Enter heart rate"
              min={0}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600" disabled={success}>
              {success ? "Saved!" : "Save Entry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
