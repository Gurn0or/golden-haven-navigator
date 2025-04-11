
import React from "react";
import { 
  Store, 
  MapPin, 
  Clock, 
  Package, 
  Mail, 
  Phone, 
  Building, 
  Edit,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface TimeSlot {
  day: string;
  slots: string[];
}

interface ActiveOrder {
  id: string;
  user: string;
  pickupDate: string;
  timeSlot: string;
  goldWeight: string;
}

interface VendorDetailsProps {
  vendor: {
    id: string;
    name: string;
    location: string;
    address: string;
    city: string;
    zip: string;
    contactPerson: string;
    phone: string;
    email: string;
    status: string;
    acceptingOrders: boolean;
    timeSlots: TimeSlot[];
    activeOrders: number;
    linkedVaults: string[];
    deliveryType: string;
    notes?: string;
    activeOrdersList?: ActiveOrder[];
  };
  onEdit: () => void;
  onClose: () => void;
}

export const VendorDetails: React.FC<VendorDetailsProps> = ({
  vendor,
  onEdit,
  onClose
}) => {
  return (
    <div className="py-6 space-y-6">
      {/* Vendor Profile */}
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Store className="h-5 w-5 mr-2" />
            Vendor Profile
          </h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <div className="space-y-4 pl-7">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Vendor Name</p>
              <p className="font-medium">{vendor.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline" className={
                vendor.status === "Active" 
                  ? "bg-green-50 text-green-700" 
                  : "bg-red-50 text-red-700"
              }>
                {vendor.status}
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <p>{vendor.address}</p>
                <p>{vendor.city}, {vendor.zip}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p>{vendor.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <p>{vendor.phone}</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <p>{vendor.email}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Delivery Type</p>
            <p>{vendor.deliveryType}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Linked Vaults</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {vendor.linkedVaults.map((vault, index) => (
                <Badge key={index} variant="outline" className="flex items-center">
                  <Building className="h-3 w-3 mr-1" />
                  {vault}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="accepting-orders"
              checked={vendor.acceptingOrders}
              disabled
            />
            <Label htmlFor="accepting-orders">
              {vendor.acceptingOrders ? "Accepting new orders" : "Not accepting new orders"}
            </Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Operating Time Slots */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <Clock className="h-5 w-5 mr-2" />
          Operating Time Slots
        </h3>
        
        <div className="space-y-3 pl-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vendor.timeSlots.map((timeSlot, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted p-2 font-medium">{timeSlot.day}</div>
                  <div className="p-3 space-y-1">
                    {timeSlot.slots.length > 0 ? (
                      timeSlot.slots.map((slot, slotIndex) => (
                        <Badge key={slotIndex} variant="outline" className="mr-2 mb-2">
                          {slot}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No available slots</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Active Orders */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <Package className="h-5 w-5 mr-2" />
          Active Orders ({vendor.activeOrders})
        </h3>
        
        <div className="space-y-3 pl-7">
          {vendor.activeOrdersList && vendor.activeOrdersList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Order ID</th>
                    <th className="text-left py-2 px-3">User</th>
                    <th className="text-left py-2 px-3">Date</th>
                    <th className="text-left py-2 px-3">Time Slot</th>
                    <th className="text-left py-2 px-3">Gold Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {vendor.activeOrdersList.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-3 font-medium">{order.id}</td>
                      <td className="py-2 px-3">{order.user}</td>
                      <td className="py-2 px-3">{order.pickupDate}</td>
                      <td className="py-2 px-3">{order.timeSlot}</td>
                      <td className="py-2 px-3">{order.goldWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground bg-muted/20 rounded-md">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
              <p>No active orders at this time</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Admin Notes */}
      {vendor.notes && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <FileText className="h-5 w-5 mr-2" />
              Admin Notes
            </h3>
            
            <div className="pl-7 p-4 bg-muted/20 rounded-md">
              <p className="text-muted-foreground">{vendor.notes}</p>
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-end pt-4">
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
