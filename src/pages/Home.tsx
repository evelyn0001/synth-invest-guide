import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PieChart, Shield, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/etf-hero.jpg";

export default function Home() {
  const features = [
    {
      icon: PieChart,
      title: "Smart Portfolio Construction",
      description: "AI-powered Modern Portfolio Theory optimization for risk-adjusted returns"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive scenario analysis and stress testing for market volatility"
    },
    {
      icon: TrendingUp,
      title: "Real-time Insights",
      description: "Market intelligence and rebalancing alerts powered by advanced analytics"
    },
    {
      icon: Zap,
      title: "Instant Recommendations",
      description: "Personalized ETF selection based on your risk profile and investment goals"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-success/5">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                  Professional
                  <span className="text-primary block">ETF Portfolio</span>
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Management
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Harness AI-driven insights to build, optimize, and manage your ETF portfolio 
                  with institutional-grade tools and real-time market intelligence.
                </p>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity" asChild>
                  <Link to="/profiling">
                    Start Building Portfolio
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">ETFs Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">12.5%</div>
                  <div className="text-sm text-muted-foreground">Avg Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">0.15%</div>
                  <div className="text-sm text-muted-foreground">Avg Fees</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-20 animate-bounce-subtle"></div>
              <img
                src={heroImage}
                alt="ETF Portfolio Dashboard"
                className="relative rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">
              Institutional-Grade
              <span className="text-primary"> Investment Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access professional portfolio management capabilities with AI-powered 
              insights and real-time market analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-primary text-white text-center p-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-4">
                Ready to Optimize Your Portfolio?
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Join thousands of investors using AI-powered ETF portfolio management 
                to maximize returns while minimizing risk.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/profiling">
                  Begin Portfolio Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}