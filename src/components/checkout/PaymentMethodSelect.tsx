import { CreditCard, Banknote, ArrowLeft } from "lucide-react";

interface Props {
  onSelectOnline: () => void;
  onSelectCod: () => void;
  onBack: () => void;
}

const PaymentMethodSelect = ({ onSelectOnline, onSelectCod, onBack }: Props) => (
  <div className="space-y-3 sm:space-y-4">
    <h3 className="font-bold text-foreground text-base sm:text-lg mb-2">Choose Payment Method</h3>
    <button
      onClick={onSelectOnline}
      className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground text-sm sm:text-base">Pay Online</h4>
        <p className="text-xs text-muted-foreground">Pay full amount online securely</p>
      </div>
    </button>
    <button
      onClick={onSelectCod}
      className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
        <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground text-sm sm:text-base">Cash on Delivery</h4>
        <p className="text-xs text-muted-foreground">Pay when your clothes are delivered</p>
      </div>
    </button>
    <button onClick={onBack} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">
      <ArrowLeft className="w-4 h-4" />
      Back to Booking
    </button>
  </div>
);

export default PaymentMethodSelect;
