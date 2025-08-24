import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AIComment } from "@/components/ui/ai-comment";
import { MetricCard } from "@/components/ui/metric-card";
import { aiComments } from "@/data/mockData";
import { RefreshCw, ArrowUpDown, CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Rebalancing() {
  const navigate = useNavigate();

  const rebalancingTrades = [
    {
      ticker: "SPY",
      action: "SELL",
      currentWeight: 38.2,
      targetWeight: 35.0,
      shares: 12,
      amount: 5280,
      reason: "Reduce overweight position"
    },
    {
      ticker: "TLT", 
      action: "BUY",
      currentWeight: 17.8,
      targetWeight: 20.0,
      shares: 18,
      amount: 3420,
      reason: "Increase bond allocation"
    },
    {
      ticker: "VXUS",
      action: "BUY", 
      currentWeight: 14.3,
      targetWeight: 15.0,
      shares: 31,
      amount: 1860,
      reason: "Restore international exposure"
    }
  ];

  const rebalancingMetrics = {
    totalTrades: 3,
    totalCost: 25.50,
    taxImpact: 142.30,
    timeToComplete: 2
  };

  const returnHome = () => {
    navigate('/');
  };

  const getActionColor = (action: string) => {
    return action === 'BUY' ? 'success' : 'destructive';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Portfolio Rebalancing</h1>
          <p className="text-muted-foreground">
            Recommended trades to restore target allocation and optimize portfolio performance.
          </p>
        </div>

        {/* Rebalancing Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Trades"
            value={rebalancingMetrics.totalTrades}
            trend="neutral"
          />
          <MetricCard
            title="Trading Costs"
            value={rebalancingMetrics.totalCost}
            suffix="$"
            trend="down"
          />
          <MetricCard
            title="Tax Impact"
            value={rebalancingMetrics.taxImpact}
            suffix="$"
            trend="down"
          />
          <MetricCard
            title="Completion Time"
            value={rebalancingMetrics.timeToComplete}
            suffix=" days"
            trend="down"
          />
        </div>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.rebalancing[0].title}
          content={aiComments.rebalancing[0].content}
          type={aiComments.rebalancing[0].type}
        />

        {/* Rebalancing Trades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-primary" />
              Recommended Rebalancing Trades
            </CardTitle>
            <CardDescription>
              Execute these trades to restore target allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ETF</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Current Weight</TableHead>
                  <TableHead>Target Weight</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rebalancingTrades.map((trade) => (
                  <TableRow key={trade.ticker}>
                    <TableCell className="font-medium">{trade.ticker}</TableCell>
                    <TableCell>
                      <Badge variant={getActionColor(trade.action) as any}>
                        {trade.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.currentWeight.toFixed(1)}%</TableCell>
                    <TableCell>{trade.targetWeight.toFixed(1)}%</TableCell>
                    <TableCell>{trade.shares}</TableCell>
                    <TableCell>{formatCurrency(trade.amount)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-48">
                      {trade.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Allocation</CardTitle>
              <CardDescription>Portfolio drift from targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { ticker: "SPY", weight: 38.2, target: 35.0, status: "overweight" },
                  { ticker: "VTI", weight: 19.1, target: 20.0, status: "underweight" },
                  { ticker: "TLT", weight: 17.8, target: 20.0, status: "underweight" },
                  { ticker: "VXUS", weight: 14.3, target: 15.0, status: "underweight" },
                  { ticker: "XLV", weight: 6.1, target: 5.0, status: "overweight" },
                  { ticker: "ES3.SI", weight: 4.5, target: 5.0, status: "underweight" }
                ].map((allocation) => (
                  <div key={allocation.ticker} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{allocation.ticker}</span>
                      <Badge 
                        variant={allocation.status === 'overweight' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {allocation.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{allocation.weight.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">
                        Target: {allocation.target.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                After Rebalancing
              </CardTitle>
              <CardDescription>Restored target allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { ticker: "SPY", weight: 35.0 },
                  { ticker: "VTI", weight: 20.0 },
                  { ticker: "TLT", weight: 20.0 },
                  { ticker: "VXUS", weight: 15.0 },
                  { ticker: "XLV", weight: 5.0 },
                  { ticker: "ES3.SI", weight: 5.0 }
                ].map((allocation) => (
                  <div key={allocation.ticker} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{allocation.ticker}</span>
                      <Badge variant="default" className="text-xs bg-success text-success-foreground">
                        On target
                      </Badge>
                    </div>
                    <div className="font-medium text-success">
                      {allocation.weight.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rebalancing Benefits */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Rebalancing Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">+0.3%</div>
                <div className="text-sm text-muted-foreground">Expected Return Boost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">-1.2%</div>
                <div className="text-sm text-muted-foreground">Risk Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">0.68</div>
                <div className="text-sm text-muted-foreground">Improved Sharpe Ratio</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Implementation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium">Sell SPY Shares</div>
                  <div className="text-sm text-muted-foreground">Reduce overweight position (-3.2%)</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium">Purchase TLT & VXUS</div>
                  <div className="text-sm text-muted-foreground">Restore bond and international allocation</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-medium">Portfolio Rebalanced</div>
                  <div className="text-sm text-muted-foreground">Schedule next review in 3 months</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Card className="bg-gradient-success text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Portfolio Journey Complete!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-success-foreground/90 mb-4">
                You've successfully completed the full ETF portfolio management workflow. 
                Your optimized portfolio is ready for implementation with ongoing monitoring and rebalancing.
              </p>
            </CardContent>
          </Card>

          <Button onClick={returnHome} size="lg" className="bg-gradient-primary hover:opacity-90">
            <Home className="mr-2 w-4 h-4" />
            Return to Home
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}