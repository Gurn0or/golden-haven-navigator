
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  Calendar, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Building2, 
  Truck, 
  FileText, 
  Loader2, 
  Download, 
  Eye, 
  Warehouse,
  TrendingUp,
  Weight,
  Package
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import RedemptionDetails from '@/components/redemptions/RedemptionDetails';
import { redemptionData } from '@/data/redemption-data';

const Redemptions = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [vaultFilter, setVaultFilter] = useState('all');
  const [selectedRedemption, setSelectedRedemption] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter redemptions based on search and filters
  const filteredRedemptions = redemptionData.filter(redemption => {
    // Search filter
    if (search && !redemption.requestId.toLowerCase().includes(search.toLowerCase()) && 
        !redemption.user.name.toLowerCase().includes(search.toLowerCase()) &&
        !redemption.user.email.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && redemption.status !== statusFilter) {
      return false;
    }
    
    // Mode filter
    if (modeFilter !== 'all' && redemption.mode !== modeFilter) {
      return false;
    }
    
    // Vault filter
    if (vaultFilter !== 'all' && redemption.vaultLocation !== vaultFilter) {
      return false;
    }
    
    return true;
  });

  // Handle redemption actions
  const handleViewRedemption = (requestId: string) => {
    setSelectedRedemption(requestId);
    setIsDrawerOpen(true);
  };

  const handleApproveRedemption = (requestId: string) => {
    toast({
      title: "Redemption Approved",
      description: `Request #${requestId} has been approved successfully.`,
    });
  };

  const handleRejectRedemption = (requestId: string) => {
    toast({
      title: "Redemption Rejected",
      description: `Request #${requestId} has been rejected.`,
    });
  };

  const handleAssignVault = (requestId: string) => {
    toast({
      title: "Vault Assigned",
      description: `Vault assigned to request #${requestId}.`,
    });
  };

  const handleUploadShipping = (requestId: string) => {
    toast({
      title: "Shipping Details Updated",
      description: `Shipping information for request #${requestId} has been updated.`,
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Redemption report is being generated and will download shortly.",
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case 'verified':
        return <Badge className="bg-purple-500">Verified</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'shipped':
        return <Badge className="bg-amber-500">Shipped</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-500">Completed</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
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

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRedemption(null);
  };

  // Calculate summary stats
  const totalRedemptions = redemptionData.length;
  const pendingApprovals = redemptionData.filter(r => r.status === 'submitted' || r.status === 'verified').length;
  const inTransit = redemptionData.filter(r => r.status === 'shipped').length;
  const totalGoldRedeemed = redemptionData
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.goldWeight, 0);

  // Calculate alerts
  const pendingVaultAssignments = redemptionData.filter(r => r.status === 'approved' && !r.vaultLocation).length;
  const lateDeliveries = redemptionData.filter(r => {
    if (r.status === 'shipped' && r.mode === 'delivery') {
      // Check if delivery is over 7 days
      const shippedDate = new Date(r.requestedOn);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - shippedDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 7;
    }
    return false;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Redemption Requests</h1>
        <div className="relative w-64">
          <Input
            placeholder="Search by User, Wallet or Request ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Alerts */}
      {(pendingVaultAssignments > 0 || lateDeliveries > 0) && (
        <div className="space-y-3">
          {pendingVaultAssignments > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                {pendingVaultAssignments} redemption{pendingVaultAssignments > 1 ? 's' : ''} awaiting vault assignment
              </AlertDescription>
            </Alert>
          )}
          
          {lateDeliveries > 0 && (
            <Alert className="bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-600">Delivery Delays</AlertTitle>
              <AlertDescription>
                {lateDeliveries} delivery{lateDeliveries > 1 ? 'ies have' : 'y has'} exceeded estimated delivery time
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Redemptions</p>
              <h3 className="text-2xl font-bold">{totalRedemptions.toLocaleString()}</h3>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
              <h3 className="text-2xl font-bold">{pendingApprovals.toLocaleString()}</h3>
            </div>
            <AlertTriangle className="h-10 w-10 text-amber-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Gold in Transit</p>
              <h3 className="text-2xl font-bold">{inTransit.toLocaleString()}</h3>
            </div>
            <Truck className="h-10 w-10 text-purple-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Gold Redeemed</p>
              <h3 className="text-2xl font-bold">{totalGoldRedeemed.toFixed(2)} Kg</h3>
            </div>
            <Weight className="h-10 w-10 text-amber-600 opacity-80" />
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
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Redemption Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={vaultFilter} onValueChange={setVaultFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Vault Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vaults</SelectItem>
            <SelectItem value="dubai">Dubai</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="zurich">Zurich</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportReport}
          className="ml-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Redemptions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Vault Location</TableHead>
              <TableHead>Gold Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Requested On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRedemptions.map((redemption) => (
              <TableRow key={redemption.requestId}>
                <TableCell className="font-mono">{redemption.requestId}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={redemption.user.avatar} alt={redemption.user.name} />
                      <AvatarFallback>{redemption.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{redemption.user.name}</p>
                      <p className="text-xs text-muted-foreground">{redemption.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{redemption.vaultLocation || "—"}</TableCell>
                <TableCell>{redemption.goldWeight.toFixed(2)} g</TableCell>
                <TableCell>{getStatusBadge(redemption.status)}</TableCell>
                <TableCell>
                  {redemption.mode === 'pickup' ? (
                    <div className="flex items-center gap-1">
                      <Warehouse className="h-4 w-4 text-blue-500" />
                      <span>Pickup</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span>Delivery</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{formatDate(redemption.requestedOn)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleViewRedemption(redemption.requestId)}
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
                        {(redemption.status === 'submitted' || redemption.status === 'verified') && (
                          <DropdownMenuItem onClick={() => handleApproveRedemption(redemption.requestId)}>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        
                        {(redemption.status === 'submitted' || redemption.status === 'verified') && (
                          <DropdownMenuItem onClick={() => handleRejectRedemption(redemption.requestId)}>
                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                            Reject
                          </DropdownMenuItem>
                        )}
                        
                        {redemption.status === 'approved' && (
                          <DropdownMenuItem onClick={() => handleAssignVault(redemption.requestId)}>
                            <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                            Assign Vault
                          </DropdownMenuItem>
                        )}
                        
                        {redemption.status === 'approved' && redemption.mode === 'delivery' && (
                          <DropdownMenuItem onClick={() => handleUploadShipping(redemption.requestId)}>
                            <Truck className="h-4 w-4 mr-2 text-purple-500" />
                            Upload Shipping
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Redemption Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[85vh] max-h-[85vh] overflow-y-auto">
          {selectedRedemption && (
            <RedemptionDetails 
              requestId={selectedRedemption} 
              onClose={closeDrawer}
              onApprove={() => handleApproveRedemption(selectedRedemption)}
              onReject={() => handleRejectRedemption(selectedRedemption)}
              onAssignVault={() => handleAssignVault(selectedRedemption)}
              onUploadShipping={() => handleUploadShipping(selectedRedemption)}
            />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Redemptions;
