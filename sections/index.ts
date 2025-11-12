// components/sections/index.ts
import NavBarSection from "./NavBar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import FooterSection from "./FooterSection";

export const sectionsRegistry = [
  { id: "navbar", name: "Navigation Bar", component: NavBarSection },
  { id: "hero", name: "Hero Section", component: HeroSection },
  { id: "features", name: "Features Section", component: FeaturesSection },
  { id: "footer", name: "Footer Section", component: FooterSection },
];