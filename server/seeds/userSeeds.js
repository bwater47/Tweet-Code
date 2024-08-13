import User from "../models/User.js";
import bcrypt from "bcrypt";
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
    medals:[]
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
    medals:[]

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
    medals:[]

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
    medals:[]

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
    medals:[]

  },
  {
    firstName: "asdf",
    lastName: "asdf",
    username: "asdfasdf",
    email: "asdf@asdf.com",
    password: "asdfasdf",
    coins: 69696,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6117"]
  },
  {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "password123",
    coins: 1000,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e6118"]
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    password: "password123",
    coins: 1500,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicej",
    email: "alice.j@example.com",
    password: "password123",
    coins: 800,
    medals: ["66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e6118"]
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    username: "bobbrown",
    email: "bob.brown@example.com",
    password: "password123",
    coins: 1200,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "Emma",
    lastName: "Davis",
    username: "emmad",
    email: "emma.d@example.com",
    password: "password123",
    coins: 950,
    medals: ["66b2b99c2ec98c32d72e6118", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "Michael",
    lastName: "Wilson",
    username: "mikew",
    email: "mike.w@example.com",
    password: "password123",
    coins: 1100,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "Olivia",
    lastName: "Taylor",
    username: "oliviat",
    email: "olivia.t@example.com",
    password: "password123",
    coins: 750,
    medals: ["66b2b99c2ec98c32d72e6119", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "William",
    lastName: "Anderson",
    username: "willa",
    email: "will.a@example.com",
    password: "password123",
    coins: 1300,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6118", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "Sophia",
    lastName: "Thomas",
    username: "sophiat",
    email: "sophia.t@example.com",
    password: "password123",
    coins: 900,
    medals: ["66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "James",
    lastName: "Jackson",
    username: "jamesj",
    email: "james.j@example.com",
    password: "password123",
    coins: 1050,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6118"]
  },
  {
    firstName: "Emily",
    lastName: "White",
    username: "emilywhite",
    email: "emily.w@example.com",
    password: "password123",
    coins: 1150,
    medals: ["66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "Daniel",
    lastName: "Harris",
    username: "danharris",
    email: "dan.h@example.com",
    password: "password123",
    coins: 850,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "Ava",
    lastName: "Martin",
    username: "avamartin",
    email: "ava.m@example.com",
    password: "password123",
    coins: 1250,
    medals: ["66b2b99c2ec98c32d72e6118", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "Joseph",
    lastName: "Thompson",
    username: "joet",
    email: "joe.t@example.com",
    password: "password123",
    coins: 700,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "Isabella",
    lastName: "Garcia",
    username: "isabellag",
    email: "isabella.g@example.com",
    password: "password123",
    coins: 1400,
    medals: ["66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e6118", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "David",
    lastName: "Martinez",
    username: "davidm",
    email: "david.m@example.com",
    password: "password123",
    coins: 950,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "Mia",
    lastName: "Robinson",
    username: "miar",
    email: "mia.r@example.com",
    password: "password123",
    coins: 1100,
    medals: ["66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e611a"]
  },
  {
    firstName: "Ethan",
    lastName: "Clark",
    username: "ethanc",
    email: "ethan.c@example.com",
    password: "password123",
    coins: 800,
    medals: ["66b2b99c2ec98c32d72e6116", "66b2b99c2ec98c32d72e6118", "66b2b99c2ec98c32d72e6119"]
  },
  {
    firstName: "Charlotte",
    lastName: "Rodriguez",
    username: "charlotter",
    email: "charlotte.r@example.com",
    password: "password123",
    coins: 1300,
    medals: ["66b2b99c2ec98c32d72e6117", "66b2b99c2ec98c32d72e611a"]
  }
];
const seedUsers = async () => {
  try {
    // First, delete all existing users.
    await User.deleteMany({});
    console.log("Existing users deleted");

    // Hash passwords and create new users.
    const saltRounds = 10;
    const hashedUserData = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert the new users with hashed passwords.
    const createdUsers = await User.insertMany(hashedUserData);
    console.log(`${createdUsers.length} users seeded successfully`);
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};
export default seedUsers;
