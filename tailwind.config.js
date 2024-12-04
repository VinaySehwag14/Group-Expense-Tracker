/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        orange: {
          600: "#FF6D00",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#007BFF", // Blue for primary actions
          foreground: "#FFFFFF", // White for text on primary background
          dark: "#0056D2", // Darker shade for hover/active states
          light: "#B3D7FF", // Lighter shade for disabled states
        },
        secondary: {
          DEFAULT: "#28A745", // Green for success or balances
          foreground: "#FFFFFF", // White for text on secondary background
          dark: "#218838", // Darker shade for hover/active states
          light: "#A8E4B0", // Lighter shade for highlights
        },
        accent: {
          DEFAULT: "#FFC107", // Orange/Yellow for highlights or CTA
          foreground: "#000000", // Black for text on accent background
          dark: "#FF9800", // Darker orange for hover/active states
          light: "#FFE082", // Softer yellow for subtle emphasis
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "#DC3545", // Red for errors and alerts
          foreground: "#FFFFFF", // White for text on destructive background
          dark: "#C82333", // Darker shade for hover/active
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        neutral: {
          light: "#F8F9FA", // Light gray for backgrounds
          DEFAULT: "#E9ECEF", // Default gray for card borders
          dark: "#6C757D", // Medium gray for text
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"], // Primary font family
        display: ["Poppins", "sans-serif"], // For accent/heading fonts
        body: ["Roboto", "sans-serif"], // For body text
      },
      fontSize: {
        "3xl": ["2.25rem", "1.2"], // Custom heading sizes
        "2xl": ["1.875rem", "1.3"],
        base: ["1rem", "1.5"],
        sm: ["0.875rem", "1.4"],
        lg: ["1.125rem", "1.4"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
