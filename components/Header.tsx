import { Bell, NotepadTextIcon, SearchIcon } from "lucide-react";
import React from "react";
import { FaHashnode } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import SwitchThemeProvider from "./SwitchThemeProvider";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <div className="h-[67px] w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-900 px-12">
      <div className="flex items-center gap-1">
        <FaHashnode className="fill-blue-600" size={24} />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-300">
          Hashnode
        </h1>
      </div>
      <div className="flex items-center gap-10">
        <h1 className="text-sm font-semibold text-gray-500 dark:text-gray-300 cursor-pointer hover:border hover:border-gray-300 dark:hover:border-gray-700 px-4  py-1.5 rounded-full">
          My Feed
        </h1>
        <h1 className="text-sm font-semibold text-gray-500 dark:text-gray-300 cursor-pointer hover:border hover:border-gray-300 dark:hover:border-gray-700 px-4  py-1.5 rounded-full">
          Discussions
        </h1>
        <h1 className="text-sm font-semibold text-gray-500 dark:text-gray-300 cursor-pointer hover:border hover:border-gray-300 dark:hover:border-gray-700 px-4  py-1.5 rounded-full">
          Explore
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <SearchIcon
          size={20}
          className="text-gray-500 cursor-pointer dark:text-gray-300"
        />
        <div className="flex gap-1 items-center bg-blue-600 py-1.5 px-3 rounded-full">
          <TbPencilMinus className="text-white cursor-pointer" />
          <button className="text-white text-sm">Write</button>
        </div>
        <div>
          <SwitchThemeProvider />
        </div>
        <Bell
          size={22}
          className="text-gray-500 cursor-pointer dark:text-gray-300"
        />
        <UserProfile />
      </div>
    </div>
  );
};

export default Header;
