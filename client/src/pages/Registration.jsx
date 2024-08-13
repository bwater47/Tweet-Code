import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_USER, LOGIN_USER } from "../graphQL/mutations.js";
import { useAuth } from "../hooks/useAuth.jsx";
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
  useToast,
} from "@chakra-ui/react";
const Registration = () => {
  return (
    <Box bgGradient="linear(palette.darkgrey, palette.gradgreen, palette.darkgrey)">
      <Container maxW="md" py={8}>
        <Heading as="h1" mb={6} textAlign="center" color="palette.white">
          Account Access
        </Heading>
        <Box
          borderWidth={1}
          borderRadius="lg"
          p={4}
          bg="palette.darkgrey"
          borderColor="palette.lightgrey"
        >
          <Tabs isFitted colorScheme={"green"}>
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
    </Box>
  );
};
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_USER);
  const toast = useToast();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { email, password },
      });
      authLogin(data.login.token);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/home");
    } catch (e) {
      toast({
        title: "Login failed",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
      <FormControl id="login-email">
        <FormLabel color="palette.white">Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color="palette.white"
        />
      </FormControl>
      <FormControl id="login-password">
        <FormLabel color="palette.white">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          color="palette.white"
        />
      </FormControl>
      <Button colorScheme="green" variant="colored" width="full" type="submit">
        Login
      </Button>
    </VStack>
  );
};
const SignUpForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);
  const toast = useToast();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      authLogin(data.addUser.token);
      toast({
        title: "Account created",
        description: "You've successfully signed up!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/home");
    } catch (e) {
      toast({
        title: "Sign up failed",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
      <FormControl id="signup-firstName">
        <FormLabel color="palette.white">First Name</FormLabel>
        <Input
          name="firstName"
          type="text"
          value={formState.firstName}
          onChange={handleChange}
          color="palette.white"
        />
      </FormControl>
      <FormControl id="signup-lastName">
        <FormLabel color="palette.white">Last Name</FormLabel>
        <Input
          name="lastName"
          type="text"
          value={formState.lastName}
          onChange={handleChange}
          color="palette.white"
        />
      </FormControl>
      <FormControl id="signup-username">
        <FormLabel color="palette.white">Username</FormLabel>
        <Input
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
          color="palette.white"
        />
      </FormControl>
      <FormControl id="signup-email">
        <FormLabel color="palette.white">Email</FormLabel>
        <Input
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          color="palette.white"
        />
      </FormControl>
      <FormControl id="signup-password">
        <FormLabel color="palette.white">Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          color="palette.white"
        />
      </FormControl>
      <Button colorScheme="green" variant="colored" width="full" type="submit">
        Sign Up
      </Button>
    </VStack>
  );
};
export default Registration;
