import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        audiowide : ['Audiowide','sans-serif'],
        funneldisplay : ['Funnel Display','sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif']

      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        aurora1: {
          "0%": { transform: "translateX(-100px) translateY(-50px) rotate(0deg) scale(1)" },
          "50%": { transform: "translateX(50px) translateY(30px) rotate(180deg) scale(1.1)" },
          "100%": { transform: "translateX(100px) translateY(-30px) rotate(360deg) scale(0.9)" },
        },
        aurora2: {
          "0%": { transform: "translateX(80px) translateY(40px) rotate(45deg) scale(0.8)" },
          "50%": { transform: "translateX(-30px) translateY(-20px) rotate(225deg) scale(1.2)" },
          "100%": { transform: "translateX(-80px) translateY(60px) rotate(405deg) scale(0.9)" },
        },
        aurora3: {
          "0%": { transform: "translateX(-50px) translateY(20px) rotate(90deg) scale(1.1)" },
          "50%": { transform: "translateX(70px) translateY(-40px) rotate(270deg) scale(0.8)" },
          "100%": { transform: "translateX(-20px) translateY(50px) rotate(450deg) scale(1.0)" },
        },
        aurora4: {
          "0%": { transform: "translateX(30px) translateY(-20px) rotate(135deg) scale(0.9)" },
          "50%": { transform: "translateX(-60px) translateY(10px) rotate(315deg) scale(1.1)" },
          "100%": { transform: "translateX(40px) translateY(-60px) rotate(495deg) scale(0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        aurora1: "aurora1 8s ease-in-out infinite alternate",
        aurora2: "aurora2 6s ease-in-out infinite alternate-reverse",
        aurora3: "aurora3 10s ease-in-out infinite alternate",
        aurora4: "aurora4 7s ease-in-out infinite alternate-reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
