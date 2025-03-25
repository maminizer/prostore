"use client";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return <DropdownMenu></DropdownMenu>;
};

export default ModeToggle;
