"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function SchedulingSection() {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [isScheduled, setIsScheduled] = useState(false)

  const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

  const handleSchedule = () => {
    if (!date || !timeSlot) return
    setIsScheduled(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsScheduled(false)
      setDate(undefined)
      setTimeSlot("")
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
        <CardDescription>Book a time to discuss your UX project needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Select Date</Label>
              <div className="mt-2 rounded-md border">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  disabled={(date) =>
                    date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Select Time</Label>
              <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-2 mt-2">
                {timeSlots.map((slot) => (
                  <div key={slot}>
                    <RadioGroupItem value={slot} id={`time-${slot}`} className="peer sr-only" />
                    <Label
                      htmlFor={`time-${slot}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Clock className="mb-1 h-4 w-4" />
                      <span className="text-xs">{slot}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <motion.div className="pt-4">
              <div className="relative">
                <Button
                  className={cn("w-full gap-2 relative", isScheduled ? "bg-green-500 hover:bg-green-500" : "")}
                  disabled={!date || !timeSlot || isScheduled}
                  onClick={handleSchedule}
                >
                  {isScheduled ? (
                    <>Scheduled Successfully!</>
                  ) : (
                    <>
                      <CalendarIcon className="h-4 w-4" />
                      Schedule Meeting
                    </>
                  )}

                  <motion.div
                    className="absolute inset-0 bg-primary/20 -z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

