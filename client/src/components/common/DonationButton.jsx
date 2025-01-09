import { Text } from "@chakra-ui/react";
import useDonationButton from "../../hooks/useDonationButton";
import PropTypes from "prop-types";

DonationButton.propTypes = {
  amount: PropTypes.number.isRequired,
};

const DonationButton = ({ amount }) => {
  const handleDonation = useDonationButton(amount);

  return (
    <Text
      onClick={handleDonation}
      cursor="pointer"
      _hover={{ color: "palette.orange" }}
    >
      Donate ${amount}
    </Text>
  );
};
export default DonationButton;
