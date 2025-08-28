import profileImage from "@assets/user/profile.png";
import insc1 from "@assets/user/ins/inscription1.png";
import insc2 from "@assets/user/ins/inscription2.png";
import insc3 from "@assets/user/ins/inscription3.png";

const mockUser = {
  _id: "user123",
  name: "Ambika Choudhary",
  profileImage: profileImage,
  imagesUploaded: 42,
  upvotesReceived: 187,
  followers: 56,
  points: 320
};

const mockPosts = [
  {
    _id: "post1",
    user_id: "user123",
    createdAt: new Date('2024-01-15'),
    images: {
      thumbnailImage: [insc1],
      image: [insc1]
    },
    description: {
      title: "Rosetta Stone Translation",
      subject: "Ancient Egyptian Hieroglyphs",
      description: "Provided translation content for the demotic script section of the Rosetta Stone...",
      scriptLanguage: ["hieroglyphic", "demotic"],
      language: ["ancient-egyptian"],
      upvote: 12,
      geolocation: {
        city: "Cairo",
        region: "Egypt"
      }
    },
    topic: "Translation",
    script: ["Egyptian"],
    type: "stone"
  },
  {
    _id: "post2", 
    user_id: "user123",
    createdAt: new Date('2024-01-10'),
    images: {
      thumbnailImage: [insc2],
      image: [insc2]
    },
    description: {
      title: "Maya Glyph Identification",
      subject: "Mesoamerican Archaeology",
      description: "Identified calendar glyphs from the Temple of Inscriptions at Palenque",
      scriptLanguage: ["mayan"],
      language: ["mayan"],
      upvote: 17,
      geolocation: {
        city: "Palenque",
        region: "Mexico"
      }
    },
    topic: "Identification",
    script: ["Maya"],
    type: "stone"
  },
  {
    _id: "post3",
    user_id: "user123", 
    createdAt: new Date('2024-01-05'),
    images: {
      thumbnailImage: [insc3],
      image: [insc3]
    },
    description: {
      title: "Roman Coin Inscription",
      subject: "Roman Numismatics",
      description: "Uploaded clear images of a Hadrian-era coin with Latin inscription",
      scriptLanguage: ["latin"],
      language: ["latin"],
      upvote: 15,
      geolocation: {
        city: "Rome",
        region: "Italy"
      }
    },
    topic: "Numismatics",
    script: ["Roman"],
    type: "copper plate"
  }
];

export { mockUser, mockPosts };