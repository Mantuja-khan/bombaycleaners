import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Minus, Plus, ShoppingBag, Sparkles, ArrowRight, MapPin, Edit2, Loader2, Truck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type ServiceType = "wash_fold" | "dry_clean" | "iron" | "premium";

const services: { id: ServiceType; label: string; icon: string; multiplier: number; description: string }[] = [
  { id: "wash_fold", label: "Wash & Fold", icon: "🧺", multiplier: 1, description: "Regular wash with folding" },
  { id: "dry_clean", label: "Dry Cleaning", icon: "🧴", multiplier: 1.8, description: "Professional dry cleaning" },
  { id: "iron", label: "Iron Only", icon: "👔", multiplier: 0.6, description: "Steam press & ironing" },
  { id: "premium", label: "Premium Care", icon: "✨", multiplier: 2.2, description: "Wash + Iron + Packaging" },
];

interface Item {
  _id: string;
  name: string;
  category: string;
  basePrice: number;
  icon?: string;
  priceRange?: string;
}

interface Category {
  name: string;
  icon: string;
  items: Item[];
}

interface DeliveryRange {
    _id: string;
    range: string;
    charge: number;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deliveryRanges, setDeliveryRanges] = useState<DeliveryRange[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceType>("wash_fold");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const [pickupAddress, setPickupAddress] = useState("");
  const [selectedRangeId, setSelectedRangeId] = useState<string>("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, deliveryRes] = await Promise.all([
            api.get('/items'),
            api.get('/delivery')
        ]);
        
        const dbItems: Item[] = itemsRes.data.data;
        setItems(dbItems);
        setDeliveryRanges(deliveryRes.data.data);
        if (deliveryRes.data.data.length > 0) {
            setSelectedRangeId(deliveryRes.data.data[0]._id);
        }

        const catIcons: any = {
          'Daily Wear': '👕',
          'Traditional Wear': '👗',
          'Formal Wear': '👔',
          'Home Items': '🛏️',
          'Accessories': '🧣',
          'Steam Pressing': '🧼'
        };

        const grouped = dbItems.reduce((acc: any, item: Item) => {
            const cat = acc.find((c: any) => c.name === item.category);
            if (cat) {
                cat.items.push(item);
            } else {
                acc.push({ 
                    name: item.category, 
                    icon: catIcons[item.category] || '🧺', 
                    items: [item] 
                });
            }
            return acc;
        }, []);

        setCategories(grouped);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.address) {
      setPickupAddress(user.address);
    }
  }, [user]);

  const currentMultiplier = services.find((s) => s.id === selectedService)!.multiplier;

  const updateQuantity = (itemName: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemName] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [itemName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: next };
    });
  };

  const { totalItems, itemsTotal, deliveryCharge, totalPrice, selectedItems } = useMemo(() => {
    let itemsCount = 0;
    let priceSubtotal = 0;
    const selected: { name: string; qty: number; price: number }[] = [];

    for (const cat of categories) {
      for (const item of cat.items) {
        const qty = quantities[item.name] || 0;
        if (qty > 0) {
          const itemPrice = Math.round(item.basePrice * currentMultiplier * qty);
          itemsCount += qty;
          priceSubtotal += itemPrice;
          selected.push({ name: item.name, qty, price: itemPrice });
        }
      }
    }

    const range = deliveryRanges.find(r => r._id === selectedRangeId);
    const dCharge = range ? range.charge : 0;

    return { 
        totalItems: itemsCount, 
        itemsTotal: priceSubtotal, 
        deliveryCharge: dCharge,
        totalPrice: priceSubtotal + dCharge, 
        selectedItems: selected 
    };
  }, [quantities, currentMultiplier, categories, deliveryRanges, selectedRangeId]);

  if (loading) {
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
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="bg-primary py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-4 tracking-tighter uppercase italic">
            Book <span className="text-secondary">Express</span> Laundry
          </h1>
          <p className="text-primary-foreground/70 text-sm md:text-lg max-w-xl mx-auto font-medium">
            Premium care at your doorstep. Select items and we'll handle the rest!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Step 1: Service */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-4">
                <span className="bg-primary text-white w-8 h-8 rounded-xl flex items-center justify-center text-xs">01</span>
                Service Type
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`relative p-5 rounded-2xl border-2 transition-all group ${
                      selectedService === service.id
                        ? "border-primary bg-primary/5 scale-105"
                        : "border-gray-50 hover:border-primary/20"
                    }`}
                  >
                    <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{service.icon}</span>
                    <h3 className="font-black text-gray-900 text-[10px] uppercase tracking-widest">{service.label}</h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Items */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-4">
                <span className="bg-primary text-white w-8 h-8 rounded-xl flex items-center justify-center text-xs">02</span>
                Select Garments
              </h2>
              
              <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                {categories.map((cat, i) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(i)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${
                      activeCategory === i
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : "bg-gray-50 text-gray-400 border-transparent"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {categories[activeCategory]?.items.map((item) => {
                  const qty = quantities[item.name] || 0;
                  const itemPrice = Math.round(item.basePrice * currentMultiplier);
                  return (
                    <div
                      key={item._id}
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                        qty > 0 ? "border-primary bg-primary/5 shadow-sm" : "border-gray-50"
                      }`}
                    >
                      <div>
                        <h4 className="font-black text-gray-900 text-sm tracking-tight">{item.name}</h4>
                        <p className="text-primary font-black text-xs italic">
                          {item.priceRange ? item.priceRange : `₹${itemPrice}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          disabled={qty === 0}
                          className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-20 transition-all font-black"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-black text-gray-900">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Logistics (Range & Address) */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest flex items-center gap-4">
                <span className="bg-primary text-white w-8 h-8 rounded-xl flex items-center justify-center text-xs">03</span>
                Delivery Details
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 block pl-1">Delivery Distance Range</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {deliveryRanges.map((range) => (
                      <button
                        key={range._id}
                        onClick={() => setSelectedRangeId(range._id)}
                        className={`p-5 rounded-2xl border-2 text-center transition-all ${
                          selectedRangeId === range._id
                            ? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
                            : "border-gray-50 hover:bg-gray-50"
                        }`}
                      >
                        <Truck className={`w-5 h-5 mx-auto mb-2 ${selectedRangeId === range._id ? 'text-secondary' : 'text-gray-300'}`} />
                        <p className="font-black text-gray-900 text-xs tracking-widest uppercase">{range.range}</p>
                        <p className="text-secondary font-black text-sm italic mt-1">₹{range.charge}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block pl-1">Pickup Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="Enter your Alwar Bypass full address etc."
                      className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-5 py-5 text-sm focus:ring-4 focus:ring-primary/5 outline-none font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4">
            <div className="bg-gray-900 text-white p-10 rounded-[3rem] sticky top-24 shadow-2xl shadow-gray-900/40">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                <h3 className="font-black text-xl uppercase tracking-tighter italic">Cart <span className="text-primary-foreground">Summary</span></h3>
                <span className="bg-primary text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic">{totalItems} Items</span>
              </div>

              {totalItems > 0 ? (
                <div className="space-y-6">
                  <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                    {selectedItems.map((item) => (
                      <div key={item.name} className="flex justify-between items-center group">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-gray-100">{item.name}</p>
                          <p className="text-[10px] font-bold text-gray-500 italic">Qty: {item.qty}</p>
                        </div>
                        <span className="font-black text-sm text-primary">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-10 space-y-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Subtotal</span>
                        <span className="font-black">₹{itemsTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Delivery Fee</span>
                        <span className="font-black text-secondary italic">₹{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-2xl pt-4 border-t border-white/5">
                        <span className="font-black uppercase tracking-tighter italic">Total</span>
                        <span className="font-black text-primary italic">₹{totalPrice}</span>
                    </div>
                  </div>

                  <button
                     onClick={() => {
                        if (!pickupAddress) {
                            toast({ title: "Address Required", description: "Please enter your pickup address.", variant: "destructive" });
                            return;
                        }
                        navigate("/checkout", {
                            state: {
                              selectedItems,
                              totalPrice,
                              totalItems,
                              deliveryCharge,
                              serviceName: services.find(s => s.id === selectedService)!.label,
                              pickupAddress,
                            }
                        });
                     }}
                     className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all mt-6"
                  >
                    Confirm Booking
                  </button>
                </div>
              ) : (
                <div className="py-20 text-center opacity-30">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-6" />
                    <p className="text-xs font-black uppercase tracking-widest">Your cart is empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
