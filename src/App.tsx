import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SupplyChain from "./pages/SupplyChain";
import CivicTech from "./pages/CivicTech";
import DisasterTech from "./pages/DisasterTech";
import FinWellness from "./pages/FinWellness";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/ps/supplychain" element={<SupplyChain/>}></Route>
          <Route path="/ps/civictech" element={<CivicTech/>}></Route>
          <Route path="/ps/disastertech" element={<DisasterTech/>}></Route>
          <Route path="/ps/finwellness" element={<FinWellness/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
