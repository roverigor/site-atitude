"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Clock, Users, BookOpen, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

function CountUp({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString("pt-BR") + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]"
    >
      0{suffix}
    </span>
  );
}

const stats = [
  { icon: Clock, value: siteConfig.stats.years, label: "Anos de historia", suffix: "+" },
  { icon: Users, value: siteConfig.stats.students, label: "Alunos formados", suffix: "+" },
  { icon: BookOpen, value: siteConfig.stats.courses, label: "Cursos disponiveis", suffix: "+" },
  { icon: Building2, value: siteConfig.stats.partners, label: "Empresas parceiras", suffix: "+" },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-[var(--color-background)]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-[var(--color-brand-green)]" />
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-[var(--color-foreground-muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
