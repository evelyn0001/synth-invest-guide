// Mock data for ETF Portfolio App

export interface ETF {
  ticker: string;
  name: string;
  sector: string;
  expenseRatio: number;
  threeYearReturn: number;
  volatility: number;
  liquidity: number;
  region: 'US' | 'Singapore' | 'Global';
  isESG?: boolean;
  filtered?: boolean;
  filterReason?: string;
}

export interface RiskProfile {
  type: 'Conservative' | 'Balanced' | 'Aggressive';
  equityAllocation: number;
  bondAllocation: number;
  description: string;
  expectedReturn: number;
  volatility: number;
}

export interface PortfolioAllocation {
  ticker: string;
  weight: number;
  expectedReturn: number;
  volatility: number;
}

export interface AIComment {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
}

export const mockETFs: ETF[] = [
  {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    sector: 'Broad Market',
    expenseRatio: 0.09,
    threeYearReturn: 12.5,
    volatility: 18.2,
    liquidity: 45000000,
    region: 'US'
  },
  {
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    sector: 'Technology',
    expenseRatio: 0.20,
    threeYearReturn: 15.8,
    volatility: 22.1,
    liquidity: 28000000,
    region: 'US'
  },
  {
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    sector: 'Broad Market',
    expenseRatio: 0.03,
    threeYearReturn: 11.9,
    volatility: 17.8,
    liquidity: 12000000,
    region: 'US'
  },
  {
    ticker: 'ES3.SI',
    name: 'SPDR STI ETF',
    sector: 'Singapore Market',
    expenseRatio: 0.30,
    threeYearReturn: 8.4,
    volatility: 16.5,
    liquidity: 2500000,
    region: 'Singapore'
  },
  {
    ticker: 'A17U.SI',
    name: 'Ascendas REIT',
    sector: 'Real Estate',
    expenseRatio: 0.00,
    threeYearReturn: 6.2,
    volatility: 24.3,
    liquidity: 1800000,
    region: 'Singapore'
  },
  {
    ticker: 'XLV',
    name: 'Health Care Select Sector SPDR Fund',
    sector: 'Healthcare',
    expenseRatio: 0.12,
    threeYearReturn: 9.7,
    volatility: 15.6,
    liquidity: 8500000,
    region: 'US',
    isESG: true
  },
  {
    ticker: 'TLT',
    name: 'iShares 20+ Year Treasury Bond ETF',
    sector: 'Bonds',
    expenseRatio: 0.15,
    threeYearReturn: -2.1,
    volatility: 13.8,
    liquidity: 9200000,
    region: 'US'
  },
  {
    ticker: 'VXUS',
    name: 'Vanguard Total International Stock ETF',
    sector: 'International',
    expenseRatio: 0.08,
    threeYearReturn: 7.3,
    volatility: 19.4,
    liquidity: 3400000,
    region: 'Global'
  },
  {
    ticker: 'ARKK',
    name: 'ARK Innovation ETF',
    sector: 'Technology',
    expenseRatio: 0.75,
    threeYearReturn: -15.2,
    volatility: 35.7,
    liquidity: 4600000,
    region: 'US',
    filtered: true,
    filterReason: 'High volatility (35.7%) exceeds risk tolerance'
  },
  {
    ticker: 'COST',
    name: 'Costco Wholesale Corporation',
    sector: 'Consumer',
    expenseRatio: 0.89,
    threeYearReturn: 14.2,
    volatility: 21.1,
    liquidity: 800000,
    region: 'US',
    filtered: true,
    filterReason: 'High expense ratio (0.89%) vs median (0.15%)'
  }
];

export const riskProfiles: Record<string, RiskProfile> = {
  Conservative: {
    type: 'Conservative',
    equityAllocation: 30,
    bondAllocation: 70,
    description: 'Low risk, focused on capital preservation with steady income',
    expectedReturn: 5.2,
    volatility: 8.5
  },
  Balanced: {
    type: 'Balanced',
    equityAllocation: 60,
    bondAllocation: 40,
    description: 'Moderate risk with balanced growth and income approach',
    expectedReturn: 8.7,
    volatility: 12.3
  },
  Aggressive: {
    type: 'Aggressive',
    equityAllocation: 85,
    bondAllocation: 15,
    description: 'High risk, growth-focused with long-term wealth building',
    expectedReturn: 11.4,
    volatility: 16.8
  }
};

export const mockPortfolioAllocations: PortfolioAllocation[] = [
  { ticker: 'SPY', weight: 35, expectedReturn: 12.5, volatility: 18.2 },
  { ticker: 'VTI', weight: 20, expectedReturn: 11.9, volatility: 17.8 },
  { ticker: 'VXUS', weight: 15, expectedReturn: 7.3, volatility: 19.4 },
  { ticker: 'TLT', weight: 20, expectedReturn: -2.1, volatility: 13.8 },
  { ticker: 'XLV', weight: 10, expectedReturn: 9.7, volatility: 15.6 }
];

export const aiComments: Record<string, AIComment[]> = {
  profiling: [
    {
      title: 'Risk Assessment Complete',
      content: 'Based on your 5+ year investment horizon and moderate risk tolerance, a Balanced portfolio with 60% equities and 40% bonds provides optimal risk-adjusted returns.',
      type: 'success'
    }
  ],
  screening: [
    {
      title: 'High-Cost ETFs Filtered',
      content: 'ARKK removed due to excessive volatility (35.7%) and poor 3-year performance (-15.2%). COST filtered for high expense ratio (0.89%) vs industry median (0.15%).',
      type: 'warning'
    }
  ],
  construction: [
    {
      title: 'Optimal Allocation Generated',
      content: 'Modern Portfolio Theory suggests 35% SPY for core US exposure, 20% international diversification via VXUS, and 20% TLT bonds for downside protection during market stress.',
      type: 'info'
    }
  ],
  insights: [
    {
      title: 'Market Outlook',
      content: 'Rising interest rates may pressure tech valuations (QQQ -8% expected). Healthcare ETFs (XLV) remain defensive plays amid aging demographics and regulatory clarity.',
      type: 'warning'
    }
  ],
  scenario: [
    {
      title: 'Recession Scenario Analysis',
      content: 'In a global recession scenario, your portfolio shows resilience with TLT bonds (+15% expected) offsetting equity declines. Maximum drawdown limited to -18% vs -25% for 100% equity portfolio.',
      type: 'info'
    }
  ],
  recommendation: [
    {
      title: 'Core-Satellite Strategy',
      content: 'Core holdings (SPY, VTI, TLT) provide 75% allocation for stability. Satellite positions in XLV healthcare and ES3.SI Singapore exposure add diversification and growth potential.',
      type: 'success'
    }
  ],
  monitoring: [
    {
      title: 'Portfolio Alert',
      content: 'Fed rate hike probability increased to 75%. Your TLT bond allocation may face near-term pressure (-3% expected) but provides long-term stability. Consider rebalancing if bonds drift below 35% allocation.',
      type: 'warning'
    }
  ],
  rebalancing: [
    {
      title: 'Rebalancing Required',
      content: 'Market performance has shifted your equity allocation to 72% vs 60% target. Recommend trimming SPY (-5%) and adding TLT (+5%) to maintain risk profile and capture bond yield opportunities.',
      type: 'info'
    }
  ]
};

export const mockNews = [
  {
    id: 1,
    headline: 'Fed Signals Potential Rate Cuts in 2024',
    summary: 'Federal Reserve officials hint at possible rate reductions amid cooling inflation',
    impact: 'Positive for bonds, mixed for equities',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    headline: 'Healthcare Sector Outperforms on Drug Approvals',
    summary: 'Major pharmaceutical companies see gains following FDA approvals',
    impact: 'Bullish for XLV healthcare ETF',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    headline: 'Singapore Market Resilience Amid Regional Tensions',
    summary: 'STI index shows stability despite geopolitical concerns',
    impact: 'Supportive for ES3.SI positioning',
    timestamp: '6 hours ago'
  }
];

export const mockAlerts = [
  {
    id: 1,
    title: 'Rebalancing Trigger',
    message: 'Your equity allocation has drifted 8% above target',
    type: 'warning' as const,
    timestamp: '10 minutes ago'
  },
  {
    id: 2,
    title: 'Market Opportunity',
    message: 'TLT yields have reached attractive entry levels (4.8%)',
    type: 'success' as const,
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    title: 'Volatility Alert',
    message: 'VIX spike detected - consider defensive positioning',
    type: 'warning' as const,
    timestamp: '3 hours ago'
  }
];