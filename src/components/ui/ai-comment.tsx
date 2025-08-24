import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AICommentProps {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  className?: string;
}

export function AIComment({ title, content, type, className }: AICommentProps) {
  const iconMap = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
  };

  const Icon = iconMap[type];

  return (
    <Card className={cn(
      "animate-fade-in",
      type === 'info' && "border-primary/20 bg-primary/5",
      type === 'warning' && "border-warning/20 bg-warning-light",
      type === 'success' && "border-success/20 bg-success-light",
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={cn(
            "w-5 h-5",
            type === 'info' && "text-primary",
            type === 'warning' && "text-warning",
            type === 'success' && "text-success"
          )} />
          AI Analysis: {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}