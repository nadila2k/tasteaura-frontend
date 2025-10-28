import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavSideBar from "./NavSideBar";

export default function CustomerDashboardLayout() {
  const sideBarHeight = "calc(100vh - 88px)";
  return (
    <div className=" bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="pt-24 flex ">
        <div
          className="w-60 relative"
          style={{ minHeight: "calc(100vw - 88px)" }}
        >
          <div
            className="bg-blue-500 fixed w-60"
            style={{ minHeight: "calc(100vw - 88px)" }}
          >
            <SideBar>
              <NavSideBar name="Dashboard" to="/customer-dashboard" />
              <NavSideBar name="Checkout" to="/customer-dashboard/checkout" />
              <NavSideBar
                name="Order Info"
                to="/customer-dashboard/order-info"
              />
            </SideBar>
          </div>
        </div>
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
