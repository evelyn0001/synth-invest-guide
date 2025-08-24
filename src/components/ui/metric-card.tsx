import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  suffix?: string;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  suffix = '',
  className,
  trend
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className={cn("bg-gradient-card shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">
              {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              change > 0 && "text-success",
              change < 0 && "text-destructive",
              change === 0 && "text-muted-foreground"
            )}>
              <TrendIcon className="w-3 h-3" />
              {Math.abs(change).toFixed(1)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}