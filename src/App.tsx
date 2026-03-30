import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import TestimonialsPage from "./pages/TestimonialsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminAuth from "./pages/AdminAuth.tsx";
import NotFound from "./pages/NotFound.tsx";
const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminAuth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
