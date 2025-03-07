"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "@/components/theme-provider"

const beforeAfterData = [
  { name: "Task Completion Time", before: 85, after: 32 },
  { name: "Error Rate", before: 24, after: 6 },
  { name: "User Satisfaction", before: 65, after: 92 },
]

const roiData = [
  { name: "Market Force", value: 320 },
  { name: "M-pawa", value: 280 },
  { name: "Chuuza", value: 210 },
]

const businessMetricsData = [
  { month: "Jan", conversion: 2.4, retention: 68 },
  { month: "Feb", conversion: 2.8, retention: 72 },
  { month: "Mar", conversion: 3.2, retention: 75 },
  { month: "Apr", conversion: 3.6, retention: 79 },
  { month: "May", conversion: 4.0, retention: 82 },
  { month: "Jun", conversion: 4.3, retention: 85 },
]

export function ImpactMetrics() {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Tabs defaultValue="before-after" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="before-after">Before & After</TabsTrigger>
        <TabsTrigger value="roi">ROI</TabsTrigger>
        <TabsTrigger value="business">Business Metrics</TabsTrigger>
      </TabsList>
      <TabsContent value="before-after" className="mt-0">
        <div className="grid gap-4">
          <div className="bg-card/50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">UX Improvements: Before & After</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comparing key metrics before and after UX improvements across projects
            </p>
            <div className="h-64">
              <ChartContainer
                config={{
                  before: {
                    label: "Before",
                    color: "hsl(var(--chart-1))",
                  },
                  after: {
                    label: "After",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={beforeAfterData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "transparent" }} />
                    <Bar dataKey="before" barSize={20} fill="#EF476F" name="Before" />
                    <Bar dataKey="after" barSize={20} fill="#06D6A0" name="After" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="roi" className="mt-0">
        <div className="grid gap-4">
          <div className="bg-card/50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Return on Investment (ROI)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Estimated ROI percentage for each project based on client feedback
            </p>
            <div className="h-64">
              <ChartContainer
                config={{
                  value: {
                    label: "ROI %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "transparent" }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {roiData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#FFD166" : index === 1 ? "#118AB2" : "#06D6A0"}
                          onMouseOver={() => setActiveIndex(index)}
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
      <TabsContent value="business" className="mt-0">
        <div className="grid gap-4">
          <div className="bg-card/50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Business Impact Metrics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Conversion rate (%) and user retention (%) improvements after UX changes
            </p>
            <div className="h-64">
              <ChartContainer
                config={{
                  conversion: {
                    label: "Conversion Rate (%)",
                    color: "hsl(var(--chart-1))",
                  },
                  retention: {
                    label: "Retention Rate (%)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={businessMetricsData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="conversion"
                      stroke="#FFD166"
                      strokeWidth={2}
                      dot={{ fill: "#FFD166", r: 4 }}
                      activeDot={{ r: 6, fill: "#FFD166" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="retention"
                      stroke="#118AB2"
                      strokeWidth={2}
                      dot={{ fill: "#118AB2", r: 4 }}
                      activeDot={{ r: 6, fill: "#118AB2" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

