/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Liquid Glass Theme Colors
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          dark: "rgba(0, 0, 0, 0.2)",
          purple: "rgba(138, 43, 226, 0.15)",
          blue: "rgba(65, 105, 225, 0.15)",
          border: "rgba(255, 255, 255, 0.2)",
        },
        primary: {
          DEFAULT: "#8b5cf6", // Purple for space theme
          foreground: "#ffffff",
          light: "#a78bfa",
          dark: "#6d28d9",
        },
        secondary: {
          DEFAULT: "#06b6d4", // Cyan accent
          foreground: "#ffffff",
          light: "#22d3ee",
          dark: "#0891b2",
        },
        background: "transparent",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          foreground: "#cbd5e1",
        },
        accent: {
          DEFAULT: "rgba(139, 92, 246, 0.2)",
          foreground: "#f8fafc",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "glass-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "12px",
        "glass-xl": "20px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-lg": "0 8px 32px 0 rgba(31, 38, 135, 0.5)",
        "glass-inner": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
        glow: "0 0 20px rgba(139, 92, 246, 0.5)",
        "glow-lg": "0 0 40px rgba(139, 92, 246, 0.7)",
      },
      borderRadius: {
        glass: "16px",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        },
        ".glass-strong": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.5)",
        },
        ".glass-purple": {
          background:
            "linear-gradient(135deg, rgba(138, 43, 226, 0.15) 0%, rgba(75, 0, 130, 0.1) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(138, 43, 226, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(138, 43, 226, 0.4)",
        },
        ".glass-blue": {
          background:
            "linear-gradient(135deg, rgba(65, 105, 225, 0.15) 0%, rgba(30, 58, 138, 0.1) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(65, 105, 225, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(65, 105, 225, 0.4)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
