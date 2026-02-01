"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Floating Orb ──────────────────────────────────────────────
function FloatingOrb({
  size,
  color,
  top,
  left,
  duration,
  delay = 0,
  xRange = 80,
  yRange = 60,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  duration: number;
  delay?: number;
  xRange?: number;
  yRange?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ top, left, width: size, height: size }}
      className="absolute rounded-full pointer-events-none"
    >
      <motion.div
        animate={{
          x: [0, xRange, -xRange * 0.6, 0],
          y: [0, -yRange * 0.4, yRange, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-full h-full rounded-full"
        style={{
          background: color,
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
}

// ─── Soft Drifting Particle ────────────────────────────────────
function DriftParticle({
  size,
  color,
  startX,
  startY,
  duration,
  delay,
}: {
  size: number;
  color: string;
  startX: string;
  startY: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute pointer-events-none rounded-full"
      style={{
        left: startX,
        top: startY,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 1.5}px ${color}`,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{
          x: [0, Math.random() * 40 - 20, Math.random() * -30 + 10, 0],
          y: [0, Math.random() * -50 - 10, Math.random() * 30 + 5, 0],
          opacity: [0.6, 1, 0.4, 0.6],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

// ─── Morphing Gradient Mesh ────────────────────────────────────
function GradientMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70%",
          height: "70%",
          top: "-20%",
          left: "-15%",
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1, 1.12, 0.96, 1],
          rotate: [0, 4, -2, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55%",
          height: "60%",
          top: "15%",
          right: "-12%",
          background:
            "radial-gradient(ellipse at center, rgba(244,114,182,0.07) 0%, transparent 65%)",
          filter: "blur(25px)",
        }}
        animate={{
          scale: [1, 0.94, 1.08, 1],
          rotate: [0, -3, 5, 0],
          x: [0, -15, 8, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60%",
          height: "50%",
          bottom: "-10%",
          left: "20%",
          background:
            "radial-gradient(ellipse at center, rgba(251,207,232,0.1) 0%, transparent 60%)",
          filter: "blur(35px)",
        }}
        animate={{
          scale: [1, 1.06, 0.93, 1],
          rotate: [0, 2, -4, 0],
          y: [0, -10, 6, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ─── Noise Texture Overlay ─────────────────────────────────────
function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = 512);
    const h = (canvas.height = 512);
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 18;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundSize: "512px 512px",
        mixBlendMode: "overlay",
        opacity: 0.35,
      }}
    />
  );
}

// ─── Animated Counter Pill ─────────────────────────────────────
function StatPill({ 
  label, 
  end, 
  suffix = '',
  prefix = '' 
}: { 
  label: string; 
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = Date.now();

    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <span className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 tracking-tight">
        {prefix}{count.toLocaleString('vi-VN')}{suffix}
      </span>
      <span className="text-sm text-gray-500 font-medium mt-1">{label}</span>
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const stag = (i: number) => 0.12 * i;

  const particles = [
    { size: 6, color: "rgba(236,72,153,0.45)", startX: "12%", startY: "18%", duration: 14, delay: 0.4 },
    { size: 4, color: "rgba(244,114,182,0.5)", startX: "78%", startY: "12%", duration: 18, delay: 0.8 },
    { size: 5, color: "rgba(251,207,232,0.6)", startX: "45%", startY: "70%", duration: 16, delay: 1.0 },
    { size: 3, color: "rgba(249,168,212,0.55)", startX: "65%", startY: "55%", duration: 20, delay: 1.4 },
    { size: 7, color: "rgba(236,72,153,0.3)", startX: "28%", startY: "48%", duration: 22, delay: 0.6 },
    { size: 4, color: "rgba(244,114,182,0.4)", startX: "88%", startY: "35%", duration: 17, delay: 1.2 },
    { size: 3, color: "rgba(251,207,232,0.5)", startX: "55%", startY: "82%", duration: 19, delay: 1.6 },
    { size: 5, color: "rgba(249,168,212,0.4)", startX: "8%", startY: "65%", duration: 21, delay: 0.9 },
    { size: 4, color: "rgba(236,72,153,0.35)", startX: "72%", startY: "78%", duration: 15, delay: 1.8 },
    { size: 6, color: "rgba(244,114,182,0.3)", startX: "38%", startY: "28%", duration: 23, delay: 0.2 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[95vh] flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFFFFF 100%)" }}
    >
      <NoiseOverlay />
      <GradientMesh />

      <motion.div
        style={{ scale: blobScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingOrb
          size={600}
          color="rgba(236, 72, 153, 0.15)"
          top="-15%"
          left="-10%"
          duration={22}
          delay={0}
          xRange={90}
          yRange={70}
        />
        <FloatingOrb
          size={450}
          color="rgba(244, 114, 182, 0.12)"
          top="10%"
          left="55%"
          duration={28}
          delay={0.3}
          xRange={-70}
          yRange={50}
        />
        <FloatingOrb
          size={350}
          color="rgba(251, 207, 232, 0.2)"
          top="55%"
          left="20%"
          duration={18}
          delay={0.6}
          xRange={60}
          yRange={-80}
        />
        <FloatingOrb
          size={280}
          color="rgba(249, 168, 212, 0.15)"
          top="60%"
          left="70%"
          duration={24}
          delay={0.9}
          xRange={-50}
          yRange={40}
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <DriftParticle key={i} {...p} />
        ))}
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 container mx-auto px-6 md:px-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: stag(0), ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm"
        >
          <span className="relative w-2.5 h-2.5 rounded-full bg-pink-500">
            <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-60" />
          </span>
          <span className="text-sm font-semibold text-pink-600 tracking-wide">
            Bộ sưu tập Xuân Hè 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: stag(1), ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-[1.1] tracking-tight text-gray-900 max-w-4xl"
        >
          Thời Trang{" "}
          <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 bg-clip-text text-transparent">
            Thanh Lịch
          </span>
          <br />
          Cho Phái Đẹp
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: stag(3), ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl leading-relaxed mt-8"
        >
          Khám phá những thiết kế tinh tế, nữ tính được chế tác với chất lượng
          vượt trội. Nâng tầm phong cách của bạn với bộ sưu tập độc đáo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: stag(4), ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-5 mt-10"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(236,72,153,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center h-14 px-10 rounded-full text-white text-base font-semibold shadow-xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
              }}
            >
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear",
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)",
                }}
              />
              Mua sắm ngay
            </motion.button>
          </Link>

          <Link to="/shop?collection=spring-summer">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 h-14 px-8 text-base font-semibold text-gray-700 hover:text-pink-500 transition-colors group"
            >
              Xem bộ sưu tập
              <svg
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: stag(6) }}
          className="flex items-center gap-12 md:gap-16 mt-20 bg-white/60 backdrop-blur-sm px-10 py-6 rounded-2xl shadow-sm"
        >
          <StatPill label="Sản phẩm" end={2400} suffix="+" />
          <div className="w-px h-12 bg-pink-200" />
          <StatPill label="Tỉnh thành" end={48} />
          <div className="w-px h-12 bg-pink-200" />
          <StatPill label="Khách hàng" end={12000} suffix="+" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}
