import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const AdminAuth = () => {
    const [email, setEmail] = useState("support.bombaydrycleaners@gmail.com");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate("/admin");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({ title: "Incomplete details", description: "Email and password are required.", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            toast({ title: "Welcome Administrator", description: "You have been successfully logged in." });
            navigate("/admin");
        } catch (error: any) {
            const msg = error.response?.data?.message || "Invalid credentials or network error.";
            toast({ title: "Login Failed", description: msg, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border p-8 md:p-12 relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                <div className="text-center mb-10 relative">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h1>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Access Bombay Dry Cleaners Control Panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-400 block mb-2 tracking-widest pl-1">Admin Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-base focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-300"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase text-gray-400 block mb-2 tracking-widest pl-1">Secure Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-base focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-300"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <LogIn className="w-6 h-6" />}
                        {loading ? "Authenticating..." : "Authorize Portal"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate("/")}
                        className="text-gray-400 text-xs font-bold hover:text-primary transition-colors"
                    >
                        Return to Public Website
                    </button>
                </div>
            </div>
            
            <p className="mt-8 text-gray-300 text-[10px] font-black uppercase tracking-[0.2em]">Authorized Access Only • Protected by AES 256</p>
        </div>
    );
};

export default AdminAuth;
