import { ShieldCheck, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Unmatched Quality",
    desc: "We use premium detergents and advanced techniques to ensure your garments look and feel their absolute best.",
  },
  {
    icon: Clock,
    title: "Timely Service",
    desc: "Reliable pickup and delivery schedules that fit your lifestyle. On-time, every time — guaranteed.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    desc: "Your happiness drives everything we do. Over 5,000 families trust us with their laundry every week.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group bg-card rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-border/50 opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 100 + 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
