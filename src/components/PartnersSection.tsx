const partners = ["Guaro", "Bullseye", "Browth", "Bright", "Brant", "Boost"];

const PartnersSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-background border-y border-border/50">
      <div className="container mx-auto section-padding">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          {partners.map((name) => (
            <span
              key={name}
              className="text-xl sm:text-2xl font-extrabold text-foreground/20 hover:text-foreground/40 transition-colors select-none tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
