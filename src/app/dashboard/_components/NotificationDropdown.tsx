import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BellIcon, ClockIcon, ForwardIcon } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Order Received",
    description: "You received order #234 from user #3843.",
    time: "2m ago",
  },
  {
    id: 2,
    title: "New Message",
    description: "A new support message arrived.",
    time: "15m ago",
  },
];

const NotificationDropdown = () => {
  const unreadCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative rounded">
          {/* Badge */}
          {unreadCount > 0 && (
            <span className="absolute w-2 h-2 top-0 right-0 bg-red-500 rounded-full" />
          )}

          <BellIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 p-0">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold text-sm">Notifications</p>
          <button className="text-xs text-muted-foreground hover:underline">
            Mark all as read
          </button>
        </div>

        <DropdownMenuSeparator />

        {/* Notification List */}
        <div className="max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-6 text-sm">
              No new notifications
            </p>
          ) : (
            notifications.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="flex flex-col items-start gap-1 px-4 py-2 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" /> {item.time}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Footer */}
        <DropdownMenuItem asChild>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
            <ForwardIcon className="w-4 h-4" />
            View All Notifications
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
