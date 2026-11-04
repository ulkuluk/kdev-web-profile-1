import { cn } from "@/lib/cn";

type CardProps = React.ComponentProps<"div"> & { interactive?: boolean };

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xs border border-border bg-card p-6 text-card-foreground",
        interactive &&
          "hover:shadow-hard cursor-pointer transition-all duration-150 hover:border-border-dark",
        className,
      )}
      {...props}
    />
  );
}
