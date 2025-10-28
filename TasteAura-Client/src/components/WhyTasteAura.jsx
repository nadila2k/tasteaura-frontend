import WhyTasteAuraCover from "../images/WhyTasteAuraCover.jpg";
import { motion } from "framer-motion";

export default function WhyTasteAura() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-amber-50 py-16 px-6 md:px-20">
      <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-lg mb-8 md:mb-0 md:mr-8">
        <img
          src={WhyTasteAuraCover}
          alt="TasteAura Interior"
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div
        className="w-full md:w-1/2 text-gray-700"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why <br /> TASTEAURA ?
        </h2>
        <div className="w-16 h-1 bg-amber-500 mb-6"></div>
        <p className="text-base leading-relaxed mb-4 font-bold">
          Two simple reasons. One simple answer.
        </p>
        <p className="text-base leading-relaxed">
          Designed to be a culinary haven, we uphold the traditions of local
          households while bringing out the authentic flavors of Sri Lanka.
          Every dish is made from the freshest farm produce and seasonal
          ingredients, celebrating both creativity and culture. From the spicy
          curries to the soothing buffalo curd, we take pride in crafting
          memorable dining experiences that feel like home.
        </p>
        <p className="text-base leading-relaxed mt-4">
          Our colonial-style interior with a modern touch offers a warm,
          welcoming atmosphere — inviting you to relax and savor each bite.
          TasteAura isn’t just a restaurant; it’s a story of passion,
          craftsmanship, and community.
        </p>
      </motion.div>
    </section>
  );
}
