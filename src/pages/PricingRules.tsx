
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { RefreshCw, CircleDollarSign, TrendingUp, TrendingDown } from "lucide-react";

const PricingRules = () => {
  // State for pricing configuration
  const [oraclePrice, setOraclePrice] = useState(65.35);
  const [lastSynced, setLastSynced] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState("success");
  
  const [markupType, setMarkupType] = useState("percentage");
  const [markupValue, setMarkupValue] = useState("2");
  const [markupAppliesTo, setMarkupAppliesTo] = useState("all");
  
  const [markdownType, setMarkdownType] = useState("percentage");
  const [markdownValue, setMarkdownValue] = useState("2");
  const [autoMarkdown, setAutoMarkdown] = useState(false);
  const [markdownThreshold, setMarkdownThreshold] = useState("1000");
  const [increasedMarkdown, setIncreasedMarkdown] = useState("3");

  // Calculate prices based on markup/markdown
  const calculateBuyPrice = () => {
    if (markupType === "percentage") {
      return oraclePrice * (1 + parseFloat(markupValue) / 100);
    } else {
      return oraclePrice + parseFloat(markupValue);
    }
  };

  const calculateSellPrice = () => {
    if (markdownType === "percentage") {
      return oraclePrice * (1 - parseFloat(markdownValue) / 100);
    } else {
      return oraclePrice - parseFloat(markdownValue);
    }
  };

  const buyPrice = calculateBuyPrice();
  const sellPrice = calculateSellPrice();
  const projectedMargin = buyPrice - sellPrice;
  
  // Determine margin health
  const getMarginHealth = () => {
    if (projectedMargin <= 0) return "destructive";
    if (projectedMargin < 1) return "secondary";
    return "default";
  };

  // Mock audit log data
  const auditLogs = [
    { 
      admin: "admin@aurum.com", 
      action: "Updated Markup", 
      type: "Percentage", 
      value: "2.5%", 
      timestamp: "10 Apr, 10:30 AM",
      notes: "Weekend bump" 
    },
    { 
      admin: "john@aurum.com", 
      action: "Updated Markdown", 
      type: "Flat USD", 
      value: "$0.75", 
      timestamp: "09 Apr, 2:15 PM",
      notes: "Adjusted for market volatility" 
    },
    { 
      admin: "admin@aurum.com", 
      action: "Enabled Auto-Markdown", 
      type: "System", 
      value: "On", 
      timestamp: "08 Apr, 11:20 AM",
      notes: "Preparing for weekend liquidity fluctuations" 
    }
  ];

  // Handlers
  const handleRefreshPrice = () => {
    // Simulate API call to update oracle price
    setTimeout(() => {
      const newPrice = parseFloat((Math.random() * (68 - 63) + 63).toFixed(2));
      setOraclePrice(newPrice);
      setLastSynced(new Date());
      setSyncStatus("success");
      toast({
        title: "Price Updated",
        description: `New oracle price: $${newPrice}/gram`,
      });
    }, 800);
  };

  const handleSaveConfig = () => {
    // Simulate API call to save configuration
    setTimeout(() => {
      toast({
        title: "Configuration Saved",
        description: "Your pricing rules have been updated successfully.",
      });
    }, 600);
  };

  const handleReset = () => {
    // Reset to defaults
    setMarkupType("percentage");
    setMarkupValue("2");
    setMarkupAppliesTo("all");
    setMarkdownType("percentage");
    setMarkdownValue("2");
    setAutoMarkdown(false);
    setMarkdownThreshold("1000");
    setIncreasedMarkdown("3");
    
    toast({
      title: "Configuration Reset",
      description: "Pricing rules have been reset to default values.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pricing Rules</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Configuration */}
        <div className="lg:col-span-7 space-y-6">
          {/* Oracle Price Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-gold" />
                Oracle Price Feed
              </CardTitle>
              <CardDescription>
                Live gold price information from trusted sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold">${oraclePrice.toFixed(2)}/gram</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshPrice}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p>Chainlink</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Synced</p>
                  <p>{lastSynced.toLocaleTimeString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                <Badge 
                  variant={syncStatus === "success" ? "default" : "destructive"}
                  className="bg-green-500 text-white"
                >
                  Success ✓
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Markup Settings (Buy Side) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Buy Price Markup
              </CardTitle>
              <CardDescription>
                Configure how much to mark up the price when users buy gold
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Markup Type</p>
                <Select 
                  value={markupType} 
                  onValueChange={setMarkupType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select markup type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="flat">Flat USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Markup Value</p>
                <div className="flex items-center">
                  <Input 
                    value={markupValue}
                    onChange={(e) => setMarkupValue(e.target.value)}
                    placeholder="e.g., 2% or 1.5"
                    className="flex-1"
                  />
                  <span className="ml-2 text-lg font-medium text-muted-foreground">
                    {markupType === "percentage" ? "%" : "$"}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Applies To</p>
                <Select 
                  value={markupAppliesTo} 
                  onValueChange={setMarkupAppliesTo}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="segments">User Segments</SelectItem>
                    <SelectItem value="custom">Custom Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Markdown Settings (Sell Side) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Sell Price Markdown
              </CardTitle>
              <CardDescription>
                Configure how much to mark down the price when users sell gold
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Markdown Type</p>
                <Select 
                  value={markdownType} 
                  onValueChange={setMarkdownType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select markdown type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="flat">Flat USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Markdown Value</p>
                <div className="flex items-center">
                  <Input 
                    value={markdownValue}
                    onChange={(e) => setMarkdownValue(e.target.value)}
                    placeholder="e.g., 1.5% or 0.75"
                    className="flex-1"
                  />
                  <span className="ml-2 text-lg font-medium text-muted-foreground">
                    {markdownType === "percentage" ? "%" : "$"}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Auto-adjust during low liquidity</p>
                <Switch 
                  checked={autoMarkdown}
                  onCheckedChange={setAutoMarkdown}
                />
              </div>
              
              {autoMarkdown && (
                <div className="space-y-2 border rounded-md p-3 bg-slate-50">
                  <p className="text-sm font-medium">Liquidity Threshold</p>
                  <div className="flex items-center">
                    <p className="text-sm mr-2">If liquidity drops below</p>
                    <Input 
                      value={markdownThreshold}
                      onChange={(e) => setMarkdownThreshold(e.target.value)}
                      className="w-24"
                    />
                    <p className="text-sm mx-2">tokens, increase markdown to</p>
                    <Input 
                      value={increasedMarkdown}
                      onChange={(e) => setIncreasedMarkdown(e.target.value)}
                      className="w-16"
                    />
                    <p className="text-sm ml-2">%</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Save / Reset Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSaveConfig}>
              Save Configuration
            </Button>
          </div>
        </div>
        
        {/* Right Column - Preview and Logs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Price Impact Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Price Impact Preview</CardTitle>
              <CardDescription>
                Real-time calculation of how your settings affect pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Oracle Price</p>
                  <p className="text-xl font-semibold">${oraclePrice.toFixed(2)}</p>
                </div>
                <div></div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Buy Price</p>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold text-green-600">${buyPrice.toFixed(2)}</p>
                    <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                      +{markupType === "percentage" ? `${markupValue}%` : `$${markupValue}`}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sell Price</p>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold text-red-600">${sellPrice.toFixed(2)}</p>
                    <Badge className="ml-2 bg-red-100 text-red-800 border-red-200">
                      -{markdownType === "percentage" ? `${markdownValue}%` : `$${markdownValue}`}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Projected Margin</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold">${projectedMargin.toFixed(2)}</p>
                    <Badge className="ml-2" variant={getMarginHealth()}>
                      {getMarginHealth() === "destructive" 
                        ? "Negative" 
                        : getMarginHealth() === "secondary" 
                        ? "Slim" 
                        : "Good"}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Profit per gram of gold traded
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Audit Log Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>
                History of changes to pricing rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log, index) => (
                    <TableRow key={index} className="table-row-hover">
                      <TableCell className="font-medium">{log.admin}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.value}</TableCell>
                      <TableCell className="text-right">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PricingRules;
