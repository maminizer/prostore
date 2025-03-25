"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropDownMenuSeperator,
  DropDownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>{theme === "dark" ? "🌙" : "☀️"}</button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ModeToggle;
