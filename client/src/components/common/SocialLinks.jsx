import { Flex, IconButton } from "@chakra-ui/react";
import { SlSocialGithub } from "react-icons/sl";
import { TiSocialLinkedin, TiSocialYoutube } from "react-icons/ti";
import { RiTwitterXLine } from "react-icons/ri";

const SocialLinks = () => {

    return (
        <>
            <Flex alignContent='center' flexWrap='wrap' pt={8}>

                <IconButton
                    variant='outline'
                    colorScheme='palette.white'
                    aria-label='Twitter link'
                    fontSize='20px'
                    alignSelf='center'
                    _hover={{color:"palette.xhex"}}
                    icon={<RiTwitterXLine />}
                    m={4}
                />
                <IconButton
                    variant='outline'
                    colorScheme='palette.white'
                    aria-label='Github link'
                    fontSize='20px'
                    alignSelf='center'
                    _hover={{color:"palette.githubhex"}}
                    icon={<SlSocialGithub />}
                    m={4}
                />
                <IconButton
                    variant='outline'
                    colorScheme='palette.white'
                    aria-label='Linkedin link'
                    fontSize='20px'
                    alignSelf='center'
                    _hover={{color:"palette.linkedinhex"}}
                    icon={<TiSocialLinkedin />}
                    m={4}
                />
                <IconButton
                    variant='outline'
                    colorScheme='palette.white'
                    aria-label='Youtube link'
                    fontSize='20px'
                    alignSelf='center'
                    _hover={{color:"palette.youtubehex"}}
                    icon={<TiSocialYoutube />}
                    m={4}
                />
            </Flex>
        </>
    );

}

export default SocialLinks;