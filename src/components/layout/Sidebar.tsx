import { NavLink, useLocation } from "react-router-dom";
import { 
  User, 
  Filter, 
  PieChart, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Activity, 
  RefreshCw,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigationItems = [
  {
    title: "User Profiling",
    href: "/profiling",
    icon: User,
    description: "Risk assessment & preferences"
  },
  {
    title: "ETF Screening",
    href: "/screening",
    icon: Filter,
    description: "Universe filtering & selection"
  },
  {
    title: "Portfolio Construction",
    href: "/construction",
    icon: PieChart,
    description: "Allocation optimization"
  },
  {
    title: "AI Insights",
    href: "/insights",
    icon: TrendingUp,
    description: "Market analysis & trends"
  },
  {
    title: "Scenario Analysis",
    href: "/scenario",
    icon: BarChart3,
    description: "Risk & stress testing"
  },
  {
    title: "Final Recommendation",
    href: "/recommendation",
    icon: Target,
    description: "Core & satellite strategy"
  },
  {
    title: "Portfolio Monitoring",
    href: "/monitoring",
    icon: Activity,
    description: "Real-time tracking"
  },
  {
    title: "Rebalancing",
    href: "/rebalancing",
    icon: RefreshCw,
    description: "Portfolio maintenance"
  }
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full bg-card border-r transition-transform duration-300 ease-in-out",
          "md:translate-x-0 md:static md:z-0",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
          "w-80"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <PieChart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">ETF Portfolio</h1>
                <p className="text-sm text-muted-foreground">Investment Manager</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              const isCompleted = navigationItems.findIndex(nav => nav.href === location.pathname) > index;
              
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                    "hover:bg-secondary/50",
                    isActive && "bg-primary/10 border border-primary/20",
                    isCompleted && !isActive && "bg-success/5"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors",
                      isActive && "bg-primary text-primary-foreground",
                      isCompleted && !isActive && "bg-success text-success-foreground",
                      !isActive && !isCompleted && "bg-secondary text-secondary-foreground group-hover:bg-primary/10"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={cn(
                      "font-medium text-sm",
                      isActive && "text-primary",
                      isCompleted && !isActive && "text-success"
                    )}>
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      isActive && "bg-primary",
                      isCompleted && !isActive && "bg-success",
                      !isActive && !isCompleted && "bg-border"
                    )} />
                  </div>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="text-xs text-muted-foreground">
              Professional ETF Portfolio Management
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}