import { Text } from "@chakra-ui/react";
import useDonationButton from "../../hooks/useDonationButton";

const DonationButton = () => {
  const handleDonation = useDonationButton();

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

export default DonationButton;
