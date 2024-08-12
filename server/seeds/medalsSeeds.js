import Medal from "../models/Medal.js";
import User from "../models/User.js";
const medalData = [
  {
    title: "you Suck!",
    description: "this guy sucks.",
    price: 20,
  },
  {
    title: "Logo V1",
    description: "The first iteration of the TweetCode logo",
    price: 500,
  },
  {
    title: "Bronze coin",
    description:"a poor medal for a poor boy.",
    price: 10
  },
  {
    title: "Silver coin",
    description:"The middle class but a coin.",
    price: 200
  },
  {
    title: "Gold coin",
    description:"He spent HOW MUCH!",
    price: 20000
  },
];
const seedMedals = async () => {
  try {
    // Get all users
    const users = await User.find();

    if (!users) {
      throw new Error("Users not found. Please seed users first.");
    }

    const createdmedals = await Promise.all(
      medalData.map(async (medal) => {
        const newMedal = new Medal({
          ...medal,
        });
        await newMedal.save();
        return newMedal;
      })
    )
    .then(async (medals) => {

        for(let i = 0; i < users.length; i++){

          const addToUser= [];

          for(let m = 0; m < medals.length; m++){
            if(Math.random()>= 0.75){
              addToUser.push(medals[m]);
            }
          }

         users[i].medals = [ ...users[i].medals, ...addToUser];
         const newUser = await users[i].save();
        }
         return medals;

    });

    console.log(`${createdmedals.length} medals seeded successfully`);
  } catch (err) {
    console.error("Error seeding Medals:", err);
    throw err;
  }
};
export default seedMedals;
