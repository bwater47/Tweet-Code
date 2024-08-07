import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import adImage from "../../assets/ads/ad-Dino.webp";
import { log } from "../../utils/adswitcher"

const AdSpace = () => {
  const [image, setimage] = useState(adImage);

  useEffect(() => {
    const imgchange = setInterval(() => {
      setimage(log());
    }, 30000 // set to 30 secs
    );

    return () => clearInterval(imgchange);
  });

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        {/*Add Future Random Ad Selection Here*/}
        <Image src={image} alt="Advertisement" />
      </Box>

    </>
  );
};

export default AdSpace;
