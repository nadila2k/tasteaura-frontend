import React, { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable";
import { useForm } from "react-hook-form";
import FormModal from "../components/FormModal";
import FormModalInput from "../components/FormModalInput";
import apiHelper from "../apiHelper";
import toast from "react-hot-toast";

export default function ManageCategory() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

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
    fetchCategories();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      if (formData.image && formData.image.length > 0) {
        formDataObj.append("image", formData.image[0]);
      }

      if (editingCategory) {
        await apiHelper.put(`categories/${editingCategory.id}`, formDataObj, {
          isMultipart: true,
          auth: true,
          notify: true,
        });
      } else {
        await apiHelper.post("categories", formDataObj, {
          isMultipart: true,
          auth: true,
          notify: true,
        });
      }

      setIsModalOpen(false);
      reset();
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setValue("name", category.name);

    setIsModalOpen(true);
  };

  const handleDelete = async (category) => {
    try {
      await apiHelper.delete(`categories/${category.id}`, {
        auth: true,
        notify: true,
      });

      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "imageUrl", label: "Image", type: "image" },
    { key: "name", label: "Name" },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full p-6">
      <p className="mb-5 font-bold text-3xl">Manage Category</p>

      <div className="">
        <button
          onClick={() => {
            setEditingCategory(null);
            reset();
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Category
        </button>
      </div>

      <DashboardTable
        columns={columns}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        onSubmit={handleSubmit(onSubmit)}
        buttonName={editingCategory ? "Update" : "Save"}
      >
        <FormModalInput
          label="Category Name"
          name="name"
          register={register("name", { required: "Category Name is required" })}
          error={errors.name}
        />

        <FormModalInput
          label="Category Image"
          name="image"
          type="file"
          register={register("image")}
          error={errors.image}
        />
      </FormModal>
    </div>
  );
}
