import { Flex, IconButton, Link } from "@chakra-ui/react";
import { SlSocialGithub } from "react-icons/sl";
import { TiSocialLinkedin, TiSocialYoutube } from "react-icons/ti";
import { RiTwitterXLine } from "react-icons/ri";
import theme from "../../../styles/theme.js";
const SocialIcons = ({ social }) => {
  return (
    <Flex alignContent="center" justifyContent="center" pt={2}>
      <Link href={social.x} isExternal mx={1}>
        <IconButton
          icon={<RiTwitterXLine />}
          isRound
          variant="outline"
          colorScheme="palette.white"
          _hover={{ color: "palette.white" }}
          aria-label="X link"
          m={1}
        />
      </Link>
      <Link href={social.github} isExternal mx={1}>
        <IconButton
          icon={<SlSocialGithub />}
          isRound
          variant="outline"
          colorScheme="gray"
          aria-label="Github link"
          m={1}
        />
      </Link>
      <Link href={social.linkedin} isExternal mx={1}>
        <IconButton
          icon={<TiSocialLinkedin />}
          isRound
          variant="outline"
          colorScheme="linkedin"
          aria-label="Linkedin link"
          m={1}
        />
      </Link>
      <Link href={social.youtube} isExternal mx={1}>
        <IconButton
          icon={<TiSocialYoutube />}
          isRound
          variant="outline"
          colorScheme="red"
          aria-label="Youtube link"
          m={1}
        />
      </Link>
    </Flex>
  );
};
export default SocialIcons;
