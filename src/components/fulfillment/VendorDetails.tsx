
import React from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  Package,
  Building,
  CalendarClock,
  Edit,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  const { toast } = useToast();
  
  const handleToggleAcceptingOrders = () => {
    // In a real app, this would update the backend
    toast({
      title: vendor.acceptingOrders ? "Vendor Paused" : "Vendor Activated",
      description: `${vendor.name} is now ${vendor.acceptingOrders ? "not accepting" : "accepting"} new orders`,
    });
  };
  
  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: `A reminder has been sent to ${vendor.name}`,
    });
  };

  // Get days of week starting with Monday
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="py-6 space-y-6">
      {/* Vendor Info */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium flex items-center">
            <Store className="h-5 w-5 mr-2" />
            Vendor Details
          </h3>
          <Badge variant="outline" className={
            vendor.status === "Active" 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
          }>
            {vendor.status}
          </Badge>
        </div>
        
        <div className="space-y-3 pl-7">
          <div>
            <p className="text-sm text-muted-foreground">Vendor Name</p>
            <p className="font-medium">{vendor.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p>{vendor.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vendor ID</p>
              <p>{vendor.id}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-1 flex-shrink-0" />
              <p>{vendor.address}, {vendor.city}, {vendor.zip}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <User className="h-5 w-5 mr-2" />
          Contact Information
        </h3>
        <div className="space-y-3 pl-7">
          <div>
            <p className="text-sm text-muted-foreground">Contact Person</p>
            <p>{vendor.contactPerson}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-muted-foreground mr-1" />
                <p>{vendor.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-muted-foreground mr-1" />
                <p>{vendor.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Operation Details */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-2">
          <Clock className="h-5 w-5 mr-2" />
          Operation Details
        </h3>
        <div className="space-y-3 pl-7">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Accepting Orders</p>
              <div className="flex items-center space-x-2 mt-1">
                <Switch
                  checked={vendor.acceptingOrders}
                  onCheckedChange={handleToggleAcceptingOrders}
                  id="accepting-orders"
                />
                <Label htmlFor="accepting-orders">
                  {vendor.acceptingOrders ? "Yes" : "No"}
                </Label>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivery Type</p>
              <p>{vendor.deliveryType}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Linked Vaults</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {vendor.linkedVaults.map((vault, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Building className="h-3 w-3 mr-1" />
                  {vault}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Pickup Time Slots</p>
            <Accordion type="single" collapsible className="mt-2">
              {daysOfWeek.map((day) => {
                const dayData = vendor.timeSlots.find(ts => ts.day === day);
                const slots = dayData ? dayData.slots : [];
                
                return (
                  <AccordionItem key={day} value={day}>
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{day}</span>
                        {slots.length === 0 && (
                          <Badge variant="outline" className="ml-2 bg-gray-50 text-gray-700">Closed</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {slots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {slots.map((slot, index) => (
                            <Badge key={index} variant="outline" className="justify-center">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No time slots available</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
      
      {vendor.notes && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Admin Notes
            </h3>
            <div className="pl-7 p-3 bg-amber-50 rounded-md text-amber-800 text-sm">
              {vendor.notes}
            </div>
          </div>
        </>
      )}
      
      {vendor.activeOrdersList && vendor.activeOrdersList.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <Package className="h-5 w-5 mr-2" />
              Active Orders ({vendor.activeOrders})
            </h3>
            <div className="pl-7">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left font-medium">Request ID</th>
                          <th className="py-2 px-4 text-left font-medium">User</th>
                          <th className="py-2 px-4 text-left font-medium">Gold Weight</th>
                          <th className="py-2 px-4 text-left font-medium">Pickup Date</th>
                          <th className="py-2 px-4 text-left font-medium">Time Slot</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendor.activeOrdersList.map((order, index) => (
                          <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="py-2 px-4">{order.id}</td>
                            <td className="py-2 px-4">{order.user}</td>
                            <td className="py-2 px-4">{order.goldWeight}</td>
                            <td className="py-2 px-4">{order.pickupDate}</td>
                            <td className="py-2 px-4">{order.timeSlot}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-between pt-4">
        <div className="space-x-2">
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Vendor
          </Button>
          <Button variant="outline" onClick={handleSendReminder}>
            <Mail className="mr-2 h-4 w-4" />
            Send Reminder
          </Button>
        </div>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
