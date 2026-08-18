import { AdState } from './types';

export const DEFAULT_AD_STATE: AdState = {
  headline: "Retro Chic",
  subHeadline: "Vibes",
  footerText: "123 ANYWHERE ST., ANY CITY",
  brandName: "LARANA SHOWROOM",
  colors: {
    background: "#F2F0E9",
    accent: "#A8181B",
    text: "#2A2A2A",
  },
  images: {
    main: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop", // Fashion model
    leftPolaroid: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop", // Detail shot
    rightPolaroid: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=500&auto=format&fit=crop", // Detail shot 2
  },
  labels: [
    { id: '1', text: "Bold crop top", x: 20, y: 25, rotation: -2 },
    { id: '2', text: "Modern glasses", x: 70, y: 20, rotation: 3 },
    { id: '3', text: "Corduroy pants", x: 25, y: 75, rotation: -3 },
    { id: '4', text: "Red sock boots", x: 75, y: 75, rotation: 2 },
  ],
};

export const CANVAS_ASPECT_RATIO = 4 / 5; // Standard social media portrait
