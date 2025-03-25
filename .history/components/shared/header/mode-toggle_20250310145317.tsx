"use client";
import { Button } from "@/components/ui/button";
from {SunIcon, MoonIcon, sunMoon} import "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropDownMenuSeperator,
  DropDownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost"></Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ModeToggle;
