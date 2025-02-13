"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import React from "react";

interface AuroraTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function AuroraText({
  className,
  children,
  as: Component = "span",
  ...props
}: AuroraTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn("relative inline-block", className)}
      {...props}
    >
      {children}
      <span className="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text mix-blend-screen">
        {children}
      </span>
    </MotionComponent>
  );
}
