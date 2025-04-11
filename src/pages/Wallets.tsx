
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Eye, 
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  Check, 
  X, 
  AlertTriangle, 
  FileText, 
  Coins, 
  DollarSign,
  Wallet,
  User,
  Filter,
  Calendar,
  DownloadCloud
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import WalletDetails from '@/components/wallets/WalletDetails';
import { walletData } from '@/data/wallet-data';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const Wallets = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tokenFilter, setTokenFilter] = useState('all');
  const [recoveryFilter, setRecoveryFilter] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter wallets based on search and filters
  const filteredWallets = walletData.filter(wallet => {
    // Search filter
    if (search && !wallet.id.toLowerCase().includes(search.toLowerCase()) && 
        !wallet.user.email.toLowerCase().includes(search.toLowerCase()) &&
        !wallet.user.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && wallet.status !== statusFilter) {
      return false;
    }
    
    // Token filter
    if (tokenFilter === 'high' && wallet.eAurum < 500) {
      return false;
    }
    
    // Recovery filter
    if (recoveryFilter && wallet.security.recoverySetup !== 'Pending') {
      return false;
    }
    
    return true;
  });

  // Handle wallet actions
  const handleViewWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    setIsDrawerOpen(true);
  };

  const handleFreezeWallet = (walletId: string) => {
    toast({
      title: "Wallet Frozen",
      description: `Wallet ${walletId.substring(0, 6)}...${walletId.substring(walletId.length - 4)} has been frozen successfully.`,
    });
  };

  const handleResetWallet = (walletId: string) => {
    toast({
      title: "Access Reset Requested",
      description: `Reset access email sent to wallet owner.`,
    });
  };

  const handleAddNote = (walletId: string) => {
    toast({
      title: "Note Added",
      description: `Note added to wallet ${walletId.substring(0, 6)}...${walletId.substring(walletId.length - 4)}.`,
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Wallet report is being generated and will download shortly.",
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'flagged':
        return <Badge className="bg-yellow-500">Flagged</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Format wallet ID
  const formatWalletId = (id: string) => {
    return `${id.substring(0, 6)}...${id.substring(id.length - 4)}`;
  };

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedWallet(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Wallet Management</h1>
        <div className="relative w-64">
          <Input
            placeholder="Search by Wallet ID or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Wallets</p>
              <h3 className="text-2xl font-bold">18,920</h3>
            </div>
            <Wallet className="h-10 w-10 text-primary opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">e-Aurum in Circulation</p>
              <h3 className="text-2xl font-bold">312,000 EAU</h3>
            </div>
            <Coins className="h-10 w-10 text-amber-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">USDT in Wallets</p>
              <h3 className="text-2xl font-bold">$1,247,000</h3>
            </div>
            <DollarSign className="h-10 w-10 text-green-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Wallets Today</p>
              <h3 className="text-2xl font-bold text-green-600">+483</h3>
            </div>
            <User className="h-10 w-10 text-blue-500 opacity-80" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wallet Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={tokenFilter} onValueChange={setTokenFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Token Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Balances</SelectItem>
            <SelectItem value="high">High Balance (&gt;500 EAU)</SelectItem>
            <SelectItem value="low">Low Balance (&lt;10 EAU)</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="recoveryFilter" 
            checked={recoveryFilter} 
            onChange={() => setRecoveryFilter(!recoveryFilter)}
            className="rounded text-primary"
          />
          <label htmlFor="recoveryFilter" className="text-sm">No Recovery Setup</label>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportReport}
          className="ml-auto"
        >
          <DownloadCloud className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Wallet Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet ID</TableHead>
              <TableHead>User Info</TableHead>
              <TableHead>e-Aurum</TableHead>
              <TableHead>USDT</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWallets.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell className="font-mono">{formatWalletId(wallet.id)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={wallet.user.avatar} alt={wallet.user.name} />
                      <AvatarFallback>{wallet.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{wallet.user.name}</p>
                      <p className="text-xs text-muted-foreground">{wallet.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-amber-500" />
                    <span>{wallet.eAurum.toLocaleString()} EAU</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>${wallet.usdt.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(wallet.createdAt)}</TableCell>
                <TableCell>{getStatusBadge(wallet.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleViewWallet(wallet.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFreezeWallet(wallet.id)}>
                          Freeze Wallet
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetWallet(wallet.id)}>
                          Reset Access
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAddNote(wallet.id)}>
                          Add Note
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Wallet Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[85vh] max-h-[85vh] overflow-y-auto">
          {selectedWallet && (
            <WalletDetails 
              walletId={selectedWallet} 
              onClose={closeDrawer}
              onFreeze={() => handleFreezeWallet(selectedWallet)}
              onReset={() => handleResetWallet(selectedWallet)}
              onAddNote={() => handleAddNote(selectedWallet)}
            />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Wallets;
