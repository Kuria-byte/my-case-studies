"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { useTheme } from "@/components/theme-provider"

// Update the skills data to shorter text that will fit better
const skillsData = [
  { subject: "UX Research", A: 90 },
  { subject: "UI Design", A: 85 },
  { subject: "Prototyping", A: 95 },
  { subject: "Testing", A: 80 },
  { subject: "IA", A: 75 },
  { subject: "Design Systems", A: 85 },
]

export function SkillsRadar() {
  const { theme } = useTheme()

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {/* Update the RadarChart to better handle text */}
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
          <PolarGrid stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: theme === "dark" ? "#ffffff80" : "#71717a",
              fontSize: 10,
            }}
            cy={10}
            tickSize={4}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{
              fill: theme === "dark" ? "#ffffff50" : "#a1a1aa",
              fontSize: 9,
            }}
            axisLine={false}
          />
          <Radar name="Skills" dataKey="A" stroke="#FFD166" fill="#FFD166" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

