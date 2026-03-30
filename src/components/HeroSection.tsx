import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // navigation
import heroWoman from "@/assets/hero-woman.png";
import heroMan from "@/assets/hero-man.png";
import heroWoman2 from "@/assets/hero-woman2.png";
import heroWoman3 from "@/assets/hero-woman3.png";
import { Sparkles } from "lucide-react";

const heroImages = [
  { src: heroWoman, alt: "Laundry professional holding a basket of fresh clothes" },
  { src: heroMan, alt: "Professional holding neatly folded laundry" },
  { src: heroWoman2, alt: "Laundry worker with clean towels" },
  { src: heroWoman3, alt: "Dry cleaning specialist with pressed suits" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const goNext = useCallback(() => {
    setDirection("left");
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section id="home" className="relative bg-primary overflow-hidden">
      <div className="container mx-auto section-padding">
        <div className="grid md:grid-cols-2 gap-6 md:gap-4 lg:gap-8 items-center min-h-[420px] md:min-h-[480px] lg:min-h-[600px] py-10 md:py-6 lg:py-0">
          {/* Image — shows FIRST on mobile (order-first), second on md+ (md:order-last) */}
          <div className="relative flex justify-center md:justify-end order-first md:order-last">
            <div className="absolute top-4 left-8 text-secondary z-10">
              <Sparkles className="w-8 h-8 md:w-5 md:h-5 lg:w-8 lg:h-8" />
            </div>
            <div className="absolute bottom-16 right-4 text-secondary z-10">
              <Sparkles className="w-6 h-6 md:w-4 md:h-4 lg:w-6 lg:h-6" />
            </div>

            {/* Image Carousel — only images slide */}
            <div className="relative w-full max-w-[220px] sm:max-w-xs md:max-w-[260px] lg:max-w-md xl:max-w-lg h-[220px] sm:h-[280px] md:h-[340px] lg:h-[480px] xl:h-[520px]">
              {heroImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === current
                      ? "opacity-100 translate-x-0 scale-100"
                      : i === (current - 1 + heroImages.length) % heroImages.length
                        ? "opacity-0 -translate-x-12 scale-95"
                        : "opacity-0 translate-x-12 scale-95"
                  }`}
                />
              ))}
            </div>

            {/* Dots */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? "left" : "right");
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-secondary w-7"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Text — shows SECOND on mobile, first on md+ */}
          <div className="relative z-10 space-y-4 md:space-y-4 lg:space-y-6 animate-fade-up order-last md:order-first">
            <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded">
              Welcome to Bombay Dry Cleaners
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground leading-[1.08]">
              Where Freshness
              <br />
              Meets Care
            </h1>
            <p className="text-primary-foreground/75 max-w-md text-xs sm:text-sm md:text-xs lg:text-base leading-relaxed">
              Premium laundry services that keep your clothes looking their best.
              We handle everything with the utmost care and attention to detail.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 md:px-4 lg:px-6 py-2.5 md:py-2 lg:py-3 rounded-full text-sm md:text-xs lg:text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                <Sparkles className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                Book Now
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 px-5 md:px-4 lg:px-6 py-2.5 md:py-2 lg:py-3 rounded-full text-sm md:text-xs lg:text-sm font-semibold hover:bg-primary-foreground/20 transition-colors active:scale-[0.97]"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
