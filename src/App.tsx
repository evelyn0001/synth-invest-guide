import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profiling from "./pages/Profiling";
import Screening from "./pages/Screening";
import Construction from "./pages/Construction";
import Insights from "./pages/Insights";
import Scenario from "./pages/Scenario";
import Recommendation from "./pages/Recommendation";
import Monitoring from "./pages/Monitoring";
import Rebalancing from "./pages/Rebalancing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profiling" element={<Profiling />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/scenario" element={<Scenario />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/rebalancing" element={<Rebalancing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
