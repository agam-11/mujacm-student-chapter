import { useRef, useEffect, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

type Props = {
  name: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export default function ProfileCard({
  name,
  title,
  handle,
  status,
  contactText = 'Contact Me',
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useContext(ThemeContext);
  const particlesRef = useRef<Particle[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const rotX = useRef(0);
  const rotY = useRef(0);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Initialize canvas and animation loop
  useEffect(() => {
    if (!canvasRef.current || !cardRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const accentColor = theme?.colors?.accent || '#06b6d4';

    // Handle mouse move for tilt and particles
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top;

      if (enableTilt && (!isMobile() || enableMobileTilt)) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetRotY.current = ((mouseX.current - centerX) / centerX) * 12;
        targetRotX.current = ((centerY - mouseY.current) / centerY) * 12;
      }

      // Create particles on mouse move
      if (Math.random() > 0.7) {
        const newParticle: Particle = {
          x: mouseX.current,
          y: mouseY.current,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          size: 1 + Math.random() * 2,
          color: accentColor,
        };
        particlesRef.current.push(newParticle);
      }
    };

    // Handle mouse leave (reset tilt)
    const handleMouseLeave = () => {
      targetRotX.current = 0;
      targetRotY.current = 0;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      // Smooth tilt easing
      rotX.current += (targetRotX.current - rotX.current) * 0.15;
      rotY.current += (targetRotY.current - rotY.current) * 0.15;

      // Apply transform to card
      if (card) {
        card.style.transform = `perspective(1200px) rotateX(${rotX.current}deg) rotateY(${rotY.current}deg) scale(${1 + Math.abs(rotX.current) * 0.01})`;
      }

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity
        return p.life < p.maxLife;
      });

      // Clear canvas
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((p) => {
        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = theme?.isDark
          ? `rgba(6, 182, 212, ${alpha * 0.8})`
          : `rgba(0, 102, 204, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw glow effect
      const glowSize = 150;
      const glowGradient = ctx.createRadialGradient(mouseX.current, mouseY.current, 0, mouseX.current, mouseY.current, glowSize);
      glowGradient.addColorStop(0, theme?.isDark ? 'rgba(0, 255, 255, 0.25)' : 'rgba(0, 102, 204, 0.12)');
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [theme?.isDark, theme?.colors?.accent, enableTilt, enableMobileTilt]);

  return (
    <div
      ref={cardRef}
      className="profile-card-3d relative w-full h-full max-w-[360px] sm:max-w-none min-h-[360px] sm:min-h-[460px] md:min-h-[520px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mx-auto"
      style={{
        background: theme?.isDark
          ? 'linear-gradient(135deg, #0b1020 0%, #111427 50%, #1a0a2e 100%)'
          : 'linear-gradient(135deg, #f7f7fb 0%, #ffffff 50%, #f0f4ff 100%)',
        border: `2px solid ${theme?.isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(0, 102, 204, 0.2)'}`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Canvas for particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      />

      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: theme?.isDark
            ? `radial-gradient(circle at ${mouseX.current}px ${mouseY.current}px, rgba(6, 182, 212, 0.2) 0%, transparent 50%)`
            : `radial-gradient(circle at ${mouseX.current}px ${mouseY.current}px, rgba(0, 102, 204, 0.1) 0%, transparent 50%)`,
          zIndex: 5,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20 h-full flex flex-col items-center justify-between p-4 md:p-6">
        {/* Top section: Name and title */}
        <div className="text-center pt-2">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight" style={{ color: theme?.colors?.text }}>
            {name}
          </h2>
          {title && (
            <p className="mt-1 text-xs md:text-base font-medium" style={{ color: theme?.colors?.textSecondary }}>
              {title}
            </p>
          )}
        </div>

        {/* Middle: Full-body avatar (PNG-friendly, uncropped) */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          <img
            src={avatarUrl}
            alt={name}
            loading="lazy"
            className="object-contain max-h-[220px] sm:max-h-[320px] w-auto"
            style={{
              filter: theme?.isDark ? 'drop-shadow(0 0 28px rgba(6, 182, 212, 0.45))' : 'drop-shadow(0 0 20px rgba(0, 102, 204, 0.2))',
            }}
          />
        </div>

        {/* Bottom: Glass bar with info and button */}
        {showUserInfo && (
        <div
          className="w-full rounded-xl md:rounded-2xl px-3 py-2 md:px-5 md:py-4 flex items-center justify-between gap-3"
          style={{
            background: theme?.isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme?.isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(0, 102, 204, 0.15)'}`,
            boxShadow: theme?.isDark
              ? '0 8px 32px rgba(6, 182, 212, 0.1)'
              : '0 8px 32px rgba(0, 102, 204, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={avatarUrl}
              alt={name}
              loading="lazy"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0 border-2"
              style={{ borderColor: theme?.colors?.accent }}
            />
            <div className="min-w-0">
              {handle && (
                <div className="text-xs md:text-sm font-bold truncate" style={{ color: theme?.colors?.text }}>
                  @{handle}
                </div>
              )}
              {status && (
                <div className="text-xs" style={{ color: theme?.colors?.textSecondary }}>
                  {status}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onContactClick}
            className="px-3 md:px-5 py-2 rounded-lg font-bold text-xs md:text-sm transition-all hover:scale-105 active:scale-95 flex-shrink-0"
            style={{
              background: theme?.colors?.accent,
              color: theme?.isDark ? '#000' : '#fff',
              border: `1px solid ${theme?.colors?.accent}`,
              boxShadow: `0 4px 15px ${theme?.isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(0, 102, 204, 0.3)'}`,
            }}
            aria-label={`Contact ${name}`}
          >
            {contactText}
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
