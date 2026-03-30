import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Users, 
  Settings, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ChevronRight, 
  Search,
  Loader2,
  Package,
  Circle,
  Plus,
  MessageSquare,
  Star,
  Trash2,
  XCircle,
  Mail,
  Phone,
  Scaling,
  Zap
} from "lucide-react";

interface Booking {
  _id: string;
  userId: {
    fullName: string;
    email: string;
    phone: string;
  };
  serviceType: string;
  totalPrice: number;
  deliveryCharge?: number;
  status: string;
  paymentStatus: string;
  pickupAddress: string;
  createdAt: string;
}

interface Item {
  _id: string;
  name: string;
  category: string;
  basePrice: number;
  priceRange?: string;
}

interface Query {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

interface Testimonial {
    _id: string;
    name: string;
    business: string;
    feedback: string;
    rating: number;
    status: string;
    createdAt: string;
}

interface DeliveryRange {
    _id: string;
    range: string;
    charge: number;
    isActive: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [deliveryRanges, setDeliveryRanges] = useState<DeliveryRange[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'items' | 'queries' | 'testimonials' | 'delivery'>('orders');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Form states
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemForm, setItemForm] = useState({ name: '', category: 'Daily Wear', basePrice: 0, priceRange: '' });

  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [editingRange, setEditingRange] = useState<DeliveryRange | null>(null);
  const [deliveryForm, setDeliveryForm] = useState({ range: '', charge: 0, isActive: true });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      toast({ title: "Access Denied", description: "You do not have administrator privileges.", variant: "destructive" });
      navigate("/");
      return;
    }
    fetchData();
  }, [user, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, itemsRes, queriesRes, testimonialsRes, deliveryRes] = await Promise.all([
          api.get('/admin/bookings'),
          api.get('/admin/items'),
          api.get('/admin/queries'),
          api.get('/admin/testimonials'),
          api.get('/admin/delivery')
      ]);
      setBookings(bookingsRes.data.data);
      setItems(itemsRes.data.data);
      setQueries(queriesRes.data.data);
      setTestimonials(testimonialsRes.data.data);
      setDeliveryRanges(deliveryRes.data.data);
    } catch (error: any) {
      toast({ title: "Error", description: "Failed to fetch dashboard data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await api.patch(`/admin/bookings/${id}`, { status });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      toast({ title: "Status Updated", description: `Order status set to ${status}.` });
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } finally {
      setUpdating(null);
    }
  };

  const updateQueryStatus = async (id: string, status: string) => {
    try {
        await api.patch(`/admin/queries/${id}`, { status });
        setQueries(prev => prev.map(q => q._id === id ? { ...q, status } : q));
        toast({ title: "Query Updated" });
    } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const updateTestimonialStatus = async (id: string, status: string) => {
    try {
        await api.patch(`/admin/testimonials/${id}`, { status });
        setTestimonials(prev => prev.map(t => t._id === id ? { ...t, status } : t));
        toast({ title: "Testimonial Updated" });
    } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const deleteQuery = async (id: string) => {
    if(!window.confirm('Delete this query?')) return;
    try {
        await api.delete(`/admin/queries/${id}`);
        setQueries(prev => prev.filter(q => q._id !== id));
        toast({ title: "Query deleted" });
    } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if(!window.confirm('Delete this testimonial?')) return;
    try {
        await api.delete(`/admin/testimonials/${id}`);
        setTestimonials(prev => prev.filter(t => t._id !== id));
        toast({ title: "Testimonial deleted" });
    } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const deleteDeliveryRange = async (id: string) => {
    if(!window.confirm('Delete this range?')) return;
    try {
        await api.delete(`/admin/delivery/${id}`);
        setDeliveryRanges(prev => prev.filter(r => r._id !== id));
        toast({ title: "Range deleted" });
    } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const statusColors: any = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    picked: "bg-blue-100 text-blue-800 border-blue-200",
    washing: "bg-indigo-100 text-indigo-800 border-indigo-200",
    drying: "bg-cyan-100 text-cyan-800 border-cyan-200",
    ready: "bg-purple-100 text-purple-800 border-purple-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">Control <span className="text-primary">Center</span></h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">Bombay Dry Cleaners Operations</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-white border-2 border-primary/10 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm">
                <div className="bg-blue-500/10 p-2 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">New Queries</p>
                    <p className="font-black text-xl text-gray-900">{queries.filter(q => q.status === 'new').length}</p> 
                </div>
            </div>
            <div className="bg-white border-2 border-primary/10 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm">
                <div className="bg-secondary/10 p-2 rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-secondary" />
                </div>
                <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Orders</p>
                    <p className="font-black text-xl text-gray-900">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
            </div>
          </div>
        </div>

        {/* Improved Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
            {['orders', 'items', 'delivery', 'queries', 'testimonials'].map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-8 py-3.5 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl border-2 ${activeTab === tab ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' : 'bg-white text-gray-400 border-transparent hover:text-gray-900'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Orders View */}
        {activeTab === 'orders' && (
            <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="p-8 border-b flex items-center justify-between">
                    <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-3">
                        <Package className="w-6 h-6 text-primary" />
                        Order Management
                    </h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-8 py-6">ID</th>
                                <th className="px-8 py-6">Customer</th>
                                <th className="px-8 py-6">Details</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="font-mono text-[10px] text-gray-300 font-black uppercase leading-none mb-1">Order Ref</p>
                                        <p className="font-black text-gray-900 text-xs tracking-tighter italic">#{order._id.slice(-8)}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-gray-900 text-sm mb-1">{order.userId?.fullName || 'Guest'}</p>
                                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{order.userId?.phone || 'No Phone'}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-600">{order.serviceType}</p>
                                            <p className="text-sm font-black text-primary italic">₹{order.totalPrice} <span className="text-[10px] text-gray-400 not-italic font-medium">({order.deliveryCharge ? `₹${order.deliveryCharge} delivery` : 'free'})</span></p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 tracking-widest ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <select 
                                            className="text-[10px] font-black uppercase border-2 rounded-xl px-4 py-2 outline-none focus:ring-4 focus:ring-primary/5 bg-white border-gray-100 cursor-pointer shadow-sm"
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            disabled={updating === order._id}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="picked">Picked</option>
                                            <option value="washing">Washing</option>
                                            <option value="drying">Drying</option>
                                            <option value="ready">Ready</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Catalog Control */}
        {activeTab === 'items' && (
            <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                        Service Catalog
                    </h2>
                    <button 
                        onClick={() => {
                            setEditingItem(null);
                            setItemForm({ name: '', category: 'Daily Wear', basePrice: 0, priceRange: '' });
                            setShowItemModal(true);
                        }}
                        className="bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Plus className="w-4 h-4" /> Add Service Item
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-8 py-6">Name</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Base Price</th>
                                <th className="px-8 py-6">Price Range</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6 font-black text-gray-900 text-sm tracking-tight">{item.name}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-gray-50 text-gray-400 border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-primary italic underline underline-offset-4 decoration-2 decoration-primary/20">₹{item.basePrice}</td>
                                    <td className="px-8 py-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.priceRange || 'Fixed Price'}</td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button 
                                          onClick={() => {
                                            setEditingItem(item);
                                            setItemForm({
                                              name: item.name,
                                              category: item.category,
                                              basePrice: item.basePrice,
                                              priceRange: item.priceRange || ''
                                            });
                                            setShowItemModal(true);
                                          }}
                                          className="text-[10px] font-black uppercase bg-gray-100 text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                                        >
                                          Edit
                                        </button>
                                        <button 
                                          onClick={async () => {
                                            if(window.confirm('Delete this item?')) {
                                              await api.delete(`/admin/items/${item._id}`);
                                              setItems(prev => prev.filter(i => i._id !== item._id));
                                              toast({ title: "Item deleted" });
                                            }
                                          }}
                                          className="text-[10px] font-black uppercase bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                          Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Delivery Management */}
        {activeTab === 'delivery' && (
            <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-3">
                        <Scaling className="w-6 h-6 text-primary" />
                        Delivery Logistics
                    </h2>
                    <button 
                        onClick={() => {
                            setEditingRange(null);
                            setDeliveryForm({ range: '', charge: 0, isActive: true });
                            setShowDeliveryModal(true);
                        }}
                        className="bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Plus className="w-4 h-4" /> Add Delivery Range
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-8 py-6">Distance Range</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Fee</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {deliveryRanges.map((dr) => (
                                <tr key={dr._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="font-black text-gray-900 text-sm tracking-[0.1em]">{dr.range}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${dr.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                            {dr.isActive ? 'Live' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-secondary italic">₹{dr.charge}</td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button 
                                          onClick={() => {
                                            setEditingRange(dr);
                                            setDeliveryForm({
                                              range: dr.range,
                                              charge: dr.charge,
                                              isActive: dr.isActive
                                            });
                                            setShowDeliveryModal(true);
                                          }}
                                          className="text-[10px] font-black uppercase bg-gray-100 text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                                        >
                                          Edit
                                        </button>
                                        <button 
                                          onClick={() => deleteDeliveryRange(dr._id)}
                                          className="text-[10px] font-black uppercase bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                          Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Queries & Testimonials (kept simple) */}
        {activeTab === 'queries' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {queries.map((q) => (
                    <div key={q._id} className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 shadow-sm relative overflow-hidden group">
                        {q.status === 'new' && <div className="absolute top-0 right-0 px-4 py-1 bg-blue-500 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl">New Message</div>}
                        <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">{q.subject}</h3>
                        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                            <p className="text-gray-600 text-sm italic font-medium leading-relaxed">"{q.message}"</p>
                        </div>
                        <div className="space-y-2 mb-8">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <Mail className="w-3.5 h-3.5 text-primary" /> {q.email}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <Phone className="w-3.5 h-3.5 text-secondary" /> {q.phone || 'N/A'}
                            </div>
                        </div>
                        <div className="pt-6 border-t flex items-center justify-between">
                            <button 
                                onClick={() => updateQueryStatus(q._id, q.status === 'new' ? 'replied' : 'new')}
                                className={`text-[9px] font-black uppercase px-5 py-2.5 rounded-xl transition-all ${q.status === 'new' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}
                            >
                                {q.status === 'new' ? 'Resolve' : 'Re-open'}
                            </button>
                            <button onClick={() => deleteQuery(q._id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'testimonials' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                    <div key={t._id} className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border-2 ${t.status === 'approved' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                                {t.status}
                            </div>
                        </div>
                        <p className="text-gray-900 text-sm font-bold italic mb-10 leading-relaxed">"{t.feedback}"</p>
                        <div className="mt-auto pt-8 border-t flex items-center justify-between">
                            <div>
                                <h4 className="font-black text-gray-900 text-xs uppercase tracking-widest">{t.name}</h4>
                                <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest">{t.business || 'Client'}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => updateTestimonialStatus(t._id, t.status === 'approved' ? 'pending' : 'approved')}
                                    className={`p-2.5 rounded-xl transition-all ${t.status === 'approved' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}
                                >
                                    {t.status === 'approved' ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                                </button>
                                <button onClick={() => deleteTestimonial(t._id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* --- Modals --- */}
        
        {/* Delivery Modal */}
        {showDeliveryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl overflow-hidden border-4 border-white">
                <div className="p-10 border-b bg-gray-50/50">
                    <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter">{editingRange ? 'Edit Logistics' : 'New Range'}</h3>
                </div>
                <div className="p-10 space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Distance (e.g. 0-5km)</label>
                        <input 
                            type="text" 
                            value={deliveryForm.range} 
                            onChange={e => setDeliveryForm(p => ({ ...p, range: e.target.value }))}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                            placeholder="0-5km"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Charge (₹)</label>
                        <input 
                            type="number" 
                            value={deliveryForm.charge} 
                            onChange={e => setDeliveryForm(p => ({ ...p, charge: parseInt(e.target.value) }))}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 outline-none font-black text-primary italic"
                        />
                    </div>
                    <div className="flex items-center gap-3 px-1">
                        <input 
                           type="checkbox" 
                           checked={deliveryForm.isActive}
                           onChange={e => setDeliveryForm(p => ({ ...p, isActive: e.target.checked }))}
                           className="w-5 h-5 accent-primary rounded-lg"
                        />
                        <label className="text-[10px] font-black uppercase text-gray-900 tracking-widest">Active & Visible</label>
                    </div>
                </div>
                <div className="p-10 bg-gray-50 flex gap-4">
                    <button onClick={() => setShowDeliveryModal(false)} className="flex-1 py-4 text-[10px] font-black uppercase text-gray-400">Back</button>
                    <button 
                        onClick={async () => {
                          try {
                            const payload = { ...deliveryForm, id: editingRange?._id };
                            const res = await api.post('/admin/delivery', payload);
                            if (editingRange) {
                                setDeliveryRanges(prev => prev.map(r => r._id === editingRange._id ? res.data.data : r));
                            } else {
                                setDeliveryRanges(prev => [...prev, res.data.data]);
                            }
                            setShowDeliveryModal(false);
                            toast({ title: "Logistics Updated" });
                          } catch (err: any) { toast({ title: "Update failed", variant: 'destructive' }); }
                        }}
                        className="flex-[2] py-4 rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
                    >
                        Confirm Settings
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* Item Modal (Original) */}
        {showItemModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden border-4 border-white">
                <div className="p-8 border-b bg-gray-50/50">
                    <h3 className="text-xl font-black text-gray-900 uppercase italic">Garment Control</h3>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Item Name</label>
                        <input 
                            type="text" 
                            value={itemForm.name} 
                            onChange={e => setItemForm(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold placeholder:font-normal"
                            placeholder="e.g. Saree Embroidery"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Category</label>
                        <select 
                            value={itemForm.category}
                            onChange={e => setItemForm(p => ({ ...p, category: e.target.value }))}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 outline-none appearance-none font-black text-gray-600 uppercase italic tracking-widest"
                        >
                            <option value="Daily Wear">Daily Wear</option>
                            <option value="Traditional Wear">Traditional Wear</option>
                            <option value="Formal Wear">Formal Wear</option>
                            <option value="Home Items">Home Items</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Steam Pressing">Steam Pressing</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Price (₹)</label>
                            <input 
                                type="number" 
                                value={itemForm.basePrice} 
                                onChange={e => setItemForm(p => ({ ...p, basePrice: parseInt(e.target.value) }))}
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 outline-none font-black text-primary italic"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Price Range</label>
                            <input 
                                type="text" 
                                value={itemForm.priceRange} 
                                onChange={e => setItemForm(p => ({ ...p, priceRange: e.target.value }))}
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-8 bg-gray-50/50 flex gap-4">
                    <button onClick={() => setShowItemModal(false)} className="flex-1 py-4 text-[10px] font-black uppercase text-gray-400">Cancel</button>
                    <button 
                        onClick={async () => {
                          try {
                            if (editingItem) {
                              const res = await api.patch(`/admin/items/${editingItem._id}`, itemForm);
                              setItems(prev => prev.map(i => i._id === editingItem._id ? res.data.data : i));
                              toast({ title: "Item Updated" });
                            } else {
                              const res = await api.post('/admin/items', itemForm);
                              setItems(prev => [...prev, res.data.data]);
                              toast({ title: "Item Added" });
                            }
                            setShowItemModal(false);
                          } catch (err: any) { toast({ title: "Failed", variant: 'destructive' }); }
                        }}
                        className="flex-[2] py-4 rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
                    >
                        Save Catalog
                    </button>
                </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
