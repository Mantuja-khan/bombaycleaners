import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote, MessageCirclePlus, User, Building, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

interface Testimonial {
    _id: string;
    name: string;
    business: string;
    feedback: string;
    rating: number;
    createdAt: string;
}

const TestimonialsPage = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.fullName || '',
        business: '',
        feedback: '',
        rating: 5
    });

    const fetchTestimonials = async () => {
        try {
            const { data } = await api.get('/testimonials');
            setTestimonials(data.data);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Login Required", description: "Please login to share your feedback.", variant: "destructive" });
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/testimonials', formData);
            toast({ title: "Thank You!", description: "Your feedback has been submitted for approval." });
            setFormData({ name: user.fullName, business: '', feedback: '', rating: 5 });
        } catch (error: any) {
            toast({ title: "Error", description: "Could not submit testimonial.", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Clean Hero */}
                <section className="bg-gray-50 py-16 border-b">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">Customer Reviews</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">
                            Real stories from our community at Bombay Dry Cleaners.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Feed */}
                        <div className="lg:col-span-8">
                            <div className="space-y-12">
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest pb-4 border-b">Featured Stories</h2>
                                {loading ? (
                                    <div className="flex justify-center py-20">
                                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                    </div>
                                ) : testimonials.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <Quote className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                                        <p className="text-gray-400 font-bold italic">No reviews yet. Start the conversation!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {testimonials.map((t) => (
                                            <div key={t._id} className="bg-gray-50 p-8 md:p-12 rounded-[2rem] hover:bg-gray-100/50 transition-colors">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                                                        ))}
                                                    </div>
                                                    <Quote className="w-8 h-8 text-primary/10" />
                                                </div>
                                                <p className="text-gray-900 text-lg md:text-xl font-medium leading-relaxed mb-8">"{t.feedback}"</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl">
                                                        {t.name[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-gray-900 text-sm uppercase">{t.name}</h4>
                                                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{t.business || 'Customer'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submission Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-2xl shadow-gray-200/50 sticky top-24">
                                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Share Your Review</h2>
                                <p className="text-gray-400 text-sm mb-8">Help others discover the best laundry care by sharing your experience.</p>

                                {!user ? (
                                    <div className="bg-gray-50 p-8 rounded-3xl text-center border border-dashed">
                                        <p className="text-gray-600 text-sm font-bold mb-6 italic leading-relaxed">Join our community to post your personal feedback.</p>
                                        <a href="/auth" className="block bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">Sign In Now</a>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Full Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1 pl-1">Rating</label>
                                            <div className="flex gap-2 justify-between px-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button 
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setFormData(p => ({ ...p, rating: star }))}
                                                        className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${star <= formData.rating ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-300'}`}
                                                    >
                                                        <Star className="w-5 h-5 fill-current" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">Your Feedback</label>
                                            <textarea 
                                                required
                                                rows={5}
                                                value={formData.feedback}
                                                onChange={e => setFormData(p => ({ ...p, feedback: e.target.value }))}
                                                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none resize-none"
                                                placeholder="Tell us about the service quality..."
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70"
                                        >
                                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                            {submitting ? 'Publishing...' : 'Post Feedback'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TestimonialsPage;
