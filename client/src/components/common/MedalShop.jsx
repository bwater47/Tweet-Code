// Import GET_MEDALS, and GET_USER_MEDALS queries from graphQL/queries.
import { GET_MEDALS, GET_USER_MEDALS } from "../../graphQL/queries";
// Import ADD_MEDAL_TO_USER, and UPDATE_COINS mutations from graphQL/mutations.
import { ADD_MEDAL_TO_USER, UPDATE_COINS } from "../../graphQL/mutations";
// Import useQuery, and useMutation from Apollo Client.
import { useQuery, useMutation } from "@apollo/client";
// Import the Medal component.
import Medal from "./Medal";
// Import SimpleGrid, Box, and Text from Chakra UI.
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
// Create a ShopItems component to display all the medals that a user can purchase.
const ShopItems = ({ medals, userid, usercoins }) => {
  // Use the ADD_MEDAL_TO_USER mutation.
  const [addMedalToUser] = useMutation(ADD_MEDAL_TO_USER);
  // Use the UPDATE_COINS mutation.
  const [updateCoins] = useMutation(UPDATE_COINS);
  // Function to handle the purchase of a medal.
  async function handlePurchase(uID, mID, price) {
    // Check if the user has enough coins to purchase the medal.
    if (usercoins > price) {
      // Confirm the purchase.
      if (
        window.confirm(
          `are you sure you want to buy this medal for ${price} coins?`
        )
      ) {
        // Add the medal to the user.
        const newmedals = await addMedalToUser({
          variables: {
            userId: uID,
            medalId: mID,
          },
        });
        // Update the user's coins.
        const newcoins = await updateCoins({
          variables: {
            userId: uID,
            amount: -price,
          },
        });
        // Reload the page.
        window.location.reload();
      }
    }
  }
  // Return the ShopItems component.
  return (
    <SimpleGrid columns={[2, 5, 10]} gap={6}>
      {medals.map((medal) => (
        <Box
          justifyContent="center"
          key={medal._id}
          onClick={() => handlePurchase(userid, medal._id, medal.price)}
        >
          <Medal key={medal?._id || medal.title} medal={medal} />
          <Text>{medal.price}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};
// Create an EmptyShop component to display a message when there are no more medals available.
const EmptyShop = () => {
  return <Text>No more medals available</Text>;
};
// Create a MedalShop component to display the MedalShop.
const MedalShop = ({ userid, usercoins }) => {
  const userMedals = useQuery(GET_USER_MEDALS, {
    variables: {
      id: userid,
    },
  });
  // Query to get all the medals.
  const allMedals = useQuery(GET_MEDALS);
  // If the data is loading, display a loading message.
  if (userMedals.loading || allMedals.loading) {
    return <p>loading</p>;
  }
  // If there is an error, display the error message.
  if (userMedals.error || allMedals.error) {
    console.log(userMedals.error || allMedals.error);
    return <Text>{userMedals.error || allMedals.error}</Text>;
  }
  // Get all the user medals and all the medals.
  const usermedals = [...userMedals.data.usermedals];
  // Get all the medals.
  const allmedals = [...allMedals.data.medals];
  // Filter the medals to get the medals that the user
  const notowned = allmedals.filter(
    (item) =>
      !usermedals.some((removeItem) => removeItem["_id"] === item["_id"])
  );
  // Return the MedalShop component.
  const empyarry = [];
  // Return the MedalShop component.
  return (
    <>
      {notowned !== empyarry ? (
        <ShopItems medals={notowned} userid={userid} usercoins={usercoins} />
      ) : (
        <EmptyShop />
      )}
    </>
  );
};
// Export the MedalShop component.
export default MedalShop;
