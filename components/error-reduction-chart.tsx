"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "@/components/theme-provider"

const errorData = [
  { name: "Before", value: 24, label: "24%" },
  { name: "After", value: 2, label: "2%" },
]

export function ErrorReductionChart() {
  const { theme } = useTheme()

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          value: {
            label: "Error Rate (%)",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={errorData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }} barGap={40}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"} vertical={false} />
            <XAxis
              dataKey="name"
              stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
              tickLine={false}
              axisLine={false}
              domain={[0, 25]}
              ticks={[0, 5, 10, 15, 20, 25]}
              dx={-10}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: theme === "dark" ? "#ffffff10" : "#00000010" }}
            />
            <Bar
              dataKey="value"
              maxBarSize={80}
              label={{
                position: "top",
                fill: theme === "dark" ? "#ffffff80" : "#71717a",
                fontSize: 12,
                dy: -10,
                formatter: (value) => `${value}%`,
              }}
            >
              {errorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#EF476F" : "#06D6A0"} radius={[4, 4, 0, 0]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

