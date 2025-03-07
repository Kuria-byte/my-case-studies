"use client"

import { ArrowRight, Clock, HelpCircle, Sparkles, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { EnhancedInteractiveQuiz } from "./enhanced-interactive-quiz"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface QuizCardProps {
  title: string
  description: string
  questionCount: number
  estimatedTime: string
  difficulty: string
  image: string
  color: string
  textColor: string
  category?: string
  xpPoints?: number
}

export function QuizCard({
  title,
  description,
  questionCount,
  estimatedTime,
  difficulty,
  image,
  color,
  textColor,
  category = "UX Fundamentals",
  xpPoints = 100,
}: QuizCardProps) {
  const { theme } = useTheme()
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Simulate loading progress
  useEffect(() => {
    if (isHovered && !hasStarted) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1
          }
          clearInterval(interval)
          return 100
        })
      }, 10)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isHovered, hasStarted])

  // Reset progress when not hovered
  useEffect(() => {
    if (!isHovered && !hasStarted) {
      setProgress(0)
    }
  }, [isHovered, hasStarted])

  // Sample quiz questions based on the title
  const getQuizQuestions = () => {
    if (title === "UX Research Methods") {
      return [
        {
          question: "Which research method is best for understanding user behaviors in their natural environment?",
          options: ["A/B Testing", "Contextual Inquiry", "Card Sorting", "Surveys"],
          correctAnswer: 1,
          explanation:
            "Contextual Inquiry involves observing and interviewing users in their own environment, making it ideal for understanding natural behaviors and contexts of use.",
          difficulty: "medium",
          points: 20,
        },
        {
          question: "When should you use a card sorting exercise?",
          options: [
            "To test usability",
            "To organize information architecture",
            "To measure conversion rates",
            "To create user personas",
          ],
          correctAnswer: 1,
          explanation:
            "Card sorting helps designers understand how users categorize and organize information, making it perfect for developing information architecture.",
          difficulty: "easy",
          points: 15,
        },
        {
          question: "What is the primary purpose of a usability test?",
          options: [
            "To gather demographic data",
            "To identify user pain points",
            "To evaluate how well users can complete tasks",
            "To determine market size",
          ],
          correctAnswer: 2,
          explanation:
            "Usability testing evaluates how well users can complete specific tasks with your product, identifying usability issues and areas for improvement.",
          difficulty: "easy",
          points: 15,
        },
        {
          question: "Which method is considered quantitative research?",
          options: ["Interviews", "Focus groups", "Surveys with closed-ended questions", "Contextual inquiry"],
          correctAnswer: 2,
          explanation:
            "Surveys with closed-ended questions generate numerical data that can be analyzed statistically, making them quantitative research.",
          difficulty: "medium",
          points: 20,
        },
        {
          question: "What is the benefit of conducting user interviews?",
          options: [
            "They provide statistically significant data",
            "They help understand user motivations and attitudes",
            "They're faster than surveys",
            "They eliminate all design biases",
          ],
          correctAnswer: 1,
          explanation:
            "User interviews provide rich, qualitative insights into user motivations, attitudes, and mental models that quantitative methods often miss.",
          difficulty: "hard",
          points: 30,
        },
      ]
    } else {
      // Usability Heuristics
      return [
        {
          question: "Which of Nielsen's heuristics addresses the need for clear feedback about system status?",
          options: [
            "Error prevention",
            "Visibility of system status",
            "Match between system and real world",
            "Recognition rather than recall",
          ],
          correctAnswer: 1,
          explanation:
            "Visibility of system status ensures users always know what's happening through appropriate feedback within reasonable time.",
          difficulty: "medium",
          points: 20,
        },
        {
          question: "The heuristic 'Match between system and real world' suggests that:",
          options: [
            "Systems should use technical language",
            "Interfaces should follow platform conventions",
            "Systems should speak the users' language",
            "Error messages should be precise",
          ],
          correctAnswer: 2,
          explanation:
            "This heuristic states that systems should speak the users' language with familiar words, phrases, and concepts rather than system-oriented terms.",
          difficulty: "easy",
          points: 15,
        },
        {
          question: "Which heuristic emphasizes giving users control and freedom?",
          options: [
            "User control and freedom",
            "Flexibility and efficiency of use",
            "Aesthetic and minimalist design",
            "Help and documentation",
          ],
          correctAnswer: 0,
          explanation:
            "User control and freedom addresses the need for 'emergency exits' when users make mistakes, like undo and redo functions.",
          difficulty: "medium",
          points: 20,
        },
        {
          question: "What does the 'Recognition rather than recall' heuristic suggest?",
          options: [
            "Users should memorize interface elements",
            "Minimize user memory load by making objects visible",
            "Use complex menus to organize options",
            "Require users to remember information",
          ],
          correctAnswer: 1,
          explanation:
            "This heuristic suggests minimizing the user's memory load by making elements, actions, and options visible so users don't have to remember information.",
          difficulty: "medium",
          points: 20,
        },
        {
          question: "Which heuristic focuses on preventing errors before they occur?",
          options: [
            "Help users recognize, diagnose, and recover from errors",
            "Error prevention",
            "Consistency and standards",
            "Flexibility and efficiency of use",
          ],
          correctAnswer: 1,
          explanation:
            "Error prevention focuses on eliminating error-prone conditions or checking for them and presenting users with a confirmation option before they commit to an action.",
          difficulty: "hard",
          points: 25,
        },
      ]
    }
  }

  const getDifficultyBadge = () => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
      case "easy":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200 dark:border-green-800">
            {difficulty}
          </Badge>
        )
      case "intermediate":
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200 dark:border-amber-800">
            {difficulty}
          </Badge>
        )
      case "advanced":
      case "hard":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200 dark:border-red-800">
            {difficulty}
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200 dark:border-blue-800">
            {difficulty}
          </Badge>
        )
    }
  }

  if (isQuizOpen) {
    return (
      <EnhancedInteractiveQuiz
        title={title}
        description={description}
        questions={getQuizQuestions()}
        color={color}
        textColor={textColor}
        icon={<HelpCircle className={`h-5 w-5 ${textColor}`} />}
        onClose={() => setIsQuizOpen(false)}
        category={category}
        xpPoints={xpPoints}
      />
    )
  }

  return (
    <motion.div
      className="group block"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`rounded-lg overflow-hidden border ${
          theme === "dark" ? "border-[#2A2A2A]" : "border-gray-200"
        } transition-all duration-300 hover:shadow-lg cursor-pointer relative`}
        onClick={() => {
          setHasStarted(true)
          setIsQuizOpen(true)
        }}
      >
        {/* Animated gradient border on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 ${
            theme === "dark"
              ? "bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30"
              : "bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20"
          } rounded-lg p-[1px]`}
          style={{
            background: isHovered
              ? `linear-gradient(90deg, ${color.replace("bg-", "").replace("text-", "")}40, #9333ea40, ${color
                  .replace("bg-", "")
                  .replace("text-", "")}40)`
              : "none",
          }}
        />

        <div className={`p-6 ${color} relative z-10`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-10 w-10 rounded-full bg-white/20 flex items-center justify-center relative`}>
              <HelpCircle className={`h-5 w-5 ${textColor}`} />
              {isHovered && (
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
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="bg-white/20 text-white">{category}</Badge>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Trophy className={`h-3.5 w-3.5 ${textColor}`} />
                <span className={`text-xs ${textColor}`}>{xpPoints} XP</span>
              </div>
            </div>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-white/90" : "text-gray-700"} mb-4`}>{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`h-4 w-4 ${textColor}`} />
              <span className={`text-xs ${textColor}`}>{estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              {getDifficultyBadge()}
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  theme === "dark" ? "bg-white/20 text-white" : "bg-black/10 text-black/80"
                }`}
              >
                {questionCount} Questions
              </div>
            </div>
          </div>

          {/* Progress bar that fills on hover */}
          {isHovered && !hasStarted && (
            <div className="mt-4">
              <Progress
                value={progress}
                className="h-1"
                indicatorClassName={color.includes("bg-") ? color : "bg-primary"}
              />
            </div>
          )}
        </div>
        <div className={`p-4 ${theme === "dark" ? "bg-[#0F0F0F]" : "bg-white"} relative z-10`}>
          <Button
            className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-md transition-all duration-300`}
          >
            <span className="flex items-center gap-2">
              {isHovered ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  Start Challenge
                </>
              ) : (
                <>
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

