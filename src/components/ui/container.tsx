import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-content px-5 sm:px-8", className)} {...props} />;
}
