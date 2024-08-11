
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

const DonationModal = ({ isOpen, onClose, donations }) => {
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

export default DonationModal;
