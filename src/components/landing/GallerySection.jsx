import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function GallerySection({ images }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [lightbox, setLightbox] = useState(null);

    return (
        <section id="gallery" ref={ref} className="relative py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        Galería
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4">
                        Momentos que <span className="text-primary italic">inspiran</span>
                    </h2>
                </motion.div>

                {/* Masonry Grid */}
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
                            onClick={() => setLightbox(img)}
                        >
                            <img
                                src={img}
                                alt={`Adventure gallery ${i + 1}`}
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-6"
                        onClick={() => setLightbox(null)}
                    >
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-6 right-6 p-2 rounded-full glass text-foreground hover:text-primary transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={lightbox}
                            alt="Gallery fullscreen"
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}