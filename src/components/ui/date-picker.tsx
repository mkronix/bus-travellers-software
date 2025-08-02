
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = "Select date",
  className
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-12 border-2 border-gray-200 rounded-xl bg-white",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "justify-start text-left font-normal hover:bg-gray-50",
            "transition-all duration-200",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
          {selected ? format(selected, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={(date) => date < new Date()}
          initialFocus
          className="p-3 pointer-events-auto rounded-xl border-0 shadow-lg"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-lg font-semibold text-gray-900",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-8 w-8 bg-transparent p-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex mb-2",
            head_cell: "text-gray-500 rounded-md w-10 font-medium text-sm text-center",
            row: "flex w-full mt-2",
            cell: "h-10 w-10 text-center text-sm p-0 relative hover:bg-gray-100 rounded-lg transition-colors",
            day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-lg hover:bg-gray-100 transition-colors",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
            day_today: "bg-secondary text-secondary-foreground font-semibold rounded-lg",
            day_outside: "text-gray-400 opacity-50",
            day_disabled: "text-gray-300 opacity-30",
          }}
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
