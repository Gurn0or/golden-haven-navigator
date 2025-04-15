import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Users, Wallet, Coins, Building, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Welcome back, manage your gold-backed token ecosystem.</p>
      </div>
      
      {/* KPI Cards - 5 equal-width cards in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-gray-50">
                  <kpi.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{kpi.value}</h2>
                <div className="flex items-center">
                  {kpi.trend === "up" ? 
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" /> : 
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  }
                  <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts Row 1 - Transaction Volume and Redemption Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 shadow-sm">
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Daily buy/sell transactions over the past week</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[350px]">
              <BarChart 
                data={chartData.daily}
                index="name"
                categories={["buy", "sell"]}
                colors={["#E5C07B", "#221F26"]}
                valueFormatter={(value) => `${value} AUR`}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-4 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Redemption Distribution</CardTitle>
            <CardDescription>Physical vs Vault Storage</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[280px] aspect-square">
              <PieChart 
                data={chartData.redemption}
                index="name"
                category="value"
                valueFormatter={(value) => `${value}%`}
                colors={["#E5C07B", "#221F26"]}
                className="h-full w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row 2 - Mint vs Burn and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-6 shadow-sm">
          <CardHeader>
            <CardTitle>Mint vs Burn Trend</CardTitle>
            <CardDescription>Monitor token supply changes</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[350px]">
              <LineChart 
                data={chartData.mintBurn}
                index="name"
                categories={["mint", "burn"]}
                colors={["#E5C07B", "#221F26"]}
                valueFormatter={(value) => `${value}k AUR`}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-6 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest activity across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[350px] overflow-y-auto">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tx.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tx.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tx.user}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      tx.type === 'Sell' 
                        ? 'text-red-600' 
                        : tx.type === 'Buy' 
                          ? 'text-green-600' 
                          : 'text-gray-900'
                    }`}>
                      {tx.type === 'Sell' ? '-' : tx.type === 'Buy' ? '+' : ''}{tx.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.time}</p>
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
