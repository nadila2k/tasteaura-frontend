import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuHighlightsList from "./MenuHighlightsList";

import apiHelper from "../apiHelper";
import Spinner from "./Spinner";




export default function MenuHighlights() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

  const fetchMenuItems = async () => {
    try {
       setIsLoading(true);
      const data = await apiHelper.get(
        "menu-items",
        {},
        { auth: false, notify: false }
      );
      setMenuItems(data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      toast.error("Failed to fetch menu items");
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-black via-zinc-900 to-black">
      <p className="font-semibold text-amber-300 text-2xl uppercase tracking-wider mb-2">
        Discover Our
      </p>
      <h2 className="font-extrabold text-amber-100 text-5xl md:text-6xl mb-10 drop-shadow-lg">
        Mouth Watering Menu
      </h2>

      <div className="flex flex-col items-center gap-2 w-full">
        {isLoading ? (
           <Spinner
        size="h-[60px] w-[60px]"   
        color="border-white"       
        text="Loading..."
        textColor="text-white"    
      />
        ) : (
          menuItems.slice(0, 7).map((item) => (
            <MenuHighlightsList key={item.id} item={item} />
          ))
        )}
      </div>


      <button
        onClick={() => navigate("/menu")}
        className="mt-10 px-8 py-3 bg-amber-400 text-black font-bold rounded-full shadow-md hover:bg-amber-300 active:scale-95 transition-all duration-300"
      >
        View Full Menu
      </button>
    </section>
  );
}
