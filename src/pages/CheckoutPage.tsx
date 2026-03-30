import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethodSelect from "@/components/checkout/PaymentMethodSelect";
import OnlinePayment from "@/components/checkout/OnlinePayment";
import CodPayment from "@/components/checkout/CodPayment";
import OrderTracking from "@/components/checkout/OrderTracking";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export type PaymentStep = "choose" | "online" | "cod_message" | "confirmed";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState<PaymentStep>("choose");
  const [orderId, setOrderId] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const { 
    selectedItems = [], 
    totalPrice = 0, 
    totalItems = 0, 
    deliveryCharge = 0,
    serviceName = "", 
    pickupAddress = "" 
  } = (location.state as {
    selectedItems: OrderItem[];
    totalPrice: number;
    totalItems: number;
    deliveryCharge: number;
    serviceName: string;
    pickupAddress: string;
  }) || {};

  const handleConfirm = async () => {
    setIsBooking(true);
    try {
      const { data } = await api.post('/bookings', {
        serviceType: serviceName,
        items: selectedItems,
        totalPrice: totalPrice,
        deliveryCharge: deliveryCharge,
        pickupAddress: pickupAddress
      });
      if (data.status === 'success') {
        setOrderId(data.data._id.slice(-6).toUpperCase());
        setStep("confirmed");
        toast({ title: "Order Confirmed!", description: "Your laundry pickup has been scheduled." });
      }
    } catch (error: any) {
      toast({ title: "Booking Failed", description: error.response?.data?.message || error.message, variant: "destructive" });
    } finally {
      setIsBooking(false);
    }
  };

  if (!selectedItems.length) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto section-padding py-16 sm:py-20 text-center">
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">No items selected</h2>
          <p className="text-muted-foreground text-sm mb-6">Please go back and add items to your order.</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Booking
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const grandTotal = totalPrice; // totalPrice already includes deliveryCharge from BookingPage logic if we want, 
  // actually in BookingPage I did: totalPrice: priceSubtotal + dCharge
  // so grandTotal is already totalPrice.
  const halfPrice = Math.ceil(grandTotal / 2);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black text-primary-foreground mb-2 italic uppercase">Finalize <span className="text-secondary">Order</span></h1>
          <p className="text-primary-foreground/70 text-sm font-medium tracking-widest uppercase">Secure Checkout Portal</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border shadow-2xl shadow-gray-200/50 mb-8">
            <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest border-b pb-4">Order Summary</h2>
            <div className="space-y-4 mb-8">
                {selectedItems.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{item.name} × {item.qty}</span>
                        <span className="font-black text-gray-900">₹{item.price}</span>
                    </div>
                ))}
                <div className="pt-4 border-t border-dashed flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Service Fee</span>
                    <span className="font-black text-gray-900">Included</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Delivery Charge</span>
                    <span className="font-black text-secondary italic">₹{deliveryCharge}</span>
                </div>
            </div>
            
            <div className="pt-6 border-t flex justify-between items-center">
                <span className="text-xl font-black text-gray-900 italic uppercase">Final Amount</span>
                <span className="text-3xl font-black text-primary italic">₹{totalPrice}</span>
            </div>
        </div>

        {step === "choose" && (
          <PaymentMethodSelect onSelectOnline={() => setStep("online")} onSelectCod={() => setStep("cod_message")} onBack={() => navigate("/booking")} />
        )}

        {step === "online" && (
          <OnlinePayment grandTotal={grandTotal} onBack={() => setStep("choose")} onConfirm={handleConfirm} />
        )}

        {step === "cod_message" && (
          <CodPayment halfPrice={halfPrice} grandTotal={grandTotal} onBack={() => setStep("choose")} onConfirm={handleConfirm} />
        )}

        {step === "confirmed" && (
          <OrderTracking orderId={orderId} serviceName={serviceName} totalItems={totalItems} grandTotal={grandTotal} deliveryEta="3-5 days" />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
