
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  FileText, 
  Truck, 
  Package, 
  X, 
  Edit, 
  Calendar, 
  PlusCircle, 
  CheckCircle,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryOrderDetails } from "@/components/fulfillment/DeliveryOrderDetails";
import { deliveryOrdersData } from "@/data/delivery-orders";

// Status badge color mapping
const getStatusBadge = (status: string) => {
  switch (status) {
    case "App Approved":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">App Approved</Badge>;
    case "Out for Delivery":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Out for Delivery</Badge>;
    case "Delivered":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
    case "Cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Truncate long text
const truncateText = (text: string, maxLength: number = 30) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const DeliveryRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedVault, setSelectedVault] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  // Filter orders based on search and filters
  const filteredOrders = deliveryOrdersData.filter(order => {
    const matchesSearch = 
      searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.walletId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesVault = selectedVault === "all" || order.vault === selectedVault;
    const matchesPartner = selectedPartner === "all" || order.deliveryPartner === selectedPartner;
    
    return matchesSearch && matchesStatus && matchesVault && matchesPartner;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the status in the backend
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const handleUploadTracking = (orderId: string) => {
    // In a real app, this would open a modal to upload tracking info
    toast({
      title: "Upload Tracking",
      description: `Upload tracking information for order ${orderId}`,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold text-primary">Redemption Orders – Home Delivery</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="App Approved">App Approved</SelectItem>
              <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={selectedVault} onValueChange={setSelectedVault}>
            <SelectTrigger>
              <SelectValue placeholder="Vault Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vaults</SelectItem>
              <SelectItem value="Brinks Dubai">Brinks Dubai</SelectItem>
              <SelectItem value="Singapore Vault">Singapore Vault</SelectItem>
              <SelectItem value="London Gold">London Gold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={selectedPartner} onValueChange={setSelectedPartner}>
            <SelectTrigger>
              <SelectValue placeholder="Delivery Partner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Partners</SelectItem>
              <SelectItem value="Brinks">Brinks</SelectItem>
              <SelectItem value="ShipSecure">ShipSecure</SelectItem>
              <SelectItem value="Local Courier">Local Courier</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Button className="w-full" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>
      
      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Gold Weight</TableHead>
                  <TableHead>Vault</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} onClick={() => handleViewOrder(order)} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.goldWeight}</TableCell>
                    <TableCell>{order.vault}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell title={order.deliveryAddress}>
                      {truncateText(order.deliveryAddress)}
                    </TableCell>
                    <TableCell>{order.requestedOn}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewOrder(order)}
                          title="View Details"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUploadTracking(order.id)}
                          title="Upload Tracking"
                        >
                          <Truck className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              Redemption Request ID: {selectedOrder?.id}
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <DeliveryOrderDetails 
              order={selectedOrder} 
              onUpdateStatus={handleUpdateStatus}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DeliveryRequests;
