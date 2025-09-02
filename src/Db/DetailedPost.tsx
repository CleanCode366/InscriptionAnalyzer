import ins1 from "@assets/inscriptions/inscript1.png";

const mockPostData = {
  _id: "post5",
  user_id: "user124", 
  user_name: "Mohit Singh",
  createdAt: new Date('2024-01-12'),
  images: {
    thumbnailImage: [ins1],
    image: [ins1]
  },
  description: {
    title: "Hathigumpha Inscription",
    description: "1st century BCE inscription by King Kharavela of Kalinga, documenting his military campaigns, public works and religious patronage in 17 lines of Brahmi script.",
    scriptLanguage: ["brahmi"],
    language: ["prakrit"],
    englishTranslation: "In the first year (of his reign), without disturbing the people, he extensively repaired the gates and walls of the city of Kalinga which had been damaged by storm.",
    upvote: 217,
    geolocation: {
      lon: 75.7033,
      lat: 20.5319,
      state: "Uttar Pradesh",
      city: "Sanchi", 
      region: "India"
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  topic: "Royal Inscriptions",
  script: ["Brahmi"],
  type: "stone",
  rating: 4.5
};

const mockComments = [
  {
    _id: "comment1",
    user_id: "user124",
    user_name: "ArchaeologyProf",
    description: {
      description: "This appears to be Famous 3rd century BCE inscription in Brahmi script, documenting Emperor Ashoka's principles of dharma and non-violence after the Kalinga War.",
      upvote: 24,
      createdAt: new Date('2024-01-13'),
    }
  },
  {
    _id: "comment2", 
    user_id: "user123",
    user_name: "HistoryBuff42",
    description: {
      description: "I can make out references to Athens and Sparta in the text. The inscription likely dates to around 425 BCE based on the letter forms and historical context.",
      upvote: 17,
      createdAt: new Date('2024-01-13'),
    }
  },
  {
    _id: "comment3",
    user_id: "user125", 
    user_name: "ClassicsStudent",
    description: {
      description: "The dialect appears to be Attic Greek. I notice several references to the goddess Athena and what seems to be financial contributions for a temple or public building.",
      upvote: 9,
      createdAt: new Date('2024-01-13'),
    }
  },
  {
    _id: "comment4",
    user_id: "user126",
    user_name: "AncientArtLover", 
    description: {
      description: "The decorative border elements suggest this was an important public inscription. The craftsmanship is exceptional for the period, indicating it was commissioned by wealthy patrons.",
      upvote: 5,
      createdAt: new Date('2024-01-14'),
    }
  }
];

export { mockPostData, mockComments };