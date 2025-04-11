
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, MoreHorizontal, Eye, Ban, KeyRound, FileText } from 'lucide-react';

// Sample user data
const users = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 (555) 123-4567', balance: '12.5 AUR', kycStatus: 'verified' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 987-6543', balance: '8.2 AUR', kycStatus: 'pending' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '+1 (555) 456-7890', balance: '5.0 AUR', kycStatus: 'verified' },
  { id: 4, name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 (555) 234-5678', balance: '0.8 AUR', kycStatus: 'rejected' },
  { id: 5, name: 'James Taylor', email: 'james@example.com', phone: '+1 (555) 876-5432', balance: '3.2 AUR', kycStatus: 'verified' },
  { id: 6, name: 'Linda Martinez', email: 'linda@example.com', phone: '+1 (555) 345-6789', balance: '1.5 AUR', kycStatus: 'pending' },
  { id: 7, name: 'Robert Garcia', email: 'robert@example.com', phone: '+1 (555) 567-8901', balance: '6.7 AUR', kycStatus: 'verified' },
  { id: 8, name: 'Patricia Lee', email: 'patricia@example.com', phone: '+1 (555) 678-9012', balance: '4.3 AUR', kycStatus: 'verified' },
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">User Management</h1>
          <p className="text-muted-foreground">Manage all registered users and their verification status.</p>
        </div>
        <Button>Add New User</Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search users..." 
                className="w-full pl-10 pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">KYC Status</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Verified</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Wallet Balance</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="table-row-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.balance}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.kycStatus === 'verified'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : user.kycStatus === 'pending'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> View KYC Docs
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <KeyRound className="h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                          <Ban className="h-4 w-4" /> Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
