import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardData = [
  {
    id: 1,
    title: "Artificial Intelligence & Machine Learning",
    description: "Build intelligent systems that learn and adapt to solve complex problems. Explore cutting-edge AI technologies and create innovative solutions.",
    color: "rgba(6, 182, 212, 0.8)" // cyan-500
  },
  {
    id: 2,
    title: "Blockchain & Web3",
    description: "Create decentralized solutions for the future of digital trust. Develop blockchain applications and smart contracts for tomorrow's web.",
    color: "rgba(168, 85, 247, 0.8)" // purple-500
  },
  {
    id: 3,
    title: "IoT & Smart Systems",
    description: "Connect devices and data to build intelligent infrastructure. Design interconnected systems that revolutionize how we interact with technology.",
    color: "rgba(59, 130, 246, 0.8)" // blue-500
  }
];
