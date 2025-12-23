import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/auth", component: Auth }), _jsx(Route, { path: "/dashboard", component: Dashboard }), _jsx(Route, { path: "/create-ad", component: CreateAd }), _jsx(Route, { path: "/checkout", component: Checkout }), _jsx(Route, { path: "/surprises", component: SurprisesPage }), _jsx(Route, { path: "/deals", component: DealsPage }), _jsx(Route, { path: "/today", component: TodayPage }), _jsx(Route, { path: "/booking", component: BookingPage }), _jsx(Route, { path: "/advertiser-dashboard", component: AdvertiserDashboard }), _jsx(Route, { path: "/admin-dashboard", component: AdminDashboard }), _jsx(Route, { component: NotFound })] }));
}
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(LocationProvider, { children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Router, {})] }) }) }));
}
export default App;
