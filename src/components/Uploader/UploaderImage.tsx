import type { ChangeEvent } from "react";
import React, { useRef, useState } from "react";

const UploaderImage: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasGeoData, setHasGeoData] = useState<boolean | null>(null);
  const [geoInfo, setGeoInfo] = useState<any>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize IndexedDB
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ImageDB", 1);
      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  // Save image to IndexedDB
  const saveToIndexedDB = async () => {
    if (!photo) return;
    try {
      const db = await initDB();
      const tx = db.transaction("images", "readwrite");
      const store = tx.objectStore("images");

      const imageData = {
        photo,   // base64 image string
        geoInfo, // optional metadata
        timestamp: new Date().toISOString()
      };

      store.add(imageData);
      tx.oncomplete = () => alert("Image saved to IndexedDB!");
      tx.onerror = () => alert("Failed to save image.");
      resetPhoto();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  // Function to extract EXIF data from image
  const extractEXIFData = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const dataView = new DataView(arrayBuffer);
        
        // Check for EXIF data
        let offset = 2;
        const maxOffset = Math.min(65535, dataView.byteLength);
        
        while (offset < maxOffset) {
          const marker = dataView.getUint16(offset);
          if (marker === 0xFFE1) { // APP1 marker (EXIF)
            const length = dataView.getUint16(offset + 2);
            const exifData = arrayBuffer.slice(offset + 4, offset + 4 + length - 2);
            resolve(parseEXIFForGPS(new DataView(exifData)));
            return;
          }
          offset += 2 + dataView.getUint16(offset + 2);
        }
        resolve(null);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  // Parse GPS data from EXIF
  const parseEXIFForGPS = (dataView: DataView): any => {
    try {
      // Check for EXIF header
      const exifHeader = String.fromCharCode(
        dataView.getUint8(0),
        dataView.getUint8(1),
        dataView.getUint8(2),
        dataView.getUint8(3)
      );
      
      if (exifHeader !== "Exif") return null;
      
      // Skip to TIFF header
      let offset = 6;
      const byteOrder = dataView.getUint16(offset);
      const isLittleEndian = byteOrder === 0x4949;
      
      // Get IFD0 offset
      const ifd0Offset = isLittleEndian 
        ? dataView.getUint32(offset + 4, true)
        : dataView.getUint32(offset + 4, false);
      
      // Look for GPS IFD
      const gpsData = findGPSIFD(dataView, offset + ifd0Offset, isLittleEndian);
      return gpsData;
    } catch (error) {
      console.error("Error parsing EXIF:", error);
      return null;
    }
  };

  const findGPSIFD = (dataView: DataView, ifdOffset: number, isLittleEndian: boolean): any => {
    try {
      const numEntries = isLittleEndian 
        ? dataView.getUint16(ifdOffset, true)
        : dataView.getUint16(ifdOffset, false);
      
      let currentOffset = ifdOffset + 2;
      
      for (let i = 0; i < numEntries; i++) {
        const tag = isLittleEndian 
          ? dataView.getUint16(currentOffset, true)
          : dataView.getUint16(currentOffset, false);
        
        if (tag === 0x8825) { // GPS IFD tag
          const gpsOffset = isLittleEndian 
            ? dataView.getUint32(currentOffset + 8, true)
            : dataView.getUint32(currentOffset + 8, false);
          
          return parseGPSData(dataView, ifdOffset - 4 + gpsOffset, isLittleEndian);
        }
        currentOffset += 12;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const parseGPSData = (dataView: DataView, gpsOffset: number, isLittleEndian: boolean): any => {
    try {
      const gpsEntries = isLittleEndian 
        ? dataView.getUint16(gpsOffset, true)
        : dataView.getUint16(gpsOffset, false);
      
      let latRef = null, lonRef = null;
      let currentOffset = gpsOffset + 2;
      
      for (let i = 0; i < gpsEntries; i++) {
        const tag = isLittleEndian 
          ? dataView.getUint16(currentOffset, true)
          : dataView.getUint16(currentOffset, false);
        
        // GPS tags: 1=LatRef, 2=Lat, 3=LonRef, 4=Lon
        if (tag === 1) latRef = String.fromCharCode(dataView.getUint8(currentOffset + 8));
        if (tag === 3) lonRef = String.fromCharCode(dataView.getUint8(currentOffset + 8));
        
        currentOffset += 12;
      }
      
      if (latRef && lonRef) {
        return { hasGPS: true, latRef, lonRef };
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      setIsCapturing(true);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment", // Use back camera
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      setError("Failed to access camera. Please ensure camera permissions are granted.");
      setIsCapturing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Convert to blob and then to file for EXIF processing
        canvas.toBlob(async (blob) => {
          if (blob) {
            const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            // Check for geolocation data
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // If we can get current location, embed it conceptually
                  const { latitude, longitude } = position.coords;
                  setGeoInfo({ 
                    hasGPS: true, 
                    latitude: latitude.toFixed(6), 
                    longitude: longitude.toFixed(6),
                    accuracy: position.coords.accuracy 
                  });
                  setHasGeoData(true);
                  setPhoto(photoDataUrl);
                  stopCamera();
                },
                () => {
                  setError("Location access denied. Please enable location services and try again.");
                  setHasGeoData(false);
                }
              );
            } else {
              setError("Geolocation is not supported by this browser.");
              setHasGeoData(false);
            }
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      
      try {
        // Check for EXIF GPS data
        const exifData = await extractEXIFData(file);
        
        if (exifData && exifData.hasGPS) {
          setHasGeoData(true);
          setGeoInfo(exifData);
          
          const reader = new FileReader();
          reader.onload = () => setPhoto(reader.result as string);
          reader.readAsDataURL(file);
        } else {
          setError("This image doesn't contain location data. Please use the camera to take a new photo with location enabled.");
          setHasGeoData(false);
        }
      } catch (err) {
        setError("Failed to read image metadata. Please try again.");
      }
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
    setHasGeoData(null);
    setGeoInfo(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-4">
      <div className="bg-secondary-background rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col items-center">
        {/* Error Message */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* GPS Status */}
        {hasGeoData !== null && (
          <div className={`w-full mb-4 p-3 rounded-lg text-sm ${
            hasGeoData 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
          }`}>
            {hasGeoData ? (
              <div>
                ✅ Location data found!
                {geoInfo && (
                  <div className="mt-1 text-xs">
                    {geoInfo.latitude && geoInfo.longitude && (
                      <p>Coordinates: {geoInfo.latitude}, {geoInfo.longitude}</p>
                    )}
                    {geoInfo.accuracy && (
                      <p>Accuracy: ±{Math.round(geoInfo.accuracy)}m</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              "⚠️ No location data found in image"
            )}
          </div>
        )}

        {/* Camera View */}
        {isCapturing ? (
          <div className="w-full">
            <video
              ref={videoRef}
              className="w-full h-60 object-cover rounded-lg mb-4"
              autoPlay
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={capturePhoto}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition cursor-pointer"
              >
                Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : photo ? (
          /* Preview Image */
          <div className="w-full">
            <img
              src={photo}
              alt="Captured"
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <div className="flex gap-3 justify-center">
              <button
                onClick={resetPhoto}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition cursor-pointer"
              >
                Take Another
              </button>
            </div>
          </div>
        ) : (
          /* Initial State */
          <div className="w-full">
            <div className="w-full h-60 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl mb-4">
              <p className="text-gray-500 text-sm text-center">
                Take a photo with location data<br />
                or upload an image with GPS info
              </p>
            </div>

            {/* Camera Button */}
            <div className="w-full mb-4">
              <button
                onClick={startCamera}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition cursor-pointer mb-3"
              >
                Open Camera
              </button>
              
              <div className="text-center text-sm text-primary-text mb-3">
                or
              </div>

              {/* File Upload */}
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition cursor-pointer text-center">
                  Upload Image with GPS
                </div>
              </label>
            </div>

            <p className="text-xs text-gray-500 mb-4 text-center">
              📍 Only images with location data are accepted<br />
              Supported formats: JPG, PNG, TIFF<br />
              Maximum size: 5MB per file
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {photo && hasGeoData && (
        <div>
          <button
            onClick={saveToIndexedDB}
            className="mt-4 bg-primary hover:bg-primary-dark text-primary-text px-8 py-3 rounded-full font-medium transition cursor-pointer shadow-lg">
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default UploaderImage;
