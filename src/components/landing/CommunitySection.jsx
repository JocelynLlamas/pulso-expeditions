import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
// import { Instagram } from 'lucide-react';

export default function CommunitySection({ images }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="community" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        Comunidad
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4">
                        Únete al <span className="text-primary italic">movimiento</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-light">
                        Somos una comunidad de exploradores. Cada aventura es mejor cuando se comparte.
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Scroll Gallery */}
            <div className="relative overflow-hidden">
                <motion.div
                    animate={{ x: [0, -50 * images.length] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-4 w-max"
                >
                    {[...images, ...images, ...images].map((img, i) => (
                        <div
                            key={i}
                            className="group relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden flex-shrink-0"
                        >
                            <img
                                src={img}
                                alt={`Community moment ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center">
                                {/* <Instagram className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" /> */}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mt-12"
            >
                <a
                    href="https://www.instagram.com/pulsoexpeditionsmx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-all duration-300"
                >
                    {/* <Instagram className="w-4 h-4" /> */}
                    @pulsoexpeditionsmx
                </a>
            </motion.div>
        </section>
    );
}