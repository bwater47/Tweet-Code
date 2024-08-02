import { User } from "../models/User.js";

const userData = [
  {
    firstName: "L33t",
    lastName: "H4x0r",
    username: "l33th4x0r",
    email: "l33t.h4x0r@codez.net",
    password: "password123",
    coins: 1000,
    problems: [],
    donationsMade: [],
  },
  {
    firstName: "Cyber",
    lastName: "N1nj4",
    username: "cybern1nj4",
    email: "cyber.n1nj4@hackermanz.com",
    password: "password123",
    coins: 750,
    problems: [],
    donationsMade: [],
  },
  {
    firstName: "Script",
    lastName: "K1ddi3",
    username: "scriptk1d",
    email: "script.k1ddi3@1337.io",
    password: "password123",
    coins: 500,
    problems: [],
    donationsMade: [],
  },
  {
    firstName: "C0de",
    lastName: "W1zard",
    username: "c0dew1z",
    email: "c0de.w1zard@dev.guru",
    password: "password123",
    coins: 1200,
    problems: [],
    donationsMade: [],
  },
  {
    firstName: "Gl1tch",
    lastName: "Qu33n",
    username: "gl1tchqu33n",
    email: "gl1tch.qu33n@binary.org",
    password: "password123",
    coins: 800,
    problems: [],
    donationsMade: [],
  },
];

const seedUsers = async () => {
  try {
    await User.bulkCreate(userData);
    console.log("Users seeded successfully");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};

export default seedUsers;
