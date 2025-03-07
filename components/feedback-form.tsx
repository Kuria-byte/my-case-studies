"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, MessageSquare, Send, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react"

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [showAiSuggestion, setShowAiSuggestion] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback || !rating) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setFeedback("")
        setRating(null)
        setIsSubmitted(false)
      }, 3000)
    }, 1000)
  }

  const handleAiSuggest = () => {
    setShowAiSuggestion(true)

    // Simulate AI generating a suggestion
    setTimeout(() => {
      const suggestions = [
        "I found the user flow to be intuitive, but I think the checkout process could be streamlined by reducing the number of steps.",
        "The design is visually appealing, but I had some difficulty understanding how to navigate between different sections.",
        "Great work on the accessibility features! The high contrast mode and keyboard navigation made it easy to use.",
        "The mobile responsiveness is excellent, though I'd suggest making the tap targets slightly larger for better usability.",
      ]

      setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
    }, 1500)
  }

  const handleUseSuggestion = () => {
    setFeedback(aiSuggestion)
    setShowAiSuggestion(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Project Feedback
        </CardTitle>
        <CardDescription>Share your thoughts on this UX case study</CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <motion.div
            className="flex flex-col items-center justify-center py-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Thank you for your feedback!</h3>
            <p className="text-muted-foreground">Your insights help improve future case studies.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  {!showAiSuggestion && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs"
                      onClick={handleAiSuggest}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Suggest
                    </Button>
                  )}
                </div>

                {showAiSuggestion && (
                  <motion.div
                    className="mb-3 p-3 bg-primary/10 rounded-lg border border-primary/20 relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">AI Suggestion</p>
                        <p className="text-sm">
                          {aiSuggestion || (
                            <span className="flex items-center gap-2">
                              <span className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse" />
                              <span
                                className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              />
                              <span
                                className="inline-block h-2 w-2 bg-primary rounded-full animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              />
                              Generating suggestion...
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {aiSuggestion && (
                      <div className="flex justify-end gap-2 mt-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => setShowAiSuggestion(false)}>
                          Dismiss
                        </Button>
                        <Button type="button" variant="default" size="sm" onClick={handleUseSuggestion}>
                          Use Suggestion
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}

                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts on this case study..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label className="mb-2 block">How would you rate this case study?</Label>
                <RadioGroup value={rating || ""} onValueChange={setRating} className="flex space-x-4">
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="positive" id="positive" className="sr-only peer" />
                    <Label
                      htmlFor="positive"
                      className="cursor-pointer h-12 w-12 rounded-full flex items-center justify-center border-2 border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:text-green-500 peer-data-[state=checked]:bg-green-50 dark:peer-data-[state=checked]:bg-green-950/20"
                    >
                      <ThumbsUp className="h-6 w-6" />
                    </Label>
                    <span className="text-xs">Positive</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="negative" id="negative" className="sr-only peer" />
                    <Label
                      htmlFor="negative"
                      className="cursor-pointer h-12 w-12 rounded-full flex items-center justify-center border-2 border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:text-red-500 peer-data-[state=checked]:bg-red-50 dark:peer-data-[state=checked]:bg-red-950/20"
                    >
                      <ThumbsDown className="h-6 w-6" />
                    </Label>
                    <span className="text-xs">Negative</span>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </form>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter>
          <Button className="w-full gap-2" disabled={!feedback || !rating || isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Feedback
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

