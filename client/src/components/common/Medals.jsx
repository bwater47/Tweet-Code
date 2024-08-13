import { HStack, Text } from "@chakra-ui/react";
import { GET_USER_MEDALS } from "../../graphQL/queries";
import { useQuery } from "@apollo/client";
import Medal from "./Medal";
const Medals = ({ userid }) => {
  const { loading, error, data } = useQuery(GET_USER_MEDALS, {
    variables: {
      id: userid,
    },
  });
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    console.log(error);
    return <Text>{error}</Text>;
  }
  const medals = [...data.usermedals];
  return (
    <HStack>
      {medals.map((medal) => (
        <Medal key={medal?._id || medal.title} medal={medal} />
      ))}
    </HStack>
  );
};
export default Medals;
