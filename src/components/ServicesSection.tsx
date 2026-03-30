import { WashingMachine, Shirt, Wind, Droplets } from "lucide-react";

const services = [
  {
    icon: WashingMachine,
    title: "Wash & Fold",
    desc: "Professional washing and folding service with premium detergents. Your clothes returned fresh and neatly folded.",
  },
  {
    icon: Shirt,
    title: "Dry Cleaning",
    desc: "Expert dry cleaning for delicate fabrics, suits, and formal wear. Gentle care for your finest garments.",
  },
  {
    icon: Wind,
    title: "Steam Ironing",
    desc: "Crisp, wrinkle-free results with our professional steam ironing service. Perfect finish every time.",
  },
  {
    icon: Droplets,
    title: "Stain Removal",
    desc: "Advanced stain treatment techniques that tackle even the toughest stains while preserving fabric integrity.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto section-padding">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <span className="inline-block bg-secondary/15 text-secondary text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            The Best Service Provided to our Customers
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group bg-card rounded-xl p-7 shadow-md hover:shadow-xl border border-border/50 text-center transition-all hover:-translate-y-1 opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 100 + 200}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-secondary transition-colors">
                <s.icon className="w-8 h-8 text-primary group-hover:text-secondary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
