
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Wallets from "./pages/Wallets";
import PricingRules from "./pages/PricingRules";
import TransactionHistory from "./pages/TransactionHistory";
import GoldVaults from "./pages/GoldVaults";
import TokenSupply from "./pages/TokenSupply";
import Redemptions from "./pages/Redemptions";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create a client outside of the component to avoid recreation on each render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/users" element={<Layout><Users /></Layout>} />
              <Route path="/wallets" element={<Layout><Wallets /></Layout>} />
              <Route path="/token-supply" element={<Layout><TokenSupply /></Layout>} />
              <Route path="/transactions" element={<Layout><TransactionHistory /></Layout>} />
              <Route path="/redemptions" element={<Layout><Redemptions /></Layout>} />
              <Route path="/vaults" element={<Layout><GoldVaults /></Layout>} />
              <Route path="/pricing" element={<Layout><PricingRules /></Layout>} />
              <Route path="/support" element={<Layout><Support /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/reports" element={<Layout><div className="p-8">Reports Page (Coming Soon)</div></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
