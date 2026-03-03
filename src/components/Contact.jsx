import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Linkedin, Github, Send, Mail, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { theme } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted('loading');
        try {
            const formData = new FormData();
            formData.append("access_key", "e4067134-a489-423d-a6b7-79b0758ef986");
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("message", form.message);

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            }).then(r => r.json());

            if (res.success) {
                setSubmitted('done');
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                setSubmitted('error');
                setTimeout(() => setSubmitted(false), 4000);
            }
        } catch (err) {
            setSubmitted('error');
            setTimeout(() => setSubmitted(false), 4000);
        }
    };

    const socials = [
        { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'uday-pandit-89aa24294', href: 'https://www.linkedin.com/in/uday-pandit-89aa24294', color: '#0077b5' },
        { icon: <Github size={18} />, label: 'GitHub', value: 'udayaryan0001', href: 'https://github.com/udayaryan0001', color: theme.text },
        { icon: <Phone size={18} />, label: 'Phone', value: '+91 8595389881', href: 'tel:+918595389881', color: theme.accent },
    ];

    const inputStyle = {
        background: `${theme.text}08`,
        border: `1px solid ${theme.border}`,
        color: theme.text,
        borderRadius: '12px',
    };

    return (
        <section id="contact" className="py-20 sm:py-32 relative overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ borderColor: `${theme.accent}40`, background: `${theme.accent}08`, color: theme.accent }}>
                        Get In Touch
                    </div>
                    <h2 className="font-heading font-bold text-4xl sm:text-5xl" style={{ color: theme.text }}>
                        Let's{' '}
                        <span style={{
                            backgroundImage: theme.gradient,
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            backgroundClip: 'text',
                        }}>Connect</span>
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base" style={{ color: theme.textMuted }}>
                        Have a project in mind, want to collaborate, or just say hi? My inbox is always open.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="p-6 rounded-2xl border"
                            style={{ background: `${theme.accent}06`, borderColor: `${theme.accent}20` }}>
                            <div className="flex items-center gap-3 mb-3">
                                <MessageSquare size={20} style={{ color: theme.accent }} />
                                <span className="font-heading font-semibold text-sm" style={{ color: theme.text }}>Open to Opportunities</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                                Whether you're a founder looking for a technical co-builder, a company hiring for tech roles, or exploring a partnership — let's talk.
                            </p>
                        </div>
                        {socials.map((s, i) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300"
                                style={{ background: theme.cardBg, borderColor: theme.border }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = `${theme.accent}40`;
                                    e.currentTarget.style.background = `${theme.accent}06`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = theme.border;
                                    e.currentTarget.style.background = theme.cardBg;
                                }}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: `${s.color}18`, color: s.color }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div className="text-xs mb-0.5" style={{ color: `${theme.textMuted}80` }}>{s.label}</div>
                                    <div className="font-medium text-sm transition-colors" style={{ color: theme.text }}>{s.value}</div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.25 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-5"
                            style={{ background: theme.cardBg, borderColor: theme.border }}
                        >
                            <h3 className="font-heading font-semibold text-lg flex items-center gap-2" style={{ color: theme.text }}>
                                <Mail size={18} style={{ color: theme.accent }} /> Send a message
                            </h3>

                            {[
                                { key: 'name', type: 'text', label: 'Name', placeholder: 'Your Name' },
                                { key: 'email', type: 'email', label: 'Email', placeholder: 'your@email.com' },
                            ].map(({ key, type, label, placeholder }) => (
                                <div key={key}>
                                    <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: `${theme.textMuted}80` }}>{label}</label>
                                    <input
                                        type={type}
                                        name={key}
                                        value={form[key]}
                                        onChange={handleChange}
                                        required
                                        placeholder={placeholder}
                                        style={{ ...inputStyle, width: '100%', padding: '12px 16px', fontSize: '0.875rem', outline: 'none' }}
                                        onFocus={(e) => { e.target.style.borderColor = `${theme.accent}60`; e.target.style.background = `${theme.accent}06`; }}
                                        onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.background = `${theme.text}08`; }}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: `${theme.textMuted}80` }}>Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project or idea..."
                                    style={{ ...inputStyle, width: '100%', padding: '12px 16px', fontSize: '0.875rem', outline: 'none', resize: 'none' }}
                                    onFocus={(e) => { e.target.style.borderColor = `${theme.accent}60`; e.target.style.background = `${theme.accent}06`; }}
                                    onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.background = `${theme.text}08`; }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
                                style={{ background: theme.gradient, color: '#0a0a0a' }}
                                disabled={submitted === 'loading'}
                            >
                                {submitted === 'loading' ? 'Sending...' : submitted === 'done' ? '✓ Message Sent!' : <><Send size={15} /> Send Message</>}
                            </button>

                            {submitted === 'done' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-center font-medium"
                                    style={{ color: theme.accent }}
                                >
                                    Thanks! I'll get back to you soon 🚀
                                </motion.p>
                            )}
                            {submitted === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-center font-medium text-red-500"
                                >
                                    Something went wrong. Please try again.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
