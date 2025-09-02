import inscription1 from "@assets/inscriptions/inscript1.png";
import inscription2 from "@assets/inscriptions/inscript2.png";
import inscription3 from "@assets/inscriptions/inscript3.png";

const mockDiscoveryPosts = [
  {
    _id: "post1",
    user_id: "user123",
    createdAt: new Date('2024-01-15'),
    images: {
      thumbnailImage: [inscription1],
      image: [inscription1]
    },
    description: {
      title: "Ashoka Pillar Edict",
      subject: "Famous 3rd century BCE inscription in Brahmi script, documenting Emperor Ashoka's principles of dharma and non-violence after the Kalinga War.",
      description: "This remarkable pillar contains one of the most significant edicts of Emperor Ashoka, carved in ancient Brahmi script. The inscription details his conversion to Buddhism and establishment of dhamma as state policy.",
      scriptLanguage: ["brahmi"],
      language: ["sanskrit"],
      englishTranslation: "All men are my children. What I desire for my own children, and I desire their welfare and happiness both in this world and the next, that I desire for all men.",
      upvote: 142,
      geolocation: {
        lon: 82.9739,
        lat: 25.2138,
        state: "Uttar Pradesh", 
        city: "Sarnath",
        region: "India"
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    topic: "Historical Edicts",
    script: ["Brahmi"],
    type: "stone",
    distance: 0.5,
    rating: 4.5
  },
  {
    _id: "post2",
    user_id: "user124", 
    createdAt: new Date('2024-01-12'),
    images: {
      thumbnailImage: [inscription2],
      image: [inscription2]
    },
    description: {
      title: "Ajanta Cave Inscriptions",
      subject: "2nd century BCE to 6th century CE Buddhist cave inscriptions featuring detailed paintings and sculptures depicting the life of Buddha and Jataka tales.",
      description: "These extraordinary cave paintings and inscriptions represent one of the finest examples of ancient Indian art. The caves contain detailed Buddhist narratives and donor inscriptions.",
      scriptLanguage: ["brahmi", "sanskrit"],
      language: ["sanskrit", "prakrit"],
      englishTranslation: "May this merit acquired by causing a cave to be made benefit all beings.",
      upvote: 217,
      geolocation: {
        lon: 75.7033,
        lat: 20.5319,
        state: "Maharashtra",
        city: "Moab", 
        region: "India"
      },
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    topic: "Buddhist Art",
    script: ["Brahmi", "Sanskrit"],
    type: "stone",
    distance: 5.7,
    rating: 4.0
  },
  {
    _id: "post3",
    user_id: "user125",
    createdAt: new Date('2024-01-10'),
    images: {
      thumbnailImage: [inscription3],
      image: [inscription3]
    },
    description: {
      title: "Hathigumpha Inscription", 
      subject: "1st century BCE inscription by King Kharavela of Kalinga, documenting his military campaigns, public works and religious patronage in 17 lines of Brahmi script.",
      description: "This inscription in the Udayagiri caves provides crucial historical information about the Kalinga kingdom and King Kharavela's reign, military conquests, and patronage of Jainism.",
      scriptLanguage: ["brahmi"],
      language: ["prakrit"],
      englishTranslation: "In the first year (of his reign), without disturbing the people, he extensively repaired the gates and walls of the city of Kalinga which had been damaged by storm.",
      upvote: 176,
      geolocation: {
        lon: 85.2799,
        lat: 20.2961,
        state: "Odisha",
        city: "Bhubaneswar",
        region: "India"
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    topic: "Royal Inscriptions",
    script: ["Brahmi"],
    type: "stone", 
    distance: 5.8,
    rating: 3.5
  },
  {
    _id: "post4",
    user_id: "user123",
    createdAt: new Date('2024-01-15'),
    images: {
      thumbnailImage: [inscription1],
      image: [inscription1]
    },
    description: {
      title: "Ashoka Pillar Edict",
      subject: "Famous 3rd century BCE inscription in Brahmi script, documenting Emperor Ashoka's principles of dharma and non-violence after the Kalinga War.",
      description: "This remarkable pillar contains one of the most significant edicts of Emperor Ashoka, carved in ancient Brahmi script. The inscription details his conversion to Buddhism and establishment of dhamma as state policy.",
      scriptLanguage: ["brahmi"],
      language: ["sanskrit"],
      englishTranslation: "All men are my children. What I desire for my own children, and I desire their welfare and happiness both in this world and the next, that I desire for all men.",
      upvote: 142,
      geolocation: {
        lon: 82.9739,
        lat: 25.2138,
        state: "Uttar Pradesh", 
        city: "Sarnath",
        region: "India"
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    topic: "Historical Edicts",
    script: ["Brahmi"],
    type: "stone",
    distance: 0.5,
    rating: 4.5
  },
  {
    _id: "post5",
    user_id: "user124", 
    createdAt: new Date('2024-01-12'),
    images: {
      thumbnailImage: [inscription2],
      image: [inscription2]
    },
    description: {
      title: "Ajanta Cave Inscriptions",
      subject: "2nd century BCE to 6th century CE Buddhist cave inscriptions featuring detailed paintings and sculptures depicting the life of Buddha and Jataka tales.",
      description: "These extraordinary cave paintings and inscriptions represent one of the finest examples of ancient Indian art. The caves contain detailed Buddhist narratives and donor inscriptions.",
      scriptLanguage: ["brahmi", "sanskrit"],
      language: ["sanskrit", "prakrit"],
      englishTranslation: "May this merit acquired by causing a cave to be made benefit all beings.",
      upvote: 217,
      geolocation: {
        lon: 75.7033,
        lat: 20.5319,
        state: "Maharashtra",
        city: "Moab", 
        region: "India"
      },
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    topic: "Buddhist Art",
    script: ["Brahmi", "Sanskrit"],
    type: "stone",
    distance: 5.7,
    rating: 4.0
  },
  {
    _id: "post6",
    user_id: "user125",
    createdAt: new Date('2024-01-10'),
    images: {
      thumbnailImage: [inscription3],
      image: [inscription3]
    },
    description: {
      title: "Hathigumpha Inscription", 
      subject: "1st century BCE inscription by King Kharavela of Kalinga, documenting his military campaigns, public works and religious patronage in 17 lines of Brahmi script.",
      description: "This inscription in the Udayagiri caves provides crucial historical information about the Kalinga kingdom and King Kharavela's reign, military conquests, and patronage of Jainism.",
      scriptLanguage: ["brahmi"],
      language: ["prakrit"],
      englishTranslation: "In the first year (of his reign), without disturbing the people, he extensively repaired the gates and walls of the city of Kalinga which had been damaged by storm.",
      upvote: 176,
      geolocation: {
        lon: 85.2799,
        lat: 20.2961,
        state: "Odisha",
        city: "Bhubaneswar",
        region: "India"
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    topic: "Royal Inscriptions",
    script: ["Brahmi"],
    type: "stone", 
    distance: 5.8,
    rating: 3.5
  }
];

export default mockDiscoveryPosts;