"use client";

import React, { useState } from "react";
import {
  MapTrifoldIcon,
  UserIcon,
  StackIcon,
} from "@phosphor-icons/react/dist/ssr";

interface NavButtonProps {
  id: string;
  Icon: React.ElementType;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const NavButton = ({ id, Icon, activeTab, setActiveTab }: NavButtonProps) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-black text-white shadow-lg scale-110"
          : "text-white hover:text-white hover:bg-white/10"
      }`}
    >
      <Icon size={24} weight="light" />
    </button>
  );
};

export const MobileNavbar = () => {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      {/* Main Bottom Pill */}
      <div className="flex items-center gap-3 p-2 bg-black/20 backdrop-blur-xs rounded-full ">
        <NavButton
          id="map"
          Icon={MapTrifoldIcon}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <NavButton
          id="stack"
          Icon={StackIcon}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <NavButton
          id="user"
          Icon={UserIcon}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};
