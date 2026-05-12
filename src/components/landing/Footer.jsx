import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative border-t border-border/30 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="https://media.base44.com/images/public/user_698b5c9ad2c38095b38a88bc/cd717b22e_image.png"
                                alt="PULSO Logo"
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="font-heading text-lg font-semibold">
                                PULSO <span className="text-primary">Expeditions</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm font-light leading-relaxed">
                            Experiencias de aventura con sentido. Conecta, explora y siente el camino.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Explorar</h4>
                        <div className="flex flex-col gap-3">
                            {['Nosotros', 'Experiencias', 'Expediciones', 'Galería', 'Comunidad'].map((l) => (
                                <a
                                    key={l}
                                    href={`#${l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                                >
                                    {l}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Contacto</h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://www.instagram.com/pulsoexpeditionsmx/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors"
                            >
                                {/* <Instagram className="w-4 h-4" /> */}
                                @pulsoexpeditionsmx
                            </a>
                            <a
                                href="https://www.tiktok.com/@pulsoexpeditionsm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors"
                            >
                                <MapPin className="w-4 h-4" />
                                TikTok
                            </a>
                            <span className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Mail className="w-4 h-4" />
                                contacto@pulsoexpeditions.mx
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2026 PULSO Expeditions. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Ríos · Senderos · Naturaleza Real
                    </p>
                </div>
            </div>
        </footer>
    );
}