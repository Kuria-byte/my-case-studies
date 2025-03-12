"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NdaAccessDialogProps {
  isOpen: boolean
  onClose: () => void
  caseStudySlug: string
  accessCode: string
}

export function NdaAccessDialog({
  isOpen,
  onClose,
  caseStudySlug,
  accessCode
}: NdaAccessDialogProps) {
  const router = useRouter()
  const [inputCode, setInputCode] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputCode === accessCode) {
      setSuccess(true)
      setError(false)
      
      // Store access in localStorage
      localStorage.setItem(`nda-access-${caseStudySlug}`, "granted")
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        router.push(`/dashboard/${caseStudySlug}`)
        onClose()
      }, 1500)
    } else {
      setError(true)
      setAttempts(attempts + 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            NDA Protected Content
          </DialogTitle>
          <DialogDescription>
            This case study is under a non-disclosure agreement. Please enter the access code provided to you to view this content.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              id="access-code"
              placeholder="Enter access code"
              type="password"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full"
              autoComplete="off"
            />
          </div>
          
          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {attempts >= 3 
                  ? "Multiple incorrect attempts. Please contact the administrator for assistance."
                  : "Invalid access code. Please try again."}
              </AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30 py-2">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Access granted! Redirecting you to the case study...
              </AlertDescription>
            </Alert>
          )}
          
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={success || attempts >= 5}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
