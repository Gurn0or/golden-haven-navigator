import React, { useState } from 'react';
import { 
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  LayoutGrid,
  LayoutList,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import VaultForm from '@/components/vaults/VaultForm';
import VaultDetails from '@/components/vaults/VaultDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Types
export type VaultType = 'Brinks' | 'Local';
export type VaultStatus = 'Healthy' | 'Low Stock' | 'Out of Sync';

export interface Vault {
  id: string;
  name: string;
  type: VaultType;
  location: string;
  partner: string;
  goldHolding: number; // in grams
  threshold: number; // in grams
  lastSync: Date | null;
  status: VaultStatus;
  autoSync: boolean;
  syncFrequency?: 'Manual' | 'Hourly' | '6 Hours' | 'Daily';
}

// Sample data
const initialVaults: Vault[] = [
  {
    id: "vault-1",
    name: "Brinks Dubai",
    type: "Brinks",
    location: "Dubai, UAE",
    partner: "Brinks Inc.",
    goldHolding: 1250.75,
    threshold: 1000,
    lastSync: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    status: "Healthy",
    autoSync: true,
    syncFrequency: "Hourly"
  },
  {
    id: "vault-2",
    name: "Local SG Vault",
    type: "Local",
    location: "Singapore",
    partner: "SG Gold Storage Ltd.",
    goldHolding: 836.25,
    threshold: 800,
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    status: "Low Stock",
    autoSync: false,
    syncFrequency: "Manual"
  },
  {
    id: "vault-3",
    name: "Brinks London",
    type: "Brinks",
    location: "London, UK",
    partner: "Brinks Inc.",
    goldHolding: 1200.48,
    threshold: 1000,
    lastSync: null, // Never synced
    status: "Out of Sync",
    autoSync: true,
    syncFrequency: "6 Hours"
  }
];

const GoldVaults = () => {
  const [vaults, setVaults] = useState<Vault[]>(initialVaults);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [vaultTypeFilter, setVaultTypeFilter] = useState<'All' | VaultType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | VaultStatus>('All');
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { toast } = useToast();

  // Calculate totals
  const totalGold = vaults.reduce((sum, vault) => sum + vault.goldHolding, 0);
  const totalBrinksHoldings = vaults
    .filter(vault => vault.type === 'Brinks')
    .reduce((sum, vault) => sum + vault.goldHolding, 0);
  const totalLocalHoldings = vaults
    .filter(vault => vault.type === 'Local')
    .reduce((sum, vault) => sum + vault.goldHolding, 0);
  const outOfSyncCount = vaults.filter(vault => vault.status === 'Out of Sync').length;
  const lowStockCount = vaults.filter(vault => vault.status === 'Low Stock').length;

  // Filter vaults based on search and filters
  const filteredVaults = vaults.filter(vault => {
    const matchesSearch = vault.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vault.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = vaultTypeFilter === 'All' || vault.type === vaultTypeFilter;
    const matchesStatus = statusFilter === 'All' || vault.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Format time since last sync
  const formatTimeSince = (date: Date | null): string => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)} hours ago`;
    return `${Math.floor(diffMins / (60 * 24))} days ago`;
  };

  // Handle adding a new vault
  const handleAddVault = (vault: Omit<Vault, 'id' | 'status' | 'lastSync'>) => {
    const newVault: Vault = {
      ...vault,
      id: `vault-${vaults.length + 1}`,
      status: vault.goldHolding <= vault.threshold ? 'Low Stock' : 'Healthy',
      lastSync: new Date(),
    };
    
    setVaults([...vaults, newVault]);
    setIsFormDialogOpen(false);
    toast({
      title: "Vault added successfully",
      description: `${newVault.name} has been added to your vaults.`,
    });
  };

  // Handle updating an existing vault
  const handleUpdateVault = (updatedVault: Vault) => {
    setVaults(vaults.map(vault => 
      vault.id === updatedVault.id ? updatedVault : vault
    ));
    setIsFormDialogOpen(false);
    setIsEditMode(false);
    toast({
      title: "Vault updated successfully",
      description: `${updatedVault.name} has been updated.`,
    });
  };

  // Handle deleting a vault
  const handleDeleteVault = (id: string) => {
    setVaults(vaults.filter(vault => vault.id !== id));
    toast({
      title: "Vault deleted",
      description: "The vault has been removed from your inventory.",
      variant: "destructive",
    });
  };

  // Handle syncing a vault
  const handleSyncVault = (id: string) => {
    setVaults(vaults.map(vault => {
      if (vault.id === id) {
        return {
          ...vault,
          lastSync: new Date(),
          status: vault.goldHolding <= vault.threshold ? 'Low Stock' : 'Healthy'
        };
      }
      return vault;
    }));
    
    toast({
      title: "Vault synced",
      description: "The vault data has been synchronized successfully.",
    });
  };

  // Open vault details drawer
  const openVaultDetails = (vault: Vault) => {
    setSelectedVault(vault);
    setIsDetailDrawerOpen(true);
  };

  // Open edit vault dialog
  const openEditVaultDialog = (vault: Vault) => {
    setSelectedVault(vault);
    setIsEditMode(true);
    setIsFormDialogOpen(true);
  };

  // Render status badge
  const renderStatusBadge = (status: VaultStatus) => {
    switch (status) {
      case 'Healthy':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Healthy</Badge>;
      case 'Low Stock':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Low Stock</Badge>;
      case 'Out of Sync':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1"><XCircle className="h-3 w-3" /> Out of Sync</Badge>;
    }
  };

  // Render type badge
  const renderTypeBadge = (type: VaultType) => {
    switch (type) {
      case 'Brinks':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Brinks</Badge>;
      case 'Local':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Local</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">Gold Vaults</h1>
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditMode(false);
              setSelectedVault(null);
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add Vault
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Vault' : 'Add New Vault'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? 'Update your vault details and configuration.' 
                  : 'Add a new gold storage vault to your inventory.'}
              </DialogDescription>
            </DialogHeader>
            <VaultForm 
              onSubmit={isEditMode ? handleUpdateVault : handleAddVault} 
              initialData={isEditMode ? selectedVault : undefined}
              isEditMode={isEditMode}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Low Stock / Out of Sync Alert */}
      {(lowStockCount > 0 || outOfSyncCount > 0) && (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention Required</AlertTitle>
          <AlertDescription>
            {lowStockCount > 0 && `${lowStockCount} vault(s) have low gold stock. `}
            {outOfSyncCount > 0 && `${outOfSyncCount} vault(s) are out of sync.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Filters & Summary Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-9 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vaults by name or location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select
                value={vaultTypeFilter}
                onValueChange={(value) => setVaultTypeFilter(value as 'All' | VaultType)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Vault Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Brinks">Brinks</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as 'All' | VaultStatus)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Healthy">Healthy</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Sync">Out of Sync</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="border rounded-md flex items-center">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'} 
                  size="sm"
                  className="h-9 rounded-l-md rounded-r-none"
                  onClick={() => setViewMode('table')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="sm"
                  className="h-9 rounded-r-md rounded-l-none"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="md:col-span-3">
          <CardContent className="flex flex-col justify-center h-full p-4">
            <div className="text-sm text-muted-foreground">Total Physical Gold</div>
            <div className="text-2xl font-bold">{totalGold.toFixed(2)} grams</div>
            <div className="text-xs text-muted-foreground mt-1">
              Updated {new Date().toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vault List/Grid View */}
      {viewMode === 'table' ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vault Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Gold Holding</TableHead>
                <TableHead className="text-right">Threshold</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVaults.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-24">
                    No vaults found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredVaults.map((vault) => (
                  <TableRow 
                    key={vault.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => openVaultDetails(vault)}
                  >
                    <TableCell className="font-medium">{vault.name}</TableCell>
                    <TableCell>{renderTypeBadge(vault.type)}</TableCell>
                    <TableCell>{vault.location}</TableCell>
                    <TableCell className="text-right">{vault.goldHolding.toFixed(2)}g</TableCell>
                    <TableCell className="text-right">{vault.threshold.toFixed(2)}g</TableCell>
                    <TableCell>{formatTimeSince(vault.lastSync)}</TableCell>
                    <TableCell>{renderStatusBadge(vault.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            openVaultDetails(vault);
                          }}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            openEditVaultDialog(vault);
                          }}>
                            Edit Vault
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleSyncVault(vault.id);
                          }}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteVault(vault.id);
                            }}
                          >
                            Delete Vault
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVaults.length === 0 ? (
            <div className="col-span-full p-8 text-center text-muted-foreground">
              No vaults found matching your criteria
            </div>
          ) : (
            filteredVaults.map((vault) => (
              <Card 
                key={vault.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openVaultDetails(vault)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{vault.name}</h3>
                      <p className="text-sm text-muted-foreground">{vault.location}</p>
                    </div>
                    {renderTypeBadge(vault.type)}
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gold Holding</span>
                      <span className="font-medium">{vault.goldHolding.toFixed(2)}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Threshold</span>
                      <span>{vault.threshold.toFixed(2)}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Sync</span>
                      <span>{formatTimeSince(vault.lastSync)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {renderStatusBadge(vault.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          openVaultDetails(vault);
                        }}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          openEditVaultDialog(vault);
                        }}>
                          Edit Vault
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleSyncVault(vault.id);
                        }}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sync Now
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVault(vault.id);
                          }}
                        >
                          Delete Vault
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Vault Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Vaults</h3>
            <p className="text-2xl font-bold">{vaults.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Brinks Holdings</h3>
            <p className="text-2xl font-bold">{totalBrinksHoldings.toFixed(2)}g</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Local Holdings</h3>
            <p className="text-2xl font-bold">{totalLocalHoldings.toFixed(2)}g</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Vaults Requiring Attention</h3>
            <p className="text-2xl font-bold">{outOfSyncCount + lowStockCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Vault Detail Drawer */}
      <Drawer open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Vault Details</DrawerTitle>
            <DrawerDescription>Detailed information about this vault</DrawerDescription>
          </DrawerHeader>
          {selectedVault && (
            <VaultDetails 
              vault={selectedVault}
              onSyncVault={handleSyncVault}
              onEditVault={openEditVaultDialog}
            />
          )}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default GoldVaults;
