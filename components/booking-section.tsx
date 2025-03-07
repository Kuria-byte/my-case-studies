"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, Check, Clock, Coffee, MessageSquare, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BookingSection() {
  const { theme } = useTheme()
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [bookingType, setBookingType] = useState<string>("consultation")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
        setDate(undefined)
        setTimeSlot("")
        setName("")
        setEmail("")
        setMessage("")
      }, 3000)
    }, 1500)
  }

  const isFormValid = date && timeSlot && name && email

  return (
    <Card className="overflow-hidden border-border">
      <CardHeader>
        <CardTitle>Book a Session</CardTitle>
        <CardDescription>Schedule a free consultation or interview with me</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consultation" onValueChange={(value) => setBookingType(value)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="consultation" className="relative overflow-hidden group">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span>Free Consultation</span>
              </div>
              <motion.div
                className="absolute inset-0 bg-primary/10 -z-10"
                initial={{ x: "-100%" }}
                animate={{
                  x: bookingType === "consultation" ? 0 : "-100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </TabsTrigger>
            <TabsTrigger value="interview" className="relative overflow-hidden group">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Interview Request</span>
              </div>
              <motion.div
                className="absolute inset-0 bg-primary/10 -z-10"
                initial={{ x: "100%" }}
                animate={{
                  x: bookingType === "interview" ? 0 : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultation">
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-medium">Book a Free Consultation</h3>
              <p className="text-sm text-muted-foreground">
                Let's discuss your UX challenges and how I can help improve your product experience.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="interview">
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-medium">Request an Interview</h3>
              <p className="text-sm text-muted-foreground">
                Interested in featuring my work or discussing UX trends? Let's schedule an interview.
              </p>
            </div>
          </TabsContent>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <div key={slot}>
                      <RadioGroupItem value={slot} id={`time-${slot}`} className="peer sr-only" />
                      <Label
                        htmlFor={`time-${slot}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
                      >
                        <Clock className="mb-1 h-4 w-4" />
                        <span className="text-xs">{slot}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me a bit about what you'd like to discuss"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
            </motion.div>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          {bookingType === "consultation"
            ? "Free 30-minute consultation"
            : "Interview requests are subject to availability"}
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button disabled={!isFormValid} className="relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                {bookingType === "consultation" ? "Book Consultation" : "Request Interview"}
                <CalendarIcon className="h-4 w-4" />
              </span>
              <motion.div
                className="absolute inset-0 bg-primary/20 -z-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isSuccess
                  ? "Booking Confirmed!"
                  : bookingType === "consultation"
                    ? "Confirm Consultation"
                    : "Confirm Interview Request"}
              </DialogTitle>
              <DialogDescription>
                {isSuccess
                  ? "You'll receive a confirmation email shortly with all the details."
                  : "Please review your booking details before confirming."}
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">All Set!</h3>
                  <p className="text-center text-muted-foreground">
                    Your {bookingType === "consultation" ? "consultation" : "interview request"} has been scheduled for{" "}
                    {date && format(date, "PPP")} at {timeSlot}.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <div className="col-span-3 font-medium">{name}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <div className="col-span-3 font-medium">{date && format(date, "PPP")}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Time
                      </Label>
                      <div className="col-span-3 font-medium">{timeSlot}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <div className="col-span-3 font-medium capitalize">{bookingType}</div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} className="gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

