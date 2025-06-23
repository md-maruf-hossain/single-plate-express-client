"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthProvider";
import UseAdmin from "@/hooks/UseAdmin";
import UseManager from "@/hooks/UseManager";

// Updated and meaningful icons
import { FaBars, FaTimes, FaShoppingCart, FaBox, FaUsers, FaMoneyCheck, FaUserCircle, FaMoneyCheckAlt, FaClipboardList, FaPlusSquare, FaBoxes, FaChartLine, FaEnvelope  } from "react-icons/fa";
import Loading from "@/components/Loading";
import PrivateRoute from "@/routers/PrivateRoute";
import UpButton from "@/components/UpButton";

const SidebarLink = ({ href, icon: Icon, label }) => (
  <Link href={href} className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
    <Icon className="text-md" />
    <span>{label}</span>
  </Link>
);

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = UseAdmin(user?.email);
  const [isManager, isManagerLoading] = UseManager(user?.email);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <PrivateRoute>
      <div className="flex min-h-screen">
        {/* Sidebar - mobile + desktop */}
        <div>
          {/* Mobile Toggle Button */}
          <div className="lg:hidden p-4">
            <button onClick={toggleSidebar} className="text-2xl">
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Sidebar Panel */}
          <aside
            className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r p-6 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Dashboard</h2>
            <div className="space-y-2">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {!isAdmin && (
                    <>
                      <SidebarLink href="/dashboard/my-account-info" icon={FaUserCircle} label="My Account Info" />
                      <SidebarLink href="/dashboard/my-cart" icon={FaShoppingCart} label="My Cart" />
                      <SidebarLink href="/dashboard/my-orders" icon={FaBox} label="My Orders" />
                    </>
                  )}
                </>
              )}

              {isAdminLoading ? (
                <Loading />
              ) : (
                <>
                  {isAdmin && (
                    <>
                      <SidebarLink href="/dashboard/my-account-info" icon={FaUserCircle} label="My Account Info" />
                      <SidebarLink href="/dashboard/all-users" icon={FaUsers} label="All Users" />
                      <SidebarLink href="/dashboard/all-post" icon={FaClipboardList} label="All Posts" />
                      <SidebarLink href="/dashboard/all-orders" icon={FaClipboardList} label="All Orders" />
                      <SidebarLink href="/dashboard/add-posts" icon={FaPlusSquare} label="Add Posts" />
                      <SidebarLink href="/dashboard/active-orders" icon={FaBoxes} label="Active Orders" />
                      <SidebarLink href="/dashboard/sales-report" icon={FaChartLine} label="Sales Report" />
                      <SidebarLink href="/dashboard/client-message" icon={FaEnvelope } label="Customer Feedback" />
                    </>
                  )}
                </>
              )}

              {isManagerLoading ? (
                <Loading />
              ) : (
                <>
                  {isManager && (
                    <>
                      <SidebarLink href="/dashboard/all-post" icon={FaClipboardList} label="All Posts" />
                      <SidebarLink href="/dashboard/all-orders" icon={FaClipboardList} label="All Orders" />
                      <SidebarLink href="/dashboard/add-posts" icon={FaPlusSquare} label="Add Posts" />
                      <SidebarLink href="/dashboard/all-payments" icon={FaMoneyCheck} label="All Payments" />
                      <SidebarLink href="/dashboard/active-orders" icon={FaBoxes} label="Active Orders" />
                      <SidebarLink href="/dashboard/sales-report" icon={FaChartLine} label="Sales Report" />
                    </>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>

        {/* Overlay for small screens */}
        {sidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-40 lg:hidden z-30"></div>}

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
      <UpButton />
    </PrivateRoute>
  );
};

export default DashboardLayout;
