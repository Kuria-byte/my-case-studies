"use client"

import { ArrowRight, Clock, HelpCircle, Sparkles, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { EnhancedInteractiveQuiz } from "./enhanced-interactive-quiz"

interface BentoQuizCardProps {
  title: string
  description: string
  questionCount: number
  estimatedTime: string
  difficulty: string
  color: string
  textColor: string
  category?: string
  xpPoints?: number
  onClick?: () => void
  className?: string
  size?: "small" | "medium" | "large"
}

export function BentoQuizCard({
  title,
  description,
  questionCount,
  estimatedTime,
  difficulty,
  color,
  textColor,
  category = "UX Fundamentals",
  xpPoints = 100,
  onClick,
  className = "",
  size = "medium",
}: BentoQuizCardProps) {
  const { theme } = useTheme()
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  // Simulate loading progress
  useEffect(() => {
    if (isHovered) {
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
  }, [isHovered])

  // Reset progress when not hovered
  useEffect(() => {
    if (!isHovered) {
      setProgress(0)
    }
  }, [isHovered])

  // Sample quiz questions based on the title
  const getQuizQuestions = () => {
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
          "Usability testing primarily focuses on evaluating how effectively users can complete specific tasks with a product or interface.",
        difficulty: "easy",
        points: 15,
      },
    ]
  }

  const getDifficultyBadge = () => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
      case "easy":
        return (
          <Badge variant="outline" className="bg-[#06D6A0]/20 text-[#06D6A0] border-[#06D6A0]/30 font-medium">
            {difficulty}
          </Badge>
        )
      case "intermediate":
      case "medium":
        return (
          <Badge variant="outline" className="bg-[#118AB2]/20 text-[#118AB2] border-[#118AB2]/30 font-medium">
            {difficulty}
          </Badge>
        )
      case "advanced":
      case "hard":
        return (
          <Badge variant="outline" className="bg-[#EF476F]/20 text-[#EF476F] border-[#EF476F]/30 font-medium">
            {difficulty}
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-[#FFD166]/20 text-[#FFD166] border-[#FFD166]/30 font-medium">
            {difficulty}
          </Badge>
        )
    }
  }

  const handleQuizOpen = () => {
    setIsQuizOpen(true)
    if (onClick) onClick()
  }

  if (isQuizOpen) {
    return (
      <EnhancedInteractiveQuiz
        title={title}
        description={description}
        questions={getQuizQuestions()}
        color="bg-gradient-to-r from-[#06D6A0] to-[#118AB2]"
        textColor="text-white"
        icon={<HelpCircle className="h-5 w-5 text-white" />}
        onClose={() => setIsQuizOpen(false)}
        category={category}
        xpPoints={xpPoints}
      />
    )
  }

  return (
    <motion.div
      className={`group block h-full ${className}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`h-full rounded-xl overflow-hidden border hover-lift ${
          theme === "dark" ? "border-border/50" : "border-border/50"
        } transition-all duration-300 hover:shadow-lg cursor-pointer relative backdrop-blur-sm`}
        onClick={handleQuizOpen}
      >
        {/* Animated gradient border on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-xl p-[1.5px]`}
          style={{
            background: "linear-gradient(135deg, #06D6A0, #118AB2, #FFD166)",
            backgroundSize: "200% 200%",
            animation: "gradientShift 3s ease infinite"
          }}
        />

        <CardContent className={`p-6 relative z-10`} style={{ background: "rgba(30, 30, 30, 0.95)" }}>
          <div className="flex items-center gap-4 mb-5">
            <div 
              className={`h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden`}
              style={{
                background: "linear-gradient(135deg, rgba(6, 214, 160, 0.2), rgba(17, 138, 178, 0.2))",
                boxShadow: "0 0 20px rgba(6, 214, 160, 0.15)"
              }}
            >
              <HelpCircle className="h-6 w-6 text-white" />
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-[#06D6A0]/20 animate-ping"
                    style={{ animationDuration: "3s" }}
                  />
                </motion.div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl text-white">{title}</h3>
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge className="bg-[#118AB2]/20 text-[#118AB2] border border-[#118AB2]/30 font-medium">{category}</Badge>
                </motion.div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#06D6A0]" />
                <span className="text-sm text-gray-200">{estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#FFD166]" />
                <span className="text-sm text-gray-200">{xpPoints} XP</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 bg-black/20 py-1 px-3 rounded-full">{questionCount} Questions</span>
              {getDifficultyBadge()}
            </div>

            <motion.div
              initial={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="h-1"
            >
              <Progress 
                value={progress} 
                className="h-1.5" 
                style={{
                  background: "rgba(255,255,255,0.1)",
                  ["--progress-background" as any]: "linear-gradient(to right, #06D6A0, #118AB2)"
                }}
              />
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="p-0">
          <Button
            className="w-full rounded-none h-14 relative overflow-hidden font-medium text-base"
            style={{
              background: "linear-gradient(to right, rgba(6, 214, 160, 0.8), rgba(17, 138, 178, 0.8))",
              color: "white",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <span className="flex items-center justify-center">
              Start Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
