import React from "react";

import Hero from "../components/Hero";
import MenuHighlights from "../components/MenuHighlights";
import OurStoryIntro from "../components/OurStoryIntro";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main  className="flex flex-col items-center ">
 
      <Hero />
      <MenuHighlights />
      <OurStoryIntro />
      <Footer />
    </main>
  );
}
