import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ heroImage }) {
    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
                className="absolute inset-0"
            >
                <img
                    src={heroImage}
                    alt="Mountain landscape at sunrise"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />

            {/* Teal glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-6"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        Aventura con sentido
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-5xl"
                >
                    Conecta, explora y{' '}
                    <span className="text-primary text-glow italic">siente</span>{' '}
                    el camino
                </motion.h1>

                {/* ECG Heartbeat line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="relative w-64 md:w-80 mx-auto mt-6 mb-0"
                    aria-hidden="true"
                >
                    <style>{`
            @keyframes ecg-travel {
              0%   { stroke-dashoffset: 420; opacity: 0; }
              8%   { opacity: 1; }
              60%  { opacity: 1; }
              80%  { opacity: 0; stroke-dashoffset: 0; }
              100% { opacity: 0; stroke-dashoffset: 0; }
            }
            @keyframes ecg-glow-travel {
              0%   { stroke-dashoffset: 420; opacity: 0; }
              8%   { opacity: 0.4; }
              60%  { opacity: 0.4; }
              80%  { opacity: 0; stroke-dashoffset: 0; }
              100% { opacity: 0; stroke-dashoffset: 0; }
            }
          `}</style>
                    <svg
                        viewBox="0 0 320 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full"
                    >
                        {/* Glow layer */}
                        <path
                            d="M0 25 L60 25 L75 25 L85 5 L95 44 L105 10 L112 38 L118 25 L260 25 L320 25"
                            stroke="hsl(168 100% 50%)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="420"
                            filter="url(#ecg-blur)"
                            style={{
                                animation: 'ecg-glow-travel 2.8s cubic-bezier(0.4,0,0.6,1) infinite',
                                animationDelay: '0.3s',
                            }}
                        />
                        {/* Main line */}
                        <path
                            d="M0 25 L60 25 L75 25 L85 5 L95 44 L105 10 L112 38 L118 25 L260 25 L320 25"
                            stroke="hsl(168 100% 50%)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="420"
                            style={{
                                animation: 'ecg-travel 2.8s cubic-bezier(0.4,0,0.6,1) infinite',
                            }}
                        />
                        <defs>
                            <filter id="ecg-blur" x="-20%" y="-80%" width="140%" height="260%">
                                <feGaussianBlur stdDeviation="4" />
                            </filter>
                        </defs>
                    </svg>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl font-light"
                >
                    Experiencias de aventura con sentido. Ríos, senderos y naturaleza real.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-4 mt-10"
                >
                    <a
                        href="#expeditions"
                        className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                    >
                        Explorar Expediciones
                    </a>
                    <a
                        href="#cta"
                        className="px-8 py-4 rounded-full border border-foreground/20 text-foreground font-semibold text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                        Únete a la Aventura
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6 text-primary/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}