
import React, { useState } from 'react';
import { Search, Download, RefreshCw, AlertTriangle, Plus, Minus, Copy, ExternalLink, ArrowDownUp, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { 
  LineChart, 
  AreaChart 
} from '@/components/ui/charts';

// Sample data for charts and tables
const tokenActivityData = [
  { 
    id: 1, 
    date: '2025-04-10', 
    action: 'Minted', 
    quantity: 25000, 
    reason: 'Fiat Buy', 
    triggeredBy: 'System', 
    txHash: '0x8e7d45f9a2c3b1a...',
    contractType: 'Smart Contract'
  },
  { 
    id: 2, 
    date: '2025-04-09', 
    action: 'Burned', 
    quantity: 8500, 
    reason: 'Redemption', 
    triggeredBy: 'admin@eaurum.io', 
    txHash: '0x3f2e9a8c7d6b5...',
    contractType: 'Manual Override'
  },
  { 
    id: 3, 
    date: '2025-04-09', 
    action: 'Minted', 
    quantity: 12000, 
    reason: 'Crypto Buy', 
    triggeredBy: 'System', 
    txHash: '0x1a2b3c4d5e6f...',
    contractType: 'Smart Contract'
  },
  { 
    id: 4, 
    date: '2025-04-08', 
    action: 'Burned', 
    quantity: 3400, 
    reason: 'Auto Liquidity Balance', 
    triggeredBy: 'System', 
    txHash: '0x7f8e9d0c1b2a...',
    contractType: 'Smart Contract'
  },
  { 
    id: 5, 
    date: '2025-04-08', 
    action: 'Minted', 
    quantity: 16750, 
    reason: 'Fiat Buy', 
    triggeredBy: 'System', 
    txHash: '0x9e8d7c6b5a4...',
    contractType: 'Smart Contract'
  },
];

const chartData = [
  { name: 'Apr 1', Minted: 15000, Burned: 5000 },
  { name: 'Apr 2', Minted: 18000, Burned: 6200 },
  { name: 'Apr 3', Minted: 16500, Burned: 4800 },
  { name: 'Apr 4', Minted: 21000, Burned: 7500 },
  { name: 'Apr 5', Minted: 17300, Burned: 9200 },
  { name: 'Apr 6', Minted: 19800, Burned: 8100 },
  { name: 'Apr 7', Minted: 22500, Burned: 7800 },
];

const circulationData = [
  { name: 'Mar 5', 'Circulation': 1680000 },
  { name: 'Mar 12', 'Circulation': 1705000 },
  { name: 'Mar 19', 'Circulation': 1728000 },
  { name: 'Mar 26', 'Circulation': 1736000 },
  { name: 'Apr 2', 'Circulation': 1745000 },
  { name: 'Apr 9', 'Circulation': 1754000 },
];

const TokenSupply = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMintDialog, setShowMintDialog] = useState(false);
  const [showBurnDialog, setShowBurnDialog] = useState(false);
  const [filterAction, setFilterAction] = useState('all');
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      quantity: '',
      reason: '',
      wallet: '',
      notes: '',
      twoFactorEnabled: true
    }
  });

  const handleMint = (data) => {
    console.log('Minting tokens:', data);
    toast({
      title: "Tokens Minted Successfully",
      description: `${data.quantity} e-Aurum minted to wallet ${data.wallet}`,
    });
    setShowMintDialog(false);
  };

  const handleBurn = (data) => {
    console.log('Burning tokens:', data);
    toast({
      title: "Tokens Burned Successfully",
      description: `${data.quantity} e-Aurum burned from wallet ${data.wallet}`,
    });
    setShowBurnDialog(false);
  };

  const filteredActivity = filterAction === 'all' 
    ? tokenActivityData 
    : tokenActivityData.filter(item => item.action.toLowerCase() === filterAction.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">Token Supply & Control</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search Token ID or Minting Reason" 
            className="pl-10 rounded-lg"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Supply</p>
              <p className="text-2xl font-bold">2,000,000</p>
              <p className="text-xs text-muted-foreground">e-Aurum</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Coins className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Circulation</p>
              <p className="text-2xl font-bold">1,754,000</p>
              <p className="text-xs text-muted-foreground">e-Aurum</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <ArrowDownUp className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Burned Tokens</p>
              <p className="text-2xl font-bold text-red-500">246,000</p>
              <p className="text-xs text-muted-foreground">e-Aurum</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Minus className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Minted Today</p>
              <p className="text-2xl font-bold text-green-500">+18,200</p>
              <p className="text-xs text-muted-foreground">e-Aurum</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Plus className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mint vs Burn (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart 
                    data={chartData}
                    index="name"
                    categories={["Minted", "Burned"]}
                    colors={["#22c55e", "#ef4444"]}
                    valueFormatter={(value) => `${value.toLocaleString()} EAU`}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Circulation Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <AreaChart 
                    data={circulationData}
                    index="name"
                    categories={["Circulation"]}
                    colors={["#3b82f6"]}
                    valueFormatter={(value) => `${value.toLocaleString()} EAU`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex gap-4">
            <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Manual Mint
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mint New Tokens</DialogTitle>
                  <DialogDescription>
                    Create new tokens that will be added to the total supply.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleMint)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter amount" {...field} />
                          </FormControl>
                          <FormDescription>Enter the amount of e-Aurum to mint</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reason for minting" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="manual-fiat">Manual Fiat Injection</SelectItem>
                              <SelectItem value="liquidity">Liquidity Adjustment</SelectItem>
                              <SelectItem value="correction">Correction</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="wallet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination Wallet</FormLabel>
                          <FormControl>
                            <Input placeholder="0x..." {...field} />
                          </FormControl>
                          <FormDescription>Wallet address to receive tokens</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input placeholder="Add detailed notes about this mint operation" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="twoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>2FA Verification</FormLabel>
                            <FormDescription>Require 2FA to complete this action</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowMintDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Execute Mint
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showBurnDialog} onOpenChange={setShowBurnDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Minus className="h-4 w-4" />
                  Manual Burn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Burn Tokens</DialogTitle>
                  <DialogDescription>
                    Remove tokens from circulation and total supply.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleBurn)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Token Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter amount" {...field} />
                          </FormControl>
                          <FormDescription>Enter the amount of e-Aurum to burn</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reason for burning" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="redemption">Redemption</SelectItem>
                              <SelectItem value="liquidity">Liquidity Adjustment</SelectItem>
                              <SelectItem value="correction">Correction</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="wallet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source Wallet</FormLabel>
                          <FormControl>
                            <Input placeholder="0x..." {...field} />
                          </FormControl>
                          <FormDescription>Wallet address to burn tokens from</FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input placeholder="Add detailed notes about this burn operation" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="twoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>2FA Verification</FormLabel>
                            <FormDescription>Require 2FA to complete this action</FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowBurnDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" type="submit" className="gap-2">
                        <Minus className="h-4 w-4" />
                        Execute Burn
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Logs
            </Button>
            
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync Stats
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <Select 
              defaultValue="all"
              onValueChange={(value) => setFilterAction(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="minted">Minted</SelectItem>
                <SelectItem value="burned">Burned</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Triggered By</TableHead>
                  <TableHead>Tx Hash</TableHead>
                  <TableHead>Contract Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivity.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.action === 'Minted' ? 'default' : 'destructive'}
                        className={
                          item.action === 'Minted' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {item.action}
                      </Badge>
                    </TableCell>
                    <TableCell className={item.action === 'Minted' ? 'text-green-600' : 'text-red-600'}>
                      {item.action === 'Minted' ? '+' : '-'}{item.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.triggeredBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm truncate max-w-[100px]">{item.txHash}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{item.contractType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="contracts" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Main Smart Contract</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Contract Address</span>
                    <div className="flex items-center">
                      <span className="text-sm">0x4d3a1f85d2A7512D3F708a5f79a69B3B20b59...</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Minting Limit (Daily)</span>
                    <span className="text-sm">50,000 e-Aurum</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Burn Auto-Trigger Threshold</span>
                    <span className="text-sm">100,000 e-Aurum</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Gas Estimation</span>
                    <span className="text-sm">~0.0025 ETH / operation</span>
                  </div>
                  
                  <Button className="w-full mt-4">Request Update</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Admin Wallet Roles</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Owner Wallet</span>
                    <span className="text-sm">0x1e2f3a4b5c...</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Minter Role</span>
                    <span className="text-sm">2 Addresses</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Pauser Role</span>
                    <span className="text-sm">3 Addresses</span>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">View All Roles</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Mint Volume Alert</AlertTitle>
              <AlertDescription>
                Mint volume exceeded 20,000 EAU in the last hour. Possible unusual activity.
              </AlertDescription>
              <Button variant="outline" size="sm" className="mt-2">
                View Logs
              </Button>
            </Alert>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Low Liquidity Pool Buffer</AlertTitle>
              <AlertDescription>
                The liquidity pool buffer is at 240,000 EAU, below the recommended 250,000 EAU.
              </AlertDescription>
              <Button variant="outline" size="sm" className="mt-2">
                Adjust Settings
              </Button>
            </Alert>
          </div>
          
          <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
            <div>
              <h3 className="font-medium">Automation Controls</h3>
              <p className="text-sm text-muted-foreground">
                Configure automatic actions for token management.
              </p>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center space-x-2">
                <Switch id="auto-mint" />
                <label htmlFor="auto-mint" className="text-sm">Auto Minting</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-burn" />
                <label htmlFor="auto-burn" className="text-sm">Auto Burning</label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenSupply;
