import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT_SESSION } from "../graphQL/mutations";
import { useAuth } from "../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe promise outside of the component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);
  const { isLoggedIn } = useAuth();
  const toast = useToast();

  const handleDonation = async () => {
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
      const { data } = await createCheckoutSession({
        variables: { amount: parseFloat(amount) },
      });

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Checkout failed",
        description:
          error.message ||
          "There was an error processing your donation. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgGradient="linear(palette.darkgrey, palette.gradcyan, palette.darkgrey)"
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
    </Box>
  );
};

Donate.propTypes = {
  // Add any props if needed in the future
};

export default Donate;
