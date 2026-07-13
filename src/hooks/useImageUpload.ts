'use client';

import { useState } from 'react';

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

interface UseImageUploadOptions {
  type?: 'skinAnalysis' | 'progressPhoto' | 'profileImage' | 'productReview';
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<UploadResult | null> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image');
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('L\'image ne doit pas dépasser 10MB');
      }

      setProgress(20);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', options.type || 'skinAnalysis');

      setProgress(40);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setProgress(80);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'upload');
      }

      setProgress(100);
      
      const result: UploadResult = {
        url: data.url,
        publicId: data.publicId,
        width: data.width,
        height: data.height,
      };

      options.onSuccess?.(result);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (publicId: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      return response.ok;
    } catch {
      return false;
    }
  };

  return {
    upload,
    deleteImage,
    isUploading,
    progress,
    error,
  };
}
