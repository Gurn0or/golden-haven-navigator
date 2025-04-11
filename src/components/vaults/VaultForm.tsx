
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Form,
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Vault, VaultType } from '@/pages/GoldVaults';

// Form schema with validation
const vaultFormSchema = z.object({
  name: z.string().min(3, { message: "Vault name must be at least 3 characters." }),
  type: z.enum(["Brinks", "Local"]),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  partner: z.string().min(2, { message: "Partner name is required." }),
  goldHolding: z.coerce.number().positive({ message: "Gold holding must be a positive number." }),
  threshold: z.coerce.number().positive({ message: "Threshold must be a positive number." }),
  autoSync: z.boolean().default(false),
  syncFrequency: z.enum(["Manual", "Hourly", "6 Hours", "Daily"]).optional(),
});

type VaultFormValues = z.infer<typeof vaultFormSchema>;

interface VaultFormProps {
  onSubmit: (data: any) => void;
  initialData?: Vault | null;
  isEditMode?: boolean;
}

const VaultForm: React.FC<VaultFormProps> = ({ 
  onSubmit, 
  initialData, 
  isEditMode = false 
}) => {
  // Initialize form with default values or initialData
  const form = useForm<VaultFormValues>({
    resolver: zodResolver(vaultFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      syncFrequency: initialData.syncFrequency || 'Manual',
    } : {
      name: '',
      type: 'Brinks',
      location: '',
      partner: '',
      goldHolding: 0,
      threshold: 0,
      autoSync: false,
      syncFrequency: 'Manual',
    }
  });

  // Handle form submission
  const handleSubmit = (values: VaultFormValues) => {
    if (isEditMode && initialData) {
      onSubmit({
        ...initialData,
        ...values,
        // Update status based on gold holding vs threshold
        status: values.goldHolding <= values.threshold ? 'Low Stock' : 'Healthy',
      });
    } else {
      onSubmit(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vault Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Brinks Dubai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vault Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vault type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Brinks">Brinks</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dubai, UAE" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vault Partner</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Brinks Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="goldHolding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gold Holding (grams)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Threshold (grams)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" {...field} />
                </FormControl>
                <FormDescription>
                  Alerts will trigger when gold holdings drop below this value
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="autoSync"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Auto Sync</FormLabel>
                <FormDescription>
                  Automatically sync vault data at regular intervals
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch('autoSync') && (
          <FormField
            control={form.control}
            name="syncFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sync Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sync frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Hourly">Every Hour</SelectItem>
                    <SelectItem value="6 Hours">Every 6 Hours</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">
            {isEditMode ? 'Update Vault' : 'Add Vault'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default VaultForm;
