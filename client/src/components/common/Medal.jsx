// Import youSuck, goldCoin, bronzeCoin, silverCoin, SupremeInsight, AdvancedInsight, Participation, SupremeHoarder, TheCollector, HumbleStart, ChampionSeeker, ExpertSeeker, NoviceSeeker, and V1 from the assets/medals folder.
import {
  youSuck,
  goldCoin,
  bronzeCoin,
  silverCoin,
  SupremeInsight,
  AdvancedInsight,
  Participation,
  SupremeHoarder,
  TheCollector,
  HumbleStart,
  ChampionSeeker,
  ExpertSeeker,
  NoviceSeeker,
  V1,
} from "../../assets/medals/index";
// Import the Image and Tooltip components from Chakra UI.
import { Image, Tooltip } from "@chakra-ui/react";
// Medal component to display a medal image with a tooltip.
const Medal = ({ medal }) => {
  let thisMedal;

  // Cases to set the image. one will be needed for each medal.
  switch (medal.title) {
    case "you Suck!":
      thisMedal = youSuck;

      break;
    case "Bronze coin":
      thisMedal = bronzeCoin;

      break;
    case "Silver coin":
      thisMedal = silverCoin;

      break;
    case "Gold coin":
      thisMedal = goldCoin;

      break;
    case "Supreme Insight Award":
      thisMedal = SupremeInsight;

      break;
    case "Advanced Insight Award":
      thisMedal = AdvancedInsight;

      break;
    case "Participation Medal":
      thisMedal = Participation;

      break;
    case "Supreme Hoarder Medal":
      thisMedal = SupremeHoarder;

      break;
    case "The Collector":
      thisMedal = TheCollector;

      break;
    case "A Humble Start":
      thisMedal = HumbleStart;

      break;
    case "Champion Seeker":
      thisMedal = ChampionSeeker;

      break;
    case "Expert Seeker":
      thisMedal = ExpertSeeker;

      break;
    case "Novice Seeker":
      thisMedal = NoviceSeeker;

      break;
    case "Logo V1":
      thisMedal = V1;

      break;

    default:
      break;
  }
  // Return the medal image with a tooltip.
  return (
    <Tooltip label={`${medal.title}: \n ${medal.description}`} fontSize="md">
      <Image
        borderRadius="full"
        boxSize="30px"
        src={thisMedal}
        alt={medal.title}
      />
    </Tooltip>
  );
};
// Export the Medal component.
export default Medal;
