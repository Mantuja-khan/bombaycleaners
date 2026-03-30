import aboutTeam from "@/assets/about-team.png";
import { CheckCircle, Play, Sparkles } from "lucide-react";

const highlights = [
  { title: "Passionate Expertise", desc: "Our team brings years of experience in fabric care and garment maintenance." },
  { title: "Cutting-Edge Technology", desc: "We invest in modern washing and cleaning equipment for superior results." },
  { title: "Customer-Centric Approach", desc: "Every service is tailored to meet your specific needs and preferences." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <div className="relative opacity-0 animate-slide-left" style={{ animationFillMode: "forwards" }}>
            <Sparkles className="absolute -top-2 -left-2 w-8 h-8 text-secondary" />
            <Sparkles className="absolute top-1/3 left-1/2 w-6 h-6 text-primary" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={aboutTeam}
                alt="Our laundry care team"
                className="w-full object-cover"
              />
              <button className="absolute bottom-6 left-6 flex items-center gap-3 bg-secondary text-secondary-foreground px-5 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-secondary fill-secondary" />
                </div>
                Play Video
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 opacity-0 animate-slide-right" style={{ animationFillMode: "forwards", animationDelay: "150ms" }}>
            <span className="inline-block bg-secondary/15 text-secondary text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Your Trusted Partner in Laundry Care.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              With over a decade of experience, we've built our reputation on delivering exceptional
              laundry services that keep your wardrobe fresh, clean, and perfectly cared for.
            </p>
            <div className="space-y-5 pt-2">
              {highlights.map((h) => (
                <div key={h.title} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground">{h.title}</h4>
                    <p className="text-sm text-muted-foreground font-normal">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
