// Import the necessary dependencies from Chakra UI.
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
// Import PropTypes from the prop-types library.
import PropTypes from "prop-types";
// Define the DonationModal component.
const DonationModal = ({ isOpen, onClose, donations }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  // Return the DonationModal component.
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Donations</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {donations && donations.length > 0 ? (
            <List spacing={3}>
              {donations.map((transaction, index) => (
                <ListItem key={index}>
                  <Text>
                    Date:{" "}
                    {new Date(
                      parseInt(transaction.purchaseDate)
                    ).toLocaleDateString()}
                  </Text>
                  {transaction.donations.map((donation, donationIndex) => (
                    <Text key={donationIndex}>
                      Amount: ${donation.price.toFixed(2)}
                    </Text>
                  ))}
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No donations to display.</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
// Define the prop types for the DonationModal component.
DonationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  donations: PropTypes.arrayOf(
    PropTypes.shape({
      purchaseDate: PropTypes.string.isRequired,
      donations: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
// Export the DonationModal component.
export default DonationModal;
