
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Wallet,
  Package,
  MapPin,
  Phone,
  CalendarClock,
  Truck,
  ClipboardCheck,
  FileText,
  Send,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LogEntry {
  timestamp: string;
  status: string;
  note?: string;
}

interface DeliveryOrderDetailsProps {
  order: {
    id: string;
    user: string;
    email: string;
    kycStatus: string;
    walletId: string;
    goldWeight: string;
    tokenBurnHash: string;
    vault: string;
    status: string;
    deliveryAddress: string;
    landmark?: string;
    postalCode: string;
    contactNumber: string;
    deliveryMode: string;
    deliveryPartner?: string;
    awbNumber?: string;
    requestedOn: string;
    logs?: LogEntry[];
  };
  onUpdateStatus: (orderId: string, newStatus: string) => void;
  onClose: () => void;
}

export const DeliveryOrderDetails: React.FC<DeliveryOrderDetailsProps> = ({
  order,
  onUpdateStatus,
  onClose
}) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(order.status);
  const [deliveryPartner, setDeliveryPartner] = useState(order.deliveryPartner || "");
  const [awbNumber, setAwbNumber] = useState(order.awbNumber || "");
  const [notifyUser, setNotifyUser] = useState(true);
  const [note, setNote] = useState("");
  
  const [logs, setLogs] = useState<LogEntry[]>(
    order.logs || [
      {
        timestamp: order.requestedOn,
        status: "App Approved",
        note: "Redemption request approved through app"
      }
    ]
  );

  const handleStatusUpdate = () => {
    // Add to logs
    const newLog = {
      timestamp: new Date().toLocaleString(),
      status: status,
      note: note
    };
    
    setLogs([...logs, newLog]);
    
    // Update status
    onUpdateStatus(order.id, status);
    
    // Notify user if selected
    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `Notification sent to user about order ${order.id}`,
      });
    }
    
    toast({
      title: "Status Updated",
      description: `Order ${order.id} status updated to ${status}`,
    });
    
    setNote("");
  };
  
  const handleOutForDelivery = () => {
    if (!deliveryPartner) {
      toast({
        title: "Missing Information",
        description: "Please select a delivery partner",
        variant: "destructive"
      });
      return;
    }
    
    if (!awbNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter an AWB tracking number",
        variant: "destructive"
      });
      return;
    }
    
    setStatus("Out for Delivery");
    const newLog = {
      timestamp: new Date().toLocaleString(),
      status: "Out for Delivery",
      note: note || `Shipped with ${deliveryPartner}, AWB: ${awbNumber}`
    };
    setLogs([...logs, newLog]);
    onUpdateStatus(order.id, "Out for Delivery");
    
    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `Notification sent to user about shipment of order ${order.id}`,
      });
    }
    
    toast({
      title: "Order Out for Delivery",
      description: `Order ${order.id} marked as Out for Delivery`,
    });
    
    setNote("");
  };
  
  const handleDeliver = () => {
    setStatus("Delivered");
    const newLog = {
      timestamp: new Date().toLocaleString(),
      status: "Delivered",
      note: note || "Package delivered to customer"
    };
    setLogs([...logs, newLog]);
    onUpdateStatus(order.id, "Delivered");
    
    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `Notification sent to user about delivery of order ${order.id}`,
      });
    }
    
    toast({
      title: "Order Delivered",
      description: `Order ${order.id} marked as Delivered`,
    });
    
    setNote("");
  };
  
  const handleCancel = () => {
    setStatus("Cancelled");
    const newLog = {
      timestamp: new Date().toLocaleString(),
      status: "Cancelled",
      note: note || "Order cancelled by admin"
    };
    setLogs([...logs, newLog]);
    onUpdateStatus(order.id, "Cancelled");
    
    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `Notification sent to user about cancellation of order ${order.id}`,
      });
    }
    
    toast({
      title: "Order Cancelled",
      description: `Order ${order.id} has been cancelled`,
      variant: "destructive"
    });
    
    setNote("");
  };
  
  const handleUploadInvoice = () => {
    toast({
      title: "Upload Invoice",
      description: "Invoice upload functionality would be implemented here",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "App Approved": return "text-blue-600";
      case "Out for Delivery": return "text-yellow-600";
      case "Delivered": return "text-green-600";
      case "Cancelled": return "text-red-600";
      default: return "";
    }
  };

  return (
    <div className="py-6 space-y-6">
      {/* User Info */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <User className="h-5 w-5 mr-2" />
          User Information
        </h3>
        <div className="grid grid-cols-2 gap-3 pl-7">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{order.user}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{order.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">KYC Status</p>
            <Badge variant="outline" className={
              order.kycStatus === "Verified" 
                ? "bg-green-50 text-green-700" 
                : "bg-yellow-50 text-yellow-700"
            }>
              {order.kycStatus}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wallet ID</p>
            <div className="flex items-center">
              <p className="truncate">{order.walletId}</p>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Wallet className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Order Details */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <Package className="h-5 w-5 mr-2" />
          Redemption Details
        </h3>
        <div className="grid grid-cols-2 gap-3 pl-7">
          <div>
            <p className="text-sm text-muted-foreground">Redemption ID</p>
            <p>{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Gold Weight</p>
            <p>{order.goldWeight}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Token Burn Hash</p>
            <p className="truncate">{order.tokenBurnHash}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Vault</p>
            <p>{order.vault}</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Delivery Details */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <MapPin className="h-5 w-5 mr-2" />
          Delivery Details
        </h3>
        <div className="space-y-3 pl-7">
          <div>
            <p className="text-sm text-muted-foreground">Delivery Address</p>
            <p>{order.deliveryAddress}</p>
          </div>
          
          {order.landmark && (
            <div>
              <p className="text-sm text-muted-foreground">Landmark</p>
              <p>{order.landmark}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Postal Code</p>
              <p>{order.postalCode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Number</p>
              <div className="flex items-center">
                <p>{order.contactNumber}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Copy number">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Delivery Mode</p>
              <p>{order.deliveryMode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <Badge variant="outline" className={
                status === "App Approved" ? "bg-blue-50 text-blue-700" :
                status === "Out for Delivery" ? "bg-yellow-50 text-yellow-700" :
                status === "Delivered" ? "bg-green-50 text-green-700" :
                "bg-red-50 text-red-700"
              }>
                {status}
              </Badge>
            </div>
          </div>
          
          {(order.deliveryPartner || deliveryPartner) && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Delivery Partner</p>
                <p>{deliveryPartner || order.deliveryPartner}</p>
              </div>
              {(order.awbNumber || awbNumber) && (
                <div>
                  <p className="text-sm text-muted-foreground">AWB Number</p>
                  <p>{awbNumber || order.awbNumber}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Separator />
      
      {/* Admin Controls */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-4">
          <ClipboardCheck className="h-5 w-5 mr-2" />
          Admin Controls
        </h3>
        
        <div className="space-y-4 pl-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryPartner">Delivery Partner</Label>
              <Select value={deliveryPartner} onValueChange={setDeliveryPartner}>
                <SelectTrigger id="deliveryPartner">
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brinks">Brinks</SelectItem>
                  <SelectItem value="ShipSecure">ShipSecure</SelectItem>
                  <SelectItem value="Local Courier">Local Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="awbNumber">AWB Tracking Number</Label>
              <Input 
                id="awbNumber" 
                value={awbNumber} 
                onChange={(e) => setAwbNumber(e.target.value)}
                placeholder="Enter tracking number" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="App Approved">App Approved</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Admin Note</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add notes about this delivery"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="notify-user"
              checked={notifyUser}
              onCheckedChange={setNotifyUser}
            />
            <Label htmlFor="notify-user">Notify user of status changes</Label>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Button 
              onClick={handleStatusUpdate}
              disabled={status === order.status}
            >
              Update Status
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleOutForDelivery}
              disabled={status === "Out for Delivery" || status === "Delivered" || status === "Cancelled"}
            >
              <Truck className="mr-2 h-4 w-4" />
              Mark as Shipped
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDeliver}
              disabled={status === "App Approved" || status === "Delivered" || status === "Cancelled"}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Mark as Delivered
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleUploadInvoice}
            >
              <FileText className="mr-2 h-4 w-4" />
              Upload Invoice
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  disabled={status === "Cancelled" || status === "Delivered"}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Order
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will cancel the delivery and notify the customer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go back</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Delivery Logs */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <CalendarClock className="h-5 w-5 mr-2" />
          Delivery Logs
        </h3>
        
        <div className="space-y-3 pl-7">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start py-2 border-b border-gray-100 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 mr-2 ${getStatusColor(log.status)}`}></div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${getStatusColor(log.status)}`}>{log.status}</span>
                  <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                </div>
                {log.note && <p className="text-sm text-muted-foreground">{log.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
