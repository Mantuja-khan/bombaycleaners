import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WashingMachine, Shirt, Wind, Droplets, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: WashingMachine,
    slug: "wash-and-fold",
    title: "Wash & Fold",
    shortDesc: "Professional washing and folding service with premium detergents.",
    longDesc: "Our Wash & Fold service takes the hassle out of laundry day. Simply drop off your clothes or schedule a pickup, and our expert team will wash, dry, and neatly fold every item using premium, eco-friendly detergents. We sort by color and fabric type, use the optimal wash settings for each load, and return your clothes fresh, clean, and perfectly organized.",
    features: [
      "Color and fabric sorting for optimal care",
      "Premium eco-friendly detergents",
      "Temperature-controlled washing and drying",
      "Neat folding and packaging",
      "Same-day and next-day turnaround options",
      "Free pickup and delivery available",
    ],
    price: "From $1.50/lb",
  },
  {
    icon: Shirt,
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    shortDesc: "Expert dry cleaning for delicate fabrics, suits, and formal wear.",
    longDesc: "Trust your finest garments to our expert dry cleaning service. We specialize in handling delicate fabrics, designer pieces, suits, evening gowns, and specialty items with the care they deserve. Our advanced solvent-free cleaning process removes stains and odors while preserving the integrity, color, and texture of your clothes.",
    features: [
      "Solvent-free, eco-friendly cleaning process",
      "Specialization in delicate and luxury fabrics",
      "Professional pressing and finishing",
      "Minor repairs and button replacement",
      "Protective garment bags included",
      "Wedding dress and formal wear specialists",
    ],
    price: "From $8.99/item",
  },
  {
    icon: Wind,
    slug: "steam-ironing",
    title: "Steam Ironing",
    shortDesc: "Crisp, wrinkle-free results with professional steam ironing.",
    longDesc: "Achieve that perfectly pressed look with our professional steam ironing service. Our skilled team uses commercial-grade steam equipment to eliminate wrinkles and creases from all types of garments, from everyday shirts to formal attire. Every piece is carefully inspected and pressed to perfection.",
    features: [
      "Commercial-grade steam equipment",
      "Suitable for all fabric types",
      "Crease-free shirts, trousers, and dresses",
      "Collar and cuff detailing",
      "Hanger or folded delivery options",
      "Express 2-hour service available",
    ],
    price: "From $3.99/item",
  },
  {
    icon: Droplets,
    slug: "stain-removal",
    title: "Stain Removal",
    shortDesc: "Advanced stain treatment for even the toughest stains.",
    longDesc: "Don't give up on stained clothes! Our advanced stain removal service uses specialized techniques and solutions to tackle even the most stubborn stains — from wine and coffee to ink and grease. Our trained technicians assess each stain individually and apply the most effective treatment while preserving fabric integrity.",
    features: [
      "Individual stain assessment and treatment",
      "Wine, coffee, ink, grease, and blood removal",
      "Color-safe treatment processes",
      "Fabric integrity preservation",
      "Pre-treatment for heavily soiled items",
      "Satisfaction guarantee on treatable stains",
    ],
    price: "From $5.99/item",
  },
];

export { services };

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="container mx-auto section-padding text-center space-y-4 animate-fade-up">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded">
            Our Services
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight">
            Professional Laundry Solutions
          </h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto text-sm sm:text-base">
            From everyday laundry to specialty garment care, we offer comprehensive services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto section-padding space-y-16">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center opacity-0 animate-fade-up`}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
            >
              {/* Icon Card */}
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="bg-primary/5 rounded-2xl p-10 sm:p-14 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">{s.title}</h2>
                  <p className="text-secondary font-bold text-lg">{s.price}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-5">
                <p className="text-muted-foreground leading-relaxed">{s.longDesc}</p>
                <ul className="space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
                >
                  Book This Service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
