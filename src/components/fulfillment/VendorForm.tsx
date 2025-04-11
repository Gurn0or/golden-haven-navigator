
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Store,
  MapPin,
  User,
  Clock,
  Building,
  Check,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface TimeSlot {
  day: string;
  slots: string[];
}

interface VendorFormProps {
  vendor?: {
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
    linkedVaults: string[];
    deliveryType: string;
    notes?: string;
  };
  onSave: (vendor: any) => void;
  onCancel: () => void;
}

export const VendorForm: React.FC<VendorFormProps> = ({
  vendor,
  onSave,
  onCancel
}) => {
  const { toast } = useToast();
  const isNewVendor = !vendor;
  
  // Form state
  const [name, setName] = useState(vendor?.name || "");
  const [location, setLocation] = useState(vendor?.location || "");
  const [address, setAddress] = useState(vendor?.address || "");
  const [city, setCity] = useState(vendor?.city || "");
  const [zip, setZip] = useState(vendor?.zip || "");
  const [contactPerson, setContactPerson] = useState(vendor?.contactPerson || "");
  const [phone, setPhone] = useState(vendor?.phone || "");
  const [email, setEmail] = useState(vendor?.email || "");
  const [status, setStatus] = useState(vendor?.status || "Active");
  const [acceptingOrders, setAcceptingOrders] = useState(vendor?.acceptingOrders ?? true);
  const [deliveryType, setDeliveryType] = useState(vendor?.deliveryType || "Only Pickup");
  const [notes, setNotes] = useState(vendor?.notes || "");
  
  // Available vaults
  const availableVaults = ["Brinks Dubai", "Singapore Vault", "London Gold", "Zurich Safe"];
  
  // Selected vaults
  const [selectedVaults, setSelectedVaults] = useState<string[]>(vendor?.linkedVaults || []);
  
  // Available time slots
  const availableTimeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM"
  ];
  
  // Days of week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Initialize time slots
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    vendor?.timeSlots || 
    daysOfWeek.map(day => ({ day, slots: day === "Sunday" ? [] : ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM"] }))
  );
  
  const toggleVault = (vault: string) => {
    if (selectedVaults.includes(vault)) {
      setSelectedVaults(selectedVaults.filter(v => v !== vault));
    } else {
      setSelectedVaults([...selectedVaults, vault]);
    }
  };
  
  const toggleTimeSlot = (day: string, slot: string) => {
    const updatedTimeSlots = timeSlots.map(ts => {
      if (ts.day === day) {
        if (ts.slots.includes(slot)) {
          return { ...ts, slots: ts.slots.filter(s => s !== slot) };
        } else {
          return { ...ts, slots: [...ts.slots, slot].sort((a, b) => {
            // Sort by the start time
            const timeA = a.split(" - ")[0];
            const timeB = b.split(" - ")[0];
            return timeA.localeCompare(timeB);
          })};
        }
      }
      return ts;
    });
    
    setTimeSlots(updatedTimeSlots);
  };
  
  const handleSave = () => {
    // Validation
    if (!name || !location || !address || !city || !zip || !contactPerson || !phone || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedVaults.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one linked vault",
        variant: "destructive"
      });
      return;
    }
    
    // Create vendor object
    const updatedVendor = {
      id: vendor?.id || `VEN-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      location,
      address,
      city,
      zip,
      contactPerson,
      phone,
      email,
      status,
      acceptingOrders,
      timeSlots,
      linkedVaults: selectedVaults,
      deliveryType,
      notes: notes.trim() ? notes : undefined,
      activeOrders: vendor?.activeOrders || 0
    };
    
    onSave(updatedVendor);
  };

  return (
    <div className="py-4 space-y-6">
      {/* Basic Info */}
      <div>
        <h3 className="text-md font-medium flex items-center mb-3">
          <Store className="h-5 w-5 mr-2" />
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="vendor-name">Vendor Name *</Label>
            <Input
              id="vendor-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter vendor name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Downtown Dubai"
                required
              />
            </div>
            <div>
              <Label htmlFor="delivery-type">Delivery Type</Label>
              <Select value={deliveryType} onValueChange={setDeliveryType}>
                <SelectTrigger id="delivery-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Only Pickup">Only Pickup</SelectItem>
                  <SelectItem value="Delivery Support">Delivery Support</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Address */}
      <div>
        <h3 className="text-md font-medium flex items-center mb-3">
          <MapPin className="h-5 w-5 mr-2" />
          Address
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter street address"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>
            <div>
              <Label htmlFor="zip">Postal Code / ZIP *</Label>
              <Input
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter postal code"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Contact Info */}
      <div>
        <h3 className="text-md font-medium flex items-center mb-3">
          <User className="h-5 w-5 mr-2" />
          Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact-person">Contact Person *</Label>
            <Input
              id="contact-person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Enter contact person name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Linked Vaults */}
      <div>
        <h3 className="text-md font-medium flex items-center mb-3">
          <Building className="h-5 w-5 mr-2" />
          Linked Vaults
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select vaults that this vendor can pick up gold from:</p>
          
          <div className="grid grid-cols-2 gap-2">
            {availableVaults.map((vault) => (
              <div key={vault} className="flex items-center space-x-2">
                <Checkbox 
                  id={`vault-${vault}`} 
                  checked={selectedVaults.includes(vault)}
                  onCheckedChange={() => toggleVault(vault)}
                />
                <Label htmlFor={`vault-${vault}`}>{vault}</Label>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedVaults.map((vault) => (
              <Badge key={vault} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Building className="h-3 w-3 mr-1" />
                {vault}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Operating Hours */}
      <div>
        <h3 className="text-md font-medium flex items-center mb-3">
          <Clock className="h-5 w-5 mr-2" />
          Operating Hours
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select available time slots for customer pickups:</p>
          
          <Accordion type="multiple" className="mt-2">
            {daysOfWeek.map((day) => {
              const dayData = timeSlots.find(ts => ts.day === day) || { day, slots: [] };
              
              return (
                <AccordionItem key={day} value={day}>
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{day}</span>
                      {dayData.slots.length > 0 && (
                        <Badge className="ml-2 bg-blue-50 text-blue-700">{dayData.slots.length} slots</Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      {availableTimeSlots.map((slot) => (
                        <div key={slot} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${day}-${slot}`} 
                            checked={dayData.slots.includes(slot)}
                            onCheckedChange={() => toggleTimeSlot(day, slot)}
                          />
                          <Label htmlFor={`${day}-${slot}`}>{slot}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
      
      <Separator />
      
      {/* Vendor Settings */}
      <div>
        <h3 className="text-md font-medium flex items-center mb-3">
          <Check className="h-5 w-5 mr-2" />
          Vendor Settings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Vendor Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-7">
              <Switch
                id="accepting-orders"
                checked={acceptingOrders}
                onCheckedChange={setAcceptingOrders}
              />
              <Label htmlFor="accepting-orders">
                Accept New Orders
              </Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Admin Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any internal notes about this vendor"
              className="h-24"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>
          {isNewVendor ? "Add Vendor" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
