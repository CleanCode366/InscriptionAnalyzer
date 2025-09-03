import React from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  path: string;
  label: string;
  end?: boolean; // for exact match (used for "/")
}

const links: NavItem[] = [
  { path: "/feed", label: "Feed", end: true },
  { path: "/upload", label: "Upload", end: true },
  // { path: "/photos", label: "Photos", end: true },
  { path: "/login", label: "Login", end: true },
  { path: "/profile", label: "profile", end: true },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-row justify-between bg-secondary-background p-4 text-primary-text px-16">
      <div>
        <NavLink to="/feed" end className="text-xl font-bold">
          Stone Inscriptions
        </NavLink>
      </div>

      <div className="flex gap-6">
        {links.map(({ path, label, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `hover:text-primary-dark ${
                isActive ? "text-primary-dark font-semibold" : ""
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;


// User: 
// _id: uuid(PK)
// Name: string
// profileImage: string
// ImagesUploaded: number
// UpvotesRecived: number
// Followers: number
// Points: number

// Post:
// _id: uuid (PK)
// user_id: uuid (Ref: User FK)
// createdAt: Date
// updatedAt: Date
// Images:
// thumbnaiImage: string[ ] max: 5
// Image: string[ ] max: 5
// Description: {
//   Author: String
//   _id: UUID
//   Upvote: number
//   Description: 
//   scriptLanguage: enum[]
//   Language: enum[i18n]
//   englishTranslation: string
//   Description :String
//   geolocation: {
//     lon: number
//     lat: number
//     state: string
//     city: string
//     region: string
//   }
//   createdAt: Date
//   updatedAt: Date
//   Subject: string
//   Title: string
// }
// Topic: string
// Script: enum[]
// Type: enum[ stone, coper plate, cloth ]



// Comments:
// _id: uuid
// post_id: post_id(FK)
// bucketID: created date
// description: {
//   Author: String
//   _id: UUID
//   Upvote: number
//   Description: 
//   scriptLanguage: enum[]
//   Language: enum[i18n]
//   englishTranslation: string
//   Description :String
//   geolocation: {
//     lon: number
//     lat: number
//     state: string
//     city: string
//     region: string
//   }
//   createdAt: Date
//   updatedAt: Date
//   Subject: string
//   Title: string
// }
// createsAt: Date
// updatedAt: Date

