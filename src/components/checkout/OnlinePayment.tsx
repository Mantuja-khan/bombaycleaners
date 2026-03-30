import { CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";

interface Props {
  grandTotal: number;
  onBack: () => void;
  onConfirm: () => void;
}

const OnlinePayment = ({ grandTotal, onBack, onConfirm }: Props) => (
  <div className="bg-card border rounded-2xl p-5 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-5">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
      <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
    </div>
    <h3 className="font-bold text-foreground text-lg sm:text-xl">Online Payment</h3>
    <p className="text-muted-foreground text-xs sm:text-sm">
      Pay the full amount of <span className="font-bold text-primary text-base sm:text-lg">₹{grandTotal}</span> securely online.
    </p>
    <div className="bg-muted/50 rounded-xl p-3 sm:p-4 space-y-2">
      <p className="text-xs sm:text-sm text-muted-foreground">Payment gateway integration coming soon.</p>
      <p className="text-xs text-muted-foreground">You will be redirected to a secure payment page.</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
      <button onClick={onBack} className="inline-flex items-center justify-center gap-2 border border-border px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <button onClick={onConfirm} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity">
        <CheckCircle2 className="w-4 h-4" />
        Pay ₹{grandTotal}
      </button>
    </div>
  </div>
);

export default OnlinePayment;
