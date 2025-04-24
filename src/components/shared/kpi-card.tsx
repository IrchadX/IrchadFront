import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface KpiCardProps {
  title: string
  value: string
  icon: LucideIcon
  color?: string
  iconColor?: string
}

export function KpiCard({ title, value, icon: Icon, color, iconColor }: KpiCardProps) {
  return (
    <Card className={`w-full rounded-lg border bg-white shadow-md transition-all duration-300 hover:shadow-lg ${color ? "bg-white" : "bg-gray-100"}`}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: color }}>
          <Icon className="h-8 w-8 text-amber-500" color={iconColor} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
