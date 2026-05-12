import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {  Quote, Mountain, Users, Map } from 'lucide-react';

const stats = [
    { icon: Mountain, value: '100+', label: 'Aventuras guiadas' },
    { icon: Users, value: '500+', label: 'Exploradores' },
    { icon: Map, value: '15+', label: 'Destinos únicos' },
];

export default function FounderSection({ founderImage }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <section ref={ref} className="relative py-24 md:py-36 overflow-hidden">
            {/* Ambient glow */}
            <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[180px] -translate-y-1/2"
            />
            <motion.div
                style={{ opacity: glowOpacity }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[150px]"
            />

            <div className="max-w-7xl mx-auto px-6">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        El espíritu detrás de PULSO
                    </span>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* — IMAGE COLUMN — */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative"
                    >
                        {/* Parallax wrapper */}
                        <motion.div style={{ y: imageY }} className="relative">
                            {/* Decorative teal frame */}
                            <div className="absolute -inset-3 rounded-3xl border border-primary/20 z-0" />
                            <div className="absolute -inset-6 rounded-3xl border border-primary/8 z-0" />

                            {/* Glow behind image */}
                            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl scale-95" />

                            {/* Portrait */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] z-10">
                                <img
                                    src={founderImage}
                                    alt="Founder of PULSO Expeditions on a mountain ridge"
                                    className="w-full h-full object-cover"
                                />
                                {/* Cinematic gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
                            </div>

                            {/* Floating quote card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="absolute -bottom-8 -right-4 md:-right-10 z-20 glass rounded-2xl p-5 max-w-[220px] box-glow"
                            >
                                <Quote className="w-5 h-5 text-primary mb-2" />
                                <p className="text-xs leading-relaxed text-muted-foreground italic">
                                    "La naturaleza no es el destino, es el camino."
                                </p>
                                <p className="text-primary text-xs font-semibold mt-2">— Carlos, Fundador</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* — TEXT COLUMN — */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="pt-8 md:pt-0"
                    >
                        <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
                            Conoce a{' '}
                            <span className="text-primary italic">Carlos</span>,<br />
                            el pulso detrás de la aventura
                        </h2>

                        <div className="mt-8 space-y-5 text-muted-foreground font-light leading-relaxed">
                            <p className="text-base md:text-lg">
                                Desde pequeño, las montañas, ríos y senderos fueron mi escuela. Crecí entendiendo que la naturaleza
                                no solo se admira — se vive, se respira y te transforma.
                            </p>
                            <p>
                                Después de años explorando los rincones más salvajes de México, nació{' '}
                                <span className="text-foreground font-medium">PULSO Expeditions</span> con una misión clara:
                                crear experiencias que reconecten a las personas con el mundo natural de una manera auténtica,
                                segura y profundamente memorable.
                            </p>
                            <p>
                                Cada expedición que diseño lleva mi pulso — mi pasión, mi respeto por la naturaleza y mi
                                compromiso con cada explorador que confía en nosotros para guiarlos.
                            </p>
                        </div>

                        {/* Why Pulso exists */}
                        <div className="mt-8 p-5 rounded-xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
                            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
                                Por qué existe PULSO
                            </h3>
                            <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                Porque vivimos en un mundo que nos aleja de lo esencial. PULSO nació para
                                devolverte a ello — al rio, al sendero, al amanecer en la cima.
                                A lo que importa de verdad.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-10">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                                    <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="mt-10 flex items-center gap-4"
                        >
                            <a
                                href="https://www.instagram.com/pulsoexpeditionsmx/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
                            >
                                {/* <Instagram className="w-4 h-4" /> */}
                                Síguenos en Instagram
                            </a>

                            {/* Handwritten-style signature */}
                            <div className="text-muted-foreground/40 text-xs italic font-light">
                                con ❤️ desde México
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}