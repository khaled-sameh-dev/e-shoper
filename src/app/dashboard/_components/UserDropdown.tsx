import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  ChevronUp,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  User,
  UserCircle,
} from "lucide-react";

interface UserDropdownProps {
  avatarOnly?: boolean;
  inSidebar?: boolean;
  alignSide?: "top" | "bottom" | "left" | "right";
}
const UserDropdown = ({
  inSidebar,
  alignSide,
  avatarOnly,
}: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {avatarOnly ? (
          <button  className="cursor-pointer rounded-full p-2 bg-gray-200">
            <UserCircle className="w-7 h-7" />
          </button>
        ) : (
          <div className="cursor-pointer rounded w-full flex items-center justify-between hover:bg-gray-100">
            <div className="flex items-center gap-2 text-left">
              <User className="w-7 h-7" />
              <div className="text-left">
                <p className="font-semibold text-md">Username</p>
                <p className="text-xs text-muted-foreground">User role</p>
              </div>
            </div>
            <ChevronUp className="w-5 h-5"/>
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent side={alignSide} align="end" className="w-3xs">
        {!inSidebar && (
          <>
            <DropdownMenuLabel>
              <div>
                <p className="font-semibold text-md">Welcome back!</p>
                <p className="text-xs text-muted-foreground">Username</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem>
          <p className="flex items-center fnot-bold gap-2">
            <CheckCircle className="w-5 h-5" />
            Account
          </p>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <p className="flex items-center fnot-bold gap-2">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </p>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <p className="flex items-center fnot-bold gap-2">
            <CreditCardIcon className="w-5 h-5" />
            Billing
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p className="flex items-center fnot-bold gap-2">
            <LogOutIcon className="w-5 h-5 text-red-400" />
            Logout
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
