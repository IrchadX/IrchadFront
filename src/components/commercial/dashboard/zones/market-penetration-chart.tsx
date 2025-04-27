"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface RegionData {
  name: string
  penetration: number
}

const regions: RegionData[] = [
  { name: "Région 1", penetration: 60 },
  { name: "Région 2", penetration: 60 },
  { name: "Région 3", penetration: 60 },
  { name: "Région 4", penetration: 60 },
  { name: "Région 5", penetration: 60 },
  { name: "Région 6", penetration: 60 },
]

export function MarketPenetrationComponent() {
  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="pb-2 pt-6 px-6 border-b border-gray-100">
        <CardTitle className="text-xl font-medium text-gray-800">Pénétration du marché par région</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {regions.map((region, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-gray-500 font-medium">{region.name}</div>
            <div className="flex-1">
              <Progress value={region.penetration} className="h-2 bg-gray-100"/>
            </div>
            <div className="w-12 text-right text-gray-500 font-medium">{region.penetration}%</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
