import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, BarChart3, MapPin, ArrowRight } from 'lucide-react';
import { expeditions } from '../../lib/expeditionsData';

export default function ExpeditionsSection({ images }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="expeditions" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        Próximas Expediciones
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4">
                        Aventuras que te <span className="text-primary italic">esperan</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {expeditions.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            id={`expedition-card-${exp.id}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:box-glow scroll-mt-28"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={images[i]}
                                    alt={exp.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                                <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 text-xs font-semibold text-primary">
                                    {exp.difficulty}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                                    <MapPin className="w-3 h-3 text-primary" />
                                    {exp.location}
                                </div>
                                <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors">
                                    {exp.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mt-2 font-light leading-relaxed">
                                    {exp.description}
                                </p>

                                <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-primary" />
                                        {exp.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                        {exp.duration}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <BarChart3 className="w-3.5 h-3.5 text-primary" />
                                        {exp.difficulty}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                                    <span className="text-lg font-bold text-primary">{exp.price}</span>
                                    <button className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group/btn">
                                        Reservar
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}