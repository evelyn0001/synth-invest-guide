import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIComment } from "@/components/ui/ai-comment";
import { MetricCard } from "@/components/ui/metric-card";
import { mockAlerts, aiComments } from "@/data/mockData";
import { ArrowRight, Activity, Bell, TrendingUp, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Monitoring() {
  const navigate = useNavigate();

  const performanceData = [
    { period: "1D", return: 0.23, color: "text-success" },
    { period: "1W", return: 1.45, color: "text-success" },
    { period: "1M", return: -0.87, color: "text-destructive" },
    { period: "3M", return: 4.12, color: "text-success" },
    { period: "YTD", return: 8.94, color: "text-success" }
  ];

  const currentAllocations = [
    { ticker: "SPY", current: 38.2, target: 35.0, drift: 3.2 },
    { ticker: "VTI", current: 19.1, target: 20.0, drift: -0.9 },
    { ticker: "TLT", current: 17.8, target: 20.0, drift: -2.2 },
    { ticker: "VXUS", current: 14.3, target: 15.0, drift: -0.7 },
    { ticker: "XLV", current: 6.1, target: 5.0, drift: 1.1 },
    { ticker: "ES3.SI", current: 4.5, target: 5.0, drift: -0.5 }
  ];

  const continueToRebalancing = () => {
    navigate('/rebalancing');
  };

  const getDriftColor = (drift: number) => {
    const abs = Math.abs(drift);
    if (abs > 3) return "text-destructive";
    if (abs > 1.5) return "text-warning";
    return "text-muted-foreground";
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'success':
        return <TrendingUp className="w-4 h-4 text-success" />;
      default:
        return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  // Simple line chart representation
  const PerformanceChart = () => {
    return (
      <div className="h-48 flex items-end gap-2 p-4">
        {[8.2, 9.1, 7.8, 8.9, 9.4, 8.7, 9.2, 8.5, 9.0, 8.8, 9.3, 9.1].map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-primary/20 rounded-t"
            style={{ height: `${(value - 7) * 20}%` }}
          >
            <div
              className="w-full bg-primary rounded-t transition-all duration-300"
              style={{ height: '100%' }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Portfolio Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time tracking and performance analysis of your ETF portfolio.
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid md:grid-cols-5 gap-4">
          {performanceData.map((data) => (
            <MetricCard
              key={data.period}
              title={data.period}
              value={Math.abs(data.return)}
              suffix="%"
              change={data.return}
              trend={data.return >= 0 ? 'up' : 'down'}
            />
          ))}
        </div>

        {/* Portfolio Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Portfolio Performance (YTD)
            </CardTitle>
            <CardDescription>
              Monthly returns tracking vs benchmark
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
            <div className="flex justify-center gap-8 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span>Your Portfolio (+8.94%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded" />
                <span>S&P 500 (+8.21%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.monitoring[0].title}
          content={aiComments.monitoring[0].content}
          type={aiComments.monitoring[0].type}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Allocations */}
          <Card>
            <CardHeader>
              <CardTitle>Current vs Target Allocation</CardTitle>
              <CardDescription>
                Monitor drift from target weights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentAllocations.map((allocation) => (
                  <div key={allocation.ticker} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{allocation.ticker}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {allocation.current.toFixed(1)}% / {allocation.target.toFixed(1)}%
                        </span>
                        <span className={`text-sm font-medium ${getDriftColor(allocation.drift)}`}>
                          {allocation.drift > 0 ? '+' : ''}{allocation.drift.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(allocation.current / 40) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Recent Alerts ({mockAlerts.length})
              </CardTitle>
              <CardDescription>
                AI-generated portfolio notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{alert.message}</div>
                        <div className="text-xs text-muted-foreground mt-2">{alert.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Excellent
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">Diversification</div>
                <div className="text-lg font-bold">92/100</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Badge variant="secondary" className="bg-warning text-warning-foreground">
                    Monitor
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">Allocation Drift</div>
                <div className="text-lg font-bold">3.2%</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Low
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">Cost Ratio</div>
                <div className="text-lg font-bold">0.14%</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Strong
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
                <div className="text-lg font-bold">7.2/10</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={continueToRebalancing} className="w-full bg-gradient-primary hover:opacity-90">
          Continue to Rebalancing
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </AppLayout>
  );
}