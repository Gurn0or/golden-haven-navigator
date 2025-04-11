
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  X,
  User,
  Warehouse,
  Truck,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Building2,
  QrCode,
  Map,
  FileCheck,
  ArrowRight,
  Coins,
  Clock,
  Weight,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { redemptionData } from '@/data/redemption-data';

interface RedemptionDetailsProps {
  requestId: string;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onAssignVault: () => void;
  onUploadShipping: () => void;
}

const RedemptionDetails: React.FC<RedemptionDetailsProps> = ({
  requestId,
  onClose,
  onApprove,
  onReject,
  onAssignVault,
  onUploadShipping
}) => {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState('');
  const [selectedVault, setSelectedVault] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedLogistics, setSelectedLogistics] = useState('');
  
  // Find redemption by ID
  const redemption = redemptionData.find(r => r.requestId === requestId);
  
  if (!redemption) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Request Not Found</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p>The requested redemption could not be found.</p>
      </div>
    );
  }

  // Handle token burn
  const handleBurnTokens = () => {
    toast({
      title: "Tokens Burned Successfully",
      description: `${redemption.goldWeight.toFixed(2)} tokens have been burned for this redemption.`,
    });
  };

  // Generate pickup instructions
  const handleGeneratePickupInstructions = () => {
    toast({
      title: "Pickup Instructions Generated",
      description: "Pickup instructions have been sent to the customer's email.",
    });
  };
  
  // Format date
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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Redemption Request #{requestId}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Request Details</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          {/* User Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium flex items-center mb-3">
              <User className="h-4 w-4 mr-2" />
              User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{redemption.user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{redemption.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wallet ID</p>
                <p className="font-mono text-sm">{redemption.user.walletId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">KYC Status</p>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500">Verified</Badge>
                  <ShieldCheck className="h-4 w-4 ml-2 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Redemption Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Weight className="h-4 w-4 mr-2" />
              Redemption Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Gold Weight</p>
                <p className="font-medium">{redemption.goldWeight.toFixed(2)} grams</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Token Equivalent</p>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 mr-1 text-amber-500" />
                  <p className="font-medium">{redemption.goldWeight.toFixed(2)} EAU</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Redemption Mode</p>
                <div className="flex items-center mt-1">
                  {redemption.mode === 'pickup' ? (
                    <>
                      <Warehouse className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Vault Pickup</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 mr-1 text-green-500" />
                      <span>Secure Delivery</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred Vault</p>
                <p className="font-medium">{redemption.vaultLocation || "Not Assigned"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Requested On</p>
                <div className="flex items-center mt-1">
                  <CalendarDays className="h-4 w-4 mr-1 text-slate-500" />
                  <span>{formatDate(redemption.requestedOn)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="capitalize">{redemption.status}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fulfillment Panel */}
          {(redemption.status === 'submitted' || redemption.status === 'verified' || redemption.status === 'approved') && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Fulfillment Actions</h3>
              
              {redemption.mode === 'pickup' && (
                <div className="space-y-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Assign Vault Location</label>
                      <Select value={selectedVault} onValueChange={setSelectedVault}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Vault" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dubai">Dubai</SelectItem>
                          <SelectItem value="london">London</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="zurich">Zurich</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Available Pickup Slots</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time Slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">9 AM - 12 PM</SelectItem>
                          <SelectItem value="afternoon">1 PM - 4 PM</SelectItem>
                          <SelectItem value="evening">5 PM - 7 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleGeneratePickupInstructions}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate Pickup Instructions & QR
                  </Button>
                </div>
              )}
              
              {redemption.mode === 'delivery' && (
                <div className="space-y-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Logistics Provider</label>
                      <Select value={selectedLogistics} onValueChange={setSelectedLogistics}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brinks">Brinks</SelectItem>
                          <SelectItem value="loomis">Loomis</SelectItem>
                          <SelectItem value="fedex">FedEx Valuable</SelectItem>
                          <SelectItem value="local">Local Partner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tracking/AWB Number</label>
                      <Input 
                        value={trackingNumber} 
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number"
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={onUploadShipping}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Update Shipping Details
                  </Button>
                </div>
              )}
              
              {/* Token Handling */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Token Handling</h4>
                    <p className="text-sm text-muted-foreground">
                      Tokens to burn: {redemption.goldWeight.toFixed(2)} EAU
                    </p>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleBurnTokens}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Trigger Token Burn
                  </Button>
                </div>
              </div>
              
              {/* Admin Actions Buttons */}
              <div className="border-t pt-4 mt-4 flex flex-wrap gap-2">
                {(redemption.status === 'submitted' || redemption.status === 'verified') && (
                  <>
                    <Button 
                      className="flex-1" 
                      onClick={onApprove}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve Redemption
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Redemption
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Redemption Request</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Please provide a reason for rejecting this redemption request.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Textarea 
                          placeholder="Reason for rejection" 
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={onReject}>Confirm Rejection</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
                
                {redemption.status === 'approved' && (
                  <Button 
                    className="flex-1" 
                    onClick={onAssignVault}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Confirm Vault Assignment
                  </Button>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6">
          {/* Activity Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Activity Logs</h3>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="rounded-full bg-green-500 p-1">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                  <div className="h-full w-px bg-slate-200 mt-1"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Request Submitted</p>
                  <p className="text-xs text-muted-foreground">{formatDate(redemption.requestedOn)}</p>
                  <p className="text-sm mt-1">Customer requested {redemption.goldWeight.toFixed(2)}g gold redemption</p>
                </div>
              </div>
              
              {redemption.status !== 'submitted' && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-blue-500 p-1">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <div className="h-full w-px bg-slate-200 mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">KYC Verified</p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(redemption.requestedOn).getTime() + 24 * 60 * 60 * 1000).toString())}</p>
                    <p className="text-sm mt-1">Customer identity verified via existing KYC</p>
                  </div>
                </div>
              )}
              
              {(redemption.status === 'approved' || redemption.status === 'shipped' || redemption.status === 'completed') && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-green-500 p-1">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <div className="h-full w-px bg-slate-200 mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Request Approved</p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(redemption.requestedOn).getTime() + 48 * 60 * 60 * 1000).toString())}</p>
                    <p className="text-sm mt-1">Admin approved redemption request</p>
                  </div>
                </div>
              )}
              
              {(redemption.status === 'shipped' || redemption.status === 'completed') && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-amber-500 p-1">
                      {redemption.mode === 'pickup' ? (
                        <Warehouse className="h-3 w-3 text-white" />
                      ) : (
                        <Truck className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="h-full w-px bg-slate-200 mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {redemption.mode === 'pickup' ? 'Ready for Pickup' : 'Shipment Initiated'}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(redemption.requestedOn).getTime() + 72 * 60 * 60 * 1000).toString())}</p>
                    <p className="text-sm mt-1">
                      {redemption.mode === 'pickup' 
                        ? `Gold ready at ${redemption.vaultLocation} vault` 
                        : 'Shipment initiated via secure courier'}
                    </p>
                  </div>
                </div>
              )}
              
              {redemption.status === 'completed' && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-green-600 p-1">
                      <FileCheck className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Redemption Completed</p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(redemption.requestedOn).getTime() + 120 * 60 * 60 * 1000).toString())}</p>
                    <p className="text-sm mt-1">
                      {redemption.mode === 'pickup' 
                        ? 'Customer picked up gold from vault' 
                        : 'Delivery confirmed and signed for'}
                    </p>
                  </div>
                </div>
              )}
              
              {redemption.status === 'rejected' && (
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full bg-red-500 p-1">
                      <XCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Redemption Rejected</p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(new Date(redemption.requestedOn).getTime() + 36 * 60 * 60 * 1000).toString())}</p>
                    <p className="text-sm mt-1">
                      Redemption request rejected: KYC verification failure
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Blockchain Records */}
          {(redemption.status === 'approved' || redemption.status === 'shipped' || redemption.status === 'completed') && (
            <div className="bg-slate-50 p-4 rounded-lg mt-6">
              <h3 className="text-sm font-medium mb-2">Blockchain Records</h3>
              <div className="space-y-2">
                <div className="bg-slate-100 p-2 rounded text-xs font-mono">
                  <div className="flex justify-between">
                    <span>Transaction Hash:</span>
                    <span className="text-blue-600">0x83f...dc2</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Tokens Burned:</span>
                    <span>{redemption.goldWeight.toFixed(2)} EAU</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Timestamp:</span>
                    <span>{formatDate(new Date(new Date(redemption.requestedOn).getTime() + 50 * 60 * 60 * 1000).toString())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedemptionDetails;
