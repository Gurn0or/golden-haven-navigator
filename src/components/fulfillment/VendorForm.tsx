
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Store, 
  MapPin, 
  Clock, 
  Building, 
  Plus, 
  Trash,
  Check,
  X
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

// Days of week for time slots
const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Available time slots
const availableTimeSlots = [
  "9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM", "5:00 PM - 7:00 PM"
];

// Available vaults
const availableVaults = [
  "Brinks Dubai", "Singapore Vault", "London Gold", "Zurich Safe", "New York Vault"
];

export const VendorForm: React.FC<VendorFormProps> = ({
  vendor,
  onSave,
  onCancel
}) => {
  const isNewVendor = !vendor;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    id: vendor?.id || `VEN-${Math.floor(Math.random() * 10000)}`,
    name: vendor?.name || "",
    location: vendor?.location || "",
    address: vendor?.address || "",
    city: vendor?.city || "",
    zip: vendor?.zip || "",
    contactPerson: vendor?.contactPerson || "",
    phone: vendor?.phone || "",
    email: vendor?.email || "",
    status: vendor?.status || "Active",
    acceptingOrders: vendor?.acceptingOrders !== undefined ? vendor.acceptingOrders : true,
    timeSlots: vendor?.timeSlots || daysOfWeek.map(day => ({ day, slots: [] })),
    linkedVaults: vendor?.linkedVaults || [],
    deliveryType: vendor?.deliveryType || "Only Pickup",
    notes: vendor?.notes || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const toggleTimeSlot = (day: string, slot: string) => {
    setFormData(prev => {
      const newTimeSlots = prev.timeSlots.map(daySlot => {
        if (daySlot.day === day) {
          const slots = daySlot.slots.includes(slot)
            ? daySlot.slots.filter(s => s !== slot)
            : [...daySlot.slots, slot];
          return { ...daySlot, slots };
        }
        return daySlot;
      });
      return { ...prev, timeSlots: newTimeSlots };
    });
  };

  const toggleVault = (vault: string) => {
    setFormData(prev => {
      const linkedVaults = prev.linkedVaults.includes(vault)
        ? prev.linkedVaults.filter(v => v !== vault)
        : [...prev.linkedVaults, vault];
      return { ...prev, linkedVaults };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form data
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Store className="h-5 w-5 mr-2" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Vendor Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter vendor name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="E.g., Downtown, West Side"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Address */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-4">
          <MapPin className="h-5 w-5 mr-2" />
          Address
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter street address"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP / Postal Code *</Label>
              <Input
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Enter ZIP code"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-4">
          Contact Information
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Enter contact person name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Time Slots */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Clock className="h-5 w-5 mr-2" />
          Available Time Slots
        </h3>
        
        <div className="space-y-4">
          {formData.timeSlots.map((daySlot, index) => (
            <div key={index} className="space-y-2">
              <Label>{daySlot.day}</Label>
              <div className="flex flex-wrap gap-2">
                {availableTimeSlots.map((slot) => {
                  const isSelected = daySlot.slots.includes(slot);
                  return (
                    <Button
                      key={slot}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTimeSlot(daySlot.day, slot)}
                    >
                      {isSelected && <Check className="mr-1 h-3 w-3" />}
                      {slot}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Linked Vaults */}
      <div>
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Building className="h-5 w-5 mr-2" />
          Linked Vaults
        </h3>
        
        <div className="space-y-4">
          <Label>Select vaults this vendor is linked to</Label>
          <div className="flex flex-wrap gap-2">
            {availableVaults.map((vault) => {
              const isLinked = formData.linkedVaults.includes(vault);
              return (
                <Button
                  key={vault}
                  type="button"
                  variant={isLinked ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleVault(vault)}
                >
                  {isLinked && <Check className="mr-1 h-3 w-3" />}
                  {vault}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Additional Settings */}
      <div>
        <h3 className="text-lg font-medium mb-4">Additional Settings</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deliveryType">Delivery Type</Label>
            <Select 
              value={formData.deliveryType} 
              onValueChange={(value) => handleSelectChange("deliveryType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select delivery type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Only Pickup">Only Pickup</SelectItem>
                <SelectItem value="Delivery Support">Delivery Support</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="acceptingOrders"
              checked={formData.acceptingOrders}
              onCheckedChange={(checked) => handleSwitchChange("acceptingOrders", checked)}
            />
            <Label htmlFor="acceptingOrders">Accept new orders</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Admin Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add optional internal notes about this vendor"
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{isNewVendor ? "Add Vendor" : "Save Changes"}</Button>
      </div>
    </form>
  );
};
