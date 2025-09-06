// // utils/location.js
// export async function getCityStateFromCoords(lat, lon) {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
//     );
//     const data = await response.json();

//     const city =
//       data.address.city ||
//       data.address.town ||
//       data.address.village ||
//       data.address.hamlet ||
//       "";
//     const state = data.address.state || "";

//     return { city, state };
//   } catch (error) {
//     console.error("Error fetching location:", error);
//     return { city: "", state: "" };
//   }
// }
