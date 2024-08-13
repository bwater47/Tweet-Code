import { useEffect } from "react";
import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import adImage from "../../assets/ads/ad-Dino.webp";
import { log } from "../../utils/adswitcher";
const AdSpace = () => {
  // Use the useState hook to set the image state.
  const [image, setimage] = useState(adImage);
  // Use the useEffect hook to change the ad image every 30 seconds.
  useEffect(() => {
    const imgchange = setInterval(
      () => {
        setimage(log());
      },
      30000 // Set to 30 secs.
    );
    // Clear the interval when the component is unmounted.
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
