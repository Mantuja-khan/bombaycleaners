import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";

const ContactPage = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/queries', formData);
            toast({ title: "Inquiry Sent", description: "We've received your query and will get back to you soon!" });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error: any) {
            toast({ title: "Failed to send", description: "Please try again later.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Simplified Hero */}
                <div className="bg-gray-50 py-16 border-b">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">Get In Touch</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">
                            Have questions? We're here to help. Reach out to our team at Alwar Bypass, Rajasthan.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-widest">Contact Details</h2>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 group">
                                        <div className="bg-primary/10 p-5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Call Us</p>
                                            <a href="tel:+919876543210" className="text-lg font-black text-gray-900 hover:text-primary">+91 98765 43210</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 group">
                                        <div className="bg-secondary/10 p-5 rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Email Us</p>
                                            <a href="mailto:support.bombaydrycleaners@gmail.com" className="text-lg font-black text-gray-900 hover:text-secondary">support.bombaydrycleaners@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 group">
                                        <div className="bg-blue-50 p-5 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <MapPin className="w-6 h-6 text-blue-500 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Visit Us</p>
                                            <p className="text-lg font-medium text-gray-900">Alwar Bypass, Rajasthan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Simple Embedded Map */}
                            <div className="rounded-3xl overflow-hidden border-4 border-gray-100 shadow-sm h-[300px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.0!2d76.6!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3Nis0MCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1711867142013!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        {/* Simplified Form */}
                        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border">
                            <div className="flex items-center gap-3 mb-10">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Drop a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.subject}
                                        onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                                        className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none"
                                        placeholder="Query Subject"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                                        className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none resize-none"
                                        placeholder="Enter your message here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {loading ? "Sending..." : "Submit Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
