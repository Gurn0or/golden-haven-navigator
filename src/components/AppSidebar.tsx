
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Users,
  Wallet,
  Coins,
  ArrowDownUp,
  Package,
  Building,
  Settings,
  FileText,
  LifeBuoy,
  Truck,
  Store,
  Calendar
} from "lucide-react";

interface SidebarItemType {
  title: string;
  path: string;
  icon: React.ElementType;
}

const navItems: SidebarItemType[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: BarChart3,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Wallets",
    path: "/wallets",
    icon: Wallet,
  },
  {
    title: "Token Supply",
    path: "/token-supply",
    icon: Coins,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: ArrowDownUp,
  },
  {
    title: "Redemptions",
    path: "/redemptions",
    icon: Package,
  },
];

const fulfillmentItems: SidebarItemType[] = [
  {
    title: "Delivery Requests",
    path: "/delivery-requests",
    icon: Truck,
  },
  {
    title: "Pickup Requests",
    path: "/pickup-requests",
    icon: Calendar,
  },
  {
    title: "Vendor Management",
    path: "/vendor-management",
    icon: Store,
  },
];

const systemItems: SidebarItemType[] = [
  {
    title: "Gold Vaults",
    path: "/vaults",
    icon: Building,
  },
  {
    title: "Pricing Rules",
    path: "/pricing",
    icon: BarChart3,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Support Tickets",
    path: "/support",
    icon: LifeBuoy,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-6">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-gold"></div>
            <h1 className="text-xl font-bold text-charcoal">e-Aurum Admin</h1>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "text-gold font-medium" : ""
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Fulfillment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fulfillmentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "text-gold font-medium" : ""
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "text-gold font-medium" : ""
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
