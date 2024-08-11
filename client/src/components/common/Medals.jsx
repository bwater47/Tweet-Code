// Import HStack, and Text from Chakra UI.
import { HStack, Text } from "@chakra-ui/react";
// Import the GET_USER_MEDALS query.
import { GET_USER_MEDALS } from "../../graphQL/queries";
// Import useQuery from Apollo Client.
import { useQuery } from "@apollo/client";
// Import the Medal component.
import Medal from "./Medal";
// Medals component to display all the medals a user has earned.
const Medals = ({ userid }) => {
  // Query to get all the medals for a user.
  const { loading, error, data } = useQuery(GET_USER_MEDALS, {
    variables: {
      id: userid,
    },
  });
  // If the data is loading, display a loading message.
  if (loading) {
    return <p>loading</p>;
  }
  // If there is an error, display the error message.
  if (error) {
    console.log(error);
    return <Text>{error}</Text>;
  }
  // Get all the medals from the data.
  const medals = [...data.usermedals];
  // Return the medals component.
  return (
    <HStack>
      {medals.map((medal) => (
        <Medal key={medal?._id || medal.title} medal={medal} />
      ))}
    </HStack>
  );
};
// Export the Medals component.
export default Medals;
