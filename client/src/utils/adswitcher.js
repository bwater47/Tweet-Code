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
function logimages() {
  const selected = images[Math.floor(Math.random() * images.length)];
  return selected;
}
export const log = logimages;
