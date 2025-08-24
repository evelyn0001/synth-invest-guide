import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AIComment } from "@/components/ui/ai-comment";
import { MetricCard } from "@/components/ui/metric-card";
import { mockPortfolioAllocations, aiComments } from "@/data/mockData";
import { ArrowRight, PieChart, BarChart3, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Construction() {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState("MPT");

  const models = [
    { value: "MPT", label: "Modern Portfolio Theory" },
    { value: "RP", label: "Risk Parity" },
    { value: "BL", label: "Black-Litterman" }
  ];

  const portfolioMetrics = {
    expectedReturn: 8.7,
    volatility: 12.3,
    sharpeRatio: 0.65,
    maxDrawdown: 18.2
  };

  const continueToInsights = () => {
    navigate('/insights');
  };

  const getReturnColor = (value: number) => {
    if (value > 10) return "text-success";
    if (value < 0) return "text-destructive";
    return "text-foreground";
  };

  // Simple pie chart representation using CSS
  const PieChartVisualization = () => {
    const colors = [
      'hsl(213 94% 68%)',   // Primary blue
      'hsl(142 71% 45%)',   // Success green  
      'hsl(38 92% 50%)',    // Warning amber
      'hsl(349 89% 60%)',   // Destructive red
      'hsl(220 9% 46%)'     // Muted gray
    ];

    return (
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {mockPortfolioAllocations.map((allocation, index) => {
              const previousSum = mockPortfolioAllocations
                .slice(0, index)
                .reduce((sum, prev) => sum + prev.weight, 0);
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${(allocation.weight / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((previousSum / 100) * circumference);

              return (
                <circle
                  key={allocation.ticker}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold">Portfolio</div>
              <div className="text-sm text-muted-foreground">Allocation</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Portfolio Construction</h1>
          <p className="text-muted-foreground">
            AI-optimized allocation using Modern Portfolio Theory for risk-adjusted returns.
          </p>
        </div>

        {/* Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Optimization Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Portfolio Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <MetricCard
            title="Expected Return"
            value={portfolioMetrics.expectedReturn}
            suffix="% p.a."
            trend="up"
          />
          <MetricCard
            title="Volatility"
            value={portfolioMetrics.volatility}
            suffix="%"
            trend="down"
          />
          <MetricCard
            title="Sharpe Ratio"
            value={portfolioMetrics.sharpeRatio}
            trend="up"
          />
          <MetricCard
            title="Max Drawdown"
            value={portfolioMetrics.maxDrawdown}
            suffix="%"
            trend="down"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Allocation Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Portfolio Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieChartVisualization />
              <div className="mt-6 space-y-3">
                {mockPortfolioAllocations.map((allocation, index) => {
                  const colors = [
                    'bg-primary',
                    'bg-success',
                    'bg-warning', 
                    'bg-destructive',
                    'bg-muted-foreground'
                  ];
                  
                  return (
                    <div key={allocation.ticker} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                        <span className="font-medium">{allocation.ticker}</span>
                      </div>
                      <span className="font-bold">{allocation.weight}%</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Allocation Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Detailed Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ETF</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Volatility</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPortfolioAllocations.map((allocation) => (
                    <TableRow key={allocation.ticker}>
                      <TableCell className="font-medium">{allocation.ticker}</TableCell>
                      <TableCell className="font-bold">{allocation.weight}%</TableCell>
                      <TableCell className={getReturnColor(allocation.expectedReturn)}>
                        {allocation.expectedReturn > 0 ? '+' : ''}{allocation.expectedReturn.toFixed(1)}%
                      </TableCell>
                      <TableCell>{allocation.volatility.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.construction[0].title}
          content={aiComments.construction[0].content}
          type={aiComments.construction[0].type}
        />

        <Button onClick={continueToInsights} className="w-full bg-gradient-primary hover:opacity-90">
          Continue to AI Insights
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </AppLayout>
  );
}