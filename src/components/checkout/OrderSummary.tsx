import { ShoppingBag, Truck } from "lucide-react";
import { deliveryOptions } from "@/pages/CheckoutPage";

interface Props {
  selectedItems: { name: string; qty: number; price: number }[];
  totalPrice: number;
  totalItems: number;
  serviceName: string;
  deliveryCharge: number;
  grandTotal: number;
  selectedDelivery: string;
  onDeliveryChange: (id: string) => void;
}

const OrderSummary = ({ selectedItems, totalPrice, totalItems, serviceName, deliveryCharge, grandTotal, selectedDelivery, onDeliveryChange }: Props) => (
  <div className="bg-card border rounded-2xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
    <h3 className="font-bold text-foreground text-base sm:text-lg mb-1 flex items-center gap-2">
      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
      Order Summary
    </h3>
    <p className="text-xs text-muted-foreground mb-3 sm:mb-4">
      Service: <span className="font-semibold text-foreground">{serviceName}</span> • {totalItems} item{totalItems !== 1 ? "s" : ""}
    </p>
    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
      {selectedItems.map((item) => (
        <div key={item.name} className="flex justify-between text-xs sm:text-sm py-1.5 px-2 sm:px-3 bg-muted/50 rounded-lg">
          <span className="text-muted-foreground">{item.name} × {item.qty}</span>
          <span className="font-medium text-foreground">₹{item.price}</span>
        </div>
      ))}
    </div>

    {/* Delivery Options */}
    <div className="border-t pt-3 sm:pt-4 mb-3 sm:mb-4">
      <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
        <Truck className="w-4 h-4 text-primary" />
        Delivery Option
      </h4>
      <div className="grid gap-2">
        {deliveryOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onDeliveryChange(opt.id)}
            className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border-2 text-left transition-all text-xs sm:text-sm ${
              selectedDelivery === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
            }`}
          >
            <div>
              <span className="font-medium text-foreground">{opt.label}</span>
              <p className="text-muted-foreground text-xs">{opt.desc}</p>
            </div>
            <div className="text-right ml-3 flex-shrink-0">
              <span className={`font-bold ${opt.price === 0 ? "text-green-600" : "text-primary"}`}>
                {opt.price === 0 ? "FREE" : `₹${opt.price}`}
              </span>
              <p className="text-xs text-muted-foreground">{opt.eta}</p>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Totals */}
    <div className="border-t pt-3 space-y-1.5">
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
        <span>Items Total</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
        <span>Delivery Charges</span>
        <span className={deliveryCharge === 0 ? "text-green-600 font-medium" : ""}>
          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
        </span>
      </div>
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="font-semibold text-foreground text-sm sm:text-base">Grand Total</span>
        <span className="text-xl sm:text-2xl font-extrabold text-primary">₹{grandTotal}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
