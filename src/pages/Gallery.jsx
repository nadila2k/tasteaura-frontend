import React from "react";
import Footer from "../components/Footer";
import image1 from "../images/gallery/image1.jpg";
import image2 from "../images/gallery/image2.avif";
import image3 from "../images/gallery/image3.jpg";
import image4 from "../images/gallery/image4.avif";
import image5 from "../images/gallery/image5.jpg";
import image6 from "../images/gallery/image6.jpg";
import image7 from "../images/gallery/image7.jpg";
import image8 from "../images/gallery/image8.jpg";
import image9 from "../images/gallery/image9.jpg";

const galleryImages = [
  { src: image1, alt: "Gallery 1", rowSpan: "row-span-2", colStart: "col-start-1" },
  { src: image2, alt: "Gallery 2", rowSpan: "row-span-2", colStart: "col-start-2" },
  { src: image3, alt: "Gallery 3", rowSpan: "row-span-3", colStart: "col-start-3" },
  { src: image4, alt: "Gallery 4", rowSpan: "row-span-3", colStart: "col-start-1", rowStart: "row-start-3" },
  { src: image5, alt: "Gallery 5", rowSpan: "row-span-2", colStart: "col-start-2", rowStart: "row-start-3" },
  { src: image6, alt: "Gallery 6", rowSpan: "row-span-2", colStart: "col-start-3", rowStart: "row-start-4" },
  { src: image7, alt: "Gallery 7", rowSpan: "row-span-2", colStart: "col-start-1", rowStart: "row-start-6" },
  { src: image8, alt: "Gallery 8", rowSpan: "row-span-3", colStart: "col-start-2", rowStart: "row-start-5" },
  { src: image9, alt: "Gallery 9", rowSpan: "row-span-2", colStart: "col-start-3", rowStart: "row-start-6" },
];

export default function Gallery() {
  return (
    <main className="flex flex-col items-center bg-neutral-900 min-h-screen pt-24">
      <h1 className="text-5xl font-extrabold my-10 text-amber-400 underline decoration-amber-400/50 drop-shadow-lg text-center">
        Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr w-full max-w-6xl">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105
              ${img.rowSpan} ${img.colStart} ${img.rowStart ? img.rowStart : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
