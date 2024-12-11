import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";

export const shippingOptions = ["JNE", "J&T", "COD", "Ninja Express"];
export const avaibleCategories = ["fruit", "vegetable", "equipment", "fertilizer", "seed"];
export const avaibleCategoriesWithIcon = [
  {
    name: "seed",
    icon: CiCoffeeBean,
  },
  {
    name: "vegetable",
    icon: SpinachIcon,
  },
  {
    name: "fruit",
    icon: FruitsIcon,
  },
  {
    name: "equipment",
    icon: EquipmentsIcon,
  },
  {
    name: "fertilizer",
    icon: FertilizersIcon,
  },
];
