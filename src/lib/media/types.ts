export type MediaCategory =
  | 'campus'
  | 'classrooms'
  | 'students'
  | 'faculty'
  | 'courses'
  | 'events'
  | 'successStories'
  | 'gallery';

export type AspectRatioType = '16/9' | '4/3' | '1/1' | '16/10' | '3/4' | '21/9' | 'auto';

export interface MediaAsset {
  id: string;
  category: MediaCategory;
  title: string;
  alt: string;
  url: string;
  fallbackUrl?: string;
  caption?: string;
  aspectRatio?: AspectRatioType;
  tags?: string[];
  isUploaded?: boolean;
  uploadedAt?: string;
}

export interface MediaRegistrySchema {
  campus: Record<string, MediaAsset>;
  classrooms: Record<string, MediaAsset>;
  students: Record<string, MediaAsset>;
  faculty: Record<string, MediaAsset>;
  courses: Record<string, MediaAsset>;
  events: Record<string, MediaAsset>;
  successStories: Record<string, MediaAsset>;
  gallery: MediaAsset[];
}
