import React, { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable";
import FormModal from "../components/FormModal";
import FormModalInput from "../components/FormModalInput";
import { useForm } from "react-hook-form";
import apiHelper from "../apiHelper";
import toast from "react-hot-toast";

export default function ManageMenuItem() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);


  const fetchMenuItems = async () => {
    try {
      const data = await apiHelper.get(
        "menu-items",
        {},
        { auth: true, notify: false }
      );
      setMenuItems(data);
    
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      toast.error("Failed to fetch menu items");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await apiHelper.get(
        "categories",
        {},
        { auth: true, notify: false }
      );
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("description", formData.description);
      formDataObj.append("price", formData.price);
      formDataObj.append("availability", formData.availability);
      formDataObj.append("categoryId", formData.categoryId);

      if (formData.image && formData.image.length > 0) {
        formDataObj.append("image", formData.image[0]);
      }

      if (editingItem) {
        await apiHelper.put(`menu-items/${editingItem.id}`, formDataObj, {
          isMultipart: true,
          auth: true,
          notify: true,
        });
      } else {
        await apiHelper.post("menu-items", formDataObj, {
          isMultipart: true,
          auth: true,
          notify: true,
        });
      }

      setIsModalOpen(false);
      reset();
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      console.error("Failed to save menu item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("price", item.price);
    setValue("availability", item.availability);
    setValue("categoryId", item.categoryId);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await apiHelper.delete(`menu-items/${item.id}`, {
        auth: true,
        notify: true,
      });

      fetchMenuItems();
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "imageUrl", label: "Image", type: "image" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "availability", label: "Availability" },
    { key: "category.name", label: "Category" },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full p-6">
      <p className="mb-5 font-bold text-3xl">Manage Menu Items</p>
      

      <div className="">
        <button
          onClick={() => {
            setEditingItem(null);
            reset();
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Menu Item
        </button>
      </div>

      <DashboardTable
        columns={columns}
        data={menuItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        onSubmit={handleSubmit(onSubmit)}
        buttonName={editingItem ? "Update" : "Save"}
      >
        <FormModalInput
          label="Name"
          name="name"
          register={register("name", { required: "Name is required" })}
          error={errors.name}
        />
        <FormModalInput
          label="Description"
          name="description"
          register={register("description", {
            required: "Description is required",
          })}
          error={errors.description}
        />
        <FormModalInput
          label="Price"
          name="price"
          type="number"
          register={register("price", { required: "Price is required" })}
          error={errors.price}
        />
        <FormModalInput
          label="Availability"
          name="availability"
          type="select"
          options={[
            { value: "AVAILABLE", label: "Available" },
            { value: "UNAVAILABLE", label: "Unavailable" },
          ]}
          register={register("availability", {
            required: "Availability is required",
          })}
          error={errors.availability}
        />
        <FormModalInput
          label="Category"
          name="categoryId"
          type="select"
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          register={register("categoryId", {
            required: "Category is required",
          })}
          error={errors.categoryId}
        />
        <FormModalInput
          label="Image"
          name="image"
          type="file"
          register={register("image")}
          error={errors.image}
        />
      </FormModal>
    </div>
  );
}
