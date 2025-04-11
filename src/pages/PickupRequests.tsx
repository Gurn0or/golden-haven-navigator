
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  FileText, 
  Calendar, 
  CheckCircle, 
  X, 
  Store
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
import { PickupOrderDetails } from "@/components/fulfillment/PickupOrderDetails";
import { pickupOrdersData } from "@/data/pickup-orders";

// Status badge color mapping
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Scheduled":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
    case "Picked":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Picked</Badge>;
    case "Missed":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Missed</Badge>;
    case "Cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const PickupRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  // Filter orders based on search and filters
  const filteredOrders = pickupOrdersData.filter(order => {
    const matchesSearch = 
      searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesVendor = selectedVendor === "all" || order.vendor === selectedVendor;
    
    return matchesSearch && matchesStatus && matchesVendor;
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

  const uniqueVendors = Array.from(new Set(pickupOrdersData.map(order => order.vendor)));

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold text-primary">Redemption Orders – Vendor Pickup</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Picked">Picked</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger>
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              {uniqueVendors.map((vendor) => (
                <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Button className="w-full" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Pickup Date Range
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
                  <TableHead>Vendor</TableHead>
                  <TableHead>Gold Weight</TableHead>
                  <TableHead>Pickup Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} onClick={() => handleViewOrder(order)} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.vendor}</TableCell>
                    <TableCell>{order.goldWeight}</TableCell>
                    <TableCell>{order.pickupDate}</TableCell>
                    <TableCell>{order.timeSlot}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
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
            <SheetTitle>Pickup Order Details</SheetTitle>
            <SheetDescription>
              Redemption Request ID: {selectedOrder?.id}
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <PickupOrderDetails 
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

export default PickupRequests;
