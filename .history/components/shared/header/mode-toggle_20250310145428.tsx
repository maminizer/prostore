"use client";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";
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
        <Button variant="ghost">
            {theme === "system" ? (
                <SunMoon></SunMoon>
            )}
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ModeToggle;
