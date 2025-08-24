import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIComment } from "@/components/ui/ai-comment";
import { mockNews, aiComments } from "@/data/mockData";
import { ArrowRight, TrendingUp, Newspaper, Brain, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Insights() {
  const navigate = useNavigate();

  const sectorInsights = [
    {
      sector: "Healthcare",
      trend: "Bullish",
      impact: "Positive",
      reason: "Aging demographics drive long-term growth",
      etfImpact: "XLV +8% expected"
    },
    {
      sector: "Technology", 
      trend: "Bearish",
      impact: "Negative",
      reason: "Rising interest rates pressure high-growth valuations",
      etfImpact: "QQQ -6% risk"
    },
    {
      sector: "Bonds",
      trend: "Neutral",
      impact: "Mixed",
      reason: "Fed policy uncertainty creates volatility",
      etfImpact: "TLT range-bound"
    }
  ];

  const continueToScenario = () => {
    navigate('/scenario');
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'Bullish') return 'success';
    if (trend === 'Bearish') return 'destructive';
    return 'secondary';
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">AI Market Insights</h1>
          <p className="text-muted-foreground">
            Real-time market intelligence and sector analysis to optimize your portfolio positioning.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">12.3%</div>
                  <div className="text-sm text-muted-foreground">VIX Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <div className="text-2xl font-bold text-success">4.8%</div>
                  <div className="text-sm text-muted-foreground">10Y Treasury</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-warning" />
                <div>
                  <div className="text-2xl font-bold">85</div>
                  <div className="text-sm text-muted-foreground">AI Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.insights[0].title}
          content={aiComments.insights[0].content}
          type={aiComments.insights[0].type}
        />

        {/* News Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              Market News & Impact Analysis
            </CardTitle>
            <CardDescription>
              Latest market developments affecting your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNews.map((news) => (
                <div key={news.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{news.headline}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {news.impact}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{news.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Sector Analysis
            </CardTitle>
            <CardDescription>
              Sector-specific insights and portfolio implications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorInsights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{insight.sector}</h4>
                      <Badge variant={getTrendColor(insight.trend) as any}>
                        {insight.trend}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {insight.etfImpact}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Impact Summary */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Portfolio Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-success">+2.1%</div>
                <div className="text-sm text-muted-foreground">Healthcare Boost</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-destructive">-1.4%</div>
                <div className="text-sm text-muted-foreground">Tech Headwinds</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">+0.7%</div>
                <div className="text-sm text-muted-foreground">Net Impact</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={continueToScenario} className="w-full bg-gradient-primary hover:opacity-90">
          Continue to Scenario Analysis
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </AppLayout>
  );
}