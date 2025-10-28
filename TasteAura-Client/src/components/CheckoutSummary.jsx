import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  addItem,
  clearCart,
  decreaseItem,
  removeItem,
} from "../features/cart/cartSlice";
import FormModal from "./FormModal";
import FormModalInput from "./FormModalInput";
import apiHelper from "../apiHelper";

export default function CheckoutSummary({
  cartItems,
  totalQuantity,
  totalPrice,
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleIncrease = (item) => {
    if (item.quantity >= 10) {
      toast.error("You can only add a maximum of 10 of this item!");
      return;
    }
    dispatch(addItem(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseItem(item.id));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setIsModalOpen(true);
  };

  const handelCartClear = () => {
    dispatch(clearCart());
  };
  const onSubmit = async (formData) => {
    try {
      const payload = {
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
        orderType: formData.orderType,
      };

      const res = await apiHelper.post("orders", payload, {
        auth: true,
        notify: true,
      });
      handelCartClear();

      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Cart Summary
          </h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">Total Items:</span>
            <span className="font-semibold text-gray-900">{totalQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Total Price:</span>
            <span className="font-semibold text-gray-900">
              Rs {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Your Items:
          </h3>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-xl p-2 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
                <div className="flex items-center mt-3 md:mt-0 space-x-3">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    <FiMinus />
                  </button>
                  <span className="font-medium text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    <FiPlus />
                  </button>
                  <span className="font-semibold text-gray-900">
                    Rs {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handlePlaceOrder}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105"
          >
            <FiShoppingCart className="w-6 h-6" />
            Place Order
          </button>

          <button
            onClick={handelCartClear}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-semibold shadow-md hover:bg-red-600 active:scale-95 transition transform duration-200"
          >
            <FiX className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>

      {/* Modal for Card Details */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Enter Payment Details"
        buttonName="Confirm Order"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormModalInput
          label="Card Number"
          name="cardNumber"
          type="text"
          register={register("cardNumber", {
            required: "Card number is required",
          })}
          error={errors.cardNumber}
        />
        <FormModalInput
          label="Card Holder Name"
          name="cardHolder"
          type="text"
          register={register("cardHolder", {
            required: "Card holder name is required",
          })}
          error={errors.cardHolder}
        />
        <FormModalInput
          label="Expiry Date"
          name="expiryDate"
          type="month"
          register={register("expiryDate", {
            required: "Expiry date is required",
          })}
          error={errors.expiryDate}
        />
        <FormModalInput
          label="CVV"
          name="cvv"
          type="password"
          register={register("cvv", {
            required: "CVV is required",
            minLength: { value: 3, message: "CVV must be 3 digits" },
            maxLength: { value: 4, message: "CVV must be 4 digits" },
          })}
          error={errors.cvv}
        />
        <FormModalInput
          label="Order Type"
          name="orderType"
          type="select"
          register={register("orderType", {
            required: "Please select order type",
          })}
          options={[
            { label: "Delivery", value: "DELIVERY" },
            { label: "Takeaway", value: "TAKEAWAY" },
          ]}
          error={errors.orderType}
        />
      </FormModal>
    </>
  );
}
