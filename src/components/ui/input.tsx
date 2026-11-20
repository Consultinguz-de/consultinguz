import * as React from "react";

import { cn } from "@/lib/utils";

// Shared by <input>, <textarea> and <select> so every field looks the same.
export const fieldClass =
  "w-full min-w-0 rounded-none border border-foreground bg-background px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-offset-0 focus-visible:outline-accent focus-visible:outline-[3px] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:border-2";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClass, "min-h-12", className)}
      {...props}
    />
  );
}

export { Input };
