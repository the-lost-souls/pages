export interface CarouselSection {
    image: string;
    title: string;
    year: number;
    event: string;
    category: string;
    ranked: number;
    credits: {
      name: string,
      role: string
    }[];
    // text: string[];
    youtube: string;
    pouet: string;
    github: string;
    download: string;
  }
