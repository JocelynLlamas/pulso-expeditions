import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const experiences = [
    { id: 'hiking', title: 'Senderismo', subtitle: 'Senderos que transforman' },
    { id: 'rivers', title: 'Ríos', subtitle: 'Fluye con la naturaleza' },
    { id: 'mountains', title: 'Montañas', subtitle: 'Conquista la cumbre' },
    { id: 'camping', title: 'Camping', subtitle: 'Bajo las estrellas' },
    { id: 'forest', title: 'Bosques', subtitle: 'Sumérgete en lo profundo' },
];

export default function ExperiencesSection({ images }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experiences" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[180px]" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        Experiencias
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4">
                        Elige tu <span className="text-primary italic">aventura</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-light">
                        Cada experiencia está diseñada para despertar tus sentidos y crear recuerdos inolvidables.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? 'col-span-2 md:col-span-2 aspect-[4/5]' : 'aspect-[3/4]'
                                }`}
                        >
                            <img
                                src={images[exp.id]}
                                alt={exp.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Glow on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-primary/30 rounded-2xl box-glow" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="font-heading text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                    {exp.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1 font-light">{exp.subtitle}</p>
                                <div className="flex items-center gap-2 mt-3 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Descubrir <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}