// Import Text from Chakra UI.
import { Text } from "@chakra-ui/react";
// Import useDonationButton from the hooks folder.
import useDonationButton from "../../hooks/useDonationButton";
// Define the DonationButton component.
const DonationButton = () => {
  const handleDonation = useDonationButton();
  // Return the DonationButton component.
  return (
    <Text
      onClick={handleDonation}
      cursor="pointer"
      _hover={{ color: "palette.orange" }}
    >
      Donate
    </Text>
  );
};
// Export the DonationButton component.
export default DonationButton;
