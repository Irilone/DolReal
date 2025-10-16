"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 focus-visible:ring-primary/60",
  secondary:
    "bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/40",
  outline:
    "border border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/40",
  ghost: "bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, type = "button", ...rest },
    ref,
  ) => {
    const classes = twMerge(
      clsx(
        "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ),
    );

    return <button ref={ref} type={type} className={classes} {...rest} />;
  },
);

Button.displayName = "Button";
