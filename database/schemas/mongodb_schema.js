/**
 * MongoDB Schema Design for DailyDrip
 * 
 * This file describes the MongoDB collections and their schema design.
 * It serves as documentation for the database structure.
 */

// Users Collection
const usersCollection = {
  _id: "ObjectId", // Automatically assigned unique identifier
  email: {
    type: "String",
    required: true,
    unique: true // Ensures no duplicate email addresses
  },
  name: {
    type: "String",
    required: false // Optional display name
  },
  preferences: {
    type: ["String"], // Array of strings for topics/keywords
    default: []
  },
  createdAt: {
    type: "Date",
    default: "Date.now"
  },
  updatedAt: {
    type: "Date",
    default: "Date.now"
  }
};

// Articles Collection
const articlesCollection = {
  _id: "ObjectId", // Automatically assigned unique identifier
  title: {
    type: "String",
    required: true
  },
  url: {
    type: "String",
    required: true,
    unique: true // Ensures no duplicate articles
  },
  summary: {
    type: "String",
    required: true // LLM-generated summary
  },
  source: {
    type: "String",
    required: true // Publisher name (e.g., "TechCrunch")
  },
  publishedAt: {
    type: "Date",
    required: true
  },
  fetchedAt: {
    type: "Date",
    default: "Date.now"
  },
  content: {
    type: "String" // Original article content if available
  },
  topics: {
    type: ["String"], // Categories/topics this article belongs to
    default: []
  }
};

// Digests Collection
const digestsCollection = {
  _id: "ObjectId", // Automatically assigned unique identifier
  userId: {
    type: "ObjectId",
    required: true,
    ref: "users" // Reference to Users collection
  },
  date: {
    type: "Date",
    required: true
  },
  articles: {
    type: ["ObjectId"], // Array of article references
    ref: "articles",
    default: []
  },
  createdAt: {
    type: "Date",
    default: "Date.now"
  },
  status: {
    type: "String",
    enum: ["pending", "generated", "delivered"],
    default: "pending"
  }
};

// Required Indexes
const indexes = {
  users: [
    { email: 1 }, // Unique index on email
    { "preferences": 1 } // Index for searching by preferences
  ],
  articles: [
    { url: 1 }, // Unique index on URL
    { publishedAt: -1 }, // Index for sorting by publish date
    { source: 1 }, // Index for filtering by source
    { topics: 1 } // Index for searching by topics
  ],
  digests: [
    { userId: 1, date: -1 }, // Compound index for user's digests by date
    { date: 1 } // Index for finding digests by date
  ]
};

// Export schema (documentation purposes only)
module.exports = {
  usersCollection,
  articlesCollection,
  digestsCollection,
  indexes
};

// This is a documentation file only, not actual code
console.log("This is a documentation file describing the MongoDB schema design"); 