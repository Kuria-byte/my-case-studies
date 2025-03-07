"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Clock, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  title: string
  description: string
  questions: QuizQuestion[]
  color: string
  textColor: string
  icon: React.ReactNode
}

export function InteractiveQuiz({ title, description, questions, color, textColor, icon }: QuizProps) {
  const { theme } = useTheme()
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleStartQuiz = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
    setScore(0)
    setIsCompleted(false)
  }

  const handleSelectAnswer = (index: number) => {
    if (isAnswerChecked) return
    setSelectedAnswer(index)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return

    setIsAnswerChecked(true)
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerChecked(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
    setScore(0)
    setIsCompleted(false)
  }

  const renderQuizContent = () => {
    if (!isStarted) {
      return (
        <div className="flex flex-col items-center text-center p-6">
          <div className={`h-16 w-16 rounded-full ${color} flex items-center justify-center mb-4`}>{icon}</div>
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{questions.length} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{Math.ceil(questions.length * 0.5)} min</span>
            </div>
          </div>
          <Button onClick={handleStartQuiz} className={`${color} hover:opacity-90 text-white gap-2`}>
            Start Quiz
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )
    }

    if (isCompleted) {
      const percentage = Math.round((score / questions.length) * 100)

      return (
        <div className="flex flex-col items-center text-center p-6">
          <div
            className={`h-20 w-20 rounded-full ${percentage >= 70 ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"} flex items-center justify-center mb-4`}
          >
            {percentage >= 70 ? (
              <Check
                className={`h-10 w-10 ${percentage >= 70 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
              />
            ) : (
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{percentage}%</span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-muted-foreground mb-2">
            You scored {score} out of {questions.length}
          </p>

          <div className="w-full mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Score</span>
              <span>{percentage}%</span>
            </div>
            <Progress
              value={percentage}
              className="h-2"
              indicatorClassName={percentage >= 70 ? "bg-green-500" : "bg-amber-500"}
            />
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {percentage >= 90
              ? "Excellent! You have a strong understanding of this topic."
              : percentage >= 70
                ? "Good job! You have a solid grasp of the basics."
                : percentage >= 50
                  ? "Not bad! With a bit more study, you'll master this topic."
                  : "Keep learning! This topic requires more study."}
          </p>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsStarted(false)}>
              Back to Overview
            </Button>
            <Button onClick={handleRestartQuiz} className={`${color} hover:opacity-90 text-white`}>
              Restart Quiz
            </Button>
          </div>
        </div>
      )
    }

    const currentQ = questions[currentQuestion]

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-1/2 h-2" />
        </div>

        <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>

        <RadioGroup value={selectedAnswer?.toString()} className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors ${
                isAnswerChecked && index === currentQ.correctAnswer
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : isAnswerChecked && index === selectedAnswer && index !== currentQ.correctAnswer
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : selectedAnswer === index
                      ? "border-primary"
                      : "border-border"
              }`}
              onClick={() => handleSelectAnswer(index)}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                disabled={isAnswerChecked}
                className="sr-only"
              />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-normal">
                {option}
              </Label>
              {isAnswerChecked && index === currentQ.correctAnswer && <Check className="h-5 w-5 text-green-500" />}
              {isAnswerChecked && index === selectedAnswer && index !== currentQ.correctAnswer && (
                <X className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>

        {isAnswerChecked && (
          <div
            className={`p-3 rounded-md mb-6 ${
              selectedAnswer === currentQ.correctAnswer
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50"
            }`}
          >
            <p className="text-sm font-medium mb-1">
              {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Incorrect!"}
            </p>
            <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className={`${color} hover:opacity-90 text-white`}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className={`${color} hover:opacity-90 text-white gap-2`}>
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className={`overflow-hidden border-border h-full ${!isStarted ? "cursor-pointer" : ""}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${isStarted}-${currentQuestion}-${isCompleted}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderQuizContent()}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}

