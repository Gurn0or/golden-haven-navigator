
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Wallet,
  Package,
  Store,
  CalendarClock,
  ClipboardCheck,
  AlertTriangle,
  Send,
  QrCode
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

interface PickupOrderDetailsProps {
  order: {
    id: string;
    user: string;
    email: string;
    kycStatus: string;
    walletId: string;
    vendor: string;
    vendorId: string;
    goldWeight: string;
    tokenBurnHash: string;
    vault: string;
    status: string;
    pickupDate: string;
    timeSlot: string;
    pickupCode: string;
    requestedOn: string;
    logs?: LogEntry[];
  };
  onUpdateStatus: (orderId: string, newStatus: string) => void;
  onClose: () => void;
}

export const PickupOrderDetails: React.FC<PickupOrderDetailsProps> = ({
  order,
  onUpdateStatus,
  onClose
}) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(order.status);
  const [notifyUser, setNotifyUser] = useState(true);
  const [notifyVendor, setNotifyVendor] = useState(true);
  const [note, setNote] = useState("");
  
  const [logs, setLogs] = useState<LogEntry[]>(
    order.logs || [
      {
        timestamp: order.requestedOn,
        status: "Scheduled",
        note: "Pickup scheduled through app"
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
    
    // Notify vendor if selected
    if (notifyVendor) {
      toast({
        title: "Vendor Notified",
        description: `Notification sent to vendor about order ${order.id}`,
      });
    }
    
    toast({
      title: "Status Updated",
      description: `Order ${order.id} status updated to ${status}`,
    });
    
    setNote("");
  };
  
  const handleMarkPicked = () => {
    setStatus("Picked");
    const newLog = {
      timestamp: new Date().toLocaleString(),
      status: "Picked",
      note: note || "Gold picked up by customer"
    };
    setLogs([...logs, newLog]);
    onUpdateStatus(order.id, "Picked");
    
    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `Notification sent to user about order ${order.id}`,
      });
    }
    
    toast({
      title: "Order Picked Up",
      description: `Order ${order.id} marked as Picked`,
    });
    
    setNote("");
  };
  
  const handleMarkMissed = () => {
    setStatus("Missed");
    const newLog = {
      timestamp: new Date().toLocaleString(),
      status: "Missed",
      note: note || "Pickup appointment missed by customer"
    };
    setLogs([...logs, newLog]);
    onUpdateStatus(order.id, "Missed");
    
    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `Notification sent to user about missed pickup`,
      });
    }
    
    toast({
      title: "Pickup Missed",
      description: `Order ${order.id} marked as Missed`,
      variant: "destructive"
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
    
    if (notifyVendor) {
      toast({
        title: "Vendor Notified",
        description: `Notification sent to vendor about cancellation of order ${order.id}`,
      });
    }
    
    toast({
      title: "Order Cancelled",
      description: `Order ${order.id} has been cancelled`,
      variant: "destructive"
    });
    
    setNote("");
  };
  
  const handleNotifyVendor = () => {
    toast({
      title: "Vendor Notified",
      description: `Reminder sent to vendor about order ${order.id}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "text-blue-600";
      case "Picked": return "text-green-600";
      case "Missed": return "text-yellow-600";
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
      
      {/* Pickup Details */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <Store className="h-5 w-5 mr-2" />
          Pickup Details
        </h3>
        <div className="space-y-3 pl-7">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Vendor</p>
              <div className="flex items-center">
                <p>{order.vendor}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="View Vendor Profile">
                  <Store className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vendor ID</p>
              <p>{order.vendorId}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Pickup Date</p>
              <p>{order.pickupDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time Slot</p>
              <p>{order.timeSlot}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Pickup Code</p>
            <div className="flex items-center space-x-2">
              <p className="font-semibold">{order.pickupCode}</p>
              <Button variant="outline" size="icon" className="h-6 w-6">
                <QrCode className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Current Status</p>
            <Badge variant="outline" className={
              status === "Scheduled" ? "bg-blue-50 text-blue-700" :
              status === "Picked" ? "bg-green-50 text-green-700" :
              status === "Missed" ? "bg-yellow-50 text-yellow-700" :
              "bg-red-50 text-red-700"
            }>
              {status}
            </Badge>
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Picked">Picked</SelectItem>
                <SelectItem value="Missed">Missed</SelectItem>
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
              placeholder="Add notes about this pickup"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="notify-user"
                checked={notifyUser}
                onCheckedChange={setNotifyUser}
              />
              <Label htmlFor="notify-user">Notify user of status changes</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="notify-vendor"
                checked={notifyVendor}
                onCheckedChange={setNotifyVendor}
              />
              <Label htmlFor="notify-vendor">Notify vendor of status changes</Label>
            </div>
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
              onClick={handleMarkPicked}
              disabled={status === "Picked" || status === "Cancelled"}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Mark as Picked
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleMarkMissed}
              disabled={status === "Missed" || status === "Picked" || status === "Cancelled"}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Mark as Missed
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleNotifyVendor}
            >
              <Send className="mr-2 h-4 w-4" />
              Remind Vendor
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  disabled={status === "Cancelled" || status === "Picked"}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel Pickup
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will cancel the pickup and notify both the customer and vendor.
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
      
      {/* Pickup Logs */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <CalendarClock className="h-5 w-5 mr-2" />
          Pickup Logs
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
