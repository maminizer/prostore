import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/">
            <a>
              <Image src="/logo.svg" alt={APP_NAME} width={100} height={100} />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
