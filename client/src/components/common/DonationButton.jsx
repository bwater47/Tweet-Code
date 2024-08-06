import { Text } from "@chakra-ui/react";
import useDonationButton from "../../hooks/useDonationButton";

const DonationButton = () => {
  const handleDonation = useDonationButton();

  return <Text onClick={handleDonation} _hover={{ color: "palette.orange" }}>Donate</Text>;
};

export default DonationButton;
