import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection({ bgImage }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="cta" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt="Mountain sunrise silhouette"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-background/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Tu próxima aventura{' '}
                        <span className="text-primary text-glow italic">comienza aquí</span>
                    </h2>
                    <p className="text-muted-foreground mt-6 text-lg md:text-xl font-light max-w-xl mx-auto">
                        No esperes más. El camino te llama, la naturaleza te espera y nosotros estamos listos para guiarte.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <a
                            href="#expeditions"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                        >
                            Reserva tu Expedición
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.instagram.com/pulsoexpeditionsmx/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-foreground/20 text-foreground font-semibold text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300"
                        >
                            Contáctanos
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}