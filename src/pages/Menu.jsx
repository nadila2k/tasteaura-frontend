import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import menuCover from "./../images/menuCover.avif";
import CategoryList from "../components/CategoryList";
import MenuList from "../components/MenuList";
import apiHelper from "../apiHelper";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await apiHelper.get(
        "categories",
        {},
        { auth: false, notify: false }
      );
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchMenuItemsByCategory = async (category) => {
    try {
      const data = await apiHelper.get(
        `menu-items/category/name/${category}`,
        {},
        { auth: false, notify: false }
      );
      setMenuItems(data);
    } catch (error) {
      console.error(
        `Failed to fetch menu items for category ${category}:`,
        error
      );
      setMenuItems([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenuItemsByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="flex flex-col items-center justify-center">
      <section
        className="w-full h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${menuCover})` }}
      >
        <p className="text-amber-300 text-5xl font-semibold border-b-4 border-amber-400 pb-2">
          Savor Our Dishes
        </p>
      </section>

      {/* Categories & Menu */}
      <section className="flex flex-col items-center justify-center w-full">
        {/* Category List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-10">
          {categories.map((category, index) => (
            <CategoryList
              key={index}
              category={category}
              onSelect={(name) => setSelectedCategory(name)}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>

        <h1 className="text-amber-300 text-3xl font-semibold ">
          {selectedCategory}
        </h1>

        {/* Menu Items */}
        <div className="py-10 px-5">
          {menuItems.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No food available at the moment
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <MenuList item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
