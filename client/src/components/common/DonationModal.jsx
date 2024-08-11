
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
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/dateUtils";

const DonationModal = ({ isOpen, onClose, donations }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        bg="palette.darkgrey"
        color="palette.white"
        borderColor="palette.grey"
        borderWidth="1px"
      >
        <ModalHeader borderBottomWidth="1px" borderColor="palette.grey">
          Your Donations
        </ModalHeader>
        <ModalCloseButton
          color="palette.white"
          _hover={{ color: "palette.cyan" }}
        />
        <ModalBody>
          {donations && donations.length > 0 ? (
            <List spacing={3}>
              {donations.map((transaction, index) => (
                <ListItem
                  key={index}
                  bg="palette.grey"
                  p={3}
                  borderRadius="md"
                  transition="all 0.3s"
                  _hover={{ bg: "palette.lightgrey" }}
                >
                  <Text fontWeight="bold">
                    Date: {formatDate(parseInt(transaction.purchaseDate))}
                  </Text>
                  {transaction.donations.map((donation, donationIndex) => (
                    <Text key={donationIndex}>
                      Amount:{" "}
                      <Box as="span" color="palette.cyan">
                        ${donation.price.toFixed(2)}
                      </Box>
                    </Text>
                  ))}
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No donations to display.</Text>
          )}
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor="palette.grey">
          <Button
            colorScheme="blue"
            bg="palette.purple"
            color="palette.white"
            _hover={{ bg: "palette.cyan" }}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

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

export default DonationModal;