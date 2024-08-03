import React from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Heading,
} from "@chakra-ui/react";

const Registration = () => {
  return (
    <Container maxW="md" py={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Account Access
      </Heading>
      <Box borderWidth={1} borderRadius="lg" p={4}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

const LoginForm = () => (
  <VStack spacing={4} as="form">
    <FormControl id="login-email">
      <FormLabel>Email</FormLabel>
      <Input type="email" />
    </FormControl>
    <FormControl id="login-password">
      <FormLabel>Password</FormLabel>
      <Input type="password" />
    </FormControl>
    <Button colorScheme="blue" width="full" type="submit">
      Login
    </Button>
  </VStack>
);

const SignUpForm = () => (
  <VStack spacing={4} as="form">
    <FormControl id="signup-name">
      <FormLabel>Username</FormLabel>
      <Input type="text" />
    </FormControl>
    <FormControl id="signup-email">
      <FormLabel>Email</FormLabel>
      <Input type="email" />
    </FormControl>
    <FormControl id="signup-password">
      <FormLabel>Password</FormLabel>
      <Input type="password" />
    </FormControl>
    <Button colorScheme="green" width="full" type="submit">
      Sign Up
    </Button>
  </VStack>
);

export default Registration;
