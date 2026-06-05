"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export const TopBar: React.FC = () => {
  const { notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span>
          <i className="fa-solid fa-phone"></i> +1 (555) 019-2834
        </span>
        <span>
          <i className="fa-solid fa-location-dot"></i> 5th Avenue, New York, NY
        </span>
      </div>
      <div className="top-bar-right">
        {unreadCount > 0 && (
          <Link href="/notifications" style={{ marginRight: "10px", color: "#60a5fa", fontWeight: 600 }}>
            <i className="fa-solid fa-bell" style={{ marginRight: "5px" }}></i>
            {unreadCount} New {unreadCount === 1 ? "Notice" : "Notices"}
          </Link>
        )}
        <span>
          <i className="fa-solid fa-truck-fast"></i> Complimentary Insured Shipping
        </span>
      </div>
    </div>
  );
};
