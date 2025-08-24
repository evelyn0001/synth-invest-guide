import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIComment } from "@/components/ui/ai-comment";
import { MetricCard } from "@/components/ui/metric-card";
import { aiComments } from "@/data/mockData";
import { ArrowRight, Target, Star, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const navigate = useNavigate();

  const corePortfolio = [
    { ticker: "SPY", name: "SPDR S&P 500 ETF", weight: 35, rationale: "Core US market exposure" },
    { ticker: "VTI", name: "Vanguard Total Stock Market", weight: 20, rationale: "Broad market diversification" },
    { ticker: "TLT", name: "iShares 20+ Year Treasury", weight: 20, rationale: "Interest rate hedge" },
    { ticker: "VXUS", name: "Vanguard Total International", weight: 15, rationale: "Global diversification" }
  ];

  const satelliteOptions = [
    { ticker: "XLV", name: "Health Care Select Sector", weight: 5, rationale: "Defensive growth sector" },
    { ticker: "ES3.SI", name: "SPDR STI ETF", weight: 5, rationale: "Singapore market exposure" }
  ];

  const portfolioMetrics = {
    expectedReturn: 8.7,
    sharpeRatio: 0.65,
    volatility: 12.3,
    maxDrawdown: 18.2,
    expenseRatio: 0.15
  };

  const continueToMonitoring = () => {
    navigate('/monitoring');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Final Portfolio Recommendations</h1>
          <p className="text-muted-foreground">
            Your optimized ETF portfolio with core holdings and satellite opportunities.
          </p>
        </div>

        {/* Portfolio Metrics */}
        <div className="grid md:grid-cols-5 gap-4">
          <MetricCard
            title="Expected Return"
            value={portfolioMetrics.expectedReturn}
            suffix="% p.a."
            trend="up"
          />
          <MetricCard
            title="Sharpe Ratio"
            value={portfolioMetrics.sharpeRatio}
            trend="up"
          />
          <MetricCard
            title="Volatility"
            value={portfolioMetrics.volatility}
            suffix="%"
            trend="down"
          />
          <MetricCard
            title="Max Drawdown"
            value={portfolioMetrics.maxDrawdown}
            suffix="%"
            trend="down"
          />
          <MetricCard
            title="Avg Expense Ratio"
            value={portfolioMetrics.expenseRatio}
            suffix="%"
            trend="down"
          />
        </div>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.recommendation[0].title}
          content={aiComments.recommendation[0].content}
          type={aiComments.recommendation[0].type}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Core Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Core Portfolio (90%)
              </CardTitle>
              <CardDescription>
                Foundation holdings for stable, diversified growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {corePortfolio.map((holding) => (
                  <div key={holding.ticker} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-lg">{holding.ticker}</div>
                        <Badge variant="default">{holding.weight}%</Badge>
                      </div>
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="text-sm font-medium mb-1">{holding.name}</div>
                    <div className="text-xs text-muted-foreground">{holding.rationale}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Satellite Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                Satellite Options (10%)
              </CardTitle>
              <CardDescription>
                Targeted opportunities for enhanced diversification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satelliteOptions.map((holding) => (
                  <div key={holding.ticker} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-lg">{holding.ticker}</div>
                        <Badge variant="secondary">{holding.weight}%</Badge>
                      </div>
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-warning" />
                      </div>
                    </div>
                    <div className="text-sm font-medium mb-1">{holding.name}</div>
                    <div className="text-xs text-muted-foreground">{holding.rationale}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Implementation Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold">Phase 1: Core Setup</h4>
                <p className="text-sm text-muted-foreground">
                  Start with SPY and TLT for 55% allocation. Establish market exposure and risk management foundation.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Phase 2: Diversification</h4>
                <p className="text-sm text-muted-foreground">
                  Add VTI and VXUS for comprehensive domestic and international exposure (35% allocation).
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Phase 3: Satellites</h4>
                <p className="text-sm text-muted-foreground">
                  Consider XLV and ES3.SI for sector-specific and regional opportunities (10% allocation).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Considerations */}
        <Card className="bg-warning-light border-warning/20">
          <CardHeader>
            <CardTitle className="text-warning">Important Risk Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Market risk: Portfolio value will fluctuate with market conditions</li>
              <li>• Interest rate risk: Bond positions (TLT) sensitive to rate changes</li>
              <li>• Currency risk: International holdings (VXUS) subject to FX volatility</li>
              <li>• Concentration risk: US market represents 70% of equity allocation</li>
              <li>• Rebalancing required: Maintain target weights through periodic adjustment</li>
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-primary text-white">
          <CardHeader>
            <CardTitle>Ready to Implement?</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Your personalized ETF portfolio is ready for deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-sm opacity-90 mb-2">Estimated Initial Investment</div>
                <div className="text-2xl font-bold">$10,000+</div>
              </div>
              <div className="flex-1">
                <div className="text-sm opacity-90 mb-2">Rebalancing Frequency</div>
                <div className="text-2xl font-bold">Quarterly</div>
              </div>
              <div className="flex-1">
                <div className="text-sm opacity-90 mb-2">Monitoring Required</div>
                <div className="text-2xl font-bold">Monthly</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={continueToMonitoring} className="w-full bg-gradient-success hover:opacity-90">
          Continue to Portfolio Monitoring
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </AppLayout>
  );
}