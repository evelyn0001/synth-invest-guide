import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIComment } from "@/components/ui/ai-comment";
import { MetricCard } from "@/components/ui/metric-card";
import { aiComments } from "@/data/mockData";
import { ArrowRight, BarChart3, AlertTriangle, TrendingDown, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Scenario() {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState("recession");

  const scenarios = [
    { value: "recession", label: "Global Recession (-20% GDP)" },
    { value: "ratehike", label: "Fed Rate Hike (+2%)" },
    { value: "sectorshock", label: "Tech Sector Shock (-30%)" },
    { value: "inflation", label: "High Inflation (+5%)" }
  ];

  const scenarioResults = {
    recession: {
      expectedReturn: -8.2,
      maxDrawdown: -18.4,
      recoveryTime: 18,
      worstMonth: -12.3,
      bondPerformance: 15.2,
      equityPerformance: -22.1
    },
    ratehike: {
      expectedReturn: -3.1,
      maxDrawdown: -12.8,
      recoveryTime: 8,
      worstMonth: -6.7,
      bondPerformance: -8.4,
      equityPerformance: -1.2
    },
    sectorshock: {
      expectedReturn: -4.6,
      maxDrawdown: -15.2,
      recoveryTime: 12,
      worstMonth: -9.1,
      bondPerformance: 2.1,
      equityPerformance: -8.3
    }
  };

  const getCurrentResults = () => {
    return scenarioResults[selectedScenario as keyof typeof scenarioResults] || scenarioResults.recession;
  };

  const continueToRecommendation = () => {
    navigate('/recommendation');
  };

  // Simple bar chart visualization
  const BarChart = ({ data }: { data: Array<{ label: string; value: number; color: string }> }) => {
    const maxValue = Math.max(...data.map(d => Math.abs(d.value)));
    
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span className={item.value >= 0 ? "text-success" : "text-destructive"}>
                {item.value > 0 ? '+' : ''}{item.value.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} transition-all duration-500`}
                style={{
                  width: `${(Math.abs(item.value) / maxValue) * 100}%`,
                  marginLeft: item.value < 0 ? `${100 - (Math.abs(item.value) / maxValue) * 100}%` : '0'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const results = getCurrentResults();
  const chartData = [
    { label: "Portfolio Total", value: results.expectedReturn, color: "bg-primary" },
    { label: "Bonds (TLT)", value: results.bondPerformance, color: "bg-success" },
    { label: "Equities (SPY)", value: results.equityPerformance, color: "bg-destructive" }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Scenario Analysis</h1>
          <p className="text-muted-foreground">
            Stress test your portfolio against various market conditions and economic scenarios.
          </p>
        </div>

        {/* Scenario Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Stress Test Scenario
            </CardTitle>
            <CardDescription>
              Select a scenario to analyze portfolio resilience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((scenario) => (
                  <SelectItem key={scenario.value} value={scenario.value}>
                    {scenario.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Scenario Results */}
        <div className="grid md:grid-cols-4 gap-4">
          <MetricCard
            title="Expected Return"
            value={results.expectedReturn}
            suffix="%"
            trend="down"
          />
          <MetricCard
            title="Max Drawdown"
            value={results.maxDrawdown}
            suffix="%"
            trend="down"
          />
          <MetricCard
            title="Recovery Time"
            value={results.recoveryTime}
            suffix=" months"
            trend="neutral"
          />
          <MetricCard
            title="Worst Month"
            value={results.worstMonth}
            suffix="%"
            trend="down"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Scenario Performance
              </CardTitle>
              <CardDescription>
                Expected returns by asset class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={chartData} />
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Portfolio Resilience</span>
                  <span className="font-medium">
                    {results.maxDrawdown > -20 ? "Strong" : results.maxDrawdown > -30 ? "Moderate" : "Weak"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Diversification Benefit</span>
                  <span className="font-medium text-success">+4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bond Protection</span>
                  <span className="font-medium">
                    {results.bondPerformance > 0 ? "Effective" : "Limited"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk-Adjusted Return</span>
                  <span className="font-medium">0.42</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.scenario[0].title}
          content={aiComments.scenario[0].content}
          type={aiComments.scenario[0].type}
        />

        {/* Scenario Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Scenario Comparison</CardTitle>
            <CardDescription>
              How your portfolio performs across different stress scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Scenario</th>
                    <th className="text-right py-2">Expected Return</th>
                    <th className="text-right py-2">Max Drawdown</th>
                    <th className="text-right py-2">Recovery Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Global Recession</td>
                    <td className="text-right py-2 text-destructive">-8.2%</td>
                    <td className="text-right py-2 text-destructive">-18.4%</td>
                    <td className="text-right py-2">18 months</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Fed Rate Hike</td>
                    <td className="text-right py-2 text-destructive">-3.1%</td>
                    <td className="text-right py-2 text-destructive">-12.8%</td>
                    <td className="text-right py-2">8 months</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Tech Sector Shock</td>
                    <td className="text-right py-2 text-destructive">-4.6%</td>
                    <td className="text-right py-2 text-destructive">-15.2%</td>
                    <td className="text-right py-2">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Button onClick={continueToRecommendation} className="w-full bg-gradient-primary hover:opacity-90">
          Continue to Final Recommendation
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </AppLayout>
  );
}