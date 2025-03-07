"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "@/components/theme-provider"

const adoptionData = [
  { month: "Jan", users: 0 },
  { month: "Feb", users: 120 },
  { month: "Mar", users: 280 },
  { month: "Apr", users: 420 },
  { month: "May", users: 650 },
  { month: "Jun", users: 870 },
]

export function UserAdoptionChart() {
  const { theme } = useTheme()

  return (
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
  )
}

