import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocationProvider } from "@/context/LocationContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import CreateAd from "@/pages/create-ad";
import Checkout from "@/pages/checkout";
import { SurprisesPage } from "@/pages/surprises";
import { DealsPage } from "@/pages/deals";
import { TodayPage } from "@/pages/today";
import { BookingPage } from "@/pages/booking";
import { AdvertiserDashboard } from "@/pages/advertiser-dashboard";
import { AdminDashboard } from "@/pages/admin-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-ad" component={CreateAd} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/surprises" component={SurprisesPage} />
      <Route path="/deals" component={DealsPage} />
      <Route path="/today" component={TodayPage} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/advertiser-dashboard" component={AdvertiserDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
}

export default App;
