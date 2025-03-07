"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "@/components/theme-provider"

const efficiencyData = [
  { name: "Before", value: 180 },
  { name: "After", value: 40 },
]

const errorData = [
  { name: "Before", value: 24 },
  { name: "After", value: 2 },
]

const adoptionData = [
  { month: "Jan", users: 0 },
  { month: "Feb", users: 120 },
  { month: "Mar", users: 280 },
  { month: "Apr", users: 420 },
  { month: "May", users: 650 },
  { month: "Jun", users: 870 },
]

export function ProjectMetrics() {
  const { theme } = useTheme()

  return (
    <Tabs defaultValue="efficiency" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        <TabsTrigger value="errors">Error Reduction</TabsTrigger>
        <TabsTrigger value="adoption">User Adoption</TabsTrigger>
        <TabsTrigger value="impact">Business Impact</TabsTrigger>
      </TabsList>
      <TabsContent value="efficiency" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">Reconciliation Time (minutes)</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Reduced reconciliation time by 78%, saving agents an average of 2.5 hours daily
            </p>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Minutes",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }} barGap={40}>
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
                      dy={10}
                    />
                    <YAxis
                      stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 180]}
                      ticks={[45, 90, 135, 180]}
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
                      }}
                    >
                      {efficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#EF476F" : "#06D6A0"} radius={[4, 4, 0, 0]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="errors" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">Error Rate Reduction (%)</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Decreased transaction errors by 92% through automated verification and visual confirmations
            </p>
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
          </div>
        </div>
      </TabsContent>
      <TabsContent value="adoption" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">User Adoption Growth</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Achieved 94% user satisfaction rating and 89% adoption rate within 3 months of launch
            </p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adoptionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="userAdoptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06D6A0" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06D6A0" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"} />
                  <XAxis
                    dataKey="month"
                    stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#ffffff50" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    label={{
                      value: "Active Users",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                        fill: theme === "dark" ? "#ffffff50" : "#71717a",
                        fontSize: 12,
                      },
                    }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} users`, "Active Users"]}
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
                      border: `1px solid ${theme === "dark" ? "#333" : "#ddd"}`,
                      borderRadius: "6px",
                      padding: "8px 12px",
                    }}
                    labelStyle={{
                      color: theme === "dark" ? "#fff" : "#333",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                    itemStyle={{
                      color: theme === "dark" ? "#fff" : "#333",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#06D6A0"
                    fillOpacity={1}
                    fill="url(#userAdoptionGradient)"
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: "#06D6A0", stroke: theme === "dark" ? "#1f1f1f" : "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="impact" className="mt-0">
        {/* Keep the existing impact content */}
      </TabsContent>
    </Tabs>
  )
}

