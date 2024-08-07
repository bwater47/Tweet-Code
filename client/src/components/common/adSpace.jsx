import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import adImage from "../../assets/ads/ad-Dino.webp";
import {log} from "../../utils/adswitcher"

const AdSpace = () => {
  return (
    <>
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      {/*Add Future Random Ad Selection Here*/}
      <Image src={adImage} alt="Advertisement" />
    </Box>
    
    </>
  );
};

export default AdSpace;
