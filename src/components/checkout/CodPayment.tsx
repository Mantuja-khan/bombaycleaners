import { CreditCard, ArrowLeft, AlertTriangle } from "lucide-react";

interface Props {
  halfPrice: number;
  grandTotal: number;
  onBack: () => void;
  onConfirm: () => void;
}

const CodPayment = ({ halfPrice, grandTotal, onBack, onConfirm }: Props) => (
  <div className="bg-card border rounded-2xl p-5 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-5">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
      <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
    </div>
    <h3 className="font-bold text-foreground text-lg sm:text-xl">Cash on Delivery</h3>
    <div className="bg-muted/50 rounded-xl p-4 sm:p-5 space-y-3">
      <p className="text-foreground font-medium text-sm sm:text-base">For Cash on Delivery, you need to pay:</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center py-2">
        <div className="bg-primary/10 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Pay Now (50%)</p>
          <p className="text-xl sm:text-2xl font-extrabold text-primary">₹{halfPrice}</p>
        </div>
        <span className="text-muted-foreground font-bold">+</span>
        <div className="bg-secondary/10 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Pay on Delivery (50%)</p>
          <p className="text-xl sm:text-2xl font-extrabold text-secondary">₹{grandTotal - halfPrice}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">50% advance payment is required to confirm your order. The remaining amount will be collected upon delivery.</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
      <button onClick={onBack} className="inline-flex items-center justify-center gap-2 border border-border px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <button onClick={onConfirm} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity">
        <CreditCard className="w-4 h-4" />
        Pay ₹{halfPrice} Now
      </button>
    </div>
  </div>
);

export default CodPayment;
