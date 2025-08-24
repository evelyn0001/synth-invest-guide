import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AIComment } from "@/components/ui/ai-comment";
import { MetricCard } from "@/components/ui/metric-card";
import { riskProfiles, aiComments } from "@/data/mockData";
import { ArrowRight, User, Target, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  horizon: string;
  riskTolerance: string;
  marketPreference: string[];
  specialPreferences: string[];
}

export default function Profiling() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    horizon: '',
    riskTolerance: '',
    marketPreference: [],
    specialPreferences: []
  });
  
  const [showResults, setShowResults] = useState(false);

  const handleMarketPreferenceChange = (market: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      marketPreference: checked 
        ? [...prev.marketPreference, market]
        : prev.marketPreference.filter(m => m !== market)
    }));
  };

  const handleSpecialPreferenceChange = (pref: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      specialPreferences: checked 
        ? [...prev.specialPreferences, pref]
        : prev.specialPreferences.filter(p => p !== pref)
    }));
  };

  const generateProfile = () => {
    setShowResults(true);
  };

  const getRiskProfile = () => {
    if (profile.riskTolerance === 'Low') return riskProfiles.Conservative;
    if (profile.riskTolerance === 'High') return riskProfiles.Aggressive;
    return riskProfiles.Balanced;
  };

  const continueToScreening = () => {
    navigate('/screening');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Investment Profile Assessment</h1>
          <p className="text-muted-foreground">
            Help us understand your investment goals and risk tolerance to create your personalized ETF portfolio.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Questionnaire */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Investment Horizon
                </CardTitle>
                <CardDescription>
                  How long do you plan to invest before needing access to funds?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={profile.horizon} onValueChange={(value) => setProfile(prev => ({ ...prev, horizon: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 months or less</SelectItem>
                    <SelectItem value="1-3years">1-3 years</SelectItem>
                    <SelectItem value="3-5years">3-5 years</SelectItem>
                    <SelectItem value="5+years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Risk Tolerance
                </CardTitle>
                <CardDescription>
                  How comfortable are you with investment volatility and potential losses?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={profile.riskTolerance} onValueChange={(value) => setProfile(prev => ({ ...prev, riskTolerance: value }))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Low" id="low" />
                    <Label htmlFor="low" className="flex-1">
                      <div className="font-medium">Conservative</div>
                      <div className="text-sm text-muted-foreground">Prioritize capital preservation over growth</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Medium" id="medium" />
                    <Label htmlFor="medium" className="flex-1">
                      <div className="font-medium">Moderate</div>
                      <div className="text-sm text-muted-foreground">Balance growth potential with manageable risk</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="High" id="high" />
                    <Label htmlFor="high" className="flex-1">
                      <div className="font-medium">Aggressive</div>
                      <div className="text-sm text-muted-foreground">Maximize growth potential, accept higher volatility</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Market Preference
                </CardTitle>
                <CardDescription>
                  Which markets would you like to include in your portfolio?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Singapore', 'US', 'Global/International'].map((market) => (
                  <div key={market} className="flex items-center space-x-2">
                    <Checkbox
                      id={market}
                      checked={profile.marketPreference.includes(market)}
                      onCheckedChange={(checked) => handleMarketPreferenceChange(market, !!checked)}
                    />
                    <Label htmlFor={market}>{market}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Special Preferences
                </CardTitle>
                <CardDescription>
                  Any specific investment themes or sectors of interest?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['ESG/Sustainable Investing', 'Technology Sector', 'Healthcare Sector', 'Dividend Focus'].map((pref) => (
                  <div key={pref} className="flex items-center space-x-2">
                    <Checkbox
                      id={pref}
                      checked={profile.specialPreferences.includes(pref)}
                      onCheckedChange={(checked) => handleSpecialPreferenceChange(pref, !!checked)}
                    />
                    <Label htmlFor={pref}>{pref}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button 
              onClick={generateProfile} 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={!profile.horizon || !profile.riskTolerance}
            >
              Generate Risk Profile
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {showResults && (
              <>
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-primary">Your Risk Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{getRiskProfile().type}</div>
                      <div className="text-sm text-muted-foreground">Investment Profile</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getRiskProfile().description}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Equity Allocation"
                    value={getRiskProfile().equityAllocation}
                    suffix="%"
                    trend="up"
                  />
                  <MetricCard
                    title="Bond Allocation"
                    value={getRiskProfile().bondAllocation}
                    suffix="%"
                    trend="neutral"
                  />
                  <MetricCard
                    title="Expected Return"
                    value={getRiskProfile().expectedReturn}
                    suffix="% p.a."
                    trend="up"
                  />
                  <MetricCard
                    title="Volatility"
                    value={getRiskProfile().volatility}
                    suffix="%"
                    trend="down"
                  />
                </div>

                <AIComment
                  title={aiComments.profiling[0].title}
                  content={aiComments.profiling[0].content}
                  type={aiComments.profiling[0].type}
                />

                <Button onClick={continueToScreening} className="w-full">
                  Continue to ETF Screening
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}