import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon,
  CreditCard, 
  Wallet, 
  AlertTriangle, 
  Save, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Plus,
  PlusCircle,
  Trash2,
  Bell,
  Globe,
  Clock,
  Link,
  Shield,
  Database,
  DollarSign,
  Users,
  FileText,
  MoreVertical
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState("horizontal");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");

  // Mock data
  const adminUsers = [
    { id: 1, name: "John Smith", email: "jsmith@eaurum.com", role: "Super Admin", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sjohnson@eaurum.com", role: "KYC Agent", status: "active" },
    { id: 3, name: "David Lee", email: "dlee@eaurum.com", role: "Support", status: "inactive" },
    { id: 4, name: "Emma Wilson", email: "ewilson@eaurum.com", role: "Finance", status: "active" },
  ];

  const paymentGateways = [
    { id: 1, name: "Bank Transfer - HSBC", type: "bank", status: "active" },
    { id: 2, name: "Tether (USDT) - TRC20", type: "crypto", status: "active" },
    { id: 3, name: "Credit Card - Stripe", type: "card", status: "inactive" },
  ];

  // Handle save changes
  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your settings have been updated successfully."
    });
  };

  // Handle reset to defaults
  const handleResetToDefaults = () => {
    setConfirmationAction("reset");
    setConfirmationOpen(true);
  };

  // Handle confirm action
  const handleConfirmAction = () => {
    if (confirmationAction === "reset") {
      toast({
        title: "Settings Reset",
        description: "All settings have been reset to default values."
      });
    } else if (confirmationAction === "contract_update") {
      toast({
        title: "Contract Settings Updated",
        description: "Smart contract settings have been updated on the blockchain."
      });
    }
    
    setConfirmationOpen(false);
  };

  // Handle contract sync
  const handleSyncContract = () => {
    setConfirmationAction("contract_update");
    setConfirmationOpen(true);
  };

  // Handle add admin
  const handleAddAdmin = () => {
    toast({
      title: "Admin Added",
      description: "Invitation sent to new administrator."
    });
  };

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment Method Added",
      description: "New payment gateway has been configured."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Platform Settings</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setActiveView(activeView === "horizontal" ? "vertical" : "horizontal")}
          >
            {activeView === "horizontal" ? "Switch to Vertical" : "Switch to Horizontal"}
          </Button>
        </div>
      </div>

      {/* View Toggle for Layout */}
      {activeView === "horizontal" ? (
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="general" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="transaction" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Transaction
            </TabsTrigger>
            <TabsTrigger value="goldprice" className="gap-2">
              <Globe className="h-4 w-4" />
              Gold Price Feed
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Gateway
            </TabsTrigger>
            <TabsTrigger value="contract" className="gap-2">
              <Database className="h-4 w-4" />
              Smart Contract
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <Users className="h-4 w-4" />
              Admin Access
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic platform settings and defaults
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input 
                      id="platform-name" 
                      defaultValue="e-Aurum Digital Gold Platform" 
                    />
                    <p className="text-sm text-muted-foreground">
                      This will appear in emails and platform headers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input 
                      id="support-email" 
                      defaultValue="support@eaurum.com" 
                      type="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="support-phone">Support Phone</Label>
                    <Input 
                      id="support-phone" 
                      defaultValue="+1 (800) 123-4567" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-currency">Default Currency Display</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="default-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                        <SelectItem value="aud">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                        <SelectItem value="cet">CET (Central European Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locale">Locale Format</Label>
                    <Select defaultValue="en-us">
                      <SelectTrigger id="locale">
                        <SelectValue placeholder="Select locale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-us">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                        <SelectItem value="fr-fr">French (France)</SelectItem>
                        <SelectItem value="de-de">German (Germany)</SelectItem>
                        <SelectItem value="es-es">Spanish (Spain)</SelectItem>
                        <SelectItem value="ja-jp">Japanese (Japan)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction Settings Tab */}
          <TabsContent value="transaction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Settings</CardTitle>
                <CardDescription>
                  Configure fees, limits, and transaction parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="buy-fee">Buy Fee (%)</Label>
                    <Input 
                      id="buy-fee" 
                      defaultValue="0.5" 
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                    />
                    <p className="text-sm text-muted-foreground">
                      Fee charged on token purchases
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-fee">Sell Fee (%)</Label>
                    <Input 
                      id="sell-fee" 
                      defaultValue="1.0" 
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                    />
                    <p className="text-sm text-muted-foreground">
                      Fee charged on token sales
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="redemption-fee">Redemption Fee (%)</Label>
                    <Input 
                      id="redemption-fee" 
                      defaultValue="1.5" 
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                    />
                    <p className="text-sm text-muted-foreground">
                      Fee charged on physical gold redemptions
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-fee">Delivery Fee (Fixed USD)</Label>
                    <Input 
                      id="delivery-fee" 
                      defaultValue="50.00" 
                      type="number"
                      step="0.01"
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Additional fee for physical deliveries
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-transaction">Minimum Transaction Amount (USD)</Label>
                    <Input 
                      id="min-transaction" 
                      defaultValue="100.00" 
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-transaction">Maximum Transaction Amount (USD)</Label>
                    <Input 
                      id="max-transaction" 
                      defaultValue="100000.00" 
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-redemption">Minimum Redemption (grams)</Label>
                    <Input 
                      id="min-redemption" 
                      defaultValue="10.00" 
                      type="number"
                      step="0.01"
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Minimum gold weight for physical redemption
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spread">Gold Price Spread (%)</Label>
                    <Input 
                      id="spread" 
                      defaultValue="0.25" 
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                    />
                    <p className="text-sm text-muted-foreground">
                      Difference between buy and sell prices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gold Price Feed Tab */}
          <TabsContent value="goldprice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gold Price Feed Configuration</CardTitle>
                <CardDescription>
                  Configure price feed sources and update frequency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price-source">Primary Price Source</Label>
                    <Select defaultValue="chainlink">
                      <SelectTrigger id="price-source">
                        <SelectValue placeholder="Select price source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chainlink">Chainlink Oracle</SelectItem>
                        <SelectItem value="apikey">LBMA API</SelectItem>
                        <SelectItem value="manual">Manual Updates</SelectItem>
                        <SelectItem value="custom">Custom API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="update-frequency">Update Frequency</Label>
                    <Select defaultValue="10min">
                      <SelectTrigger id="update-frequency">
                        <SelectValue placeholder="Select update frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">Every 1 Minute</SelectItem>
                        <SelectItem value="10min">Every 10 Minutes</SelectItem>
                        <SelectItem value="1hr">Every Hour</SelectItem>
                        <SelectItem value="6hr">Every 6 Hours</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key (if applicable)</Label>
                    <Input 
                      id="api-key" 
                      defaultValue="••••••••••••••••••••" 
                      type="password"
                    />
                    <p className="text-sm text-muted-foreground">
                      Required for certain price feed sources
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API Endpoint (if applicable)</Label>
                    <Input 
                      id="api-endpoint" 
                      defaultValue="https://api.goldfeed.example.com/v1/price" 
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fallback-toggle">Enable Fallback Feed</Label>
                      <Switch id="fallback-toggle" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If primary feed fails, system will use the fallback source
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fallback-source">Fallback Source</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger id="fallback-source">
                        <SelectValue placeholder="Select fallback source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Price Entry</SelectItem>
                        <SelectItem value="apikey">Secondary API</SelectItem>
                        <SelectItem value="chainlink">Backup Oracle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price-deviation">Max Price Deviation Alert (%)</Label>
                    <Input 
                      id="price-deviation" 
                      defaultValue="5.0" 
                      type="number"
                      step="0.1"
                      min="0"
                      max="20"
                    />
                    <p className="text-sm text-muted-foreground">
                      Trigger alert if price changes by this percentage
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Gateway Tab */}
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateway Configuration</CardTitle>
                <CardDescription>
                  Configure payment methods and external integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Active Payment Methods</h3>
                    <Button onClick={handleAddPaymentMethod}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="border rounded-md divide-y">
                    {paymentGateways.map((gateway) => (
                      <div key={gateway.id} className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {gateway.type === 'bank' && <CreditCard className="h-5 w-5 text-blue-500" />}
                          {gateway.type === 'crypto' && <Wallet className="h-5 w-5 text-purple-500" />}
                          {gateway.type === 'card' && <CreditCard className="h-5 w-5 text-green-500" />}
                          <div>
                            <p className="font-medium">{gateway.name}</p>
                            <p className="text-sm text-muted-foreground capitalize">{gateway.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={gateway.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                            {gateway.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input 
                        id="webhook-url" 
                        defaultValue="https://api.eaurum.com/webhooks/payment" 
                      />
                      <p className="text-sm text-muted-foreground">
                        Endpoint for receiving payment confirmations
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-secret">Webhook Secret</Label>
                      <Input 
                        id="webhook-secret" 
                        defaultValue="••••••••••••••••••••" 
                        type="password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transaction-timeout">Transaction Timeout (minutes)</Label>
                      <Input 
                        id="transaction-timeout" 
                        defaultValue="30" 
                        type="number"
                        min="1"
                        max="120"
                      />
                      <p className="text-sm text-muted-foreground">
                        How long to wait for payment confirmation
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-blocks">Blockchain Confirmations Required</Label>
                      <Input 
                        id="confirm-blocks" 
                        defaultValue="12" 
                        type="number"
                        min="1"
                        max="100"
                      />
                      <p className="text-sm text-muted-foreground">
                        For crypto payments only
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Contract Tab */}
          <TabsContent value="contract" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Smart Contract Settings</CardTitle>
                <CardDescription>
                  Configure blockchain interactions and contract parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="token-contract">Token Contract Address</Label>
                    <Input 
                      id="token-contract" 
                      defaultValue="0x7d2ae8f3e2d36abf38172466d876c487aef41392" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mint-contract">Token Mint Contract</Label>
                    <Input 
                      id="mint-contract" 
                      defaultValue="0x4b3a27c35a321a2032ae30b9e5b320b0f3939af3" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="burn-contract">Token Burn Contract</Label>
                    <Input 
                      id="burn-contract" 
                      defaultValue="0x2c78f1b70c72520eaa6aacc89b6fc76a890dfe25" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-mint">Max Daily Mint (tokens)</Label>
                    <Input 
                      id="max-mint" 
                      defaultValue="100000" 
                      type="number"
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum tokens that can be minted in 24 hours
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-burn">Max Daily Burn (tokens)</Label>
                    <Input 
                      id="max-burn" 
                      defaultValue="50000" 
                      type="number"
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum tokens that can be burned in 24 hours
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-burn">Auto-Burn Threshold</Label>
                    <Input 
                      id="auto-burn" 
                      defaultValue="1000" 
                      type="number"
                      min="0"
                    />
                    <p className="text-sm text-muted-foreground">
                      Automatically burn tokens when redemptions exceed threshold
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="network">Blockchain Network</Label>
                    <Select defaultValue="ethereum">
                      <SelectTrigger id="network">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                        <SelectItem value="optimism">Optimism</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gas-strategy">Gas Price Strategy</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="gas-strategy">
                        <SelectValue placeholder="Select gas strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority (Cheaper)</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority (Faster)</SelectItem>
                        <SelectItem value="custom">Custom Gas Settings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Admin Wallets (Multi-Sig)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input defaultValue="0x8f3e2d36abf38172466d876c487aef413927d2ae" readOnly />
                      <Badge>Primary</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input defaultValue="0xd36abf38172466d876c487aef413927d2ae8f3e2" readOnly />
                      <Badge>Secondary</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input defaultValue="0xbf38172466d876c487aef413927d2ae8f3e2d36a" readOnly />
                      <Badge>Backup</Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="mr-4" onClick={handleSyncContract}>
                    <Link className="h-4 w-4 mr-2" />
                    Sync to Blockchain
                  </Button>
                  <Button variant="secondary">
                    Request Contract Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Access Tab */}
          <TabsContent value="admin" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Users & Permissions</CardTitle>
                <CardDescription>
                  Manage administrator access and role assignments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Admin Users</h3>
                  <Button onClick={handleAddAdmin}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </div>

                <div className="border rounded-md divide-y">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary">{user.role}</Badge>
                        <Badge className={user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Role Permissions</h3>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Super Admin</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="super-users">Manage Users</Label>
                            <Switch id="super-users" defaultChecked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="super-wallets">Manage Wallets</Label>
                            <Switch id="super-wallets" defaultChecked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="super-contracts">Manage Contracts</Label>
                            <Switch id="super-contracts" defaultChecked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="super-settings">Change Settings</Label>
                            <Switch id="super-settings" defaultChecked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="super-admins">Manage Admins</Label>
                            <Switch id="super-admins" defaultChecked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="super-redemptions">Manage Redemptions</Label>
                            <Switch id="super-redemptions" defaultChecked disabled />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">KYC Agent</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="kyc-users">Manage Users</Label>
                            <Switch id="kyc-users" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="kyc-wallets">View Wallets</Label>
                            <Switch id="kyc-wallets" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="kyc-contracts">Manage Contracts</Label>
                            <Switch id="kyc-contracts" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="kyc-settings">Change Settings</Label>
                            <Switch id="kyc-settings" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="kyc-admins">Manage Admins</Label>
                            <Switch id="kyc-admins" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="kyc-redemptions">View Redemptions</Label>
                            <Switch id="kyc-redemptions" defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Support Agent</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-users">View Users</Label>
                            <Switch id="support-users" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-wallets">View Wallets</Label>
                            <Switch id="support-wallets" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-contracts">Manage Contracts</Label>
                            <Switch id="support-contracts" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-settings">Change Settings</Label>
                            <Switch id="support-settings" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-admins">Manage Admins</Label>
                            <Switch id="support-admins" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-redemptions">View Redemptions</Label>
                            <Switch id="support-redemptions" defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification & Alert Settings</CardTitle>
                <CardDescription>
                  Configure system alerts and notification thresholds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-alerts">Email Alerts</Label>
                        <Switch id="email-alerts" defaultChecked />
                      </div>
                      <Input 
                        placeholder="alert@eaurum.com" 
                        defaultValue="alerts@eaurum.com" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-alerts">SMS Alerts</Label>
                        <Switch id="sms-alerts" defaultChecked />
                      </div>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        defaultValue="+1 (800) 555-7890" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-alerts">Slack Integration</Label>
                        <Switch id="slack-alerts" defaultChecked />
                      </div>
                      <Input 
                        placeholder="Webhook URL" 
                        defaultValue="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="telegram-alerts">Telegram Bot</Label>
                        <Switch id="telegram-alerts" />
                      </div>
                      <Input 
                        placeholder="Bot Token" 
                        defaultValue="" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Thresholds</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vault-threshold">Low Vault Reserves Threshold (%)</Label>
                      <Input 
                        id="vault-threshold" 
                        defaultValue="20" 
                        type="number"
                        min="1"
                        max="50"
                      />
                      <p className="text-sm text-muted-foreground">
                        Alert when vault reserves drop below this percentage
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="burn-failures">Token Burn Retry Attempts</Label>
                      <Input 
                        id="burn-failures" 
                        defaultValue="3" 
                        type="number"
                        min="1"
                        max="10"
                      />
                      <p className="text-sm text-muted-foreground">
                        Number of attempts before sending alert
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="redemption-threshold">Redemption Delay Threshold (hours)</Label>
                      <Input 
                        id="redemption-threshold" 
                        defaultValue="48" 
                        type="number"
                        min="1"
                        max="168"
                      />
                      <p className="text-sm text-muted-foreground">
                        Alert when redemptions aren't processed within this time
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transaction-threshold">Unusual Transaction Amount (USD)</Label>
                      <Input 
                        id="transaction-threshold" 
                        defaultValue="50000" 
                        type="number"
                        min="1000"
                      />
                      <p className="text-sm text-muted-foreground">
                        Flag transactions above this amount
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="security-alerts">Security Alerts</Label>
                        <Switch id="security-alerts" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Login attempts, permission changes, admin actions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Vertical Layout using Accordion
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="general">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <SettingsIcon className="h-4 w-4" />
                    <span>General</span>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="transaction">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Transaction</span>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="goldprice">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <Globe className="h-4 w-4" />
                    <span>Gold Price Feed</span>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="payment">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Gateway</span>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="contract">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <Database className="h-4 w-4" />
                    <span>Smart Contract</span>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="admin">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <Users className="h-4 w-4" />
                    <span>Admin Access</span>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="notifications">
                  <AccordionTrigger className="flex items-center gap-2 py-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </AccordionTrigger>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Select a category from the sidebar to configure platform settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <SettingsIcon className="h-12 w-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Select a Settings Category</h3>
                <p className="text-muted-foreground">
                  Choose a category from the sidebar to view and edit settings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Global action buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={handleResetToDefaults}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmationAction === 'reset' ? 'Reset Settings?' : 'Update Smart Contract?'}
            </DialogTitle>
            <DialogDescription>
              {confirmationAction === 'reset'
                ? 'This will revert all settings to their default values. This action cannot be undone.'
                : 'This will sync your changes to the blockchain. This action may incur gas fees and cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-3 mt-2 rounded-md bg-yellow-50 text-yellow-800 border border-yellow-200">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">
              {confirmationAction === 'reset'
                ? 'All custom configurations will be lost.'
                : 'Please ensure all contract settings are correct before proceeding.'}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={confirmationAction === 'reset' ? 'destructive' : 'default'} 
              onClick={handleConfirmAction}
            >
              {confirmationAction === 'reset' ? 'Reset Settings' : 'Confirm Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
