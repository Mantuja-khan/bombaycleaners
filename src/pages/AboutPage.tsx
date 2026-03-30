import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { Sparkles, Heart, Users, Globe, ShieldCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto section-padding text-center space-y-6">
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded animate-fade-up">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "100ms" }}>
            The Tradition of <span className="text-secondary italic">Excellence</span>
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
            For over 2 years, Bombay Dry Cleaners has been the gold standard in specialized fabric care, combining traditional craftsmanship with modern technology.
          </p>
        </div>
      </section>

      {/* Main About Section from Index */}
      <AboutSection />

      {/* Core Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto section-padding">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-foreground">Our Core Values</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              These principles guide everything we do, from how we clean your clothes to how we treat our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-primary" />,
                title: "Quality First",
                desc: "We never compromise on the quality of cleaning and care for your garments."
              },
              {
                icon: <Heart className="w-8 h-8 text-secondary" />,
                title: "Passion for Care",
                desc: "We treat every item as if it were our own, with ultimate attention to detail."
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Community trust",
                desc: "Building long-term relationships through reliability and consistent excellence."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
                title: "Eco-Friendly",
                desc: "Using safe, professional-grade cleaning solutions that are gentle on fabrics and nature."
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all text-center space-y-4 group"
              >
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Happy Clients", value: "500+" },
              { label: "Items Cleaned", value: "10K+" },
              { label: "Years Experience", value: "2+" },
              { label: "Locations", value: "3" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-3xl md:text-4xl font-black text-secondary">{stat.value}</h4>
                <p className="text-sm text-primary-foreground/70 uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
