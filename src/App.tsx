
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminProvider } from "@/hooks/useAdmin";
import { DialogProvider } from "@/contexts/DialogContext";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import Dashboard from "@/pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import SeatSelectionPage from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminUsers from "@/pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <DialogProvider>
              <HotToaster position="top-center" />
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/seat-selection" element={<SeatSelectionPage />} />
                <Route path="/passenger-details" element={<PassengerDetails />} />
                
                {/* Auth routes */}
                <Route path="/" element={<AuthLayout />}>
                  <Route path="login" element={<LoginForm />} />
                  <Route path="signup" element={<SignupForm />} />
                  <Route path="forgot-password" element={<ForgotPasswordForm />} />
                  <Route path="verify-otp" element={<VerifyOtpForm />} />
                  <Route path="update-password" element={<UpdatePasswordForm />} />
                </Route>

                {/* Protected routes */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>

                {/* Catch all routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DialogProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
