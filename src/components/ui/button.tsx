import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border border-foreground text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-accent hover:text-foreground",
        outline: "bg-background text-foreground hover:bg-foreground hover:text-background",
        accent: "bg-accent text-foreground hover:bg-foreground hover:text-background",
        // For black surfaces.
        invert:
          "border-background bg-background text-foreground hover:border-accent hover:bg-accent",
      },
      size: {
        default: "min-h-11 px-5 py-2",
        lg: "min-h-14 px-6 py-3 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
