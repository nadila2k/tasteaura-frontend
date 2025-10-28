import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

export default function MenuList({ item }) {
  const dispatch = useDispatch();

  const itemsInCart = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        image: item.imageUrl,
        price: item.price,
      })
    );

    const existingItem = itemsInCart.find((i) => i.id === item.id);

    if (existingItem && existingItem.quantity >= 10) {
      toast.error("You can only add a maximum of 10 of this item!");
    } else {
      toast.success(`${item.name} added to cart!`);
    }
  };
  return (
    <div className="w-56 bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center text-amber-100 p-4 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-36 object-cover"
      />

      <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>

      <p className="mt-2 text-xl font-bold text-amber-400">Rs. {item.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition"
      >
        Order Now
      </button>
    </div>
  );
}
