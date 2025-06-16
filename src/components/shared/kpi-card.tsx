import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
  iconColor?: string;
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  color,
  iconColor,
}: KpiCardProps) {
  return (
    <Card
      className={`
      w-full rounded-lg border shadow-md transition-all duration-300 hover:shadow-lg
      bg-white dark:bg-gray-800
      border-gray-200 dark:border-gray-700
      ${color ? "" : "bg-gray-100 dark:bg-gray-700/50"}
    `}>
      <CardContent className="flex items-center gap-4 p-6">
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-full
            ${color ? "" : "bg-gray-200 dark:bg-gray-600"}
          `}
          style={{ backgroundColor: color }}>
          <Icon
            className="h-8 w-8"
            style={{
              color: iconColor || (color ? "#F59E0B" : "#F59E0B"),
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
