// Import Crunchy, CupHub, Dino, EcoGadget, EcoGadget2, FreshFizz, Hair, HomeDefense, HydroBeam, Medication, and SkinCare from "../assets/ads/index.js".
import {
  Crunchy,
  CupHub,
  Dino,
  EcoGadget,
  EcoGadget2,
  FreshFizz,
  Hair,
  HomeDefense,
  HydroBeam,
  Medication,
  SkinCare,
} from "../assets/ads/index.js";
// Create an array of images with the imported images.
const images = [
  Crunchy,
  CupHub,
  Dino,
  EcoGadget,
  EcoGadget2,
  FreshFizz,
  Hair,
  HomeDefense,
  HydroBeam,
  Medication,
  SkinCare,
];
// Create a function to log the images.
function logimages() {
  // Select a random image from the images array.
  const selected = images[Math.floor(Math.random() * images.length)];
  return selected;
}
// Export the logimages function.
export const log = logimages;
