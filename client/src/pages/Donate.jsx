import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  Container,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { MAKE_DONATIONTRANSACTION } from "../graphQL/mutations";
import { QUERY_ME } from "../graphQL/queries";
import DonationModal from "../components/common/DonationModal";
import { useAuth } from "../hooks/useAuth";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [makeDonation] = useMutation(MAKE_DONATIONTRANSACTION);
  const { refetch } = useQuery(QUERY_ME);
  const { isLoggedIn } = useAuth();
  const toast = useToast();

  const handleDonation = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a donation.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data } = await makeDonation({
        variables: { donationId: amount }, // Assuming donationId is the amount for now
      });
      console.log("Donation response:", data);

      if (data && data.makeDonationTransaction) {
        await refetch(); // Refetch user data to update donations
        setDonations([...donations, data.makeDonationTransaction]);
        onOpen();
        toast({
          title: "Donation successful",
          description: `Thank you for your donation of $${amount}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error making donation:", error);
      toast({
        title: "Donation failed",
        description:
          "There was an error processing your donation. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgGradient="linear(palette.darkgrey, palette.gradred, palette.darkgrey)"
      minHeight="100vh"
      py={10}
    >
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center" color="palette.white">
            Support Tweet Code
          </Heading>
          <Text color="palette.white" textAlign="center">
            Your donation helps us maintain and improve our platform for all
            users.
          </Text>
          <Box
            bg="palette.darkgrey"
            p={6}
            borderRadius="lg"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          >
            <VStack spacing={4}>
              <FormControl>
                <FormLabel color="palette.white">Donation Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  color="palette.white"
                  bg="palette.grey"
                  _placeholder={{ color: "palette.lightgrey" }}
                />
              </FormControl>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={handleDonation}
                isDisabled={!isLoggedIn || !amount}
                w="full"
              >
                Donate
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <DonationModal isOpen={isOpen} onClose={onClose} donations={donations} />
    </Box>
  );
};

export default Donate;
