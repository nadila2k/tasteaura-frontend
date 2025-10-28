import React from "react";
import { Roles } from "../features/auth/roles";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthRoute from "../components/AuthRoute";
import CustomerDashboardLayout from "../components/CustomerDashboardLayout";
import CustomerProfile from "../pages/CustomerProfile";
import AdminDashboardLayout from "../components/AdminDashboardLayout";

import ManageCategory from "../pages/ManageCategory";
import ManageMenuItem from "../pages/ManageMenuItem";
import Checkout from "../pages/Checkout";
import { path } from "motion/react-client";
import OrderInfo from "../pages/OrderInfo";
import OrderView from "../pages/OrderView";
import ManageOrder from "../pages/ManageOrder";
import AdminOrderView from "../pages/AdminOrderView";
import About from "../pages/About.jsx";
import Gallery from "../pages/Gallery.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "menu", element: <Menu /> },
      { path: "gallery", element: <Gallery /> },
      {
        path: "auth/sign-in",
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      {
        path: "auth/sign-up",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: "customer-dashboard",
        element: (
          <ProtectedRoute role={Roles.CUSTOMER}>
            <CustomerDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <CustomerProfile /> },
          { path: "checkout", element: <Checkout /> },
          { path: "order-info", element: <OrderInfo /> },
          { path: "order-view/:orderId", element: <OrderView /> },

        ],
      },
      {
        path: "admin-dashboard",
        element: (
          <ProtectedRoute role={Roles.ADMIN}>
            <AdminDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "manage-category", element: <ManageCategory /> },
          { path: "manage-menu-item", element: <ManageMenuItem /> },
          { path: "manage-order", element: <ManageOrder /> },
          { path: "order-view-admin/:orderId", element: <AdminOrderView /> },
         
        ],
      },
    ],
  },
];
