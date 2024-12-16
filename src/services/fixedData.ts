import { CiCoffeeBean } from "react-icons/ci";
import SpinachIcon from "@/../public/icons/spinach-icon.svg";
import FruitsIcon from "@/../public/icons/fruits-icon.svg";
import FertilizersIcon from "@/../public/icons/fertilizer-icon.svg";
import EquipmentsIcon from "@/../public/icons/gardening-icon.svg";

export const shippingOptions = ["JNE", "J&T", "COD", "Ninja Express"];
export const avaibleCategories = [
  {
    category_id: 1,
    category_name: "seeds",
    category_status: "active",
  },
  {
    category_id: 2,
    category_name: "fruits",
    category_status: "active",
  },
  {
    category_id: 3,
    category_name: "vegetables",
    category_status: "active",
  },
  {
    category_id: 4,
    category_name: "fertilizers",
    category_status: "active",
  },
  {
    category_id: 5,
    category_name: "equipments",
    category_status: "active",
  },
];
export const avaibleCategoriesWithIcon = [
  {
    name: "seeds",
    icon: CiCoffeeBean,
  },
  {
    name: "vegetables",
    icon: SpinachIcon,
  },
  {
    name: "fruits",
    icon: FruitsIcon,
  },
  {
    name: "equipments",
    icon: EquipmentsIcon,
  },
  {
    name: "fertilizers",
    icon: FertilizersIcon,
  },
];
