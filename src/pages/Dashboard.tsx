
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, AreaChart } from '@/components/ui/charts';
import { Users, Wallet, Coins, Building, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample KPI data
const kpiData = [
  { 
    title: "Total Users", 
    value: "24,892", 
    change: "+12.5%", 
    trend: "up",
    icon: Users,
  },
  { 
    title: "Active Wallets", 
    value: "18,472", 
    change: "+8.2%", 
    trend: "up",
    icon: Wallet,
  },
  { 
    title: "Token Supply", 
    value: "2.4M", 
    change: "+5.1%", 
    trend: "up",
    icon: Coins,
  },
  { 
    title: "Gold Reserve", 
    value: "2,350 kg", 
    change: "+3.7%", 
    trend: "up",
    icon: Building,
  },
  { 
    title: "Live Gold Price", 
    value: "$2,132.50", 
    change: "+1.2%", 
    trend: "up",
    icon: TrendingUp,
  },
];

// Sample transaction data
const recentTransactions = [
  { id: 'TX-3952', user: 'John Smith', type: 'Buy', amount: '1.5 AUR', value: '$3,198.75', time: '3 mins ago', status: 'completed' },
  { id: 'TX-3951', user: 'Sarah Johnson', type: 'Sell', amount: '0.8 AUR', value: '$1,706.00', time: '15 mins ago', status: 'completed' },
  { id: 'TX-3950', user: 'Michael Brown', type: 'Redeem', amount: '5 AUR', value: '$10,662.50', time: '45 mins ago', status: 'processing' },
  { id: 'TX-3949', user: 'Emma Wilson', type: 'Buy', amount: '2.3 AUR', value: '$4,904.75', time: '1 hour ago', status: 'completed' },
  { id: 'TX-3948', user: 'James Taylor', type: 'Mint', amount: '100 AUR', value: '$213,250.00', time: '2 hours ago', status: 'completed' },
];

// Sample chart data (simplified)
const chartData = {
  daily: [
    { name: 'Mon', buy: 34, sell: 24 },
    { name: 'Tue', buy: 42, sell: 31 },
    { name: 'Wed', buy: 51, sell: 28 },
    { name: 'Thu', buy: 48, sell: 35 },
    { name: 'Fri', buy: 61, sell: 46 },
    { name: 'Sat', buy: 39, sell: 30 },
    { name: 'Sun', buy: 27, sell: 18 },
  ],
  mintBurn: [
    { name: 'Jan', mint: 120, burn: 85 },
    { name: 'Feb', mint: 145, burn: 97 },
    { name: 'Mar', mint: 178, burn: 110 },
    { name: 'Apr', mint: 164, burn: 120 },
    { name: 'May', mint: 192, burn: 142 },
    { name: 'Jun', mint: 214, burn: 156 },
  ],
  redemption: [
    { name: 'Physical', value: 62 },
    { name: 'Vault Storage', value: 38 },
  ],
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, manage your gold-backed token ecosystem.</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="stats-card">
            <CardContent className="p-6 flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.trend === "up" ? 
                    <ArrowUp className="h-4 w-4 text-green-500" /> : 
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  }
                  <span className={`text-sm ml-1 ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className="bg-gold/10 p-3 rounded-full">
                <kpi.icon className="h-6 w-6 text-gold" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Daily buy/sell transactions over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={chartData.daily}
              index="name"
              categories={["buy", "sell"]}
              colors={["#E5C07B", "#221F26"]}
              valueFormatter={(value) => `${value} AUR`}
              className="h-80"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Redemption Distribution</CardTitle>
            <CardDescription>Physical vs Vault Storage</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={chartData.redemption}
              index="name"
              valueFormatter={(value) => `${value}%`}
              category="value"
              colors={["#E5C07B", "#221F26"]}
              className="h-80"
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mint vs Burn Trend</CardTitle>
            <CardDescription>Monitor token supply changes</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={chartData.mintBurn}
              index="name"
              categories={["mint", "burn"]}
              colors={["#E5C07B", "#221F26"]}
              valueFormatter={(value) => `${value}k AUR`}
              className="h-80"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity across the platform</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{tx.id}</span>
                      <Badge 
                        variant={tx.status === 'completed' ? "default" : "outline"}
                        className={tx.status === 'completed' ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}
                      >
                        {tx.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm">{tx.user}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {tx.type === 'Sell' ? (
                        <span className="text-red-500">-{tx.amount}</span>
                      ) : tx.type === 'Buy' ? (
                        <span className="text-green-500">+{tx.amount}</span>
                      ) : (
                        <span>{tx.amount}</span>
                      )}
                    </div>
                    <div className="text-muted-foreground text-sm">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
