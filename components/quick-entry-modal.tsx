import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
          <div>
            <label className="block text-sm font-medium mb-1">Steps</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={steps}
              onChange={e => setSteps(e.target.value)}
              placeholder="Enter steps"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="Enter weight"
              min={0}
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heart Rate (BPM)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
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
