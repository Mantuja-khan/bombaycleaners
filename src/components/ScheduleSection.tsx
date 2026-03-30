import scheduleWoman from "@/assets/schedule-woman.png";
import { useNavigate } from "react-router-dom";

const ScheduleSection = () => {
  const navigate = useNavigate();
  return (
    <section id="schedule" className="relative bg-primary overflow-hidden">
      <div className="container mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-16">
          {/* Form Side */}
          <div className="space-y-6 opacity-0 animate-slide-left" style={{ animationFillMode: "forwards" }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-foreground leading-tight">
              Schedule Your Pick-Up or Delivery,
              <br className="hidden sm:block" />
              We'll Take Care of the Rest!
            </h2>
            <form className="bg-primary/80 rounded-2xl p-6 sm:p-8 space-y-4" onSubmit={(e) => {
                e.preventDefault();
                navigate('/booking');
            }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/90 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/90 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/90 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="date"
                  placeholder="Date"
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/90 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <select className="w-full px-4 py-3 rounded-lg bg-primary-foreground/90 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option>Time Pickup</option>
                <option>Morning (8am - 12pm)</option>
                <option>Afternoon (12pm - 5pm)</option>
                <option>Evening (5pm - 9pm)</option>
              </select>
              <button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Book Now
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="hidden lg:flex justify-center opacity-0 animate-slide-right" style={{ animationFillMode: "forwards", animationDelay: "200ms" }}>
            <img
              src={scheduleWoman}
              alt="Laundry service professional"
              className="w-full max-w-sm object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
