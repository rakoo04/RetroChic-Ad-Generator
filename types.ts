export interface AdLabel {
  id: string;
  text: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  rotation: number;
}

export interface AdState {
  headline: string;
  subHeadline: string;
  footerText: string;
  brandName: string;
  colors: {
    background: string;
    accent: string;
    text: string;
  };
  images: {
    main: string | null; // URL or base64
    leftPolaroid: string | null;
    rightPolaroid: string | null;
  };
  labels: AdLabel[];
}

export interface GemniResponse {
  headline: string;
  subHeadline: string;
  labels: string[];
  brandName: string;
  footerText: string;
}
