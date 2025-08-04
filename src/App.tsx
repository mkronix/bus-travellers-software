
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogProvider } from "@/contexts/DialogContext";
import { AdminProvider } from "@/hooks/useAdmin";
import { AuthProvider } from "@/hooks/useAuth";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminBuses from "@/pages/admin/AdminBuses";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminLocations from "@/pages/admin/AdminLocations";
import AdminRoutes from "@/pages/admin/AdminRoutes";
import AdminUsers from "@/pages/admin/AdminUsers";
import AuthLayout from "@/pages/auth/AuthLayout";
import UserProfile from "@/pages/UserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as HotToaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import Index from "./pages/Index";
import MyBookingsPage from "./pages/MyBookingsPage";
import NotFound from "./pages/NotFound";
import TrackBusPage from "./pages/TrackBusPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/auth/ContactUsPage";

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
                <Route path="/" element={<UserLayout />}>
                  <Route path="about-us" element={<AboutUsPage />} />
                  <Route path="contact-us" element={<ContactUsPage />} />
                </Route>


                {/* Auth routes */}
                <Route path="/" element={<AuthLayout />}>
                  <Route path="login" element={<LoginForm />} />
                  <Route path="signup" element={<SignupForm />} />
                  <Route path="forgot-password" element={<ForgotPasswordForm />} />
                  <Route path="verify-otp" element={<VerifyOtpForm />} />
                  <Route path="update-password" element={<UpdatePasswordForm />} />
                </Route>
                <Route path="/" element={<UserLayout />}>
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="my-bookings" element={<MyBookingsPage />} />
                  <Route path="track-bus" element={<TrackBusPage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="locations" element={<AdminLocations />} />
                  <Route path="buses" element={<AdminBuses />} />
                  <Route path="routes" element={<AdminRoutes />} />
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
