import React from "react";

export default function Contact() {
  return (
    <div
      id="contact"
      className=" flex min-h-[70vh]  min-w-full items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-3 space-y-6 p-14">
        <h1 className="text-center text-5xl">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
          <p className="text-center text-lg font-semibold text-gray-500">
             I’m open to new opportunities and collaborations—feel free to reach out!
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Nadilanawod@gmail.com"
            className="text-nowrap rounded-lg border border-purple-600 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text px-6 py-3 text-lg font-semibold text-transparent transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </a>
        </h1>
      </div>
    </div>
  );
}
