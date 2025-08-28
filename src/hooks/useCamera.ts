import { useState, useRef } from 'react';
import { startCameraStream, stopCameraStream, getCurrentLocation } from '../utils/cameraUtils';
import { type GeoInfo } from '@/types';

export const useCamera = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async (): Promise<void> => {
    try {
      setIsCapturing(true);
      const mediaStream = await startCameraStream();
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      setIsCapturing(false);
      throw new Error("Failed to access camera. Please ensure camera permissions are granted.");
    }
  };

  const stopCamera = (): void => {
    if (stream) {
      stopCameraStream(stream);
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = (): Promise<{ photo: string; geoInfo: GeoInfo }> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current || !canvasRef.current) {
        reject(new Error("Camera not ready"));
        return;
      }

      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error("Failed to create image blob"));
          return;
        }

        try {
          const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          const geoInfo = await getCurrentLocation();
          resolve({ photo: photoDataUrl, geoInfo });
          stopCamera();
        } catch (error) {
          reject(error);
        }
      }, 'image/jpeg', 0.8);
    });
  };

  return {
    isCapturing,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto
  };
};
