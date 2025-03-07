"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "@/components/theme-provider"
import { Info, ArrowUp, ArrowDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

const projectData = [
  { 
    name: "2020", 
    completed: 2, 
    started: 3, 
    planned: 1, 
    label: "Projects" 
  },
  { 
    name: "2021", 
    completed: 4, 
    started: 6, 
    planned: 2, 
    label: "Projects" 
  },
  { 
    name: "2022", 
    completed: 7, 
    started: 9, 
    planned: 3, 
    label: "Projects" 
  },
  { 
    name: "2023", 
    completed: 12, 
    started: 15, 
    planned: 5, 
    label: "Projects" 
  },
]

const userTestingData = [
  { name: "Market Force", value: 24, label: "24 Sessions" },
  { name: "M-pawa", value: 18, label: "18 Sessions" },
  { name: "Chuuza", value: 12, label: "12 Sessions" },
  { name: "Other", value: 8, label: "8 Sessions" },
]

const brandImpactData = [
  { month: "Jan", recognition: 42, trust: 56, position: 38 },
  { month: "Feb", recognition: 48, trust: 62, position: 45 },
  { month: "Mar", recognition: 55, trust: 68, position: 52 },
  { month: "Apr", recognition: 62, trust: 74, position: 58 },
  { month: "May", recognition: 68, trust: 80, position: 65 },
  { month: "Jun", recognition: 75, trust: 85, position: 70 },
  { month: "Jul", recognition: 78, trust: 89, position: 72 },
]

// Metric context data to explain if values are good/bad
const metricContext = [
  {
    name: "recognition",
    label: "Brand Recognition",
    value: 78,
    change: "+36%",
    isPositive: true,
    description: "Percentage of target audience that recognizes the brand. Higher is better.",
  },
  {
    name: "trust",
    label: "User Trust",
    value: 89,
    change: "+33%",
    isPositive: true,
    description: "Measure of user confidence in the brand. Higher is better.",
  },
  {
    name: "position",
    label: "Market Position",
    value: 72,
    change: "+34%",
    isPositive: true,
    description: "Relative standing compared to competitors. Higher is better.",
  },
]

export function OverallMetrics() {
  const { theme } = useTheme()
  const [containerWidth, setContainerWidth] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Monitor sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebarState = document.querySelector('[data-state="expanded"]')
      setIsSidebarOpen(!!sidebarState)
    }

    // Initial check
    checkSidebarState()

    // Set up a mutation observer to watch for changes
    const observer = new MutationObserver(checkSidebarState)
    observer.observe(document.body, { attributes: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // Update container width on resize and sidebar state change
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector(".metrics-container")
      if (container) {
        setContainerWidth(container.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => window.removeEventListener("resize", updateWidth)
  }, [isSidebarOpen])

  return (
    <div className="metrics-container w-full">
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="brand">Brand Impact</TabsTrigger>
          <TabsTrigger value="testing">User Testing</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="space-y-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectData}
                margin={{ top: 30, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#ffffff10" : "#00000010"} />
                <XAxis
                  dataKey="name"
                  stroke={theme === "dark" ? "#ffffff80" : "#00000080"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={theme === "dark" ? "#ffffff80" : "#00000080"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <div className="font-medium">{label}</div>
                            <div className="flex flex-col gap-1 mt-2">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#06D6A0]" />
                                <div>Completed: {payload[0].value}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#118AB2]" />
                                <div>Started: {payload[1].value}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#FFD166]" />
                                <div>Planned: {payload[2].value}</div>
                              </div>
                            </div>
                          </ChartTooltipContent>
                        </ChartTooltip>
                      )
                    }
                    return null
                  }}
                  cursor={{ fill: theme === "dark" ? "#ffffff10" : "#00000010" }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  formatter={(value) => {
                    return <span className="text-xs">{value}</span>
                  }}
                />
                <Bar
                  name="Completed"
                  dataKey="completed"
                  maxBarSize={60}
                  fill="#06D6A0"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#06D6A0" />
                  ))}
                </Bar>
                <Bar
                  name="Started"
                  dataKey="started"
                  maxBarSize={60}
                  fill="#118AB2"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#118AB2" />
                  ))}
                </Bar>
                <Bar
                  name="Planned"
                  dataKey="planned"
                  maxBarSize={60}
                  fill="#FFD166"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#FFD166" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="testing" className="mt-0">
          <div className="grid gap-4">
            <div className={`${theme === "dark" ? "bg-background/80" : "bg-background/50"} backdrop-blur-sm rounded-lg p-4 border border-border`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <h3 className="text-lg font-medium">User Testing Sessions by Project</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Number of user testing sessions conducted for each project, highlighting my commitment to
                        user-centered design.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Distribution of user testing sessions across major projects
              </p>
              <div className="h-[250px] sm:h-[300px] w-full overflow-hidden">
                <ChartContainer
                  config={{
                    value: {
                      label: "Sessions",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={userTestingData} 
                      margin={{ 
                        top: 30, 
                        right: 10, 
                        left: 0, 
                        bottom: 10 
                      }}
                      barGap={20}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                        tickLine={false}
                        axisLine={false}
                        fontSize={10}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis
                        stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        width={25}
                        fontSize={10}
                        tick={{ fontSize: 10 }}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{ fill: theme === "dark" ? "#ffffff10" : "#00000010" }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                        label={{
                          position: "top",
                          fill: theme === "dark" ? "#ffffff80" : "#71717a",
                          fontSize: 10,
                          dy: -6,
                        }}
                      >
                        {userTestingData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0 ? "#FFD166" : index === 1 ? "#118AB2" : index === 2 ? "#06D6A0" : "#EF476F"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="brand" className="mt-0">
          <div className="grid gap-4">
            <div className={`${theme === "dark" ? "bg-background/80" : "bg-background/50"} backdrop-blur-sm rounded-lg p-4 border border-border`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <h3 className="text-lg font-medium">Brand Impact Metrics</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Measuring the impact of UX improvements on brand perception metrics over time.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Tracking brand metrics improvement after UX enhancements
              </p>

              {/* Metric context cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {metricContext.map((metric, index) => (
                  <div
                    key={`metric-${index}`}
                    className={`p-3 rounded-lg border ${
                      theme === "dark" ? "bg-background/50 border-border" : "bg-white/80 border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <div
                        className={`flex items-center gap-1 text-xs font-medium ${
                          metric.isPositive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {metric.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {metric.change}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          metric.isPositive
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {metric.isPositive ? "Good" : "Needs Improvement"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                ))}
              </div>

              <div className="h-[250px] sm:h-[300px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={brandImpactData} 
                    margin={{ 
                      top: 20, 
                      right: 20, 
                      left: 0, 
                      bottom: 20 
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"} />
                    <XAxis
                      dataKey="month"
                      stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                      tickLine={false}
                      axisLine={false}
                      fontSize={10}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis
                      stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                      width={25}
                      fontSize={10}
                      tick={{ fontSize: 10 }}
                    />
                    <RechartsTooltip
                      formatter={(value, name) => {
                        const formattedName =
                          name === "recognition"
                            ? "Brand Recognition"
                            : name === "trust"
                              ? "User Trust"
                              : "Market Position"
                        return [`${value}%`, formattedName]
                      }}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
                        border: `1px solid ${theme === "dark" ? "#333" : "#ddd"}`,
                        borderRadius: "6px",
                        padding: "8px 12px",
                      }}
                      itemStyle={{
                        color: theme === "dark" ? "#fff" : "#333",
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(value) => {
                        return value === "recognition"
                          ? "Brand Recognition"
                          : value === "trust"
                            ? "User Trust"
                            : "Market Position"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="recognition"
                      stroke="#FFD166"
                      strokeWidth={3}
                      dot={{ fill: "#FFD166", r: 6, strokeWidth: 2 }}
                      activeDot={{
                        r: 8,
                        fill: "#FFD166",
                        stroke: theme === "dark" ? "#1f1f1f" : "#fff",
                        strokeWidth: 2,
                      }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                    />
                    <Line
                      type="monotone"
                      dataKey="trust"
                      stroke="#06D6A0"
                      strokeWidth={3}
                      dot={{ fill: "#06D6A0", r: 6, strokeWidth: 2 }}
                      activeDot={{
                        r: 8,
                        fill: "#06D6A0",
                        stroke: theme === "dark" ? "#1f1f1f" : "#fff",
                        strokeWidth: 2,
                      }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                      animationBegin={300}
                    />
                    <Line
                      type="monotone"
                      dataKey="position"
                      stroke="#118AB2"
                      strokeWidth={3}
                      dot={{ fill: "#118AB2", r: 6, strokeWidth: 2 }}
                      activeDot={{
                        r: 8,
                        fill: "#118AB2",
                        stroke: theme === "dark" ? "#1f1f1f" : "#fff",
                        strokeWidth: 2,
                      }}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                      animationBegin={600}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
