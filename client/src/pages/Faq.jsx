import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  IconButton,
  Collapse,
  UnorderedList,
  ListItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import theme from "../styles/theme.js";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
const FAQItem = ({ question, answer }) => {
  const [show, setShow] = useState(false);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={theme.colors.palette.grey}
      overflow="hidden"
      mb={4}
      bg={theme.colors.palette.grey}
      boxShadow="md"
    >
      <Box p={4} d="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md" fontWeight="semibold">
          {question}
        </Heading>
        <IconButton
          icon={show ? <MinusIcon /> : <AddIcon />}
          onClick={() => setShow(!show)}
          variant="ghost"
          bg={theme.colors.palette.grey}
          textColor={theme.colors.palette.cyan}
          _hover={{
            bg: theme.colors.palette.cyan,
            textColor: theme.colors.palette.grey,
          }}
          m={1}
        />
      </Box>
      <Collapse in={show} animateOpacity>
        <Box p={4}>
          {/* Render the answer, checking if it needs to be a block or a list */}
          {typeof answer === "string" ? <Text>{answer}</Text> : answer}
        </Box>
      </Collapse>
    </Box>
  );
};
const FAQ = () => {
  return (
    <Box
      bgGradient="linear(palette.darkgrey, palette.gradcyan, palette.darkgrey)"
      px={4}
      py={8}
    >
      <Heading
        textColor={theme.colors.palette.white}
        as="h1"
        textAlign="center"
        size="2xl"
        mb={6}
      >
        Frequently Asked Questions
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <GridItem>
          <Heading
            textColor={theme.colors.palette.white}
            as="h2"
            size="lg"
            mb={4}
            textAlign="center"
          >
            AdWare FAQs
          </Heading>
          <Box className="space-y-4" textColor={theme.colors.palette.white}>
            <FAQItem
              question="What is AdWare?"
              answer="AdWare is the ultimate application for managing and optimizing your online advertisements. Think of it as the personal trainer for your ads, making sure they’re in peak condition to capture attention and drive results."
            />
            <FAQItem
              question="How does AdWare work?"
              answer="It's like having a marketing wizard on your team! Just create your ad campaigns, set your target audience, and let AdWare cast its magic spells (advanced algorithms) to optimize your ads in real-time for the best performance and return on investment."
            />
            <FAQItem
              question="Can I track the performance of my ads on AdWare?"
              answer="Absolutely! AdWare provides comprehensive analytics and reporting tools that make you feel like Sherlock Holmes solving a mystery. You’ll have all the clues you need to track performance, gain insights, and make data-driven decisions to improve your campaigns."
            />
            <FAQItem
              question="What should I do if I need help with my ad campaigns?"
              answer="No worries! Our support team is like the Avengers of customer service. Just reach out via our support portal, and we’ll assemble to assist you with any questions or issues. We’re committed to helping you save the day with your ad campaigns."
            />
            <FAQItem
              question="Why is AdWare the best choice for online advertising?"
              answer="AdWare is like the Swiss Army knife of online advertising—powerful tools, advanced algorithms, and a user-friendly interface all rolled into one. Whether you're a small business or a large enterprise, AdWare is designed to make you look like an advertising genius."
            />
            <FAQItem
              question="Is there a limit to how many campaigns I can run?"
              answer={
                <Box>
                  Nope, no limits here! Here are a few fun facts about AdWare:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem>
                      AdWare can juggle more campaigns than a circus performer
                      on caffeine. Seriously, it's that good.
                    </ListItem>
                    <ListItem>
                      It's designed to handle a large volume of campaigns as if
                      they were mere feathers.
                    </ListItem>
                    <ListItem>
                      So go ahead, unleash your creativity and flood the digital
                      world with your ads. You can run as many campaigns as you
                      want.
                    </ListItem>
                  </UnorderedList>
                </Box>
              }
            />
          </Box>
        </GridItem>

        <GridItem>
          <Heading
            textColor={theme.colors.palette.white}
            as="h2"
            size="lg"
            mb={4}
            textAlign="center"
          >
            Tweet Code FAQs
          </Heading>
          <Box className="space-y-4" textColor={theme.colors.palette.white}>
            <FAQItem
              question="What is Tweet Code?"
              answer="Tweet Code is the ultimate application for coding and posting your creations. Think of it as the social media platform where code gets to be a star, strutting its stuff and earning applause (and awards) for its brilliance."
            />
            <FAQItem
              question="How does Tweet Code work?"
              answer="It’s simple! Just write your code, post it, and watch as the community showers you with virtual high-fives. You can earn awards for your exceptional code, get feedback from fellow coders, and even collaborate on projects. It's coding made social and exciting, like the talent show of your dreams!"
            />
            <FAQItem
              question="Can I actually earn awards on Tweet Code?"
              answer="Absolutely! Tweet Code has a vibrant community of coders who appreciate and recognize talent. By posting your code and engaging with others, you can earn awards for your creativity, problem-solving skills, and innovative coding techniques. It's like the Oscars, but for coders!"
            />
            <FAQItem
              question="What should I do if someone wants to solve my problem?"
              answer="Ah, the exciting scenario! Embrace it and start a coding partnership! Collaborating with other coders on Tweet Code can lead to amazing projects, new friendships, and even more awards. Don't miss out on the chance to create something extraordinary together, like the Avengers of coding!"
            />
            <FAQItem
              question="Why does coding on Tweet Code make me happier?"
              answer="Because on Tweet Code, coding is not just a solitary activity. It's a community-driven experience that brings joy, inspiration, and a sense of belonging. Connecting with fellow coders, sharing your creations, and receiving recognition for your skills can truly brighten your coding journey, like a never-ending code jam!"
            />
            <FAQItem
              question="How can I make my code more impressive on Tweet Code?"
              answer={
                <Box>
                  Not possible! Here are a few pro tips:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem>
                      Use elegant and efficient coding techniques. Think of it
                      as writing poetry with code.
                    </ListItem>
                    <ListItem>
                      Add creative and visually appealing designs to your
                      projects. Make your code look like a work of art!
                    </ListItem>
                    <ListItem>
                      Engage with the community by providing helpful feedback
                      and collaborating on projects. Be the friendly neighbor
                      every coder wishes they had.
                    </ListItem>
                  </UnorderedList>
                </Box>
              }
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default FAQ;
