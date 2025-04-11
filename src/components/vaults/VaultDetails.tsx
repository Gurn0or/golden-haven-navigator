
import React from 'react';
import { 
  Edit, 
  RefreshCw, 
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Vault, VaultStatus } from '@/pages/GoldVaults';

interface VaultDetailsProps {
  vault: Vault;
  onSyncVault: (id: string) => void;
  onEditVault: (vault: Vault) => void;
}

const VaultDetails: React.FC<VaultDetailsProps> = ({ 
  vault, 
  onSyncVault, 
  onEditVault 
}) => {
  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  // Gold value calculation (example rate: $65.35 per gram)
  const goldRatePerGram = 65.35;
  const totalValue = vault.goldHolding * goldRatePerGram;

  // Render status icon
  const renderStatusIcon = (status: VaultStatus) => {
    switch (status) {
      case 'Healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Low Stock':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'Out of Sync':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {renderStatusIcon(vault.status)}
          <Badge variant="outline" className={
            vault.type === 'Brinks' 
              ? 'bg-blue-100 text-blue-800 border-blue-300' 
              : 'bg-purple-100 text-purple-800 border-purple-300'
          }>
            {vault.type}
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => onEditVault(vault)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Vault
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{vault.name}</h3>
          <p className="text-sm text-muted-foreground">{vault.location}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Gold Stock</p>
            <p className="text-xl font-bold">{vault.goldHolding.toFixed(2)}g</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Value (USD)</p>
            <p className="text-xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Alert Threshold</p>
            <p className="font-medium">{vault.threshold.toFixed(2)}g</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Vault Partner</p>
            <p className="font-medium">{vault.partner}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Auto Sync</p>
            <Switch disabled checked={vault.autoSync} />
          </div>
          
          {vault.autoSync && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Sync Frequency</p>
              <p className="font-medium">{vault.syncFrequency}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Last Synced</p>
            </div>
            <p className="font-medium">{formatDate(vault.lastSync)}</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onSyncVault(vault.id)}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          
          <Button variant="outline" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            View Transaction Logs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VaultDetails;
