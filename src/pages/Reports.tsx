
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Wallet, 
  ArrowDownToLine, 
  Database, 
  ReceiptText, 
  HeadphonesIcon, 
  FileCode,
  Lock,
  Calendar,
  Loader2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Report types
const reportTypes = [
  { 
    id: 'token-movement', 
    title: 'Token Movement Report',
    description: 'Tracks minting, burning, and circulating supply of tokens',
    icon: <BarChart3 className="h-8 w-8 text-yellow-500" />,
    color: 'bg-yellow-100 dark:bg-yellow-900/20',
    filters: ['Action (Mint/Burn)', 'Admin', 'Reason'],
    restricted: false
  },
  { 
    id: 'wallet-activity', 
    title: 'Wallet Activity Report',
    description: 'Tracks wallet creation, balance changes, and status updates',
    icon: <Wallet className="h-8 w-8 text-green-500" />,
    color: 'bg-green-100 dark:bg-green-900/20',
    filters: ['Balance Range', 'Wallet Status'],
    restricted: false
  },
  { 
    id: 'redemption', 
    title: 'Redemption Report',
    description: 'Tracks token to gold conversions, vault movements, and delivery status',
    icon: <ArrowDownToLine className="h-8 w-8 text-red-500" />,
    color: 'bg-red-100 dark:bg-red-900/20',
    filters: ['Vault', 'Redemption Mode', 'Status'],
    restricted: false
  },
  { 
    id: 'vault-inventory', 
    title: 'Vault Inventory Report',
    description: 'Tracks vault-wise gold movements and inventory levels',
    icon: <Database className="h-8 w-8 text-orange-500" />,
    color: 'bg-orange-100 dark:bg-orange-900/20',
    filters: ['Vault Location', 'Gold Added/Removed'],
    restricted: true
  },
  { 
    id: 'transaction-log', 
    title: 'Transaction Log Report',
    description: 'Tracks buy, sell, and withdraw transactions',
    icon: <ReceiptText className="h-8 w-8 text-blue-500" />,
    color: 'bg-blue-100 dark:bg-blue-900/20',
    filters: ['Token', 'Status', 'Payment Method'],
    restricted: false
  },
  { 
    id: 'support-tickets', 
    title: 'Support Tickets Report',
    description: 'Tracks ticket volumes, statuses, and resolution times',
    icon: <HeadphonesIcon className="h-8 w-8 text-purple-500" />,
    color: 'bg-purple-100 dark:bg-purple-900/20',
    filters: ['Category', 'Status', 'Assigned Admin'],
    restricted: false
  },
  { 
    id: 'smart-contract', 
    title: 'Smart Contract Execution Logs',
    description: 'Tracks smart contract calls, events, and execution status',
    icon: <FileCode className="h-8 w-8 text-slate-500" />,
    color: 'bg-slate-100 dark:bg-slate-900/20',
    filters: ['Contract Address', 'Event Type', 'Execution Status'],
    restricted: true
  },
];

// Recent generated reports data (mock)
const recentReports = [
  {
    id: 1,
    name: 'Token Movement Report - March 2025',
    type: 'Token Movement',
    dateGenerated: '2025-03-15T14:32:00',
    timeRange: 'Mar 1 - Mar 15, 2025',
    format: 'CSV',
    status: 'Ready',
  },
  {
    id: 2,
    name: 'Wallet Activity Q1 2025',
    type: 'Wallet Activity',
    dateGenerated: '2025-03-31T09:15:00',
    timeRange: 'Jan 1 - Mar 31, 2025',
    format: 'XLSX',
    status: 'Ready',
  },
  {
    id: 3,
    name: 'Support Tickets Summary - February',
    type: 'Support Tickets',
    dateGenerated: '2025-03-01T11:45:00',
    timeRange: 'Feb 1 - Feb 28, 2025',
    format: 'PDF',
    status: 'Ready',
  },
];

const Reports = () => {
  const { toast: showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReportType, setSelectedReportType] = useState('');
  const [dateRange, setDateRange] = useState('this-month');
  const [dataFormat, setDataFormat] = useState('csv');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingReportId, setGeneratingReportId] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  // Filter reports based on search term
  const filteredReports = searchTerm 
    ? reportTypes.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : reportTypes;

  // Simulated user role - in a real app, this would come from auth context
  const userRole = 'super-admin'; // Options: 'admin', 'super-admin'
  
  const handleGenerateReport = (reportId: string) => {
    setIsGenerating(true);
    setGeneratingReportId(reportId);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratingReportId(null);
      
      toast.success("Report generated successfully", {
        description: `Your ${reportTypes.find(r => r.id === reportId)?.title} is ready for download`,
        action: {
          label: "Download",
          onClick: () => handleDownloadReport(reportId),
        },
      });
    }, 2500);
  };
  
  const handleDownloadReport = (reportId: string) => {
    const report = reportTypes.find(r => r.id === reportId);
    if (!report) return;
    
    // Check if user has permission for restricted reports
    if (report.restricted && userRole !== 'super-admin') {
      toast.error("Access Denied", {
        description: "You don't have permission to download this report",
      });
      return;
    }

    // In a real app, this would trigger an API call to download the report
    toast.success("Download started", {
      description: `${report.title} is being downloaded`,
    });
  };

  const hasPermission = (restricted: boolean) => {
    if (!restricted) return true;
    return userRole === 'super-admin';
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-semibold text-primary mb-4 md:mb-0">Reports Center</h1>
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Report Type</label>
          <Select value={selectedReportType} onValueChange={setSelectedReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              {reportTypes.map(report => (
                <SelectItem key={report.id} value={report.id}>
                  {report.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="flex space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            {dateRange === 'custom' && (
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "MMM dd, yyyy") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "MMM dd, yyyy") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Data Format</label>
          <Select value={dataFormat} onValueChange={setDataFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">XLSX</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredReports.map(report => (
          <Card key={report.id} className={cn("overflow-hidden", report.color)}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {report.icon}
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                </div>
                {report.restricted && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Lock className="h-4 w-4 text-yellow-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Restricted to Super Admins</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="min-h-[3rem]">{report.description}</CardDescription>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Available Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {report.filters.map((filter, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isGenerating || (report.restricted && !hasPermission(report.restricted))}
                onClick={() => handleGenerateReport(report.id)}
              >
                {isGenerating && generatingReportId === report.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Recent Generated Reports</h2>
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Date Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Time Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {recentReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(report.dateGenerated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{report.timeRange}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge variant="outline">{report.format}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      {report.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Download</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
