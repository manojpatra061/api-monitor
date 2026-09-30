import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  count: number;
  className?: string;
}
export const Notification = ({ count, className }: Props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger className={cn(className)}>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 rounded-full"
          >
            <Bell className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-600" />
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <p className="text-sm font-medium">Notifications</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You're all caught up.
          </p>
        </PopoverContent>
      </Popover>
    </>
  );
};
