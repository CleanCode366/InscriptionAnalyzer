import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
interface ImageData {
  id: number;
  photo: string;   // base64 string
  geoInfo?: any;
  timestamp: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  // Open DB
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

  // Fetch all images
  const fetchImages = async () => {
    const db = await initDB();
    const tx = db.transaction("images", "readonly");
    const store = tx.objectStore("images");
    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result as ImageData[];
      // Sort latest first
      const sorted = result.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setImages(sorted);
    };
    request.onerror = () => {
      console.error("Failed to fetch images");
    };
  };

  // Delete image
  const deleteImage = async (id: number) => {
    const db = await initDB();
    const tx = db.transaction("images", "readwrite");
    const store = tx.objectStore("images");
    store.delete(id);
    tx.oncomplete = () => {
      setImages((prev) => prev.filter((img) => img.id !== id));
    };
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Group images by date
  const groupByDate = (images: ImageData[]) => {
    const groups: Record<string, ImageData[]> = {};

    images.forEach((img) => {
      const dateObj = new Date(img.timestamp);
      const dateKey = dateObj.toDateString(); // e.g. "Mon Aug 19 2025"
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(img);
    });

    return groups;
  };

  const groupedImages = groupByDate(images);

  return (
    <div className="p-6">
      <h1 className="text-primary text-2xl font-bold mb-4">Epigraphy Photos</h1>

      {images.length === 0 ? (
        <p className="text-secondary-text">No images found.</p>
      ) : (
        Object.entries(groupedImages).map(([date, imgs]) => (
          <div key={date} className="mb-8 text-primary-text">
            <h2 className="text-lg font-semibold mb-3">{date}</h2>
            <div className="grid grbid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imgs.map((img) => (
                <div key={img.id} className="bg-white rounded-xl shadow-lg p-3 relative">
                  {/* Delete button */}
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                  >
                    <FaRegTrashAlt />
                  </button>

                  <img
                    src={img.photo}
                    alt={`Captured ${img.id}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <div className="text-sm text-gray-600">
                    {/* <p>{new Date(img.timestamp).toLocaleTimeString()}</p> */}
                    {img.geoInfo?.latitude && img.geoInfo?.longitude && (
                      <p>
                        lon: {img.geoInfo.latitude}, lat: {img.geoInfo.longitude}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;


//
// import React, { useEffect, useState } from "react";
// import { FaRegTrashAlt } from "react-icons/fa";
// interface ImageData {
//   id: number;
//   photo: string;   // base64 string
//   geoInfo?: any;
//   timestamp: string;
// }

// const Gallery: React.FC = () => {
//   const [images, setImages] = useState<ImageData[]>([]);
//   const [locations, setLocations] = useState<Record<number, string>>({});

//   // Open DB
//   const initDB = (): Promise<IDBDatabase> => {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open("ImageDB", 1);
//       request.onupgradeneeded = (e) => {
//         const db = (e.target as IDBOpenDBRequest).result;
//         if (!db.objectStoreNames.contains("images")) {
//           db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
//         }
//       };
//       request.onsuccess = () => resolve(request.result);
//       request.onerror = () => reject(request.error);
//     });
//   };

//   // Fetch all images
//   const fetchImages = async () => {
//     const db = await initDB();
//     const tx = db.transaction("images", "readonly");
//     const store = tx.objectStore("images");
//     const request = store.getAll();

//     request.onsuccess = () => {
//       const result = request.result as ImageData[];
//       // Sort latest first
//       const sorted = result.sort(
//         (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//       );
//       setImages(sorted);
//     };
//     request.onerror = () => {
//       console.error("Failed to fetch images");
//     };
//   };

//   // Delete image
//   const deleteImage = async (id: number) => {
//     const db = await initDB();
//     const tx = db.transaction("images", "readwrite");
//     const store = tx.objectStore("images");
//     store.delete(id);
//     tx.oncomplete = () => {
//       setImages((prev) => prev.filter((img) => img.id !== id));
//     };
//   };


//   // Group images by date
//   const groupByDate = (images: ImageData[]) => {
//     const groups: Record<string, ImageData[]> = {};

//     images.forEach((img) => {
//       const dateObj = new Date(img.timestamp);
//       const dateKey = dateObj.toDateString(); // e.g. "Mon Aug 19 2025"
//       if (!groups[dateKey]) groups[dateKey] = [];
//       groups[dateKey].push(img);
//     });

//     return groups;
//   };

//   const groupedImages = groupByDate(images);

//   const fetchLocationName = async (lat: number, lon: number): Promise<string | null> => {
//     try {
//         const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
//         );
//         const data = await response.json();
//         return data.display_name || null;
//     } catch (err) {
//         console.error("Reverse geocoding failed", err);
//         return null;
//     }
//   };

  

// // Load location names when images are fetched
// useEffect(() => {
//   fetchImages();
//   images.forEach((img) => {
//     if (img.geoInfo?.latitude && img.geoInfo?.longitude && !locations[img.id]) {
//       fetchLocationName(img.geoInfo.latitude, img.geoInfo.longitude).then((loc) => {
//         if (loc) {
//           setLocations((prev) => ({ ...prev, [img.id]: loc }));
//         }
//       });
//     }
//   });
// }, [images]);

//   return (
//     <div className="p-6">
//       <h1 className="text-primary text-2xl font-bold mb-4">Epigraphy Photos</h1>

//       {images.length === 0 ? (
//         <p className="text-gray-500">No images found.</p>
//       ) : (
//         Object.entries(groupedImages).map(([date, imgs]) => (
//           <div key={date} className="mb-8">
//             <h2 className="text-lg font-semibold mb-3">{date}</h2>
//             <div className="grid grbid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {imgs.map((img) => (
//                 <div key={img.id} className="bg-white rounded-xl shadow-lg p-3 relative">
//                   {/* Delete button */}
//                   <button
//                     onClick={() => deleteImage(img.id)}
//                     className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
//                   >
//                     <FaRegTrashAlt />
//                   </button>

//                   <img
//                     src={img.photo}
//                     alt={`Captured ${img.id}`}
//                     className="w-full h-48 object-cover rounded-lg mb-2"
//                   />
//                   <div className="text-sm text-gray-600">
//                     <p>{new Date(img.timestamp).toLocaleTimeString()}</p>
//                     {img.geoInfo?.latitude && img.geoInfo?.longitude && (
//                       <p>
//                         📍 {fetchLocationName(img.geoInfo.latitude, img.geoInfo.longitude)}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Gallery;


