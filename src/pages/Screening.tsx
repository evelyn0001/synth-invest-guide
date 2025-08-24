import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AIComment } from "@/components/ui/ai-comment";
import { mockETFs, aiComments } from "@/data/mockData";
import { ArrowRight, Filter, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Screening() {
  const navigate = useNavigate();
  
  const activeETFs = mockETFs.filter(etf => !etf.filtered);
  const filteredETFs = mockETFs.filter(etf => etf.filtered);

  const continueToConstruction = () => {
    navigate('/construction');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getReturnColor = (value: number) => {
    if (value > 10) return "text-success";
    if (value < 0) return "text-destructive";
    return "text-foreground";
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">ETF Universe Screening</h1>
          <p className="text-muted-foreground">
            AI-powered filtering removes high-cost and poor-performing ETFs from your investment universe.
          </p>
        </div>

        {/* Screening Summary */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{mockETFs.length}</div>
                  <div className="text-sm text-muted-foreground">Total ETFs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <div className="text-2xl font-bold text-success">{activeETFs.length}</div>
                  <div className="text-sm text-muted-foreground">Qualified ETFs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                <div>
                  <div className="text-2xl font-bold text-destructive">{filteredETFs.length}</div>
                  <div className="text-sm text-muted-foreground">Filtered Out</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div>
                  <div className="text-2xl font-bold">0.15%</div>
                  <div className="text-sm text-muted-foreground">Avg Fee</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Commentary */}
        <AIComment
          title={aiComments.screening[0].title}
          content={aiComments.screening[0].content}
          type={aiComments.screening[0].type}
        />

        {/* Qualified ETFs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Qualified ETFs ({activeETFs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Expense Ratio</TableHead>
                  <TableHead>3Y Return</TableHead>
                  <TableHead>Volatility</TableHead>
                  <TableHead>Daily Volume</TableHead>
                  <TableHead>Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeETFs.map((etf) => (
                  <TableRow key={etf.ticker}>
                    <TableCell className="font-medium">{etf.ticker}</TableCell>
                    <TableCell className="max-w-48 truncate">{etf.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{etf.sector}</Badge>
                    </TableCell>
                    <TableCell>{etf.expenseRatio.toFixed(2)}%</TableCell>
                    <TableCell className={getReturnColor(etf.threeYearReturn)}>
                      {etf.threeYearReturn > 0 ? '+' : ''}{etf.threeYearReturn.toFixed(1)}%
                    </TableCell>
                    <TableCell>{etf.volatility.toFixed(1)}%</TableCell>
                    <TableCell>{formatCurrency(etf.liquidity)}</TableCell>
                    <TableCell>
                      <Badge variant={etf.region === 'US' ? 'default' : 'outline'}>
                        {etf.region}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Filtered ETFs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              Filtered ETFs ({filteredETFs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredETFs.map((etf) => (
                <div key={etf.ticker} className="flex items-center justify-between p-4 bg-destructive-light rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{etf.ticker}</div>
                    <div className="text-sm text-muted-foreground max-w-64 truncate">{etf.name}</div>
                    <Badge variant="destructive">{etf.sector}</Badge>
                  </div>
                  <div className="text-sm text-destructive font-medium">
                    {etf.filterReason}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={continueToConstruction} className="w-full bg-gradient-primary hover:opacity-90">
          Continue to Portfolio Construction
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </AppLayout>
  );
}