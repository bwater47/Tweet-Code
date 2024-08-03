import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const FAQ = () => {
  return (
    <ChakraProvider>
      <Box className="container" maxW="container.md" mx="auto" px={4} py={8}>
        <Heading as="h1" textAlign="center" size="2xl" mb={6}>
          Frequently Asked Questions (FAQ)
        </Heading>

        <Box className="space-y-4">
          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              What is TRY TO SELL?
            </Heading>
            <Text mt={1}>
              TRY TO SELL is the ultimate marketplace for not actually selling
              your prized possessions. Here, you can list all the stuff your
              significant other has been nagging you to get rid of, without the
              risk of actually losing any of it. It's about making peace at
              home—without making sacrifices!
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              How does TRY TO SELL work?
            </Heading>
            <Text mt={1}>
              It’s simple! Just list an item you "intend" to sell. We ensure
              it's priced just high enough to avoid actual buyers but reasonable
              enough to show you made an effort. It's the thought that counts,
              right?
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              Can I actually buy something on TRY TO SELL?
            </Heading>
            <Text mt={1}>
              Technically? Yes. Realistically? Good luck! Our sellers are
              masters of the "Just about to sell" vibe, so while you can make
              offers, we can't guarantee you’ll ever conclude a deal.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              What should I do if someone actually wants to buy my item?
            </Heading>
            <Text mt={1}>
              Ah, the dreaded scenario! Don't panic; we suggest scheduling
              viewings during major sports events or inventing elaborate,
              off-putting histories about the item. Alternatively, just keep
              increasing the price incrementally. If all else fails, say it's
              haunted.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              Why does my spouse seem happier even though I haven’t sold
              anything?
            </Heading>
            <Text mt={1}>
              Because at TRY TO SELL, it’s the effort that counts! Just showing
              that you’re trying to declutter is sometimes all it takes to earn
              those valuable brownie points. Keep listing, and keep the peace!
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              How can I make my listings less attractive to real buyers?
            </Heading>
            <Text mt={1}>
              Here are a few pro tips:
              <UnorderedList ml={5} mt={2}>
                <ListItem>
                  Use photos taken with a potato-quality camera.
                </ListItem>
                <ListItem>
                  Describe the item as "vintage" regardless of its actual age.
                </ListItem>
                <ListItem>
                  Use phrases like "barely functional" and "known to cause
                  mildew."
                </ListItem>
              </UnorderedList>
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              Is there a limit to how much I can pretend to sell?
            </Heading>
            <Text mt={1}>
              Absolutely not! The sky’s the limit when it comes to imaginary
              decluttering. The more you "try" to sell, the happier your home
              life can be. Why stop at the garage? List your living room, if you
              dare!
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" fontWeight="semibold">
              What happens if my item accidentally sells?
            </Heading>
            <Text mt={1}>
              First, check if you’re dreaming. If not, and you really did make a
              sale, congratulations on breaking new ground at TRY TO SELL! Don’t
              worry, you can always buy a replacement and start the cycle all
              over again.
            </Text>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default FAQ;
