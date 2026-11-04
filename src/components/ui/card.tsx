import { cn } from "@/lib/cn";

type CardProps = React.ComponentProps<"div"> & { interactive?: boolean };

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card p-6 text-card-foreground shadow-sm",
        interactive &&
          "transition-[box-shadow,border-color] hover:border-primary/40 hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
