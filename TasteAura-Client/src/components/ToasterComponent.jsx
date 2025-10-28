import React from "react";
import { Toaster } from "react-hot-toast";
export default function ToasterComponent() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ marginTop: "75px" }}
      toastOptions={{
        success: { duration: 5000 },
        error: { duration: 2000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#ffffff", // white background
          color: "var(--color-grey-700)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // optional, adds subtle shadow
          borderRadius: "8px", // optional, rounded corners
        },
      }}
    />
  );
}
