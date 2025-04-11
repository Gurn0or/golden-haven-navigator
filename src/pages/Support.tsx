
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  MoreVertical, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  AlertCircle, 
  Filter,
  Download,
  Send,
  PaperclipIcon,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";

// Mock data for support tickets
const tickets = [
  {
    id: "TKT-2023",
    user: {
      name: "John Smith",
      email: "jsmith@example.com",
      avatar: "https://i.pravatar.cc/150?u=1",
      walletId: "0x1a2b3c4d5e6f7g8h9i"
    },
    subject: "Unable to complete gold redemption",
    category: "Redemption",
    lastUpdated: "2023-11-02T14:22:18Z",
    status: "open",
    assignedTo: "Sarah Lee",
    messages: [
      {
        from: "user",
        message: "I tried to redeem my e-Aurum tokens for physical gold but the transaction keeps failing. I've attempted this three times now with no success.",
        timestamp: "2023-11-02T14:22:18Z"
      },
      {
        from: "admin",
        message: "Hello John, I'm looking into this issue for you. Could you please provide the transaction hash of your failed redemption attempt?",
        timestamp: "2023-11-02T16:45:33Z"
      },
      {
        from: "user",
        message: "Sure, the transaction hash is 0x7d2ae8f3e2d36abf38172466d876c487aef41392839cf44c25d80f",
        timestamp: "2023-11-03T09:14:22Z"
      }
    ]
  },
  {
    id: "TKT-2022",
    user: {
      name: "Emma Wilson",
      email: "ewilson@example.com",
      avatar: "https://i.pravatar.cc/150?u=2",
      walletId: "0x2b3c4d5e6f7g8h9i1a"
    },
    subject: "KYC verification pending for over a week",
    category: "KYC",
    lastUpdated: "2023-11-01T09:33:47Z",
    status: "in-progress",
    assignedTo: "David Wang",
    messages: [
      {
        from: "user",
        message: "I submitted my KYC documents over a week ago and my account is still showing as 'Verification Pending'. Can someone please help?",
        timestamp: "2023-11-01T09:33:47Z"
      },
      {
        from: "admin",
        message: "Hi Emma, I apologize for the delay. I can see that your documents are in the queue. Let me escalate this for immediate review.",
        timestamp: "2023-11-01T11:22:05Z"
      }
    ]
  },
  {
    id: "TKT-2021",
    user: {
      name: "Michael Brown",
      email: "mbrown@example.com",
      avatar: "https://i.pravatar.cc/150?u=3",
      walletId: "0x3c4d5e6f7g8h9i1a2b"
    },
    subject: "App crashes when trying to buy tokens",
    category: "Technical",
    lastUpdated: "2023-10-29T16:18:22Z",
    status: "escalated",
    assignedTo: "Tech Team",
    messages: [
      {
        from: "user",
        message: "Whenever I try to purchase tokens, the app crashes. I'm using the latest iOS version on iPhone 13.",
        timestamp: "2023-10-29T16:18:22Z"
      },
      {
        from: "admin",
        message: "Hello Michael, I'm sorry to hear about the issue. Could you please tell us what payment method you're attempting to use?",
        timestamp: "2023-10-29T17:45:10Z"
      },
      {
        from: "user",
        message: "I'm trying to use Apple Pay.",
        timestamp: "2023-10-30T09:12:33Z"
      },
      {
        from: "admin",
        message: "Thank you for the information. We've identified a bug with Apple Pay integration in our latest release. I'm escalating this to our technical team for immediate fixing.",
        timestamp: "2023-10-30T10:25:18Z"
      }
    ]
  },
  {
    id: "TKT-2020",
    user: {
      name: "Sophia Garcia",
      email: "sgarcia@example.com",
      avatar: "https://i.pravatar.cc/150?u=4",
      walletId: "0x4d5e6f7g8h9i1a2b3c"
    },
    subject: "Transaction not showing in my wallet",
    category: "Transaction",
    lastUpdated: "2023-10-28T11:42:15Z",
    status: "resolved",
    assignedTo: "James Wilson",
    messages: [
      {
        from: "user",
        message: "I purchased 50 e-Aurum tokens yesterday but they're not showing in my wallet yet. The payment has left my bank account.",
        timestamp: "2023-10-28T11:42:15Z"
      },
      {
        from: "admin",
        message: "Hi Sophia, I'll check this for you right away. Could you please confirm the last 4 digits of the card you used for the purchase?",
        timestamp: "2023-10-28T12:15:42Z"
      },
      {
        from: "user",
        message: "The last 4 digits are 7890.",
        timestamp: "2023-10-28T12:20:18Z"
      },
      {
        from: "admin",
        message: "Thank you. I can see that the transaction was successful but there was a delay in updating your wallet. I've manually credited your account with the 50 e-Aurum tokens. They should be visible now. Please confirm.",
        timestamp: "2023-10-28T12:45:30Z"
      },
      {
        from: "user",
        message: "I can see them now. Thank you for your quick help!",
        timestamp: "2023-10-28T13:01:12Z"
      },
      {
        from: "admin",
        message: "You're welcome! I'm glad the issue is resolved. If you have any other questions, please don't hesitate to reach out.",
        timestamp: "2023-10-28T13:05:43Z"
      }
    ]
  },
  {
    id: "TKT-2019",
    user: {
      name: "Daniel Kim",
      email: "dkim@example.com",
      avatar: "https://i.pravatar.cc/150?u=5",
      walletId: "0x5e6f7g8h9i1a2b3c4d"
    },
    subject: "Need help with 2FA setup",
    category: "Technical",
    lastUpdated: "2023-10-26T15:37:28Z",
    status: "open",
    assignedTo: "Unassigned",
    messages: [
      {
        from: "user",
        message: "I'm trying to set up 2FA for additional security but I'm getting an error code E-432. Can you help?",
        timestamp: "2023-10-26T15:37:28Z"
      }
    ]
  }
];

const Support = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Get ticket data
  const getTicketData = (ticketId: string) => {
    return tickets.find(ticket => ticket.id === ticketId) || null;
  };

  // Handle viewing a ticket
  const handleViewTicket = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setIsDrawerOpen(true);
  };

  // Handle closing the ticket drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTicket(null);
    setReplyText('');
  };

  // Handle sending a reply
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the user."
    });
    
    setReplyText('');
  };

  // Handle assigning a ticket
  const handleAssignTicket = (ticketId: string, admin: string) => {
    toast({
      title: "Ticket Assigned",
      description: `Ticket ${ticketId} has been assigned to ${admin}.`
    });
  };

  // Handle escalating a ticket
  const handleEscalateTicket = (ticketId: string) => {
    toast({
      title: "Ticket Escalated",
      description: `Ticket ${ticketId} has been escalated to the technical team.`
    });
  };

  // Handle closing a ticket
  const handleCloseTicket = (ticketId: string) => {
    toast({
      title: "Ticket Closed",
      description: `Ticket ${ticketId} has been successfully closed.`
    });
  };

  // Handle exporting ticket data
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Ticket data is being exported and will download shortly."
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'escalated':
        return <Badge className="bg-orange-500">Escalated</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    // Search filter
    if (search && 
        !ticket.id.toLowerCase().includes(search.toLowerCase()) && 
        !ticket.user.email.toLowerCase().includes(search.toLowerCase()) &&
        !ticket.subject.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && ticket.status !== statusFilter) {
      return false;
    }
    
    // Category filter
    if (categoryFilter !== 'all' && ticket.category.toLowerCase() !== categoryFilter) {
      return false;
    }
    
    // Assigned filter
    if (assignedFilter !== 'all') {
      if (assignedFilter === 'unassigned' && ticket.assignedTo !== 'Unassigned') {
        return false;
      } else if (assignedFilter !== 'unassigned' && ticket.assignedTo !== assignedFilter) {
        return false;
      }
    }
    
    return true;
  });

  // Get the currently selected ticket
  const currentTicket = selectedTicket ? getTicketData(selectedTicket) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Support Tickets</h1>
        <div className="relative w-64">
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
              <h3 className="text-2xl font-bold">38</h3>
            </div>
            <MessageSquare className="h-10 w-10 text-blue-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved Tickets</p>
              <h3 className="text-2xl font-bold">1,874</h3>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Replies</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <HelpCircle className="h-10 w-10 text-yellow-500 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <h3 className="text-2xl font-bold">4h 12m</h3>
            </div>
            <Clock className="h-10 w-10 text-purple-500 opacity-80" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="kyc">KYC</SelectItem>
            <SelectItem value="transaction">Transaction</SelectItem>
            <SelectItem value="redemption">Redemption</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={assignedFilter} onValueChange={setAssignedFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assigned To" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Admins</SelectItem>
            <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
            <SelectItem value="David Wang">David Wang</SelectItem>
            <SelectItem value="James Wilson">James Wilson</SelectItem>
            <SelectItem value="Tech Team">Tech Team</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportData}
          className="ml-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Tickets Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-mono">{ticket.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={ticket.user.avatar} alt={ticket.user.name} />
                      <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{ticket.user.name}</p>
                      <p className="text-xs text-muted-foreground">{ticket.user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>{formatDate(ticket.lastUpdated)}</TableCell>
                <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                <TableCell>{ticket.assignedTo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleViewTicket(ticket.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAssignTicket(ticket.id, "Sarah Lee")}>
                          Assign to Sarah
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignTicket(ticket.id, "David Wang")}>
                          Assign to David
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEscalateTicket(ticket.id)}>
                          Escalate to Tech Team
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCloseTicket(ticket.id)}>
                          Close Ticket
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Ticket Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[85vh] max-h-[85vh] overflow-y-auto">
          {currentTicket && (
            <div className="p-6">
              <DrawerHeader className="pb-4 border-b mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <DrawerTitle className="text-xl font-bold mb-2">
                      {currentTicket.subject}
                    </DrawerTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Ticket {currentTicket.id}</span>
                      <span>•</span>
                      <span>{getStatusBadge(currentTicket.status)}</span>
                      <span>•</span>
                      <span>Created {formatDate(currentTicket.messages[0].timestamp)}</span>
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left sidebar with user info */}
                <div className="md:col-span-1 space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">User Information</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentTicket.user.avatar} alt={currentTicket.user.name} />
                          <AvatarFallback>{currentTicket.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{currentTicket.user.name}</p>
                          <p className="text-sm text-muted-foreground">{currentTicket.user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Wallet ID:</span>
                          <span className="font-mono text-xs">{`${currentTicket.user.walletId.substring(0, 6)}...${currentTicket.user.walletId.substring(currentTicket.user.walletId.length - 4)}`}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Wallet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3">Ticket Actions</h3>
                      <div className="space-y-2">
                        <Select defaultValue="Sarah Lee">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Assign To" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
                            <SelectItem value="David Wang">David Wang</SelectItem>
                            <SelectItem value="James Wilson">James Wilson</SelectItem>
                            <SelectItem value="Tech Team">Tech Team</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select defaultValue="open">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="escalated">Escalated</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="secondary" size="sm" className="w-full">
                          Add Internal Note
                        </Button>
                        
                        <Button variant="destructive" size="sm" className="w-full">
                          Close Ticket
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Right side with conversation */}
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto p-1">
                    {currentTicket.messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`${
                          msg.from === 'user' 
                            ? 'bg-gray-100 rounded-tl-none' 
                            : 'bg-blue-50 rounded-tr-none'
                        } p-4 rounded-2xl`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage 
                                src={msg.from === 'user' ? currentTicket.user.avatar : 'https://i.pravatar.cc/150?u=admin'} 
                                alt={msg.from === 'user' ? currentTicket.user.name : 'Admin'} 
                              />
                              <AvatarFallback>
                                {msg.from === 'user' ? currentTicket.user.name.charAt(0) : 'A'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {msg.from === 'user' ? currentTicket.user.name : 'Support Agent'}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Reply box */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <Textarea 
                      placeholder="Type your reply..." 
                      className="mb-3 min-h-[100px]"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <PaperclipIcon className="h-4 w-4 mr-1" />
                        Attach File
                      </Button>
                      <Button onClick={handleSendReply}>
                        <Send className="h-4 w-4 mr-1" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Support;
