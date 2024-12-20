import { Poppins, Playfair_Display } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-playfair-display",
});
