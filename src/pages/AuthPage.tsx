import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Lock, User, Eye, EyeOff, ArrowRight, Smartphone, ShieldEllipsis, ShieldCheck } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | "otp">("otp");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    fullName: "",
    otp: "",
  });

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem('token', data.token);
        setUser(data.data.user);
        toast({ title: "Welcome back!", description: "Logged in successfully." });
        navigate("/");
      } else {
        const { data } = await api.post('/auth/signup', {
          email: form.email,
          password: form.password,
          fullName: form.fullName,
        });
        localStorage.setItem('token', data.token);
        setUser(data.data.user);
        toast({ title: "Account created!", description: "Welcome to Bombay Dry Cleaners." });
        navigate("/");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPAuth = async () => {
    setLoading(true);
    try {
      if (!otpSent) {
        // Step 1: Send OTP
        await api.post('/auth/send-otp', { email: form.email });
        setOtpSent(true);
        toast({
          title: "OTP Sent!",
          description: "Check your email (including spam) for the verification code.",
        });
      } else {
        // Step 2: Verify OTP
        const { data } = await api.post('/auth/verify-otp', {
          email: form.email,
          otp: form.otp,
        });
        localStorage.setItem('token', data.token);
        setUser(data.data.user);
        toast({ title: "Successfully logged in!", description: "Welcome to Bombay Dry Cleaners." });
        navigate("/");
      }
    } catch (error: any) {
      toast({ title: "Authentication Failed", description: error.response?.data?.message || error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    toast({ title: "Google Login", description: "Google login is currently unavailable. Please use Email/OTP.", variant: "default" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === "otp") handleOTPAuth();
    else if (authMethod === "email") handleEmailAuth();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 relative pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[10%] -left-10 w-40 h-40 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[20%] -right-10 w-60 h-60 bg-secondary/10 rounded-full blur-[120px] -z-10" />

        <section className="bg-primary pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="container mx-auto section-padding text-center">
            <h1 className="text-3xl md:text-5xl font-black text-primary-foreground tracking-tight animate-fade-up">
              {isLogin ? "Welcome Back" : "Join Our Family"}
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg mt-3 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
              {isLogin ? "Your fresh wardrobe is just a sign-in away." : "Start your journey to specialized fabric care today."}
            </p>
          </div>
        </section>

        <div className="container mx-auto section-padding -mt-16 md:-mt-24 flex justify-center">
          <div className="w-full max-w-md animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="bg-card border-none rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-card/95">
              {/* Header inside card */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Method Tabs */}
                <div className="flex bg-muted/50 p-1.5 rounded-2xl gap-1">
                  <button
                    onClick={() => { setAuthMethod("otp"); setOtpSent(false); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      authMethod === "otp" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ShieldEllipsis className="w-4 h-4" /> OTP Login
                  </button>
                  <button
                    onClick={() => { setAuthMethod("email"); setOtpSent(false); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      authMethod === "email" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Mail className="w-4 h-4" /> Password
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common fields based on method */}
                  {!isLogin && authMethod === "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-foreground/90 ml-1">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Dr. John Doe"
                          value={form.fullName}
                          onChange={handleChange}
                          className="pl-11 h-12 bg-muted/30 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground/90 ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={otpSent}
                        className="pl-11 h-12 bg-muted/30 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  {authMethod === "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-foreground/90 ml-1">Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={handleChange}
                          className="pl-11 pr-11 h-12 bg-muted/30 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {authMethod === "otp" && otpSent && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                      <div className="bg-primary/5 p-4 rounded-2xl flex items-start gap-3 border border-primary/10">
                        <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                        <div className="text-sm">
                          <p className="font-bold text-primary">Enter Verification Code</p>
                          <p className="text-muted-foreground mt-0.5">We've sent a 6-digit code to <span className="text-foreground font-medium">{form.email}</span>.</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center pt-2">
                        <InputOTP
                          maxLength={6}
                          value={form.otp}
                          onChange={(val) => setForm(prev => ({ ...prev, otp: val }))}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="h-12 w-11 rounded-xl" />
                            <InputOTPSlot index={1} className="h-12 w-11 rounded-xl" />
                            <InputOTPSlot index={2} className="h-12 w-11 rounded-xl" />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} className="h-12 w-11 rounded-xl" />
                            <InputOTPSlot index={4} className="h-12 w-11 rounded-xl" />
                            <InputOTPSlot index={5} className="h-12 w-11 rounded-xl" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => setOtpSent(false)} 
                        className="text-xs text-primary font-bold hover:underline block mx-auto py-2"
                      >
                        Change Email Address
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-secondary text-secondary-foreground h-12 rounded-xl font-bold text-sm shadow-xl shadow-secondary/20 hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    ) : (
                      <>
                        {otpSent ? "Verify & Continue" : (authMethod === "otp" ? "Get One-Time Code" : (isLogin ? "Secure Login" : "Create Account"))}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Social Login Section */}
                {!otpSent && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-3 text-muted-foreground font-semibold tracking-widest">or continue with</span>
                      </div>
                    </div>

                    <button
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 border-2 border-border/50 rounded-2xl h-12 text-sm font-bold text-foreground hover:bg-muted/50 transition-all hover:border-primary/20"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Login with Google
                    </button>
                    
                    {/* Toggle Login/Sign-up */}
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground font-medium">
                        {isLogin ? "New to Bombay Dry Cleaners?" : "Already have an account?"}{" "}
                        <button
                          onClick={() => {
                            setIsLogin(!isLogin);
                            if (authMethod === "otp") setAuthMethod("email");
                          }}
                          className="text-primary font-bold hover:underline transition-all"
                        >
                          {isLogin ? "Get Started" : "Sign In"}
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
