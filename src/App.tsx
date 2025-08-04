
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminProvider } from "@/hooks/useAdmin";
import Index from "./pages/Index";
import SearchResults from "./components/SearchResults";
import SeatSelection from "./components/SeatSelection";
import PassengerFormWrapper from "./components/PassengerFormWrapper";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./pages/auth/AuthLayout";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/seat-selection" element={<SeatSelection />} />
              <Route path="/passenger-form" element={<PassengerFormWrapper />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<AuthLayout />} />
              <Route path="/signup" element={<AuthLayout />} />
              <Route path="/forgot-password" element={<AuthLayout />} />
              <Route path="/update-password" element={<AuthLayout />} />
              <Route path="/verify-otp" element={<AuthLayout />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
