import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, TrendingUp, Receipt, Package, BookOpen, Users, Building2, FileText, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';

const icons = [
  { Icon: ShoppingCart, color: '#10b981' }, 
  { Icon: TrendingUp, color: '#f97316' }, 
  { Icon: Receipt, color: '#a855f7' }, 
  { Icon: Package, color: '#3b82f6' }, 
  { Icon: BookOpen, color: '#22c55e' }, 
  { Icon: Users, color: '#14b8a6' }, 
  { Icon: Building2, color: '#06b6d4' }, 
  { Icon: FileText, color: '#ef4444' }, 
  { Icon: ShieldCheck, color: '#f59e0b' }, 
];

interface RouteLoaderProps {
  isLoading: boolean;
}

const TOTAL_DURATION = 3.8;

export default function RouteLoader({ isLoading }: RouteLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ pointerEvents: 'none' }}
          aria-hidden="true"
        >
          {/* Frosted backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(16px)', transition: { duration: 0.5 } }}
            exit={{ backdropFilter: 'blur(0px)', transition: { duration: 0.4 } }}
            style={{
              background: 'rgba(250, 250, 255, 0.85)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            
            {/* Center Logo */}
            <motion.div
              className="relative z-20 w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-primary/20 border border-slate-100 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1, 1.05, 1, 1.05, 1, 1.05, 1, 1.12, 1],
                opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                boxShadow: [
                  '0 20px 40px rgba(79,70,229,0.2)',
                  '0 20px 40px rgba(79,70,229,0.2)',
                  '0 20px 40px rgba(79,70,229,0.2)',
                  '0 0 60px rgba(79,70,229,0.6)',
                  '0 20px 40px rgba(79,70,229,0.2)',
                  '0 0 60px rgba(79,70,229,0.6)',
                  '0 20px 40px rgba(79,70,229,0.2)',
                  '0 0 60px rgba(79,70,229,0.6)',
                  '0 20px 40px rgba(79,70,229,0.2)',
                  '0 0 100px rgba(79,70,229,0.9)',
                  '0 20px 40px rgba(79,70,229,0.2)'
                ]
              }}
              transition={{ 
                times: [0, 0.5/TOTAL_DURATION, 2.5/TOTAL_DURATION, 2.7/TOTAL_DURATION, 2.9/TOTAL_DURATION, 3.1/TOTAL_DURATION, 3.3/TOTAL_DURATION, 3.5/TOTAL_DURATION, 3.6/TOTAL_DURATION, 3.7/TOTAL_DURATION, 1],
                duration: TOTAL_DURATION,
                ease: 'easeInOut'
              }}
            >
              <img src={logoImg} alt="LEDZE Plus" className="w-14 h-14 object-contain" />
            </motion.div>

            {/* Final Energy Pulse Wave */}
            <motion.div
              className="absolute top-1/2 left-1/2 -ml-[100px] -mt-[100px] w-[200px] h-[200px] rounded-full border-[4px] border-primary/60 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 0, 1, 4],
                opacity: [0, 0, 1, 0]
              }}
              transition={{
                times: [0, 3.4/TOTAL_DURATION, 3.5/TOTAL_DURATION, 1],
                duration: TOTAL_DURATION,
                ease: 'easeOut'
              }}
            />

            {/* Orbiting Icons */}
            <div className="absolute top-1/2 left-1/2 w-0 h-0">
              {icons.map((item, i) => {
                const radius = 130 + (i % 3) * 30; // 130, 160, 190
                const initialAngle = (i / 9) * 360;
                const rotations = 1 + (i % 3) * 0.25; // 1, 1.25, 1.5
                const materializeDelay = 0.5 + (i * 0.08); // 0.5 to 1.14
                const absorbDelay = 2.2 + (i * 0.1); // 2.2 to 3.0
                const { Icon, color } = item;
                
                // Main icon + 2 ghost trails
                const trails = [
                  { angleOffset: 0, opacity: 0.9, scale: 1 },
                  { angleOffset: -12, opacity: 0.4, scale: 0.8 },
                  { angleOffset: -24, opacity: 0.15, scale: 0.6 },
                ];

                return trails.map((trail, idx) => (
                  <motion.div
                    key={`${i}-${idx}`}
                    className="absolute top-0 left-0"
                    initial={{ rotate: initialAngle + trail.angleOffset }}
                    animate={{ rotate: initialAngle + trail.angleOffset + 360 * rotations }}
                    transition={{ duration: TOTAL_DURATION, ease: "easeInOut" }}
                  >
                    <motion.div
                      initial={{ x: radius, opacity: 0, scale: 0 }}
                      animate={{
                        x: [radius, radius, radius, 0],
                        opacity: [0, trail.opacity, trail.opacity, 0],
                        scale: [0, trail.scale, trail.scale, 0.2],
                        filter: ['brightness(1)', 'brightness(1)', 'brightness(1)', 'brightness(2)'],
                      }}
                      transition={{
                        times: [
                          0,
                          materializeDelay / TOTAL_DURATION,
                          absorbDelay / TOTAL_DURATION,
                          (absorbDelay + 0.4) / TOTAL_DURATION,
                        ],
                        duration: TOTAL_DURATION,
                        ease: "easeInOut",
                      }}
                      className="absolute -ml-6 -mt-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md"
                      style={{
                        boxShadow: idx === 0 ? `0 0 20px ${color}70` : 'none',
                        color: color,
                        border: idx === 0 ? `1px solid ${color}50` : 'none',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                ));
              })}
            </div>

            {/* LEDZE PLUS Text glowing */}
            <motion.div
              className="absolute top-1/2 mt-24 text-lg font-bold tracking-[0.35em] uppercase"
              initial={{ opacity: 0, y: 10, textShadow: '0 0 0px rgba(79,70,229,0)' }}
              animate={{ 
                opacity: [0, 0.7, 0.7, 1],
                y: [10, 0, 0, 0],
                textShadow: [
                  '0 0 0px rgba(79,70,229,0)', 
                  '0 0 0px rgba(79,70,229,0)', 
                  '0 0 0px rgba(79,70,229,0)', 
                  '0 0 25px rgba(79,70,229,0.9)'
                ]
              }}
              transition={{
                times: [0, 0.5/TOTAL_DURATION, 3.4/TOTAL_DURATION, 1],
                duration: TOTAL_DURATION,
                ease: 'easeOut'
              }}
              style={{ color: '#4F46E5' }}
            >
              LEDZE Plus
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
