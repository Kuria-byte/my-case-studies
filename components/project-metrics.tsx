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
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

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

const businessImpactData = [
  { name: "Revenue Growth", value: 32 },
  { name: "Cost Reduction", value: 45 },
  { name: "Customer Retention", value: 28 },
  { name: "Operational Efficiency", value: 65 },
]

export function ProjectMetrics() {
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-900 animate-pulse rounded-lg"></div>
  }

  return (
    <Tabs defaultValue="efficiency" className="w-full">
      <TabsList className="w-full overflow-x-auto flex whitespace-nowrap scrollbar-hide">
        <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        <TabsTrigger value="errors">Error Reduction</TabsTrigger>
        <TabsTrigger value="adoption">User Adoption</TabsTrigger>
        <TabsTrigger value="impact">Business Impact</TabsTrigger>
      </TabsList>
      
      {/* Efficiency Tab */}
      <TabsContent value="efficiency" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">Reconciliation Time (minutes)</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Reduced reconciliation time by 78%, saving agents an average of 2.5 hours daily
            </p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={efficiencyData} 
                  margin={{ top: 20, right: 30, left: 65, bottom: 30 }} 
                  barGap={40}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 200]}
                    ticks={[0, 50, 100, 150, 200]}
                    width={60}
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} minutes`, "Time"]}
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
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "#EF476F" : "#06D6A0"} 
                        radius={[4, 4, 0, 0]} 
                      />
                    ))}
                  </Bar>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Error Reduction Tab */}
      <TabsContent value="errors" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">Error Rate Reduction (%)</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Decreased transaction errors by 92% through automated verification and visual confirmations
            </p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={errorData} 
                  margin={{ top: 20, right: 30, left: 65, bottom: 30 }} 
                  barGap={40}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 30]}
                    ticks={[0, 5, 10, 15, 20, 25, 30]}
                    width={60}
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Error Rate"]}
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
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "#EF476F" : "#06D6A0"} 
                        radius={[4, 4, 0, 0]} 
                      />
                    ))}
                  </Bar>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* User Adoption Tab */}
      <TabsContent value="adoption" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">User Adoption Growth</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Achieved 94% user satisfaction rating and 89% adoption rate within 3 months of launch
            </p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={adoptionData} 
                  margin={{ top: 20, right: 30, left: 65, bottom: 30 }}
                >
                  <defs>
                    <linearGradient id="userAdoptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06D6A0" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06D6A0" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}
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
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{ paddingTop: "10px" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Business Impact Tab */}
      <TabsContent value="impact" className="mt-0">
        <div className="grid gap-4">
          <div className={`${theme === "dark" ? "bg-[#0F0F0F]" : "bg-gray-50"} rounded-lg p-6`}>
            <h3 className="text-lg font-medium mb-2">Business Impact Metrics</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Key financial and operational improvements resulting from the Market Force implementation
            </p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={businessImpactData}
                  margin={{ top: 20, right: 50, left: 170, bottom: 30 }}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#2A2A2A" : "#e5e5e5"}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke={theme === "dark" ? "#ffffff80" : "#71717a"}
                    tickLine={false}
                    axisLine={false}
                    width={160}
                    fontSize={12}
                    dx={-10}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Improvement"]}
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
                  <Bar
                    dataKey="value"
                    maxBarSize={30}
                    label={{
                      position: "right",
                      fill: theme === "dark" ? "#ffffff80" : "#71717a",
                      fontSize: 12,
                      formatter: (value) => `${value}%`,
                      dx: 5,
                    }}
                  >
                    {businessImpactData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          index === 0 ? "#06D6A0" : 
                          index === 1 ? "#118AB2" : 
                          index === 2 ? "#FFD166" : 
                          "#EF476F"
                        } 
                        radius={[0, 4, 4, 0]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
