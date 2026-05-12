import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 25000);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.5 + 0.1,
                    pulse: Math.random() * Math.PI * 2,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += 0.01;
                const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(13, 255, 214, ${currentOpacity})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(13, 255, 214, ${currentOpacity * 0.15})`;
                ctx.fill();
            });
            animationId = requestAnimationFrame(animate);
        };

        resize();
        createParticles();
        animate();
        window.addEventListener('resize', () => { resize(); createParticles(); });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ opacity: 0.6 }}
        />
    );
}