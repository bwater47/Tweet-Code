// Import useEffect and useState from react.
import { useEffect } from "react";
import { useState } from "react";
// Import Box and Image from Chakra UI.
import { Box, Image } from "@chakra-ui/react";
// Import adImage from assets to display the ad.
import adImage from "../../assets/ads/ad-Dino.webp";
// Import log from utils/adswitcher to change the ad image.
import { log } from "../../utils/adswitcher";
// Create a functional component AdSpace.
const AdSpace = () => {
  // Use the useState hook to set the image state.
  const [image, setimage] = useState(adImage);
  // Use the useEffect hook to change the ad image every 30 seconds.
  useEffect(() => {
    const imgchange = setInterval(
      () => {
        setimage(log());
      },
      30000 // set to 30 secs
    );
    // Clear the interval when the component is unmounted.
    return () => clearInterval(imgchange);
  });
  // Return the ad image in a Box component.
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        {/*Add Future Random Ad Selection Here*/}
        <Image src={image} alt="Advertisement" />
      </Box>
    </>
  );
};
// Export the AdSpace component.
export default AdSpace;
