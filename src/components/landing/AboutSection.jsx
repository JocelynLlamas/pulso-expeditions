import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Heart, Users, Mountain } from 'lucide-react';

const values = [
    { icon: Compass, title: 'Exploración Auténtica', desc: 'Rutas diseñadas para conectar con la esencia del paisaje.' },
    { icon: Heart, title: 'Conexión Real', desc: 'Experiencias que transforman y crean recuerdos eternos.' },
    { icon: Users, title: 'Comunidad', desc: 'Un grupo de aventureros que comparten la misma pasión.' },
    { icon: Mountain, title: 'Naturaleza Viva', desc: 'Ríos, montañas y senderos esperándote.' },
];

export default function AboutSection({ aboutImage }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[150px] -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                            <img
                                src={aboutImage}
                                alt="Adventurers hiking through misty mountain trail"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        </div>
                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute -bottom-6 -right-6 md:right-auto md:-left-6 glass rounded-2xl p-5 box-glow"
                        >
                            <p className="text-3xl font-heading font-bold text-primary">100+</p>
                            <p className="text-xs text-muted-foreground mt-1">Aventuras completadas</p>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                            Nuestra Filosofía
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 leading-tight">
                            Más que una expedición,{' '}
                            <span className="text-primary italic">una experiencia de vida</span>
                        </h2>
                        <p className="text-muted-foreground mt-6 leading-relaxed text-lg font-light">
                            En PULSO Expeditions creemos que la aventura verdadera no solo te lleva a lugares increíbles,
                            sino que te transforma por dentro. Cada sendero, cada río y cada amanecer es una oportunidad
                            para reconectar con lo esencial.
                        </p>

                        <div className="grid grid-cols-2 gap-5 mt-10">
                            {values.map((v, i) => (
                                <motion.div
                                    key={v.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                                    className="group p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
                                >
                                    <v.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-sm font-semibold">{v.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}