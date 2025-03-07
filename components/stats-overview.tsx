import { Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Projects</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
            <div className="text-xs bg-green-500/10 px-2.5 py-1.5 rounded-full flex items-center gap-1">
              <span className="text-green-500 font-medium">+33%</span>
              <span className="text-green-600/60 font-normal">YoY</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repeat for other stats with updated YoY styling */}
    </div>
  )
}

