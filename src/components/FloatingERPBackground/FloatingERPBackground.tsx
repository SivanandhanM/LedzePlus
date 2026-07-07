import { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

// ── Ambient orb config ────────────────────────────────────────────────────────
const orbs = [
  {
    id: 'orb-tr',
    style: { top: '-10%', right: '-10%' },
    size: 600,
    color: 'rgba(255, 170, 220, 0.20)',
    blur: 220,
    yAnim: [0, -30, 0],
    xAnim: [0, 20, 0],
    scale: [1, 1.12, 1],
    duration: 28,
    delay: 0,
  },
  {
    id: 'orb-bl',
    style: { bottom: '-10%', left: '-10%' },
    size: 650,
    color: 'rgba(110, 170, 255, 0.18)',
    blur: 240,
    yAnim: [0, 25, 0],
    xAnim: [0, -20, 0],
    scale: [1, 1.1, 1],
    duration: 34,
    delay: -8,
  },
  {
    id: 'orb-cr',
    style: { top: '30%', right: '10%' },
    size: 500,
    color: 'rgba(170, 150, 255, 0.14)',
    blur: 180,
    yAnim: [0, -20, 0],
    xAnim: [0, 15, 0],
    scale: [1, 1.08, 1],
    duration: 22,
    delay: -4,
  },
  {
    id: 'orb-ul',
    style: { top: '10%', left: '10%' },
    size: 450,
    color: 'rgba(120, 210, 255, 0.12)',
    blur: 180,
    yAnim: [0, 18, 0],
    xAnim: [0, -12, 0],
    scale: [1, 1.1, 1],
    duration: 40,
    delay: -14,
  },
];

export default function FloatingERPBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100 });
  const smoothScrollY = useSpring(scrollY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const scrollContainer = document.getElementById('scroll-container');
    const handleScroll = () => {
      if (scrollContainer) scrollY.set(scrollContainer.scrollTop);
    };
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY, scrollY]);

  const generatedIcons = useMemo(() => {
    const items = [];
    const totalIcons = Math.floor(rand(60, 80));

    for (let i = 0; i < totalIcons; i++) {
      const layerRand = Math.random();
      const layer = layerRand < 0.25 ? 1 : layerRand < 0.6 ? 2 : 3;

      let size, opacity, blur, duration, mouseParallax, scrollParallax;

      if (layer === 1) {
        size = randChoice([90, 110]);
        opacity = 0.10;
        blur = 0;
        duration = rand(25, 35);
        mouseParallax = 20;
        scrollParallax = -0.25;
      } else if (layer === 2) {
        size = randChoice([55, 70]);
        opacity = 0.12;
        blur = 2;
        duration = rand(20, 25);
        mouseParallax = 12;
        scrollParallax = -0.15;
      } else {
        size = 40;
        opacity = 0.15;
        blur = 5;
        duration = rand(15, 20);
        mouseParallax = 6;
        scrollParallax = -0.05;
      }

      const IconComponent = randChoice(iconsList);
      const iconColor = iconColorMap.get(IconComponent) || randChoice(fallbackColors);

      items.push({
        id: `icon-${i}`,
        IconComponent,
        iconColor,
        top: `${rand(0, 100)}vh`,
        left: `${rand(0, 100)}vw`,
        size,
        baseOpacity: opacity,
        blur,
        duration,
        mouseParallax,
        scrollParallax,
        delay: rand(-30, 0),
        initialRotation: rand(0, 360),
        yAnim: [rand(-15, -25), rand(15, 25), rand(-15, -25)],
        xAnim: [rand(-5, -10), rand(5, 10), rand(-5, -10)],
        rotAnim: [rand(-5, -10), rand(5, 10), rand(-5, -10)],
      });
    }
    return items;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* ── Animated ambient mesh gradient orbs ── */}
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            ...orb.style,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
          }}
          animate={{
            y: orb.yAnim,
            x: orb.xAnim,
            scale: orb.scale,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* ── Floating ERP icons ── */}
      <motion.div className="w-full h-full relative">
        {generatedIcons.map((item) => {
          const {
            IconComponent, iconColor, id, top, left, size, baseOpacity, blur,
            duration, delay, yAnim, xAnim, rotAnim, initialRotation,
            mouseParallax, scrollParallax,
          } = item;

          return (
            <motion.div
              key={id}
              className="absolute"
              style={{
                top,
                left,
                width: size,
                height: size,
                x: useTransform(smoothMouseX, (v) => v * mouseParallax),
                y: useTransform(smoothScrollY, (v) => v * scrollParallax),
              }}
            >
              <motion.div
                className="w-full h-full absolute inset-0"
                style={{
                  y: useTransform(smoothMouseY, (v) => v * mouseParallax),
                }}
              >
                <motion.div
                  className="flex items-center justify-center w-full h-full will-change-transform"
                  style={{
                    background: 'rgba(255, 255, 255, 0.16)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255, 255, 255, 0.30)',
                    borderRadius: '22px',
                    boxShadow: '0 15px 40px rgba(90, 90, 170, 0.08)',
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  }}
                  initial={{ rotate: initialRotation }}
                  animate={{
                    y: yAnim,
                    x: xAnim,
                    rotate: [initialRotation + rotAnim[0], initialRotation + rotAnim[1], initialRotation + rotAnim[2]],
                    scale: [1, 1.05, 1],
                    opacity: [baseOpacity, baseOpacity * 1.5, baseOpacity],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay,
                  }}
                >
                  <IconComponent
                    size={size * 0.45}
                    color={iconColor}
                    strokeWidth={1.5}
                    style={{ opacity: 0.85 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
