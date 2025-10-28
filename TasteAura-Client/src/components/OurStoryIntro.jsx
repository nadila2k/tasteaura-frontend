import React from "react";
import storyImage from "../images/storyImage.avif";

export default function OurStoryIntro() {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${storyImage})`, height: "400px" }}
    >
      <div className="bg-black/60 p-8 flex flex-col items-start justify-center h-full max-w-6xl mx-auto">
        <p className="text-amber-300 text-4xl mb-4">
          Experience Our Wonderful Flavors!
        </p>
        <p className="text-amber-100 max-w-2xl text-2xl leading-relaxed">
          Our greatest joy is seeing you relax and enjoy a meal that rivals the
          best of your own homemade cooking. We're passionate about what we do,
          and we're so grateful you took the time out of your busy schedule to
          discover our story and share in our experience.
        </p>
      </div>
    </div>
  );
}
