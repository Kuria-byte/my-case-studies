"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, LineChart, BarChart, TrendingUp, TrendingDown } from "lucide-react"
import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MetricData {
  name: string
  value: number
  change: number
  trend: "up" | "down" | "neutral"
  changeText: string
}

interface TabData {
  key: string
  title: string
  metrics: MetricData[]
  chartData: any[]
  chartType: "line" | "bar" | "pie"
}

export function CollapsibleMetrics() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("projects")

  const tabsData: TabData[] = [
    {
      key: "projects",
      title: "Projects",
      metrics: [
        { name: "Active Projects", value: 12, change: 20, trend: "up", changeText: "from last month" },
        { name: "Completed", value: 24, change: 5, trend: "up", changeText: "from last quarter" },
        { name: "On Hold", value: 3, change: -2, trend: "down", changeText: "from last month" },
      ],
      chartData: [
        { month: "Jan", active: 8, completed: 15 },
        { month: "Feb", active: 10, completed: 17 },
        { month: "Mar", active: 9, completed: 19 },
        { month: "Apr", active: 11, completed: 20 },
        { month: "May", active: 12, completed: 22 },
        { month: "Jun", active: 12, completed: 24 },
      ],
      chartType: "line",
    },
    {
      key: "clients",
      title: "Clients",
      metrics: [
        { name: "Active Clients", value: 8, change: 12.5, trend: "up", changeText: "from last month" },
        { name: "Retention Rate", value: 92, change: 3, trend: "up", changeText: "from last quarter" },
        { name: "New Leads", value: 15, change: -5, trend: "down", changeText: "from last month" },
      ],
      chartData: [
        { month: "Jan", active: 6, new: 2 },
        { month: "Feb", active: 7, new: 3 },
        { month: "Mar", active: 7, new: 1 },
        { month: "Apr", active: 8, new: 2 },
        { month: "May", active: 8, new: 1 },
        { month: "Jun", active: 8, new: 3 },
      ],
      chartType: "bar",
    },
    {
      key: "revenue",
      title: "Revenue",
      metrics: [
        { name: "Monthly Revenue", value: 24500, change: 15, trend: "up", changeText: "from last month" },
        { name: "Avg. Project Value", value: 8200, change: 5, trend: "up", changeText: "from last quarter" },
        { name: "Pending Invoices", value: 3, change: -2, trend: "down", changeText: "from last month" },
      ],
      chartData: [
        { month: "Jan", revenue: 18000 },
        { month: "Feb", revenue: 19500 },
        { month: "Mar", revenue: 20000 },
        { month: "Apr", revenue: 22000 },
        { month: "May", revenue: 23000 },
        { month: "Jun", revenue: 24500 },
      ],
      chartType: "line",
    },
  ]

  const formatValue = (value: number, name: string) => {
    if (name.toLowerCase().includes("revenue") || name.toLowerCase().includes("value")) {
      return `$${value.toLocaleString()}`
    }
    if (name.toLowerCase().includes("rate")) {
      return `${value}%`
    }
    return value
  }

  const renderChart = (tabData: TabData) => {
    if (tabData.chartType === "line") {
      return (
        <ChartContainer
          config={{
            active: {
              label: "Active",
              color: "hsl(var(--chart-1))",
            },
            completed: {
              label: "Completed",
              color: "hsl(var(--chart-2))",
            },
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={tabData.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(tabData.chartData[0])
                .filter((key) => key !== "month")
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`var(--color-${key})`}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      )
    }

    if (tabData.chartType === "bar") {
      return (
        <ChartContainer
          config={{
            active: {
              label: "Active Clients",
              color: "hsl(var(--chart-1))",
            },
            new: {
              label: "New Clients",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={tabData.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(tabData.chartData[0])
                .filter((key) => key !== "month")
                .map((key) => (
                  <Bar key={key} dataKey={key} fill={`var(--color-${key})`} />
                ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )
    }

    return null
  }

  const currentTabData = tabsData.find((tab) => tab.key === activeTab) || tabsData[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          Portfolio Metrics
        </CardTitle>
        <CardDescription>Track your performance across projects, clients, and revenue</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pb-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
          </div>

          {tabsData.map((tabData) => (
            <TabsContent key={tabData.key} value={tabData.key} className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
                {tabData.metrics.map((metric, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{metric.name}</span>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-2xl font-bold">{formatValue(metric.value, metric.name)}</span>
                          <Badge
                            variant="outline"
                            className={`
                              ${metric.trend === "up" ? "bg-green-500/10 text-green-500" : ""}
                              ${metric.trend === "down" ? "bg-red-500/10 text-red-500" : ""}
                              ${metric.trend === "neutral" ? "bg-amber-500/10 text-amber-500" : ""}
                            `}
                          >
                            <span className="flex items-center gap-1">
                              {metric.trend === "up" ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {metric.change}%
                            </span>
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">{metric.changeText}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {tabData.chartType === "line" ? (
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">Performance Trend</span>
                  </div>
                  <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? (
                      <span className="flex items-center gap-1">
                        <ChevronUp className="h-4 w-4" />
                        Hide Chart
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <ChevronDown className="h-4 w-4" />
                        Show Chart
                      </span>
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {/* Always visible on desktop, toggle on mobile */}
                  <div className={`hidden md:block`}>{renderChart(tabData)}</div>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden overflow-hidden"
                    >
                      {renderChart(tabData)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

