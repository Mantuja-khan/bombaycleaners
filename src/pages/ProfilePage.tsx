import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save, LogOut, User, Phone, MapPin, Loader2, Package, Clock, CheckCircle2, XCircle } from "lucide-react";

interface Order {
    _id: string;
    serviceType: string;
    items: any[];
    totalPrice: number;
    status: string;
    createdAt: string;
    pickupAddress: string;
}

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading, signOut } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
    const [orders, setOrders] = useState<Order[]>([]);

    const [profile, setProfile] = useState({
        full_name: "",
        mobile_number: "",
        address: "",
        avatar_url: "",
    });

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/auth");
            return;
        }
        if (user) {
            setProfile({
                full_name: user.fullName || "",
                mobile_number: user.phone || "",
                address: user.address || "",
                avatar_url: "", 
            });
            setLoading(false);
        }
    }, [user, authLoading, navigate]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const { data } = await api.get('/bookings/my-bookings');
            setOrders(data.data);
        } catch (error: any) {
            toast({ title: "Error", description: "Could not fetch your orders.", variant: "destructive" });
        } finally {
            setOrdersLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.patch('/auth/profile', {
                fullName: profile.full_name,
                phone: profile.mobile_number,
                address: profile.address,
            });
            toast({ title: "Profile updated!", description: "Your changes have been saved." });
        } catch (error: any) {
            toast({ title: "Error", description: error.response?.data?.message || "Failed to update profile.", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'picked': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'washing': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'ready': return 'bg-green-50 text-green-600 border-green-100';
            case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Card */}
                    <div className="bg-primary rounded-[2.5rem] p-8 md:p-12 text-white mb-8 relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="flex flex-col md:flex-row items-center gap-8 relative">
                            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl font-black border border-white/20">
                                {profile.full_name[0]}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-black tracking-tight">{profile.full_name}</h1>
                                <p className="text-primary-foreground/60 font-medium">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="md:ml-auto bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-2xl transition-all border border-white/10"
                                title="Logout"
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 bg-white p-2 rounded-3xl border shadow-sm">
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-gray-400 hover:text-primary hover:bg-gray-50'}`}
                        >
                            Profile Details
                        </button>
                        <button 
                            onClick={() => setActiveTab('orders')}
                            className={`flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-gray-400 hover:text-primary hover:bg-gray-50'}`}
                        >
                            Order History
                        </button>
                    </div>

                    {/* Profile Section */}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                value={profile.full_name}
                                                onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
                                                className="bg-gray-50 border-none rounded-2xl pl-12 pr-5 py-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                value={profile.mobile_number}
                                                onChange={(e) => setProfile((p) => ({ ...p, mobile_number: e.target.value }))}
                                                className="bg-gray-50 border-none rounded-2xl pl-12 pr-5 py-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Default Address</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                            <Textarea
                                                value={profile.address}
                                                onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                                                className="bg-gray-50 border-none rounded-2xl pl-12 pr-5 py-4 min-h-[120px] resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 pt-6 border-t flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-secondary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-secondary/20 hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all flex items-center gap-3 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    {saving ? "Saving Changes..." : "Update Profile"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Orders Section */}
                    {activeTab === 'orders' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            {ordersLoading ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="bg-white p-20 rounded-[2.5rem] text-center border shadow-sm">
                                    <Package className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                                    <p className="text-gray-400 font-bold">No orders found in your account.</p>
                                    <button 
                                        onClick={() => navigate('/booking')}
                                        className="mt-6 text-primary font-black uppercase text-xs tracking-widest hover:underline"
                                    >
                                        Place your first order
                                    </button>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order._id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/10 transition-all">
                                        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 border-b border-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary/10 p-4 rounded-2xl capitalize">
                                                    <Package className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order ID</p>
                                                    <h3 className="font-mono text-xs font-bold text-gray-900 uppercase">#{order._id.slice(-8)}</h3>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 items-center">
                                                <div className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-black border tracking-widest flex items-center gap-2 ${getStatusStyles(order.status)}`}>
                                                    {order.status === 'delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {order.status}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Paid</p>
                                                    <p className="text-lg font-black text-primary">₹{order.totalPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50/50 p-6 md:p-8 grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3">Service & Items</h4>
                                                <p className="text-sm font-bold text-gray-800 capitalize mb-1">{order.serviceType.replace('_', ' & ')}</p>
                                                <div className="space-y-1">
                                                    {order.items.map((item, i) => (
                                                        <p key={i} className="text-xs text-gray-500 font-medium">
                                                            • {item.name} <span className="text-gray-400">({item.quantity} pc)</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3">Delivery to</h4>
                                                <p className="text-xs text-gray-500 font-medium leading-relaxed">{order.pickupAddress}</p>
                                                <p className="text-[10px] text-gray-400 mt-4 font-bold">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
