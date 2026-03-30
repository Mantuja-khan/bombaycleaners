import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const categories = [
  {
    name: "Laundry & Dry Cleaning",
    icon: "🧺",
    items: [
      { name: "Bed Sheet Double", price: "250.00" },
      { name: "Bed Sheet Single", price: "210.00" },
      { name: "Blanket Single", price: "295.00" },
      { name: "Blanket Double", price: "395.00" },
      { name: "Baby Blanket", price: "210.00" },
      { name: "Cushion Cover", price: "70.00" },
      { name: "Quilt Double", price: "395.00" },
      { name: "Quilt Single", price: "295.00" },
      { name: "Table Cover Small", price: "140.00" },
      { name: "Table Cover Long", price: "220.00" },
      { name: "Table Napkin", price: "60.00" },
      { name: "Towel Bath", price: "80.00" },
      { name: "Towel Face", price: "70.00" },
      { name: "Towel Hand", price: "60.00" },
      { name: "Curtain", price: "250 to 400.00" },
      { name: "Sofa / Seat", price: "320 to 450.00" },
      { name: "Carpet", price: "30-40 Sq. Ft." },
    ],
  },
  {
    name: "Steam Pressing",
    icon: "💨",
    items: [
      { name: "Gents Suits (2 Pcs)", price: "150.00" },
      { name: "Gents Suits (3 Pcs)", price: "190.00" },
      { name: "Coat", price: "100.00" },
      { name: "Pant", price: "60.00" },
      { name: "Shirt", price: "50.00" },
      { name: "Sweater", price: "60.00" },
      { name: "Shawl", price: "60.00" },
      { name: "Saree Charkh Plain", price: "70 to 100.00" },
      { name: "Saree Charkh Emb.", price: "80 to 120.00" },
      { name: "Ladies Suit (2 Pcs)", price: "120.00" },
      { name: "Ladies Suit (3 Pcs)", price: "160.00" },
      { name: "Ladies Suit Emb. (2 Pcs)", price: "150.00" },
      { name: "Ladies Suit Emb. (3 Pcs)", price: "210.00" },
      { name: "Lehanga Suit Plain (2 Pcs)", price: "250.00" },
      { name: "Lehanga Suit Emb. (2 Pcs)", price: "300.00" },
      { name: "Top / Skirt", price: "60.00" },
      { name: "Cardigan H / S", price: "140.00" },
      { name: "Pajami Bottom Emb.", price: "130.00" },
      { name: "Shawl (Regular)", price: "150.00" },
      { name: "Shawl (Pashmina)", price: "535.00" },
      { name: "Shorts", price: "90.00" },
      { name: "Skirt", price: "150.00" },
      { name: "Skirt (Full Pleated)", price: "250.00" },
      { name: "Top", price: "120.00" },
      { name: "Ladies Trouser / Slacks", price: "130.00" },
      { name: "Ladies T-Shirt", price: "110.00" },
      { name: "Ladies Western Suit (2 Pcs.)", price: "360.00" },
      { name: "Baby Suit (2 Pcs)", price: "250.00" },
      { name: "Baby Suit (3 Pcs)", price: "310.00" },
      { name: "Baby Lehanga Suit (2 Pcs.)", price: "320.00" },
      { name: "Baby Lehanga Suit (3 Pcs)", price: "400.00" },
      { name: "Baby Sweater", price: "120.00" },
      { name: "Baby Jacket", price: "170.00" },
      { name: "Baby Coat", price: "170.00" },
      { name: "Saree Emb.", price: "295 to 800.00" },
      { name: "Saree Plain / Silk", price: "220.00" },
      { name: "Saree Zari", price: "280 to 800.00" },
      { name: "Ladies Suit Emb. (2 Pcs)", price: "280 to 500.00" },
      { name: "Ladies Suit Emb. (3 Pcs)", price: "320 to 800.00" },
      { name: "Ladies Suit Plain (2 Pcs)", price: "220.00" },
      { name: "Ladies Suit Plain (3 Pcs)", price: "295.00" },
      { name: "Blouse Emb.", price: "110.00" },
      { name: "Blouse Plain", price: "95.00" },
      { name: "Ladies Coat", price: "230.00" },
      { name: "Ladies Coat Long", price: "360.00" },
      { name: "Dress (1 Pc.)", price: "300 to 800.00" },
      { name: "Dress Silk / Emb.", price: "380 to 800.00" },
      { name: "Dupatta Emb.", price: "120.00" },
      { name: "Dupatta Plain", price: "90.00" },
      { name: "Ladies Shirt", price: "120 to 220.00" },
      { name: "Lehanga Suit (2 Pcs.)", price: "550 to 1500.00" },
      { name: "Lehanga Suit (3 Pcs.)", price: "650 to 1500.00" },
      { name: "Peti Coat", price: "90.00" },
    ],
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary py-14 lg:py-20">
        <div className="container mx-auto section-padding text-center space-y-4 animate-fade-up">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded">
            Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight">
            Transparent Pricing
          </h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto text-sm sm:text-base">
            No hidden charges. See exactly what you'll pay for each item and service.
          </p>
        </div>
      </section>

      {/* Price Tables */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto section-padding space-y-12">
          {categories.map((cat, ci) => (
            <div
              key={cat.name}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${ci * 80}ms`, animationFillMode: "forwards" }}
            >
              <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span> {cat.name}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left px-4 py-4 font-semibold text-foreground">Item Name</th>
                      <th className="text-right px-4 py-4 font-semibold text-foreground">Price (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((item, i) => (
                      <tr key={item.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="px-4 py-4 font-medium text-foreground">{item.name}</td>
                        <td className="text-right px-4 py-4 text-primary font-bold">
                          {item.price.includes("Sq") || item.price.includes("to") ? "" : "₹"}{item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="text-center pt-6">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
