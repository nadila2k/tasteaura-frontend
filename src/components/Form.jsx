import React from "react";
import Button from "./Button";

export default function Form({ children, onSubmit, header, buttonName }) {
  return (
    
      <div className="flex flex-col items-center justify-center gap-10 p-10">
        <h2 className="text-4xl font-light text-white md:text-6xl">{header}</h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center"
        >
          {children}
          <Button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 
                             text-white font-semibold py-3 px-6 rounded-lg 
                             shadow-md transition-all duration-200 ease-in-out 
                             transform hover:-translate-y-1 hover:scale-105"
          >
            {buttonName}
          </Button>
        </form>
      </div>
   
  );
}
