
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Store, 
  Edit, 
  Trash, 
  Ban, 
  Eye,
  Package,
  MapPin,
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { VendorDetails } from "@/components/fulfillment/VendorDetails";
import { VendorForm } from "@/components/fulfillment/VendorForm";
import { vendorsData } from "@/data/vendors";

// Status badge color mapping
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
    case "Suspended":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Suspended</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const VendorManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const { toast } = useToast();

  // Filter vendors based on search
  const filteredVendors = vendorsData.filter(vendor => {
    const matchesSearch = 
      searchQuery === "" || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleViewVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsDrawerOpen(true);
  };

  const handleEditVendor = (vendor: any, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedVendor(vendor);
    setIsEditDialogOpen(true);
  };

  const handleAddVendor = () => {
    setIsAddDialogOpen(true);
  };

  const handleSuspendVendor = (vendorId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    // In a real app, this would update the vendor status in the backend
    toast({
      title: "Vendor Suspended",
      description: `Vendor ${vendorId} has been suspended`,
      variant: "destructive"
    });
  };

  const handleDeleteVendor = (vendorId: string) => {
    // In a real app, this would delete the vendor from the backend
    toast({
      title: "Vendor Deleted",
      description: `Vendor ${vendorId} has been deleted`,
      variant: "destructive"
    });
  };

  const handleSaveVendor = (vendor: any, isNew: boolean = false) => {
    // In a real app, this would save the vendor to the backend
    toast({
      title: isNew ? "Vendor Added" : "Vendor Updated",
      description: `Vendor ${vendor.name} has been ${isNew ? "added" : "updated"}`,
    });
    
    if (isNew) {
      setIsAddDialogOpen(false);
    } else {
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold text-primary">Vendor Management</h1>
        <div className="w-full md:w-auto flex gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddVendor}>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>
      
      {/* Vendors Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Active Orders</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id} onClick={() => handleViewVendor(vendor)} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.location}</TableCell>
                    <TableCell>{vendor.activeOrders}</TableCell>
                    <TableCell>{vendor.contactPerson}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewVendor(vendor)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => handleEditVendor(vendor, e)}
                          title="Edit Vendor"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => handleSuspendVendor(vendor.id, e)}
                          title={vendor.status === "Active" ? "Suspend Vendor" : "Activate Vendor"}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              title="Delete Vendor"
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the vendor and remove their data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteVendor(vendor.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Vendor Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Vendor Details</SheetTitle>
            <SheetDescription>
              Vendor ID: {selectedVendor?.id}
            </SheetDescription>
          </SheetHeader>
          
          {selectedVendor && (
            <VendorDetails 
              vendor={selectedVendor} 
              onEdit={() => {
                setIsDrawerOpen(false);
                handleEditVendor(selectedVendor);
              }}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
      
      {/* Edit Vendor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogDescription>
              Update vendor information and settings
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <VendorForm 
              vendor={selectedVendor}
              onSave={(updatedVendor) => handleSaveVendor(updatedVendor)}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Vendor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>
              Enter details for the new vendor
            </DialogDescription>
          </DialogHeader>
          
          <VendorForm 
            onSave={(newVendor) => handleSaveVendor(newVendor, true)}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorManagement;
