import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { expeditions } from '../../lib/expeditionsData';
import { Calendar, Clock, MapPin, ArrowRight, X } from 'lucide-react';

// Fix default icon paths broken by bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom teal pulse marker
function createPulsoIcon(isActive) {
    return L.divIcon({
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
      <div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
        ${isActive ? `<div style="
          position:absolute;inset:0;border-radius:50%;
          background:rgba(13,255,214,0.2);
          animation:pulso-ping 1.2s cubic-bezier(0,0,0.2,1) infinite;
        "></div>` : ''}
        <div style="
          width:18px;height:18px;border-radius:50%;
          background:${isActive ? '#0DFFD6' : '#0bbfa3'};
          border:2.5px solid ${isActive ? '#fff' : 'rgba(255,255,255,0.5)'};
          box-shadow:0 0 ${isActive ? '16px 4px' : '8px 2px'} rgba(13,255,214,${isActive ? '0.7' : '0.35'});
          transition:all 0.3s;
        "></div>
      </div>
    `,
    });
}

// Inject keyframe animation once
function InjectPulsoStyle() {
    useEffect(() => {
        if (document.getElementById('pulso-map-style')) return;
        const style = document.createElement('style');
        style.id = 'pulso-map-style';
        style.textContent = `
      @keyframes pulso-ping {
        0%   { transform: scale(1);   opacity: 0.8; }
        75%  { transform: scale(2.2); opacity: 0;   }
        100% { transform: scale(2.2); opacity: 0;   }
      }
      .leaflet-container {
        background: #0a0e14 !important;
        font-family: inherit;
      }
      .leaflet-tile { filter: brightness(0.45) saturate(0.3) hue-rotate(160deg); }
      .leaflet-control-attribution { display: none !important; }
      .leaflet-control-zoom a {
        background: rgba(13,20,28,0.85) !important;
        color: #0DFFD6 !important;
        border-color: rgba(13,255,214,0.25) !important;
        backdrop-filter: blur(8px);
      }
      .leaflet-control-zoom a:hover {
        background: rgba(13,255,214,0.15) !important;
      }
    `;
        document.head.appendChild(style);
    }, []);
    return null;
}

// Sync marker icons when active changes
function MarkerController({ expedition, isActive, onClick }) {
    const icon = createPulsoIcon(isActive);

    return (
        <Marker
            position={expedition.coords}
            icon={icon}
            eventHandlers={{ click: () => onClick(expedition) }}
        />
    );
}
// Fly-to helper
function FlyTo({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) map.flyTo(coords, 7, { duration: 1.2, easeLinearity: 0.3 });
    }, [coords, map]);
    return null;
}

// Hover/click preview card
function PreviewCard({ expedition, images, onClose }) {
    if (!expedition) return null;
    const idx = expeditions.findIndex((e) => e.id === expedition.id);
    const img = images[idx];

    const scrollToExpedition = () => {
        const el = document.getElementById(`expedition-card-${expedition.id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        onClose();
    };

    return (
        <motion.div
            key={expedition.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute top-4 right-4 z-[1000] w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{
                background: 'rgba(10,14,20,0.92)',
                border: '1px solid rgba(13,255,214,0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 30px rgba(13,255,214,0.1)',
            }}
        >
            {/* Image */}
            {img && (
                <div className="relative h-36 overflow-hidden">
                    <img src={img} alt={expedition.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:text-primary transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <span
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: 'rgba(13,255,214,0.15)', color: '#0DFFD6', border: '1px solid rgba(13,255,214,0.3)' }}
                    >
                        {expedition.type}
                    </span>
                </div>
            )}

            {/* Body */}
            <div className="p-4">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1.5">
                    <MapPin className="w-3 h-3" style={{ color: '#0DFFD6' }} />
                    {expedition.location}
                </div>
                <h3 className="font-heading text-sm font-bold text-white leading-snug">{expedition.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{expedition.description}</p>

                <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" style={{ color: '#0DFFD6' }} />{expedition.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" style={{ color: '#0DFFD6' }} />{expedition.duration}</span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-sm font-bold" style={{ color: '#0DFFD6' }}>{expedition.price}</span>
                    <button
                        onClick={scrollToExpedition}
                        className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all duration-300"
                        style={{ background: 'rgba(13,255,214,0.12)', color: '#0DFFD6', border: '1px solid rgba(13,255,214,0.25)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,255,214,0.22)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,255,214,0.12)'}
                    >
                        Ver Detalles <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function MapSection({ images }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeExp, setActiveExp] = useState(null);

    const center = [21.5, -101.5];
    const zoom = 5;

    return (
        <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/5 blur-[160px]" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                        Destinos
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4">
                        Explora el <span className="text-primary italic">mapa</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-light">
                        Cada marcador es una aventura esperándote. Haz clic para ver los detalles.
                    </p>
                </motion.div>

                {/* Map + Legend wrapper */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {/* Map */}
                    <div
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                            height: '520px',
                            border: '1px solid rgba(13,255,214,0.15)',
                            boxShadow: '0 0 60px rgba(13,255,214,0.06)',
                        }}
                    >
                        <InjectPulsoStyle />
                        <MapContainer
                            center={center}
                            zoom={zoom}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={true}
                            scrollWheelZoom={false}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <FlyTo coords={activeExp?.coords} />
                            {expeditions.map((exp) => (
                                <MarkerController
                                    key={exp.id}
                                    expedition={exp}
                                    isActive={activeExp?.id === exp.id}
                                    onClick={(e) => setActiveExp(prev => prev?.id === e.id ? null : e)}
                                />
                            ))}
                        </MapContainer>

                        {/* Preview Card */}
                        <AnimatePresence>
                            {activeExp && (
                                <PreviewCard
                                    expedition={activeExp}
                                    images={images}
                                    onClose={() => setActiveExp(null)}
                                />
                            )}
                        </AnimatePresence>

                        {/* Hint */}
                        <div
                            className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] text-muted-foreground"
                            style={{ background: 'rgba(10,14,20,0.8)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
                            Haz clic en un marcador para ver detalles
                        </div>
                    </div>

                    {/* Expedition legend pills */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {expeditions.map((exp) => (
                            <button
                                key={exp.id}
                                onClick={() => setActiveExp(prev => prev?.id === exp.id ? null : exp)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                                style={{
                                    background: activeExp?.id === exp.id ? 'rgba(13,255,214,0.15)' : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${activeExp?.id === exp.id ? 'rgba(13,255,214,0.4)' : 'rgba(255,255,255,0.1)'}`,
                                    color: activeExp?.id === exp.id ? '#0DFFD6' : 'rgba(255,255,255,0.6)',
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: activeExp?.id === exp.id ? '#0DFFD6' : 'rgba(13,255,214,0.5)' }}
                                />
                                {exp.title}
                                <span className="opacity-60">·</span>
                                <span className={exp.difficultyColor}>{exp.difficulty}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}