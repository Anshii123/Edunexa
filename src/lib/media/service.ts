import { MediaAsset, MediaCategory } from './types';
import { MEDIA_REGISTRY, getMedia, getGalleryMedia } from './registry';

const MEDIA_STORAGE_KEY = 'edunexa_media_uploads';

class MediaService {
  private customUploads: MediaAsset[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(MEDIA_STORAGE_KEY);
      if (stored) {
        try {
          this.customUploads = JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored media uploads', e);
        }
      }
    }
  }

  public getAllMedia(): MediaAsset[] {
    const defaultAssets: MediaAsset[] = [
      ...Object.values(MEDIA_REGISTRY.campus),
      ...Object.values(MEDIA_REGISTRY.classrooms),
      ...Object.values(MEDIA_REGISTRY.students),
      ...Object.values(MEDIA_REGISTRY.faculty),
      ...Object.values(MEDIA_REGISTRY.courses),
      ...Object.values(MEDIA_REGISTRY.events),
      ...Object.values(MEDIA_REGISTRY.successStories),
      ...MEDIA_REGISTRY.gallery,
    ];

    return [...this.customUploads, ...defaultAssets];
  }

  public getMediaByCategory(category: MediaCategory): MediaAsset[] {
    return this.getAllMedia().filter((m) => m.category === category);
  }

  public uploadMedia(asset: Omit<MediaAsset, 'id' | 'isUploaded' | 'uploadedAt'>): MediaAsset {
    const newAsset: MediaAsset = {
      ...asset,
      id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isUploaded: true,
      uploadedAt: new Date().toISOString(),
    };

    this.customUploads.unshift(newAsset);
    if (typeof window !== 'undefined') {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(this.customUploads));
    }

    return newAsset;
  }

  public registerCustomMedia(asset: Omit<MediaAsset, 'id' | 'isUploaded' | 'uploadedAt'> & { width?: number; height?: number; format?: string }): MediaAsset {
    return this.uploadMedia(asset);
  }

  public deleteUploadedMedia(id: string): boolean {
    const initialLen = this.customUploads.length;
    this.customUploads = this.customUploads.filter((m) => m.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(this.customUploads));
    }
    return this.customUploads.length < initialLen;
  }

  public deleteMedia(id: string): boolean {
    return this.deleteUploadedMedia(id);
  }
}

export const mediaService = new MediaService();
