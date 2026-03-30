import { CheckCircle2, Package, Truck, Home, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  orderId: string;
  serviceName: string;
  totalItems: number;
  grandTotal: number;
  deliveryEta: string;
}

const steps = [
  { icon: CheckCircle2, label: "Order Confirmed", desc: "Your order has been placed", done: true },
  { icon: Package, label: "Pickup Scheduled", desc: "We'll pick up your clothes soon", done: true },
  { icon: Clock, label: "In Process", desc: "Your clothes are being cleaned", done: false },
  { icon: Truck, label: "Out for Delivery", desc: "Your clothes are on the way", done: false },
  { icon: Home, label: "Delivered", desc: "Clothes delivered to your door", done: false },
];

const OrderTracking = ({ orderId, serviceName, totalItems, grandTotal, deliveryEta }: Props) => (
  <div className="space-y-6">
    {/* Success Banner */}
    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 sm:p-6 text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
      </div>
      <h3 className="font-bold text-green-800 text-lg sm:text-xl mb-1">Order Confirmed!</h3>
      <p className="text-green-700 text-xs sm:text-sm">Your order has been successfully placed.</p>
      <div className="mt-3 inline-block bg-green-100 px-4 py-1.5 rounded-full">
        <span className="text-xs sm:text-sm font-semibold text-green-800">Order ID: {orderId}</span>
      </div>
    </div>

    {/* Order Details */}
    <div className="bg-card border rounded-2xl p-4 sm:p-5">
      <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3">Order Details</h4>
      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground">Service</p>
          <p className="font-semibold text-foreground">{serviceName}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground">Items</p>
          <p className="font-semibold text-foreground">{totalItems}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground">Total Paid</p>
          <p className="font-semibold text-primary">₹{grandTotal}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-muted-foreground">Est. Delivery</p>
          <p className="font-semibold text-foreground">{deliveryEta}</p>
        </div>
      </div>
    </div>

    {/* Tracking Steps */}
    <div className="bg-card border rounded-2xl p-4 sm:p-5">
      <h4 className="font-semibold text-foreground text-sm sm:text-base mb-4">Order Tracking</h4>
      <div className="space-y-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                s.done ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
              }`}>
                <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-8 sm:h-10 ${s.done ? "bg-green-300" : "bg-border"}`} />
              )}
            </div>
            <div className="pb-6 sm:pb-8">
              <p className={`font-medium text-xs sm:text-sm ${s.done ? "text-green-700" : "text-muted-foreground"}`}>{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="text-center">
      <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity">
        Back to Home
      </Link>
    </div>
  </div>
);

export default OrderTracking;
