import React, { use } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
} from "../features/cart/cartSelector";
import CheckoutSummary from "../components/CheckoutSummary";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-10 w-full max-w-2xl">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>

          <button
            onClick={() => navigate("/menu")}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <CheckoutSummary
          cartItems={cartItems}
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
}
