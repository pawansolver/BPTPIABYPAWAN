export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // Supported: YouTube/Vimeo embed URLs or direct video links
  category: string;
  duration?: string;
}
