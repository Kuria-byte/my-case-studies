"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  Clock,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Star,
  Timer,
  Trophy,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface EnhancedQuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

interface EnhancedQuizProps {
  title: string
  description: string
  questions: EnhancedQuizQuestion[]
  color: string
  textColor: string
  icon: React.ReactNode
  onClose: () => void
  category: string
  xpPoints: number
}

export function EnhancedInteractiveQuiz({
  title,
  description,
  questions,
  color,
  textColor,
  icon,
  onClose,
  category,
  xpPoints,
}: EnhancedQuizProps) {
  const { theme } = useTheme()
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [streakCount, setStreakCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [showHint, setShowHint] = useState(false)
  const [achievements, setAchievements] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  // Timer for each question
  useEffect(() => {
    if (isStarted && !isAnswerChecked && !isCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Auto-check answer when time runs out
            if (selectedAnswer !== null) {
              handleCheckAnswer()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isStarted, isAnswerChecked, isCompleted, selectedAnswer])

  // Reset timer when moving to next question
  useEffect(() => {
    if (isStarted && !isCompleted) {
      setTimeRemaining(30)
    }
  }, [currentQuestion, isStarted, isCompleted])

  // Check for achievements
  useEffect(() => {
    const newAchievements = [...achievements]

    // Perfect score achievement
    if (isCompleted && score === questions.length && !achievements.includes("Perfect Score")) {
      newAchievements.push("Perfect Score")
      setShowConfetti(true)
    }

    // Speed demon achievement (answer correctly with more than 20 seconds left)
    if (
      isAnswerChecked &&
      selectedAnswer === questions[currentQuestion].correctAnswer &&
      timeRemaining > 20 &&
      !achievements.includes("Speed Demon")
    ) {
      newAchievements.push("Speed Demon")
    }

    // Streak achievement (3 correct answers in a row)
    if (streakCount >= 3 && !achievements.includes("On Fire")) {
      newAchievements.push("On Fire")
    }

    if (newAchievements.length > achievements.length) {
      setAchievements(newAchievements)
    }
  }, [
    isCompleted,
    score,
    questions.length,
    achievements,
    isAnswerChecked,
    selectedAnswer,
    currentQuestion,
    timeRemaining,
    streakCount,
  ])

  // Hide confetti after 3 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const handleStartQuiz = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
    setScore(0)
    setEarnedPoints(0)
    setIsCompleted(false)
    setStreakCount(0)
    setTimeRemaining(30)
    setShowHint(false)
  }

  const handleSelectAnswer = (index: number) => {
    if (isAnswerChecked) return
    setSelectedAnswer(index)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return

    setIsAnswerChecked(true)

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore((prev) => prev + 1)
      setStreakCount((prev) => prev + 1)

      // Calculate points based on time remaining and difficulty
      const timeBonus = Math.floor(timeRemaining / 5)
      const difficultyMultiplier =
        questions[currentQuestion].difficulty === "easy"
          ? 1
          : questions[currentQuestion].difficulty === "medium"
            ? 1.5
            : 2

      const questionPoints = questions[currentQuestion].points
      const totalPoints = questionPoints + timeBonus

      setEarnedPoints((prev) => prev + totalPoints)
    } else {
      setStreakCount(0)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerChecked(false)
      setShowHint(false)
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
    setEarnedPoints(0)
    setIsCompleted(false)
    setStreakCount(0)
    setTimeRemaining(30)
    setShowHint(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500"
      case "medium":
        return "text-amber-500"
      case "hard":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  const renderQuizContent = () => {
    if (!isStarted) {
      return (
        <div className="flex flex-col items-center text-center p-6">
          <div className={`h-16 w-16 rounded-full ${color} flex items-center justify-center mb-4 relative`}>
            {icon}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <div
                className="absolute inset-0 rounded-full bg-white/30 animate-ping"
                style={{ animationDuration: "3s" }}
              />
            </motion.div>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>

          <div className="bg-card/50 rounded-lg p-4 w-full mb-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-medium">Rewards</span>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {xpPoints} XP
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  Perfect Score
                </span>
                <span className="text-xs text-muted-foreground">+50 XP</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  Speed Demon
                </span>
                <span className="text-xs text-muted-foreground">+25 XP</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-red-500" />
                  3+ Streak
                </span>
                <span className="text-xs text-muted-foreground">+30 XP</span>
              </div>
            </div>
          </div>

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

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Go Back
            </Button>
            <Button onClick={handleStartQuiz} className={`${color} hover:opacity-90 text-white gap-2`}>
              Start Challenge
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }

    if (isCompleted) {
      const percentage = Math.round((score / questions.length) * 100)
      const totalPossiblePoints = questions.reduce((total, q) => total + q.points, 0)
      const performancePercentage = Math.round((earnedPoints / totalPossiblePoints) * 100)

      return (
        <div className="flex flex-col items-center text-center p-6 relative">
          {/* Confetti effect for perfect score */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <AnimatePresence>
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3", "#33FFF3"][
                        Math.floor(Math.random() * 6)
                      ],
                      top: "-20px",
                      left: `${Math.random() * 100}%`,
                    }}
                    initial={{ y: -20, opacity: 1 }}
                    animate={{
                      y: window.innerHeight,
                      opacity: 0,
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 2,
                      ease: "easeOut",
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          <div
            className={`h-20 w-20 rounded-full ${
              percentage >= 70 ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"
            } flex items-center justify-center mb-4 relative`}
          >
            {percentage >= 70 ? (
              <Check
                className={`h-10 w-10 ${
                  percentage >= 70 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                }`}
              />
            ) : (
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{percentage}%</span>
            )}

            {percentage === 100 && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            )}
          </div>

          <h3 className="text-xl font-bold mb-2">Challenge Completed!</h3>
          <p className="text-muted-foreground mb-4">
            You scored {score} out of {questions.length} and earned {earnedPoints} XP
          </p>

          <div className="w-full mb-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Correct Answers</span>
                <span>{percentage}%</span>
              </div>
              <Progress
                value={percentage}
                className="h-2"
                indicatorClassName={percentage >= 70 ? "bg-green-500" : "bg-amber-500"}
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Points Earned</span>
                <span>{performancePercentage}%</span>
              </div>
              <Progress value={performancePercentage} className="h-2" indicatorClassName="bg-primary" />
            </div>
          </div>

          {achievements.length > 0 && (
            <div className="w-full mb-6">
              <h4 className="font-medium text-sm mb-3 text-left">Achievements Unlocked:</h4>
              <div className="flex flex-wrap gap-2">
                {achievements.includes("Perfect Score") && (
                  <Badge className="bg-amber-500 text-white gap-1">
                    <Trophy className="h-3.5 w-3.5" />
                    Perfect Score
                  </Badge>
                )}
                {achievements.includes("Speed Demon") && (
                  <Badge className="bg-blue-500 text-white gap-1">
                    <Timer className="h-3.5 w-3.5" />
                    Speed Demon
                  </Badge>
                )}
                {achievements.includes("On Fire") && (
                  <Badge className="bg-red-500 text-white gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    On Fire
                  </Badge>
                )}
              </div>
            </div>
          )}

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
            <Button variant="outline" onClick={onClose}>
              Back to Quizzes
            </Button>
            <Button onClick={handleRestartQuiz} className={`${color} hover:opacity-90 text-white`}>
              Restart Challenge
            </Button>
          </div>
        </div>
      )
    }

    const currentQ = questions[currentQuestion]

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{earnedPoints} XP</span>
            </div>

            {streakCount >= 2 && (
              <Badge variant="outline" className="bg-red-500/10 text-red-500 gap-1 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" />
                {streakCount}x
              </Badge>
            )}
          </div>
        </div>

        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-1.5 mb-4" />

        <div className="flex justify-between items-center mb-2">
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5",
              currentQ.difficulty === "easy"
                ? "bg-green-500/10 text-green-500"
                : currentQ.difficulty === "medium"
                  ? "bg-amber-500/10 text-amber-500"
                  : "bg-red-500/10 text-red-500",
            )}
          >
            {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
          </Badge>

          <div className="flex items-center gap-1">
            <Timer
              className={`h-4 w-4 ${timeRemaining <= 5 ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}
            />
            <span className={`text-sm ${timeRemaining <= 5 ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
              {timeRemaining}s
            </span>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>

        <RadioGroup value={selectedAnswer?.toString()} className="space-y-3 mb-4">
          {currentQ.options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: isAnswerChecked ? 1 : 1.01 }}
              whileTap={{ scale: isAnswerChecked ? 1 : 0.99 }}
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
              {isAnswerChecked && index === currentQ.correctAnswer && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Check className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {isAnswerChecked && index === selectedAnswer && index !== currentQ.correctAnswer && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <X className="h-5 w-5 text-red-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </RadioGroup>

        {!isAnswerChecked && !showHint && (
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" className="text-primary gap-1" onClick={() => setShowHint(true)}>
              <Lightbulb className="h-4 w-4" />
              Need a hint?
            </Button>
          </div>
        )}

        {showHint && !isAnswerChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-md mb-4 bg-primary/10 border border-primary/20"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Hint</p>
                <p className="text-sm text-muted-foreground">
                  {currentQ.difficulty === "easy"
                    ? "Look for the most straightforward answer that directly addresses the question."
                    : currentQ.difficulty === "medium"
                      ? "Consider the core principles of UX design and how they apply to this scenario."
                      : "Think about edge cases and exceptions to general rules in this context."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isAnswerChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-md mb-4 ${
              selectedAnswer === currentQ.correctAnswer
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50"
            }`}
          >
            <div className="flex items-start gap-2">
              {selectedAnswer === currentQ.correctAnswer ? (
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
              ) : (
                <X className="h-4 w-4 text-red-500 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium mb-1">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <span className="flex items-center gap-2">
                      Correct!
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        +{currentQ.points} XP
                      </Badge>
                      {timeRemaining > 15 && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Time Bonus +{Math.floor(timeRemaining / 5)} XP
                        </Badge>
                      )}
                    </span>
                  ) : (
                    "Incorrect!"
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
              </div>
            </div>
          </motion.div>
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

