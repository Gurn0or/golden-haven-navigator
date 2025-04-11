
import React, { useState } from 'react';
import { ArrowLeft, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Define transaction types
type TransactionType = 'all' | 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'redeemed';
type DateRangeType = 'today' | 'this-week' | 'this-month' | 'custom';
type SortType = 'newest' | 'oldest' | 'highest' | 'lowest';

// Sample transaction data
interface Transaction {
  id: string;
  type: Exclude<TransactionType, 'all'>;
  date: string;
  amount: number;
  usdAmount: number;
  status: 'completed' | 'pending' | 'failed';
}

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    date: '2025-04-11T14:38:00',
    amount: 15.015,
    usdAmount: 198.28,
    status: 'completed',
  },
  {
    id: '2',
    type: 'sell',
    date: '2025-04-10T09:15:00',
    amount: -10.5,
    usdAmount: -138.75,
    status: 'completed',
  },
  {
    id: '3',
    type: 'deposit',
    date: '2025-04-09T11:22:00',
    amount: 50.0,
    usdAmount: 660.50,
    status: 'completed',
  },
  {
    id: '4',
    type: 'withdrawal',
    date: '2025-04-08T16:45:00',
    amount: -25.75,
    usdAmount: -340.15,
    status: 'completed',
  },
  {
    id: '5',
    type: 'redeemed',
    date: '2025-04-07T10:30:00',
    amount: -100.0,
    usdAmount: -1320.0,
    status: 'completed',
  },
  {
    id: '6',
    type: 'buy',
    date: '2025-04-06T13:15:00',
    amount: 5.25,
    usdAmount: 69.35,
    status: 'completed',
  },
  {
    id: '7',
    type: 'deposit',
    date: '2025-04-05T09:20:00',
    amount: 30.0,
    usdAmount: 396.30,
    status: 'completed',
  },
  {
    id: '8',
    type: 'sell',
    date: '2025-04-04T14:55:00',
    amount: -15.5,
    usdAmount: -204.75,
    status: 'completed',
  },
];

const TransactionHistory = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>('all');
  const [dateRange, setDateRange] = useState<DateRangeType>('this-month');
  const [sortType, setSortType] = useState<SortType>('newest');
  const [loading, setLoading] = useState(false);

  // Filter transactions based on selected filters
  const filteredTransactions = sampleTransactions
    .filter(transaction => transactionType === 'all' || transaction.type === transactionType)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      switch (sortType) {
        case 'newest':
          return dateB - dateA;
        case 'oldest':
          return dateA - dateB;
        case 'highest':
          return Math.abs(b.amount) - Math.abs(a.amount);
        case 'lowest':
          return Math.abs(a.amount) - Math.abs(b.amount);
        default:
          return dateB - dateA;
      }
    });

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get icon and color based on transaction type
  const getTransactionDetails = (type: Exclude<TransactionType, 'all'>) => {
    switch (type) {
      case 'buy':
        return { 
          icon: <ArrowDown className="h-5 w-5 text-green-500" />, 
          label: 'Buy EAU', 
          badgeColor: 'bg-green-100 text-green-700' 
        };
      case 'sell':
        return { 
          icon: <ArrowUp className="h-5 w-5 text-red-500" />, 
          label: 'Sell EAU', 
          badgeColor: 'bg-red-100 text-red-700' 
        };
      case 'deposit':
        return { 
          icon: <ArrowDown className="h-5 w-5 text-green-500" />, 
          label: 'Deposited', 
          badgeColor: 'bg-green-100 text-green-700' 
        };
      case 'withdrawal':
        return { 
          icon: <ArrowUp className="h-5 w-5 text-red-500" />, 
          label: 'Withdrawal', 
          badgeColor: 'bg-red-100 text-red-700' 
        };
      case 'redeemed':
        return { 
          icon: <ArrowUp className="h-5 w-5 text-red-500" />, 
          label: 'Redeemed', 
          badgeColor: 'bg-red-100 text-red-700' 
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" className="rounded-full" title="Back to Dashboard">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Transaction History</h1>
      </div>

      {/* Filters Row */}
      <div className="sticky top-0 z-10 bg-background pt-2 pb-4 border-b mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Transaction Type Tabs */}
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={(value) => setTransactionType(value as TransactionType)}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1">
              <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
              <TabsTrigger value="buy" className="rounded-full">Buy</TabsTrigger>
              <TabsTrigger value="sell" className="rounded-full">Sell</TabsTrigger>
              <TabsTrigger value="deposit" className="rounded-full">Deposit</TabsTrigger>
              <TabsTrigger value="withdrawal" className="rounded-full">Withdraw</TabsTrigger>
              <TabsTrigger value="redeemed" className="rounded-full">Redeem</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-3 mt-3 sm:mt-0 w-full sm:w-auto">
            {/* Date Range Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Date and time
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setDateRange('today')}>Today</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setDateRange('this-week')}>This Week</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setDateRange('this-month')}>This Month</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setDateRange('custom')}>Custom Range</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown */}
            <Select onValueChange={(value) => setSortType(value as SortType)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {loading ? (
          // Skeleton loading
          Array(5).fill(null).map((_, index) => (
            <Card key={`skeleton-${index}`} className="rounded-xl border shadow-sm">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-start flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-col items-end">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => {
            const { icon, label, badgeColor } = getTransactionDetails(transaction.type);
            const isCredit = transaction.amount > 0;
            
            return (
              <Card key={transaction.id} className="rounded-xl border shadow-sm hover:bg-muted transition-colors">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {icon}
                      <Badge variant="outline" className={`${badgeColor} font-normal`}>
                        {label}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                      {isCredit ? '+' : ''}{transaction.amount.toFixed(4)} EAU
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${Math.abs(transaction.usdAmount).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg">
            <svg
              className="h-12 w-12 text-muted-foreground mb-3"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <h3 className="text-lg font-medium">No transactions found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No transactions match your current filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTransactions.length > 0 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Showing 1–8 of 24 results
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
