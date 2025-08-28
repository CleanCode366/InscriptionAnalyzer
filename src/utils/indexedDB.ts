import type { UploadedImageData } from '@/types';

export const initDB = (): Promise<IDBDatabase> => {
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

export const saveImageToIndexedDB = async (imageData: UploadedImageData): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction("images", "readwrite");
  const store = tx.objectStore("images");

  return new Promise((resolve, reject) => {
    store.add(imageData);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(new Error("Failed to save image"));
  });
};