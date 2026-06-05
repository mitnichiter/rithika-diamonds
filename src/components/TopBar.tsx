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
        <a href="tel:+15550192834" className="top-bar-link">
          <i className="fa-solid fa-phone"></i> +1 (555) 019-2834
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=730+Fifth+Avenue,+14th+Floor,+New+York,+NY+10019"
          target="_blank"
          rel="noopener noreferrer"
          className="top-bar-link"
        >
          <i className="fa-solid fa-location-dot"></i> 730 Fifth Ave, New York
        </a>
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
