
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  X, 
  Copy, 
  QrCode, 
  Coins, 
  DollarSign, 
  Shield, 
  ShieldAlert, 
  Check, 
  AlertTriangle,
  LockIcon,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  AlertCircle,
  Fingerprint,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { walletData } from "@/data/wallet-data";

interface WalletDetailsProps {
  walletId: string;
  onClose: () => void;
  onFreeze: () => void;
  onReset: () => void;
  onAddNote: () => void;
}

const WalletDetails = ({ 
  walletId, 
  onClose, 
  onFreeze, 
  onReset, 
  onAddNote 
}: WalletDetailsProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const [openCreditDialog, setOpenCreditDialog] = useState(false);
  const [openFreezeDialog, setOpenFreezeDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [tokenType, setTokenType] = useState("eAurum");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [require2fa, setRequire2fa] = useState(true);

  // Find wallet data
  const wallet = walletData.find(w => w.id === walletId);

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Wallet ID has been copied to clipboard.",
    });
  };

  const handleManualCredit = () => {
    toast({
      title: "Manual Credit Processed",
      description: `${amount} ${tokenType} has been credited to the wallet.`,
    });
    setOpenCreditDialog(false);
    setAmount("");
    setNote("");
  };

  const handleFreezeWallet = () => {
    onFreeze();
    setOpenFreezeDialog(false);
  };

  const handleAddNote = () => {
    onAddNote();
    setOpenNoteDialog(false);
    setNote("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Wallet Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Wallet Info</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* Wallet Info Tab */}
        <TabsContent value="info" className="space-y-6">
          {/* User & Wallet Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">User Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{wallet.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{wallet.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{wallet.user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{formatDate(wallet.createdAt)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Wallet Information</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Wallet ID:</p>
                <p className="font-mono text-sm">{wallet.id}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5" 
                  onClick={() => copyToClipboard(wallet.id)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <QrCode className="h-24 w-24" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={
                    wallet.status === 'active' ? 'bg-green-500' : 
                    wallet.status === 'suspended' ? 'bg-destructive' : 
                    'bg-yellow-500'
                  }>
                    {wallet.status.charAt(0).toUpperCase() + wallet.status.slice(1)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">Device Used</p>
                  <p className="font-medium">{wallet.device || "iPhone 13 Pro"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Token Holdings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Token Holdings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-amber-50 rounded-lg">
                <Coins className="h-10 w-10 text-amber-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">e-Aurum Balance</p>
                  <p className="text-xl font-bold">{wallet.eAurum.toLocaleString()} EAU</p>
                  <p className="text-xs text-muted-foreground">Origin: {wallet.mintOrigin || "Minted"}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="h-10 w-10 text-green-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">USDT Balance</p>
                  <p className="text-xl font-bold">${wallet.usdt.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Wallet Address: {wallet.onchainAddress || "0x743...8fe2"}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Tabs defaultValue="buy">
            <TabsList>
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
            </TabsList>
            
            {["buy", "sell", "withdrawals", "redemptions"].map((type) => (
              <TabsContent key={type} value={type}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wallet.transactions?.filter(t => t.type === type).map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell className="font-medium">
                          {transaction.token === "eAurum" ? 
                            `${transaction.amount.toLocaleString()} EAU` : 
                            `$${transaction.amount.toLocaleString()}`}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            transaction.status === 'completed' ? 'bg-green-500' : 
                            transaction.status === 'pending' ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {transaction.id}
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!wallet.transactions || wallet.transactions.filter(t => t.type === type).length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No {type} transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* MPC & Security Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">MPC & Security Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Shield className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">MPC Shares Status</p>
                  <div className="flex items-center mt-1">
                    <p className="font-medium mr-2">3 of 3 Active</p>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <AlertCircle className="h-10 w-10 text-purple-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">Recovery Setup</p>
                  <div className="flex items-center mt-1">
                    {wallet.security.recoverySetup === "Done" ? (
                      <>
                        <p className="font-medium mr-2">Done</p>
                        <Check className="h-5 w-5 text-green-500" />
                      </>
                    ) : (
                      <>
                        <p className="font-medium mr-2">Pending</p>
                        <X className="h-5 w-5 text-red-500" />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                <Fingerprint className="h-10 w-10 text-indigo-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">Biometric Setup</p>
                  <div className="flex items-center mt-1">
                    {wallet.security.biometricSetup ? (
                      <>
                        <p className="font-medium mr-2">Enabled</p>
                        <Check className="h-5 w-5 text-green-500" />
                      </>
                    ) : (
                      <>
                        <p className="font-medium mr-2">Disabled</p>
                        <X className="h-5 w-5 text-red-500" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Login History */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Login History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wallet.loginHistory?.map((login, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(login.date)}</TableCell>
                    <TableCell>{login.ip}</TableCell>
                    <TableCell>{login.device}</TableCell>
                    <TableCell>{login.location}</TableCell>
                  </TableRow>
                ))}
                {(!wallet.loginHistory || wallet.loginHistory.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No login history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Alert Flags */}
          {wallet.alerts && wallet.alerts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alerts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wallet.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Admin Actions Panel */}
      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Admin Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Dialog open={openFreezeDialog} onOpenChange={setOpenFreezeDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white">
                <LockIcon className="mr-2 h-4 w-4" />
                Freeze Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Freeze Wallet</DialogTitle>
                <DialogDescription>
                  Are you sure you want to freeze this wallet? This will prevent the user from making any transactions.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">Wallet ID: {wallet.id}</p>
                <p className="text-sm text-muted-foreground">User: {wallet.user.name}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenFreezeDialog(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleFreezeWallet}>Freeze Wallet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={openCreditDialog} onOpenChange={setOpenCreditDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Manual Credit/Debit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual Credit/Debit</DialogTitle>
                <DialogDescription>
                  Add or remove tokens from this wallet. This action will be logged.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="token-type">Token Type</Label>
                  <Select value={tokenType} onValueChange={setTokenType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select token type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eAurum">e-Aurum (EAU)</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="Enter amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Enter reason for this action"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="2fa" 
                    checked={require2fa} 
                    onCheckedChange={setRequire2fa}
                  />
                  <Label htmlFor="2fa">Require 2FA verification</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCreditDialog(false)}>Cancel</Button>
                <Button onClick={handleManualCredit}>Process Transaction</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="bg-white" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Wallet Access
          </Button>
          
          <Dialog open={openNoteDialog} onOpenChange={setOpenNoteDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white">
                <Info className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Internal Note</DialogTitle>
                <DialogDescription>
                  Add an internal note to this wallet. Only admins will be able to see this.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="internal-note">Note</Label>
                  <Textarea 
                    id="internal-note" 
                    placeholder="Enter your note here"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenNoteDialog(false)}>Cancel</Button>
                <Button onClick={handleAddNote}>Add Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
