"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DatasetIcon from "@mui/icons-material/DatasetOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomDivider } from "@/components/CustomDivider";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useDisconnect } from "wagmi";

export function NavMenu() {
  const pathname = usePathname();
  const { disconnect } = useDisconnect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-4 outline-none hover:bg-main_gray transition duration-400 border border-slate-300/20 py-[6px] px-3 rounded">
        <MenuIcon fontSize="medium" className="text-slate-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none w-[230px] py-4 px-2 mr-4 mt-4 bg-main_color shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12)]">
        <Link href="/offers">
          <DropdownMenuItem
            className={cn(
              "focus:bg-main_gray cursor-pointer text-base rounded py-2 mx-1",
              pathname === "/offers" ? "text-sky-400" : "text-slate-200"
            )}
          >
            <LocalOfferIcon fontSize="small" className="mr-2" />
            Your Offers
          </DropdownMenuItem>
        </Link>
        <Link href="/purchases">
          <DropdownMenuItem
            className={cn(
              "focus:bg-main_gray cursor-pointer text-base rounded py-2 mx-1",
              pathname === "/purchases" ? "text-sky-400" : "text-slate-200"
            )}
          >
            <DatasetIcon fontSize="small" className="mr-2" />
            Purchased Datasets
          </DropdownMenuItem>
        </Link>
        <CustomDivider />
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="focus:bg-main_gray cursor-pointer text-base rounded py-2 mx-1"
        >
          <LogoutIcon fontSize="small" className="mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
