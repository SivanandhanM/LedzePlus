import { useMemo, useEffect, memo } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Package, Boxes, Warehouse, ShoppingCart, ClipboardList, 
  Calculator, Receipt, CreditCard, Banknote, Building2, 
  ShieldCheck, BadgeDollarSign, BarChart3, TrendingUp, 
  Truck, Users, FileText, Briefcase, ClipboardCheck, 
  Database, Server, Cpu, Cloud, Workflow, ScanLine, 
  QrCode, Fingerprint, Network, Layers, Factory
} from 'lucide-react';

const iconsList = [
  Package, Boxes, Warehouse, ShoppingCart, ClipboardList, 
  Calculator, Receipt, CreditCard, Banknote, Building2, 
  ShieldCheck, BadgeDollarSign, BarChart3, TrendingUp, 
  Truck, Users, FileText, Briefcase, ClipboardCheck, 
  Database, Server, Cpu, Cloud, Workflow, ScanLine, 
  QrCode, Fingerprint, Network, Layers, Factory
];

const iconColorMap = new Map([
  [ShoppingCart, '#FB923C'],
  [TrendingUp,   '#4ADE80'],
  [Package,      '#C084FC'],
  [Calculator,   '#818CF8'],
  [Receipt,      '#818CF8'],
  [Users,        '#F472B6'],
  [Building2,    '#60A5FA'],
  [Banknote,     '#60A5FA'],
  [FileText,     '#FBBF24'],
  [Warehouse,    '#22D3EE'],
  [Database,     '#A78BFA'],
  [BarChart3,    '#34D399'],
]);

const fallbackColors = ['#94A3B8', '#9ca3af', '#cbd5e1'];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ── Ambient orb config (Static versions to prevent GPU thrashing) ─────────────
const orbs = [
  {
    id: 'orb-tr',
    style: { top: '-10%', right: '-10%' },
    size: 600,
    color: 'rgba(255, 170, 220, 0.15)', // Slightly reduced opacity since it's static
    blur: 220,
  },
  {
    id: 'orb-bl',
    style: { bottom: '-10%', left: '-10%' },
    size: 650,
    color: 'rgba(110, 170, 255, 0.12)',
    blur: 240,
  },
  {
    id: 'orb-cr',
    style: { top: '30%', right: '10%' },
    size: 500,
    color: 'rgba(170, 150, 255, 0.10)',
    blur: 180,
  },
  {
    id: 'orb-ul',
    style: { top: '10%', left: '10%' },
    size: 450,
    color: 'rgba(120, 210, 255, 0.08)',
    blur: 180,
  },
];

const FloatingERPBackground = memo(function FloatingERPBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 80, mass: 1.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 80, mass: 1.5 });

  useEffect(() => {
    // Throttle mouse move slightly via passive listener and simple logic
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
          mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Completely removed scroll listener to eliminate sync layout thrashing on main thread
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const generatedIcons = useMemo(() => {
    const items = [];
    const totalIcons = Math.floor(rand(40, 60)); // Reduced count slightly for further performance safety

    for (let i = 0; i < totalIcons; i++) {
      const layerRand = Math.random();
      const layer = layerRand < 0.25 ? 1 : layerRand < 0.6 ? 2 : 3;

      let size, opacity, blur, mouseParallax;

      if (layer === 1) {
        size = randChoice([90, 110]);
        opacity = 0.08;
        blur = 0;
        mouseParallax = 25;
      } else if (layer === 2) {
        size = randChoice([55, 70]);
        opacity = 0.10;
        blur = 2;
        mouseParallax = 15;
      } else {
        size = 40;
        opacity = 0.12;
        blur = 4;
        mouseParallax = 8;
      }

      const IconComponent = randChoice(iconsList);
      const iconColor = iconColorMap.get(IconComponent) || randChoice(fallbackColors);

      items.push({
        id: `icon-${i}`,
        IconComponent,
        iconColor,
        top: `${rand(-5, 105)}vh`,
        left: `${rand(-5, 105)}vw`,
        size,
        baseOpacity: opacity,
        blur,
        mouseParallax,
        initialRotation: rand(0, 360),
      });
    }
    return items;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-paint"
      aria-hidden="true"
    >
      {/* ── Static ambient mesh gradient orbs ── */}
      {orbs.map(orb => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            ...orb.style,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            willChange: 'transform' // Hardware accelerate the blur
          }}
        />
      ))}

      {/* ── Stable ERP icons with subtle mouse parallax only ── */}
      <div className="w-full h-full relative">
        {generatedIcons.map((item) => {
          const {
            IconComponent, iconColor, id, top, left, size, baseOpacity, blur,
            initialRotation, mouseParallax,
          } = item;

          return (
            <m.div
              key={id}
              className="absolute"
              style={{
                top,
                left,
                width: size,
                height: size,
                x: useTransform(smoothMouseX, (v) => v * mouseParallax),
                y: useTransform(smoothMouseY, (v) => v * mouseParallax),
              }}
            >
              <div
                className="flex items-center justify-center w-full h-full"
                style={{
                  // Removed backdrop-filter to prevent massive GPU overhead
                  // Used solid but highly translucent white instead to mimic glass reflection
                  background: 'rgba(255, 255, 255, 0.12)', 
                  border: '1px solid rgba(255, 255, 255, 0.20)',
                  borderRadius: '22px',
                  boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.02)',
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  opacity: baseOpacity,
                  transform: `rotate(${initialRotation}deg)`,
                }}
              >
                <IconComponent
                  size={size * 0.45}
                  color={iconColor}
                  strokeWidth={1.5}
                  style={{ opacity: 0.9 }}
                />
              </div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
});

export default FloatingERPBackground;
